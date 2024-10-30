import React from 'react'

export default function MenuItem({textColor, children, rounded, borderType}) {
  return (
    <li className={` hover:bg-color-hover w-full custom-transition ${borderType} ${rounded} border-color-1 ${textColor ? textColor : "text-color-1"}  p-3 `}>
    <button className=" w-full ">
      
          {children}
           </button>
    </li>
  )
}
