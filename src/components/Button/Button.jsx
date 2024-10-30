import React from 'react'

export default function Button({width, children, bgColor, btnType, margin, type, clicked, shadowNone, active, name, hover}) {
  return (
    <button name={name? name: null} onClick={clicked} type={type? type : 'button'} className={ `  ${width}  ${btnType === 'link' ? `${margin} hover:text-color-2 custom-transition w-full text-color-1 bg-transparent` :`${bgColor ? bgColor : "bg-color-4"} ${shadowNone? 'shadow-none' : 'shadow-lg'}  ${margin} p-2 font-semibold rounded-xl  text-color-1 ${ hover ? hover : 'hover:bg-color-hover'}  ${active ? 'bg-color-hover hover:text-color-1' : ''}  custom-transition`}  ` }>
        {children}
    </button>

  )
}
