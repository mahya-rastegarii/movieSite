import React from 'react'

 const MenuComponent = ({children, open}) => {
  return (

         <div className={` lg:z-20 bg-color-2  lg:rounded-md lg:absolute lg:top-6 lg:right-8  custom-transition  ${open ? "w-full lg:w-fit h-fil " : "hidden"} `} >
                  <ul className="  flex flex-col text-color-1">
                { children }
                  </ul>
                </div>

  )
}

export default MenuComponent;