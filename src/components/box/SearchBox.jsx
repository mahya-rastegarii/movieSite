
import React from 'react'
import ShowItemNavSearch from '../Search/ShowItemNavSearch'
import { fetchMoviesList } from '../../redux/slice/MoviesSlice';
import { useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const SearchBox = ({dataMovie, searchInput, setSearchInput, inputShow, setInputShow}) => {


 const navigate = useNavigate();
 const dispatch = useDispatch()



  const SearchMoviesData = (MoviesData)=> {


   if (!searchInput.trim()) return;

     const params = new URLSearchParams();
     params.set("query", searchInput); 
     params.set("page", "1"); 
     navigate(`/list/movie&serial/all?${params.toString()}`); 
   


   
   dispatch(fetchMoviesList(MoviesData))


 


    setSearchInput("");
    setInputShow(false);
  }
   

 

  return (
    <div className={`h-2/12 w-9/12 sm:7/12  bg-color-3 text-white md:w-4/12 lg:w-3/12 min-h-fit  ${inputShow ? "flex" : "hidden"} md:flex flex-col  rounded-sm justify-center mt-3 items-center border border-color-1  top-36 left-1/2 transform -translate-x-1/2 md:left-auto md:transform-none  md:top-auto absolute z-40`} >
  
   
    {
    

      dataMovie?.length > 0  ?  dataMovie?.slice(0, 3).map((item) => (
       
        <ShowItemNavSearch  {...item} key={item.id} setSearchInput={setSearchInput} setInputShow={setInputShow}/>
       
      
         
      )): <div className="flex justify-center items-center p-2"><span className=''> جستجو نتیجه ای در بر نداشت</span></div>
     
       
    }
    {

  dataMovie.length > 3 &&  <div className="w-full h-fit p-1 flex justify-center items-center  cursor-pointer hover:bg-color-4" onClick={() => SearchMoviesData(dataMovie)}>
        نتایج بیشتر
        </div>
    }
    
    
  </div>
  )
}

export default SearchBox;