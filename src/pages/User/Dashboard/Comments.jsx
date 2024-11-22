import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'
import CommentList from "../../../fetch/comments"
import PaginationBox from '../../../components/box/PaginationBox'



export default function Comments() {
  return (
    <>
   {

CommentList ?  CommentList.map((data) => (
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
      {/* <PaginationBox/> */}
      </>
    )) 
    : <p> کامنتی موجود نیست.</p>
   }
    </>
  )
}
