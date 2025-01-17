import  { useEffect, useState } from "react";


// import { useParams } from "react-router-dom";
import MoviesBox from "../../components/box/MoviesBox";
import SideContainer from "../../components/sideBar/SideContainer";
// import { MoviesData } from "../../fetch/movies-data";
import PaginationBox from "../../components/box/PaginationBox";
import usePaginatedFetch from "../../usePaginatedFetch";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";



export default function ShowList() {
  
 
  const navigate = useNavigate()


  const movieList = useSelector( state => state.movies.movieList); 

  // const [showList, setShowList] = useState(movieList);
  const [searchParams, setSearchParams] = useSearchParams(); 
  
  const [loading, setLoading, data] = usePaginatedFetch(5, movieList);
  // const [loading, setLoading]= useState(true);
  const { type, genre } = useParams();
 
  const [movies, setMovies]=useState([]);
  
  const pageFromURL = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromURL);
 
 
   

useEffect( () => {
  setLoading(true)
  
 setMovies(data[page - 1]);
  setLoading(false);
}, [loading, page, data, setLoading])


useEffect(() => {
  setPage(1);-
  console.log('data', data)
  }, [type, genre])
  

useEffect(() => {
  setSearchParams({ page });
}, [page, setSearchParams]);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

  }, [page]);


 
 

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
          {loading && (
            <div className=" w-full flex mt-2 justify-center items-start min-h-screen">
              <LoadingPage />
            </div>
          )
           }
          
          {
            !loading && !movies ?  <div className=" w-full flex justify-center items-center"><p className=" font-bold text-lg  text-color-1"> داده ای یافت نشد</p></div>
            
            :movies?.map((data) => <MoviesBox key={data.id} data={data} />)

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
