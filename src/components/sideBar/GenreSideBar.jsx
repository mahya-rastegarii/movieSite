



import { useState, useEffect } from "react";


import PostType from "../Button/PostType";


import Button from "../Button/Button";

// import { GenresData } from "../../fetch/genere-data";
import { activeTypeGenre, fetchAllMovies, fetchTopMovies, genreMovieList } from "../../core/functions";
// import { supabase } from "../../core/supabaseClient";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  fetchMoviesList } from "../../redux/slice/MoviesSlice";
import LoadingPage from "../Loading/LoadingPage";
import ButtonLoading from "../Loading/ButtonLoading";


export default function GenreSideBar() {


  const dispatch = useDispatch()
  const navigate = useNavigate();
  
 const [active, setActive]= useState("movies")
 const [count, setCount]= useState(0)
 const [activeGenre, setActiveGenre] =useState([]);
 const [genres, setGenres]= useState([])
 

const [loading, setLoading]= useState({
  dataAll: false,
  AllMovieBtn: false,
  topMovieBtn: false,
  genreMovieBtn:false,
})

 const typeHandler = () => {
  if(active === "movies")
    return "فیلم"
  else 
   return "سریال"
 
 }
 const fetchDataAll = async() => {
   const type = typeHandler();
   setLoading({
   ...loading,
   dataAll:true
 })
 
  const result = await fetchAllMovies(type)
  
  setLoading({
    ...loading,
    dataAll:false
  });
   
   setCount(result.count);
 }

 const fetchAllGenre = async(e) => {
  
  const value = e.target.innerText;
  navigate(`/list/${active}/all?page=1`);

  setActiveGenre(value);
  localStorage.setItem("activeLink", value)
  const typeMovies = typeHandler();
  setLoading({
    ...loading,
    AllMovieBtn: true
  })
  const result =await fetchAllMovies(typeMovies)
  const res = result.data;
  const transformedData = res.map(item => ({
    ...item,
    genre: item.genre.split(",").map(genre => genre.trim()),
  }));
  dispatch(fetchMoviesList(transformedData));
  setLoading({
    ...loading,
    AllMovieBtn:false,
  })
     
      console.log("All", result);
    }
    
    const fetchTopGenre= async(e) => {
      
      const value = e.target.innerText;
      navigate(`/list/${active}/250_top?page=1`)
      localStorage.setItem("activeLink", value)
      setActiveGenre(value);
  const typeMovies = typeHandler();
  
  setLoading({
    ...loading,
    topMovieBtn:true
  })
      const result =await fetchTopMovies(typeMovies)
      
      const transformedData = result.map(item => ({
        ...item,
    genre: item.genre.split(",").map(genre => genre.trim()),
  }));
        dispatch(fetchMoviesList(transformedData))
      

        setLoading({
          ...loading,
          topMovieBtn:false,
        })
        console.log("250Imdb", result);
}

const fetchSpecialGenre = async(genreMovie) => {
 
  // const value = e.target.innerText;
  navigate(`/list/${active}/${genreMovie}?page=1`);

  localStorage.setItem("activeLink", genreMovie)
  setActiveGenre(genreMovie);
  
  const typeMovies = typeHandler();
  setLoading({
    ...loading,
    genreMovieBtn:true,
  })
  const result = await genreMovieList(typeMovies, genreMovie);
     
  const transformedData = result.map(item => ({
    ...item,
    genre: item.genre.split(",").map(genre => genre.trim()),
  }));
  
      dispatch(fetchMoviesList(transformedData));
      
      setLoading({
        ...loading,
        genreMovieBtn: false
      })
      // console.log("OthersGenre", genre);
      console.log("Others", result);

}





  useEffect(() => {
   
    fetchDataAll()
  }, [active])
  
  
  useEffect(() => {
   
  setActiveGenre(localStorage.getItem("activeLink") || []);
  setActive(localStorage.getItem("activeType") || "movies");
  }, []);


   useEffect(() => {

   async function fetchGenres() {
   
      const result = await activeTypeGenre();
      setGenres(result);
  
    }
    fetchGenres();
   
  },[] )
  
  
 
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
     {
      loading.dataAll ? <div className=" mt-2"><LoadingPage/></div>: (
     
        <>
         
              <Button
                    width="w-full"
                    active={ active === "movies" ? activeGenre.includes("همه فیلم ها") : activeGenre.includes("همه سریال ها")}
                   
                    bgColor=" bg-color-2"
                    clicked={fetchAllGenre}
                    disable={(active === "movies" ? activeGenre.includes("همه فیلم ها") : activeGenre.includes("همه سریال ها")) && loading.AllMovieBtn}
                   
                  >
                 
            <div className=" w-full  flex justify-between px-3 ">
                  <span className=' flex justify-center items-center'>
                  {(active === "movies" ? activeGenre.includes("همه فیلم ها") : activeGenre.includes("همه سریال ها")) && loading.AllMovieBtn && 
          <ButtonLoading margin="ml-1"/>
          }
                    همه {active === "movies" ? "فیلم ها" : "سریال ها"}

                  </span>
                  <span>{count}</span>
            </div>
                
          
            
        
                  </Button>
            
          <Button
                    width="w-full"
                    
                    active={active === "movies" ? activeGenre.includes("250 فیلم برتر IMDB") : activeGenre.includes("250 سریال برتر IMDB")}
                    bgColor=" bg-color-2"
                    clicked={fetchTopGenre}
                    disable={(active === "movies" ? activeGenre.includes("250 فیلم برتر IMDB") : activeGenre.includes("250 سریال برتر IMDB")) && loading.topMovieBtn}
                   
                  >
                      <span className=' flex justify-center items-center'>
                      {
                      (active === "movies" ? activeGenre.includes("250 فیلم برتر IMDB") : activeGenre.includes("250 سریال برتر IMDB")) && loading.topMovieBtn && 
          <ButtonLoading margin="ml-1"/>
          }
                    250 {active === "movies" ? "فیلم" : "سریال"} برتر IMDB
                      </span>
                  </Button>
                     

          <div className="w-full grid gap-3 justify-items-center grid-cols-1 md:grid-cols-2 ">
            {genres?.map((genre) => (
             
         <Button
                width="w-full"
                active={ activeGenre.includes(genre.moviesGenre)}
                bgColor=" bg-color-2"
                clicked= {() => fetchSpecialGenre(genre.moviesGenre)}
                disable={activeGenre.includes(genre.moviesGenre) && loading.genreMovieBtn}
               
                key={genre.id}
              >
              
          <span className=' flex justify-center items-center'>
          {
           activeGenre.includes(genre.moviesGenre) && loading.genreMovieBtn  && 
          <ButtonLoading margin="ml-1"/>
          }

                { genre.moviesGenre }
            </span> 
              
                
              </Button>
              
            ))}
          </div>
        </>
     )  }
    </div>
  );
}
