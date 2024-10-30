import React, { useEffect, useState } from 'react'
import { Images } from '../../../fetch/slider3D-data'



export default function FavoritesList() {


  
  
  const [list, setList]= useState(Images[0].pic)


 
  return (
    
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-4 my-12  gap-8 md:gap-4 place-items-center'>
     {
      
      list.map(item => (
        <>
        <div className="  md:w-5/12   lg:w-9/12 flex justify-center items-center cursor-pointer space-y-3">
        <img className='w-full rounded-md' src={item.photo}  alt="" />
        <span className='text-color-1 font-semibold'>{ item.name}</span>
       </div>
       </>
        ))
     } 
       
    </div>
  )
}
