import React from 'react'

export default function SocialMediaButton({hover, children}) {
  return (
    
    <button className={` bg-color-4 p-2 ml-2 rounded-full  text-color-1  ${hover}  custom-transition`}>
   {children}
  </button>
  )
}
