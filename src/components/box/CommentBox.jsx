// import React, { useEffect, useState } from 'react'

import { BsHandThumbsUp, BsHandThumbsDown} from 'react-icons/bs'


import Button from '../../components/Button/Button';
import { useState } from 'react';




export default function CommentBox({disLike, like, pic, userName, comment }) {



 const [hide, setHide]= useState(false);
 




 

  return (
    <div className=" bg-color-4  rounded-2xl w-full flex justify-between items-center py-3 px-4 ">
      <div className=" flex justify-start items-center">
       <div className=" flex justify-center items-center">
       <div className="flex flex-col items-center justify-center space-y-2 mx-3">
          <button><BsHandThumbsDown className=' inline text-2xl text-red-500  hover:scale-110'/></button>
          <span className='text-sm '>{disLike}</span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 ">
          <button><BsHandThumbsUp className=' inline text-2xl text-green-500 hover:scale-110' /></button>
          <span className='text-sm '>{like}</span>
        </div>
       
       </div>
       <div className=' w-full flex- flex-col justify-center items-center space-y-3 mr-4'>
        {/* <div styleName=" w-full flex  items-center"> */}

        <div className="flex w-full justify-start  items-center ">
        
        <img className=' rounded-full  ml-4' src={pic} width={51} alt={userName} />
         
        <span className=' text-xl text-color-2'> {userName} </span>
        </div>
        {/* <div className="flex w-full  justify-end  items-center  ">
       
        </div> */}
        
        {/* </div> */}
        <div className={`m-6 ${hide && "backdrop-blur-md"  }`}>
        <p>{comment} </p>
        </div>
       </div>
       </div>
       <div className=' flex min-w-fit justify-center items-center'>
       <Button width="w-full"  bgColor='bg-color-2' onClick={() => setHide(true)}>
          گزارش اسپویل
        </Button>
       </div>
      
    </div>
  )
}
