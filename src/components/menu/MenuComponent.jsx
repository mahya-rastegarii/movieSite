import React from 'react'

 const MenuComponent = ({children, open}) => {
  return (

         <div className={` z-20 bg-color-2  rounded-md absolute custom-transition  ${open ? "w-28 h-fil " : "hidden"} `} >
                  <ul className="  flex flex-col text-color-1">
                { children }
                  </ul>
                </div>

  )
}

export default MenuComponent;