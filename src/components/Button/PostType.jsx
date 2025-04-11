

import { useEffect } from 'react';
import Button from './Button'





export default function PostType({active, setActive,  setActiveGenre}) {


  



  
  

 
  





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


const changeTypeGenre = (e) =>{
  const value = e.target.name;
  setActive(value)
  localStorage.setItem("activeType", value )
  localStorage.removeItem("activeLink");
  if(setActiveGenre) setActiveGenre([]);
 
}




  return (
    <div className='w-full flex justify-between shadow-md items-center bg-color-4 rounded-xl p-2 text-color-1 font-semibold text-sm '>
    {/* <NavLink className={ ({isActive}) => isActive ? 'py-1 px-6 ml-2 rounded-lg bg-color-hover hover:text-color-1 custom-transition delay-150':'py-1 px-6 bg-transparent ml-2 rounded-lg hover:text-color-2  custom-transition delay-150'}  ><span > فیلم </span></NavLink>
    <NavLink className={ ({isActive}) => isActive ? 'py-1 px-6 ml-2 rounded-lg bg-color-hover hover:text-color-1 custom-transition delay-150':'py-1 px-6 bg-transparent ml-2 rounded-lg hover:text-color-2  custom-transition delay-150'} ><span > سریال </span></NavLink>
     */}
    
    {
      btns.map((btn) => (

    <Button width='w-6/12' name={btn.name} active={active === btn.name} shadowNone  margin='ml-2 ' clicked={changeTypeGenre}  key={btn.name}>
    
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
