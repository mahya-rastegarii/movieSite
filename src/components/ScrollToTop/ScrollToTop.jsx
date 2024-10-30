

import { IoIosArrowUp } from 'react-icons/io'
import useReadingProgress from './useReadingProgress'

export default function ScrollToTop() {
  
  
const completion = useReadingProgress()
      const scrollToTopHandler = () => {
        window.scrollTo({
          top:0,
          behavior:"smooth"
          
        })
      }
    
  return (
     //${theme === "dark" ? "rgb(15 23 42)" 
    <div style={{background: `conic-gradient( rgb(234 179 8) ${completion}% ,"rgb(255, 255, 255)"  ${completion}% )`}} className=" fixed z-10 flex justify-center items-center bottom-3  right-4  w-12 h-12 rounded-full border border-color-4 shadow-xl animate-bounce">
    <button className=' rounded-full w-10 h-10 grid place-content-center p-2 bg-color-4 outline-none ' onClick={scrollToTopHandler}><IoIosArrowUp className=' text-yellow-500 text-2xl '/></button>
  </div>
  )
}
