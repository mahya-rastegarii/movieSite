



import { useState, useEffect } from "react";


import PostType from "../Button/PostType";


import Button from "../Button/Button";

// import { GenresData } from "../../fetch/genere-data";
import { activeTypeGenre, fetchAllMovies, fetchTopMovies, genreMovieList } from "../../core/functions";
// import { supabase } from "../../core/supabaseClient";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  fetchMoviesList } from "../../redux/slice/MoviesSlice";


export default function GenreSideBar() {

 
  
  const dispatch = useDispatch()
  
 const [active, setActive]= useState("movies")
 const [count, setCount]= useState(0)
 const [activeGenre, setActiveGenre] =useState([]);
 const [genres, setGenres]= useState([])


 const typeHandler = () => {
  if(active === "movies")
    return "فیلم"
  else 
   return "سریال"
 
 }
 const fetchDataAll = async() => {

  const type = typeHandler();
  const result = await fetchAllMovies(type)
   
   setCount(result.count);
 }

 const fetchAllGenre = async(e) => {
  
  const value = e.target.innerText;
  setActiveGenre(value);

  const typeMovies = typeHandler();
  const result =await fetchAllMovies(typeMovies)
      dispatch(fetchMoviesList(result.data));
      console.log("All", result);
}

const fetchTopGenre= async(e) => {


  const value = e.target.innerText;
  setActiveGenre(value);
  
  const typeMovies = typeHandler();

  const result =await fetchTopMovies(typeMovies)
        dispatch(fetchMoviesList(result))
        console.log("250Imdb", result);
}

const fetchSpecialGenre = async(e) => {
 
  const value = e.target.innerText;
  setActiveGenre(value);

  const typeMovies = typeHandler();

  const result = await genreMovieList(typeMovies, activeGenre);
      // dispatch(fetchMoviesList(result));
      console.log("OthersGenreActive", activeGenre );
      console.log("Others", result);

}





  useEffect(() => {
    fetchDataAll()
  }, [active])
  
   useEffect(() => {
   async function fetchGenres() {
      const result = await activeTypeGenre(active);
      setGenres(result);
    
      
    }
    fetchGenres();
   
  },[active] )
  
  
 
  return (
    <div className=" w-full  flex flex-col justify-center items-center shadow-md bg-color-3 rounded-md p-3 space-y-4 font-semibold text-sm  text-color-1 ml-2">
      {/* {
  
       genreError && toast.error(genreError)
      } */}
      {/* <div className=" flex justify-center items-center bg-color-4 rounded-xl p-2 ">

                <a href="#" className=' custom-hover-btn '><span > فیلم </span></a>

                <a href="#" className=' custom- hover-btn '><span > سریال </span></a>
      </div> */}
      <div className=" w-7/12 ">
        <PostType  active={active} setActive={setActive}/>
      </div>
      <span className=" font-semibold text-sm  text-color-1"> ژانر ها </span>

     
        <>
              <Button
                    width="w-full"
                    
                    active={ active === "movies" ? activeGenre.includes("همه فیلم ها") : activeGenre.includes("همه سریال ها")}
                    bgColor=" bg-color-2"
                    clicked={fetchAllGenre}
                   
                  >
                  <Link to={`/list/${active}/all`}>
            <div className=" w-full  flex justify-between px-3 ">
                  <span>همه {active === "movies" ? "فیلم ها" : "سریال ها"}</span>
                  <span>{count}</span>
            </div>
                  </Link>
          
            
        
                  </Button>

        
          <Button
                    width="w-full"
                    
                    active={active === "movies" ? activeGenre.includes("250 فیلم برتر IMDB") : activeGenre.includes("250 سریال برتر IMDB")}
                    bgColor=" bg-color-2"
                    clicked={fetchTopGenre}
                   
                  >
                      <Link to={`/list/${active}/250_top`}>
                      <span>

                    250 {active === "movies" ? "فیلم" : "سریال"} برتر IMDB
                      </span>
                      </Link>
                  </Button>

          <div className="w-full grid gap-3 justify-items-center grid-cols-1 md:grid-cols-2">
            {genres?.map((genre) => (
              // <div className=" w-full shadow-md  flex justify-center items-center p-2 bg-color-2 rounded-xl  hover:bg-color-hover cursor-pointer custom-transition delay-150" onClick={getDataGenre} key={index}>
              <Button
                width="w-full"
                active={ active === "movies" ? activeGenre.includes(genre.moviesGenre) : activeGenre.includes(genre.serialsGenre)}
                bgColor=" bg-color-2"
                clicked= {fetchSpecialGenre}
                key={genre.id}
              >
                <Link to={`/list/${active}/${active === "movies" ? genre.moviesGenre : genre.serialsGenre}`}>
                <span>

                { active === "movies" ? genre.moviesGenre : genre.serialsGenre }
                </span>
                </Link>
              </Button>

              // </div>
            ))}
          </div>
        </>
    </div>
  );
}
