
import React from 'react'

const PaginationButton = ({children, activeBtn, clicked}) => {


  return (
    <div className={` w-10 h-10 p-2 m-2 border border-color-4 rounded-sm hover:cursor-pointer hover:bg-color-hover flex justify-center items-center text-color-1 ${activeBtn ?  "bg-color-hover" : ""}`} onClick={clicked}>
        {children}
    </div>
  )
}

export default PaginationButton;