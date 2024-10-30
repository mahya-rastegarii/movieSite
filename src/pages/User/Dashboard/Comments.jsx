import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'
import CommentList from "../../../fetch/comments"



export default function Comments() {
  return (
    <>
   {

CommentList.map((data) => (
        <>
     <div className=' flex flex-col p-2'>
        
        <span>{data.name} نام فیلم :</span>
         <p>{data.content}</p>
        <div className=" flex justify-center items-center">
       <div className="flex flex-col items-center justify-center space-y-2 mx-3">
          <button><BsHandThumbsDown className=' inline text-2xl text-red-500  hover:scale-110'/></button>
          <span className='text-sm '>{data.disLike}</span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 ">
          <button><BsHandThumbsUp className=' inline text-2xl text-green-500 hover:scale-110' /></button>
          <span className='text-sm '>{data.like}</span>
        </div>
       
       </div>
      </div>
      </>
    ))
   }
    </>
  )
}
