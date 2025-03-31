
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
    <div className='hidden md:flex  md:w-full md:drop-shadow-md md:bg-color-4 py-1 md:transition-all px-3 rounded-xl  justify-between items-center  '> <input className=' w-full focus:placeholder:text-color-3 text-color-1 bg-transparent transition-all outline-none  md:placeholder:text-slate-500 input-search '  onChange={(e) => setSearchInput(e.target.value)}  onKeyUp={debouncedFetchCourses} value={searchInput}  type="text" placeholder="جست و جو کنید ..." /> <FiSearch className=' text-color-2 text-xl'/></div>
   <div className="flex  md:hidden mx-6" onClick={() => setInputShow(true)}>

    <FiSearch className=' text-color-2 text-xl'/>
   </div>
   
   <PageBackdrop setShow={setInputShow} show={inputShow} />
  
   <div className={`md:hidden  ${inputShow ? 'w-9/12 sm:w-7/12 opacity-100' : "w-0 opacity-0"}  left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none flex rounded-xl  items-center justify-center top-28 z-40  transition-all fixed ease-in-out delay-100 drop-shadow-md bg-color-4 py-1   px-3   `}> <input className=' w-full  focus:placeholder:text-color-3 text-color-1 bg-transparent transition-all outline-none  lg:placeholder:text-slate-500 input-search '  onChange={(e) => setSearchInput(e.target.value)}  onKeyUp={debouncedFetchCourses} value={searchInput}  type="text" placeholder="جست و جو کنید ..." /> <FiSearch className=' text-color-2 text-xl'/></div>
   
    {
    
    searchInput.length >= 2  ? <SearchBox dataMovie={dataMovie} searchInput={searchInput} setSearchInput={setSearchInput} inputShow={inputShow} setInputShow={setInputShow}/> : null
   }
    </>
  )
}

export default NavSearchBar
   
    
    
