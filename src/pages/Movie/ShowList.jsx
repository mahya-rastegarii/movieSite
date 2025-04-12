import  { useEffect, useState } from "react";


import MoviesBox from "../../components/box/MoviesBox";
import SideContainer from "../../components/sideBar/SideContainer";
import PaginationBox from "../../components/box/PaginationBox";
import usePaginatedFetch from "../../usePaginatedFetch";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useSelector } from "react-redux";
import {  useParams, useSearchParams } from "react-router-dom";



export default function ShowList() {
  
 


  const movieList = useSelector( state => state.movies.movieList); 

  const [searchParams, setSearchParams] = useSearchParams(); 
  
  const [data] = usePaginatedFetch(5, movieList);

  const { type, genre } = useParams();

 const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies]=useState([]);
  
  const pageFromURL = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromURL);
 


  const query = searchParams.get('query');

   

useEffect(() => {


  setIsLoading(true); 
 if (data.length > 0) {
    setTimeout(() => {
      setMovies(data[page - 1] || []);
      setIsLoading(false); 
    }, 500);
  } else  if (data.length === 0 || !data[page - 1]) {
    setMovies([]);
    setIsLoading(false);
  }
}, [data, page]); 


useEffect(() => {
  setPage(1);

  window.scrollTo({ top: 0, behavior: "smooth" });
  }, [type, genre])
  

useEffect(() => {
  
  if(query)
  setSearchParams({ query, page });
else setSearchParams({  page });
}, [page, setSearchParams, query]);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

  }, [page]);


 
 

  return (
    <>
    
      <SideContainer>
        <div className="w-full px-4 min-h-screen  lg:w-10/12 flex flex-col justify-center items-center space-y-16 mb-5">
          {isLoading ? (
            <div className=" w-full flex mt-2 justify-center items-start min-h-screen">
              <LoadingPage />
            </div>
          ) : movies?.length > 0 ? (movies.map((data) => <MoviesBox key={data.id} data={data} />))
              :  !isLoading && movies.length === 0 && (<div className=" w-full flex justify-center items-center"><p className=" font-bold text-lg  text-color-1"> خطا در دریافت لیست</p></div>)
           } 
         
          
            

           
        
        </div>
        {
          data.length > 1 &&
          <PaginationBox 
          pages={data.length}
          setPage={setPage}
          activePage={page}/> 
         } 

    
      </SideContainer>
    </>
  );
}
