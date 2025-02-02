
import {  useState } from 'react'
import {FiSearch} from 'react-icons/fi';
import _ from "lodash";
import {supabase} from "../../core/supabaseClient";
import ShowItemNavSearch from './ShowItemNavSearch';


const NavSearchBar =() => {
  

 
  const [searchInput, setSearchInput] =useState('')

  const [dataMovie, setDataMovie]= useState([]);
  
  


 


  const searchMovies = async (value) => {
    const lowerTitle = value.toLowerCase();
    const { data } = await supabase
      .from("movies")
      .select("*")
      .ilike("name", `%${lowerTitle}%`);
      console.log("data", data)
      
      const transformedData = data.map(item => ({
        ...item,
        genre: item.genre.split(",").map(genre => genre.trim()),
      }));
      setDataMovie(transformedData)
   
  };

  const debouncedFetchCourses = _.debounce(() => {
    if (searchInput.length >= 2) {
      searchMovies(searchInput);
    }
  }, 500);


 
  return (
    <>
    <div className=' flex  lg:w-full lg:drop-shadow-md lg:bg-color-4 py-1 lg:transition-all px-3 rounded-xl  justify-between items-center  '> <input className=' w-full focus:placeholder:text-color-3 text-color-1 bg-transparent transition-all outline-none  lg:placeholder:text-slate-500input-search '  onChange={(e) => setSearchInput(e.target.value)}  onKeyUp={debouncedFetchCourses} value={searchInput}  type="text" placeholder="جست و جو کنید ..." /> <FiSearch className=' text-color-2 text-xl'/></div>
   {/* <div className="flex lg:hidden">

    <FiSearch className=' mx-6  text-color-2 text-xl'/>
   </div> */}

   {
    searchInput.length >= 2  ? (
    
<div className="h-2/12  bg-color-3 text-white w-3/12 min-h-fit  flex flex-col  rounded-sm justify-center mt-3 items-center border border-color-1  absolute z-40 space-y-2" >
  
   
      {
       

        dataMovie.length > 0 ? dataMovie.slice(0, 3).map((item) => (
         
          <ShowItemNavSearch  {...item} key={item.id} setSearchInput={setSearchInput}/>
         
        
           
        )): <div className="flex justify-center items-center p-2"><span className=''> جستجو نتیجه ای در بر نداشت</span></div>
       
         
      }
      {

    dataMovie > 3 ?  <div className="w-full h-fit p-1 flex justify-center items-center  cursor-pointer hover:bg-color-4">
          نتایج بیشتر
          </div> : null
      }
      
      
    </div> ) : null
   }
  
    </>
  )
}

export default NavSearchBar
   
    
    
