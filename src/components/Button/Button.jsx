import React from 'react'

export default function Button({width, children, bgColor, btnType, margin, type, clicked, shadowNone, active, name, hover, classed, disable, notRounded}) {
  return (
    <button name={name? name: null} disabled={disable} onClick={clicked} type={type? type : 'button'} className={ `  ${width}  ${btnType === 'link' ? `${margin} hover:text-color-2 custom-transition w-full  bg-transparent ${active? "text-color-2" : "text-color-1"}` :`${bgColor ? bgColor : "bg-color-4"} ${shadowNone? 'shadow-none' : 'shadow-lg'}  ${margin} p-2 font-semibold ${notRounded ? "rounded-none" :"rounded-xl" }  text-color-1 ${ hover ? hover : 'hover:bg-color-hover'}  ${active ? 'bg-color-hover hover:text-color-1' : ''}  custom-transition`} disabled:opacity-60 ` }>
        {children}
    </button>

  )
}
