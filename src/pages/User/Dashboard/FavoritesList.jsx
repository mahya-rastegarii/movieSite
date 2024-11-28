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

  const favoriteMovie = useSelector( state => state.movies.favoriteMovie)

const [favorite, setFavorite] = useState([]);
 
  
const getFavoriteMoves = async() =>{
  const {data, error } = await supabase.from('movies').select("name", "pic").eq('name', favoriteMovie);
  if(error) { console.log('Error', error)}
  else {
    setFavorite(data);
  }
    
}

const [loading, data] = usePaginatedFetch(4, favorite);

  const [page, setPage]= useState(1)
  const [list, setList]= useState();


 useEffect(() => {
   getFavoriteMoves();
  }, [])

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
      loading && <LoadingPage/>
     }
     {
      !loading && list?.length > 0 ? list.map(item => (
      <>
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-4 my-12  gap-8 md:gap-4 place-items-center  '>
        
        <div className="  md:w-5/12   lg:w-9/12 flex flex-col justify-center items-center cursor-pointer space-y-3" onClick={ () => fetchMovieInfoHandler(item.name)}>
        <img className='w-52 h-44 object-cover rounded-md' src={item.pic}   alt="" />
        <span className='text-color-1 font-semibold'>{ item.name}</span>
       </div>

       {
          page > 1 &&   <PaginationBox pages={data.length} setPage={setPage} activePage={page}/>
        }
      
       
    </div>
       </>
  ))  : <div className=" w-full flex justify-center items-center my-16 text-color-1"><span> لیست شما خالی است </span></div>
} 
    </>
  )
}
