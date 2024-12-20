import React from 'react'

export default function MenuItem({textColor, children, rounded, borderType, clicked, active}) {
  return (
    <li className={` hover:bg-color-hover w-full custom-transition ${borderType} ${rounded} border-color-1 ${textColor ? textColor : "text-color-1"}  p-3 ${active ? 'bg-color-hover hover:text-color-1' : ''}`}>
    <button className=" w-full " onClick={clicked}>
      
          {children}
           </button>
    </li>
  )
}
