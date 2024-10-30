
import React, { useState } from 'react'


export default function PageBackdrop() {

  const {setShowMenu, showMenu}= useState()
  
 
  return (
    <div className={` ${showMenu ? 'w-full' : "w-0"}  h-full bg-black absolute top-0 left-0 opacity-60 z-30 `} onClick={() => setShowMenu(false)}>
     
    </div>
  )
}
