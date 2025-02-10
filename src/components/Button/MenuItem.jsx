import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuItem({textColor, children, rounded, borderType, clicked, active, link, textRight }) {
  return (
    <NavLink to={link} className=' w-full'>
       {( {isActive}) => (
    <li className={`w-full  hover:bg-color-hover  custom-transition ${borderType}  ${rounded} border-color-1 ${textColor ? textColor : "text-color-1"}  p-3 ${active && isActive ? 'bg-color-hover hover:text-color-1' : ''}`}>
    <button className={` w-full ${textRight && 'text-right'}`} onClick={clicked}>
      
          {children}
           </button>
    </li>
        )}
    </NavLink>
  )
}
