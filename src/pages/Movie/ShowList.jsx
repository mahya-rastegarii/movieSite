import  { useEffect, useState } from "react";


// import { useParams } from "react-router-dom";
import MoviesBox from "../../components/box/MoviesBox";
import SideContainer from "../../components/sideBar/SideContainer";
// import { MoviesData } from "../../fetch/movies-data";
import PaginationBox from "../../components/box/PaginationBox";
import usePaginatedFetch from "../../usePaginatedFetch";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";



export default function ShowList() {
  
 
  // const navigate = useNavigate()


  const movieList = useSelector( state => state.movies.movieList); 

  // const [showList, setShowList] = useState(movieList);
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
  console.log('data', data)
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
          {isLoading ? (
            <div className=" w-full flex mt-2 justify-center items-start min-h-screen">
              <LoadingPage />
            </div>
          ) : movies?.length > 0 ? (movies.map((data) => <MoviesBox key={data.id} data={data} />))
              :  !isLoading && movies.length === 0 && (<div className=" w-full flex justify-center items-center"><p className=" font-bold text-lg  text-color-1"> داده ای یافت نشد</p></div>)
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
