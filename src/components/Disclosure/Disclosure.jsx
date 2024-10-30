

import React , {useState} from 'react'
import { RiArrowDownDoubleLine } from 'react-icons/ri';


const Disclosure = ({title, children, bg, color, border, rounded,  isOpen }) => {

  const [open, setOpen] =useState(isOpen)

  return (
    <div className={`${bg ? bg : "bg-color-3 " } custom-transition ${rounded ? rounded : "" }  ${border ? border : "border-color-4" } ${color ? color : "text-color-1" }`}>
      <div className={`flex w-full justify-between px-4 py-2 text-left text-sm font-medium ${open ? 'border-b-2' : ''} border-color-4 cursor-pointer focus:outline-none focus-visible:ring`} onClick={() => setOpen(!open)}>
      <span>{title}</span>
                <RiArrowDownDoubleLine
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-color-2`}
                />
      </div>
       <div className={`p-4  text-sm  ${ open ? 'block' : 'hidden'}  font-semibold`}>
        {children}
      </div>
    </div>
  )
}

export default Disclosure