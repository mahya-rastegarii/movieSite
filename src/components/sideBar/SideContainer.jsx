import GenreSideBar from './GenreSideBar';
// import SerialSideBar from './SerialSideBar';
import AdvancedSearchBox from '../Search/AdvancedSearchBox';
import SerialSideBar from './SerialSideBar';


export default function SideContainer({children}) {

 

  

  return (
    
  

    <div className=' w-full px-6  flex-col-reverse flex lg:flex-row justify-center items-start mb-12 my-2  lg:mb-0'>
     <div className="flex w-full lg:w-3/12  flex-col md:flex-row md:space-y-0 md:mb-12 lg:mb-0 lg:space-y-2 lg:flex-col space-y-2">
     <GenreSideBar/>
     <SerialSideBar/>
     </div>
     <div className="  lg:w-9/12  w-full flex flex-col justify-center items-center mb-36 lg:mr-3">
    <AdvancedSearchBox/>
     
    {children}
     </div>
    </div>


   
    
  )
}
