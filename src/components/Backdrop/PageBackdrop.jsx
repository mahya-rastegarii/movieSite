
import React, { useState } from 'react'


export default function PageBackdrop({show, setShow}) {

  
  
 
  return (
    <>
    <div className={` ${show? 'w-full' : "w-0"}  h-full bg-black absolute top-0 left-0 opacity-90 z-30 `} onClick={() => setShow(false)}>
     
    </div>
    
    </>
  )
}
