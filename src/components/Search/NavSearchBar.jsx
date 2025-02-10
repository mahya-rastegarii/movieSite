
import {  useState } from 'react'
import {FiSearch} from 'react-icons/fi';
import _ from "lodash";
import {supabase} from "../../core/supabaseClient";
import ShowItemNavSearch from './ShowItemNavSearch';
import SearchBox from '../box/SearchBox';
import PageBackdrop from '../Backdrop/PageBackdrop';


const NavSearchBar =() => {
  

 
  const [searchInput, setSearchInput] =useState('')

  const [dataMovie, setDataMovie]= useState([]);
  
  
 const [inputShow, setInputShow]= useState(false)

 


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
    <div className='hidden lg:flex  lg:w-full lg:drop-shadow-md lg:bg-color-4 py-1 lg:transition-all px-3 rounded-xl  justify-between items-center  '> <input className=' w-full focus:placeholder:text-color-3 text-color-1 bg-transparent transition-all outline-none  lg:placeholder:text-slate-500 input-search '  onChange={(e) => setSearchInput(e.target.value)}  onKeyUp={debouncedFetchCourses} value={searchInput}  type="text" placeholder="جست و جو کنید ..." /> <FiSearch className=' text-color-2 text-xl'/></div>
   <div className="flex lg:hidden" onClick={() => setInputShow(true)}>

    <FiSearch className=' mx-6  text-color-2 text-xl'/>
   </div>

   <PageBackdrop className={``}><div className={` ${inputShow ? "flex" : "hidden"} lg:hidden absolute top-20 right-50 z-40  drop-shadow-md bg-color-4 py-1  transition-all px-3   justify-center items-center`}> <input className=' w-full focus:placeholder:text-color-3 text-color-1 bg-transparent transition-all outline-none  lg:placeholder:text-slate-500 input-search '  onChange={(e) => setSearchInput(e.target.value)}  onKeyUp={debouncedFetchCourses} value={searchInput}  type="text" placeholder="جست و جو کنید ..." /> </div></PageBackdrop>

    {
   
    searchInput.length >= 2  ? <SearchBox dataMovie={dataMovie} setSearchInput={setSearchInput}/> : null
   }
     
    </>
  )
}

export default NavSearchBar
   
    
    
