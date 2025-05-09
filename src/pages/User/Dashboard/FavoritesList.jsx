import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieInfo } from '../../../core/functions'
import { fetchMovie } from '../../../redux/slice/MoviesSlice'
import { useNavigate, useSearchParams } from 'react-router-dom'

import usePaginatedFetch from '../../../usePaginatedFetch'
import PaginationBox from '../../../components/box/PaginationBox'
import LoadingPage from '../../../components/Loading/LoadingPage'
import { supabase } from '../../../core/supabaseClient'
import { MdDelete } from 'react-icons/md'
import Button from '../../../components/Button/Button'
import { toast } from 'react-toastify'




 export default function FavoritesList() {


  const [searchParams, setSearchParams] = useSearchParams(); 
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const session = useSelector( state => state.user.session);

const [favorite, setFavorite] = useState([]);
 



const pageFromURL = parseInt(searchParams.get("page")) || 1;
const [page, setPage] = useState(pageFromURL);
const [list, setList]= useState();
const [isLoading, setIsLoading]= useState(false);


const getFavoriteMoves = async() =>{
   setIsLoading(true);
 
  const {data: profileData, error: errorData} = await supabase.from("profile"). select("movies").eq("userId", session.userId);

  if(errorData){
    toast.error("خطا در دریافت لیست علاقمندی ها")
  
} else {
   setFavorite(profileData[0].movies);
}
setIsLoading(false);
}

const deleteMovieHandler= async(movieName) => {


  const toastId = toast.loading("در حال حذف...");

  const updatedMovies = favorite.filter(movie => movie.name !== movieName);

  try{
    
   const {error} = await supabase
   .from("profile")
   .update({ movies: updatedMovies })
   .eq("userId", session.userId)

   if(error){

    throw error;
   }else {

    getFavoriteMoves();
     
    if (updatedMovies.length % 3 === 0 && page > 1) {
      setSearchParams({ page: page - 1 });
      setPage(page - 1);
    }
    
    toast.update(toastId, {
      render: "فیلم موردنظراز لیست حذف شد",
      type: "success",
      isLoading: false,
      autoClose: 3000, 
    });
   }
  } catch (err) {
    console.error("Error:", err);
  
   
    toast.update(toastId, {
      render:  "حذف انجام نشد. لطفا مجددا تلاش کنید",
      type: "error",
      isLoading: false,
      autoClose: 5000, 
    });
  
  } 
 
        
      

     
}



useEffect( () => {

  getFavoriteMoves();
}, [session])


const [ data] = usePaginatedFetch(6, favorite);


useEffect( () => {
 
 setList(data[page - 1]);

}, [ page, data])
 
 useEffect(() => {
  setSearchParams({ page });
}, [page, setSearchParams]);



  const fetchMovieInfoHandler = async(name) => {
    const result = await fetchMovieInfo(name);

  dispatch(fetchMovie(result));
  navigate(`/movie/${name}`)
}


 
  return (
    <>
     {
      isLoading && <div className=" w-full flex justify-center items-center mx-2 my-12"><LoadingPage/></div>
     }
  
    <div className={`w-full ${ list?.length > 0 ? "grid grid-cols-2 lg:grid-cols-3 place-items-center place-self-center" : "" } mx-2 my-12  gap-x-4 md:gap-x-2 gap-y-4  `}>
     {
      !isLoading &&  list?.map(item => (
     <>
        
        <div className="  flex flex-col justify-center items-center cursor-pointer space-y-2" >
        <img className='w-32 h-32 object-cover rounded-md' src={item.pic}   alt={item.name} onClick={ () => fetchMovieInfoHandler(item.name)}/>
        <span className='text-color-1 font-semibold'>{item.name}</span>
       <Button
                   bgColor="bg-color-hover"
                   width="w-full"
                   clicked={() =>deleteMovieHandler(item.name)}
                  
                 >
               
                 <MdDelete className=' inline text-lg'/>
                 <span className=" text-sm">
                 حذف از لیست
                 </span>
               
                 </Button>
       </div>


       
   
   
      </>
  )) || !isLoading && !list && <div className=" w-full flex justify-center items-center my-16 text-color-1"><span> لیست شما خالی است </span></div>  
} 

  
  </div>
{
       data.length > 1 &&   <PaginationBox pages={data.length} setPage={setPage} activePage={page}/>
     }

    </>
  )
}
