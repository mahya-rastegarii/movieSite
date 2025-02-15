// import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'
// import CommentList from "../../../fetch/comments";
import PaginationBox from '../../../components/box/PaginationBox'
import usePaginatedFetch from '../../../usePaginatedFetch';
import { useEffect, useState } from 'react';
import LoadingPage from '../../../components/Loading/LoadingPage';
import { supabase } from '../../../core/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchMovieInfo } from '../../../core/functions';
import { fetchMovie } from '../../../redux/slice/MoviesSlice';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';



export default function Comments() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector( state => state.user.session);

  // const comments = useSelector ( (state) => state.movies.comments);

    const [searchParams, setSearchParams] = useSearchParams(); 
  
    const [commentList, setCommentList]= useState([]);
    
    const pageFromURL = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(pageFromURL);

    const [isLoading, setIsLoading] =useState(false)
    const [comment, setComment]= useState();  

  const getAllUserComment = async() => {
    setIsLoading(true);
    const {data: commentData, error: commentError}= await supabase.from("profile").select("comments").eq("userId", session.userId);
    if(commentError){
      toast.error("خطا در دریافت لیست کامنت ها")
    }
      else {
        setCommentList(commentData[0]?.comments)
      }
   setIsLoading(false);
  }



  const [loading, setLoading, data] = usePaginatedFetch(3, commentList);
  
 const fetchMovieInfoHandler = async(name) => {
    const result = await fetchMovieInfo(name);
// console.log("resultInfo", result);
dispatch(fetchMovie(result));
  navigate(`/movie/${name}`)
}


const deleteCommentHandler= async(id) => {
 
  const toastId = toast.loading("در حال حذف...")
  const updatedComments = commentList.filter(comment => comment.id !== id);

  try{

    const {error} = await supabase
    .from("profile")
    .update({ comments: updatedComments })
    .eq("userId", session.userId);

    if(error){
      throw error;
    }else {
     const {error} = await supabase.from("comments").delete().eq("id", id)
     
     if(error){

      throw error;

     } else {
      getAllUserComment();
      
  
       
        if (updatedComments.length % 3 === 0 && page > 1) {
          setSearchParams({ page: page - 1 });
          setPage(page - 1);
        }


      toast.update(toastId, {
        render: "کامنت موردنظر حذف شد",
        type: "success",
        isLoading: false,
        autoClose: 3000, 
      });
     }
  }

 
        
} catch (err) {
  console.error("Error:", err);

 
  toast.update(toastId, {
    render:  "حذف انجام نشد. لطفا مجددا تلاش کنید",
    type: "error",
    isLoading: false,
    autoClose: 5000, 
  });

} 
     
      
  
  
 
 
    
  }

  
useEffect( () => {
  getAllUserComment();
}, [])

 useEffect( () => {
  setLoading(true)
  
  setComment(data[page - 1]);
  setLoading(false);
}, [loading, page, data, setLoading])
 
useEffect(() => {
  setSearchParams({ page });
}, [page, setSearchParams]);


  return (
    <>
    <div className={` min-h-36 flex flex-col ${comment ?"justify-start" : "justify-center" } items-center p-3`}>
   {/* {
     loading && <div className=" w-full flex justify-center items-center "><LoadingPage/></div>
   } */}
   {
  isLoading ? <div className=" w-full flex justify-center items-center "><LoadingPage/></div> :  comment?.map((data) => (
      
    <>
     <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between items-center mx-2  p-1 border border-color-4 text-color-1 mb-3 my-1'>
        
       <div className='w-full md:w-2/5 flex justify-between md:justify-normal items-center'>
        <div className='flex items-center flex-wrap justify-center'>
         <span className=' ml-3 text-color-1'> فیلم :</span>
        <span className=' text-color-2 cursor-pointer hover:underline' onClick={() => fetchMovieInfoHandler(data.movieName)}>  {data.movieName} </span>
        </div>

        <MdDelete className='flex md:hidden text-red-700 text-xl cursor-pointer hover:text-red-800 hover:scale-110' onClick={() => deleteCommentHandler(data.id)}/>
        </div>
         <div className="w-full md:w-2/5 flex justify-startE items-center ">
         <p className=' font-semibold'>  {data.comment}</p>
         </div>
       
         <MdDelete className='hidden md:flex text-red-700 text-xl cursor-pointer hover:text-red-800 hover:scale-110' onClick={() => deleteCommentHandler(data.id)}/>

      </div>
      </>
    )) || <div className=" w-full flex justify-center items-center my-16 text-color-1"><span> لیست شما خالی است </span></div>
  }
  </div>
  {
      data.length > 1 &&   <PaginationBox pages={data.length} setPage={setPage} activePage={page}/>
    }
    </>
  )
}
