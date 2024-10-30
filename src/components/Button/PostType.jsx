import React, { useEffect, useState } from 'react'

import Button from './Button'
import { NavLink } from 'react-router-dom'
// import { useParams } from 'react-router-dom'



// import { fetchGenresMovie, fetchGenresSerial } from '../redux/features/movieSlice'



export default function PostType({changeActiveButton}) {


  
  const [active, setActive] = useState("movies")
  
  







 const btns =[
  {
    name: "movies",
    content: "فیلم",
  },
  {
    name: "series",
    content:"سریال",
  },

]

  return (
    <div className='w-full flex justify-between shadow-md items-center bg-color-4 rounded-xl p-2 text-color-1 font-semibold text-sm '>
    {/* <NavLink className={ ({isActive}) => isActive ? 'py-1 px-6 ml-2 rounded-lg bg-color-hover hover:text-color-1 custom-transition delay-150':'py-1 px-6 bg-transparent ml-2 rounded-lg hover:text-color-2  custom-transition delay-150'}  ><span > فیلم </span></NavLink>
    <NavLink className={ ({isActive}) => isActive ? 'py-1 px-6 ml-2 rounded-lg bg-color-hover hover:text-color-1 custom-transition delay-150':'py-1 px-6 bg-transparent ml-2 rounded-lg hover:text-color-2  custom-transition delay-150'} ><span > سریال </span></NavLink>
     */}
    
    {
      btns.map((btn) => (

    <Button width='w-6/12' name={btn.name} active={active === btn.name} shadowNone  margin='ml-2 ' clicked={() => setActive(btn.name)}  key={btn.name}>
    
        {
          btn.content
        }
           
    </Button>
      ))
    }

    {/* <Button width='w-6/12' shadowNone active={active} clicked={() => setActive(!active)}>
      سریال
    </Button> */}
    </div>
  )
}
