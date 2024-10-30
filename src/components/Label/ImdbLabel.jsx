import React from 'react'

export default function ImdbLabel({textColor,score}) {
  return (
    <div className=' flex flex-col justify-center  items-center ml-4'>
                <div className=' flex justify-center items-center'>
                <span className={` ${textColor ? textColor : 'text-white'} font-semibold text-sm `}>10/</span>
                <span className=' font-bold text-color-2 text-lg'>{score}</span>
                </div>
                <span className={` ${textColor ? textColor : 'text-white'} bg-color-hover shadow-md px-2 rounded-md font-bold  text-md`}> IMDb </span>
              </div>
  )
}
