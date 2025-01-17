import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieInfo } from '../../../core/functions'
import { fetchMovie } from '../../../redux/slice/MoviesSlice'
import { useNavigate } from 'react-router-dom'

import usePaginatedFetch from '../../../usePaginatedFetch'
import PaginationBox from '../../../components/box/PaginationBox'
import LoadingPage from '../../../components/Loading/LoadingPage'
import { supabase } from '../../../core/supabaseClient'




export default function FavoritesList() {


  const navigate = useNavigate()

  const dispatch = useDispatch()

  const favoritesMovie = useSelector( state => state.movies.favoritesMovie)
  const session = useSelector( state => state.user.session);

const [favorite, setFavorite] = useState([]);
 
  
const getFavoriteMoves = async() =>{

  setFavorite(favoritesMovie)
  // const {data: profileData, error: errorData} = await supabase.from("profile"). select("movies").eq("userId", session.userId);

  // if(profileData){

  //   const favoriteMovies = profileData[0].movies
      
  //   setFavorite(favoriteMovies);
    
  //     console.log("favoritesMovie", profileData)

  // const {data: moviesData, error: errorData} = await supabase.from('movies').select("name", "pic").eq('name', profileData[0].movies);
  // if(errorData) { console.log('Error', errorData)}
  // else {
  //   console.log("favoritesMovie", moviesData)
  //   setFavorite(moviesData);
  // }
// } else {
//   console.log("Error", errorData)
// }
}

useEffect(() => {
  getFavoriteMoves();
 }, [])

const [loading, data] = usePaginatedFetch(4, favorite);

  const [page, setPage]= useState(1)
  const [list, setList]= useState();



  useEffect( () => {
    if(loading) return;
    setList(data[page - 1])

 }, [loading, page])
 
 

  const fetchMovieInfoHandler = async(name) => {
    const result = fetchMovieInfo(name)
    dispatch(fetchMovie(result))
    navigate(`/movie/${name}`);

  }

  // useEffect( () => {
  //   setList(favoritesMovie);
  // }, [favoritesMovie])
 
  return (
    <>
     {
      loading && <div className=" w-full flex justify-center items-center "><LoadingPage/></div>
     }
  
    <div className={`w-full ${list?.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center" : "" }  mx-4 my-12  gap-8 md:gap-4   `}>
     {
      !loading && list?.length > 0  ? list.map(item => (
     <>
        
        <div className="  md:w-5/12   lg:w-9/12 flex flex-col justify-center items-center cursor-pointer space-y-3" onClick={ () => fetchMovieInfoHandler(item.name)}>
        <img className='w-52 h-44 object-cover rounded-md' src={item.pic}   alt="" />
        <span className='text-color-1 font-semibold'>{ item.name}</span>
       </div>

       
   
   
      </>
  ))  : <div className=" w-full flex justify-center items-center my-16 text-color-1"><span> لیست شما خالی است </span></div>
} 

  </div>
{
       data.length > 1 &&   <PaginationBox pages={data.length} setPage={setPage} activePage={page}/>
     }

    </>
  )
}
