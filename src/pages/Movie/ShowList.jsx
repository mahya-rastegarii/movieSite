import  { useEffect, useState } from "react";


// import { useParams } from "react-router-dom";
import MoviesBox from "../../components/box/MoviesBox";
import SideContainer from "../../components/sideBar/SideContainer";
// import { MoviesData } from "../../fetch/movies-data";
import { useSelector } from "react-redux";
import PaginationBox from "../../components/box/PaginationBox";
import usePaginatedFetch from "../../usePaginatedFetch";


export default function ShowList() {
  
 

  const movieList = useSelector( state => state.movies.movieList);
 
  const [loading, data] = usePaginatedFetch(5, movieList);
  
  const [page, setPage]= useState(1)
  const [movies, setMovies]=useState(null);
  
  useEffect( () => {
     if(loading) return;
     setMovies(data[page - 1])
  }, [loading, page])
  


  useEffect(() => {
    window.scrollTo(top);

   
  }, []);

 
 

  return (
    <>
    
      {/* <GenreProvider>
<div className=' w-full px-2  flex-col-reverse flex mt-7 lg:flex-row justify-center items-start mb-12 my-2  lg:mb-0'>
       
       <div className="flex w-full lg:w-3/12 flex-col md:flex-row md:space-y-0 md:mb-12 lg:mb-0 lg:space-y-2 lg:flex-col space-y-2">
        <GenreSideBar/>
        <SerialSideBar/>
        </div>
      
        <div className="w-full lg:w-9/12  flex flex-col justify-center items-center mb-36 lg:mr-3 space-y-16">
       <AdvancedSearchBox/>
       <div className="w-full px-4  lg:w-10/12 flex flex-col justify-center items-center space-y-16">
 {
      allData?.map(data => (

        <MoviesBox key={data.id} data={data}/>
      ) )
 }
       
       </div>
              
        </div>
       </div>
       </GenreProvider> */}
      <SideContainer>
        <div className="w-full px-4 min-h-screen  lg:w-10/12 flex flex-col justify-center items-center space-y-16 mb-5">
          {/* {isLoading ? (
            <div className=" w-full flex mt-2 justify-center items-start min-h-screen">
             
              <LoadingPage />
            </div>
          ) : ( */}
          {
            movies?.length > 0 ? movies.map((data) => <MoviesBox key={data.id} data={data} />) :  <div className=" w-full flex justify-center items-center"><p className=" font-bold text-lg  text-color-1"> داده ای یافت نشد</p></div>
          }
          {/* )} */}
        </div>

        {
          page > 1 &&   <PaginationBox pages={data.length} setPage={setPage} activePage={page}/>
        }
    
      </SideContainer>
    </>
  );
}
