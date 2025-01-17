import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'
// import CommentList from "../../../fetch/comments";
import PaginationBox from '../../../components/box/PaginationBox'
import usePaginatedFetch from '../../../usePaginatedFetch';
import { useEffect, useState } from 'react';
import LoadingPage from '../../../components/Loading/LoadingPage';
import { supabase } from '../../../core/supabaseClient';
import { useSelector } from 'react-redux';



export default function Comments() {

  const session = useSelector( state => state.user.session);

  const comments = useSelector ( (state) => state.movies.comments);


  const [commentLIst, setCommentList]= useState([]);


  const getAllUserComment = async() => {
    setCommentList(comments)
    const res= await supabase.from("profile").select("comments").eq("userId", session.id);
    // if(error) console.log("Eror", error)
    //   else console.log("Data", dataComments);
     console.log("Data", res);
    // else setCommentList(dataComments);
  }

  
  useEffect( () => {
    getAllUserComment();
  }, [])

  const [loading, data] = usePaginatedFetch(2, commentLIst);
  
  const [page, setPage]= useState(1)
const [comment, setComment]= useState();



  useEffect( () => {
    if(loading) return;
    setComment(data[page - 1])
 }, [loading, page])
 
  return (
    <>
   {
     loading && <div className=" w-full flex justify-center items-center "><LoadingPage/></div>
   }
   {
    !loading && comment?.length > 0 ?  comment.map((data) => (
      
    <>
     <div className=' flex flex-col justify-center  space-y-3 p-2 border border-color-4 text-color-1 mb-3 my-1'>
        
        <div className="flex justify-around  items-center">
        <span> نام فیلم : {data.movieName}</span>
        <div className=" flex justify-center items-center ">
       <div className="flex  items-center justify-center  mx-2">
          <span className='text-sm mx-1'>{data.dislike}</span>
          <button><BsHandThumbsDown className='  text-lg text-red-500  hover:scale-110'/></button>
        </div>
        <div className="flex  items-center justify-center  mx-2">
          <span className='text-sm mx-1'>{data.like}</span>
          <button><BsHandThumbsUp className='  text-lg text-green-500 hover:scale-110' /></button>
        </div>
       
       </div>
        </div>
         <p>{data.comment}</p>
      
      </div>
      {
          data.length > 1 &&   <PaginationBox pages={data.length} setPage={setPage} activePage={page}/>
        }
      </>
    )) 
    : <div className=" w-full flex justify-center items-center my-16 text-color-1"><span> لیست شما خالی است </span></div>
   }
    </>
  )
}
