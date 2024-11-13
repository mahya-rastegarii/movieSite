import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieInfo } from '../../../core/functions'
import { fetchMovie } from '../../../redux/slice/MoviesSlice'
import { useNavigate } from 'react-router-dom'




export default function FavoritesList() {


  const navigate = useNavigate()

  const dispatch = useDispatch()

  const favoritesMovie = useSelector( ( state) => state.movies.favoritesMovie)
  const [list, setList]= useState()

  const fetchMovieInfoHandler = async(name) => {
    const result = fetchMovieInfo(name)
    dispatch(fetchMovie(result))
    navigate(`/movie/${name}`);

  }

  useEffect( () => {
    setList(favoritesMovie);
  }, [favoritesMovie])
 
  return (
    
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-4 my-12  gap-8 md:gap-4 place-items-center'>
     {
      
      list.map(item => (
        <>
        <div className="  md:w-5/12   lg:w-9/12 flex justify-center items-center cursor-pointer space-y-3" onClick={ () => fetchMovieInfoHandler(item.name)}>
        <img className='w-full rounded-md' src={item.photo}  alt="" />
        <span className='text-color-1 font-semibold'>{ item.name}</span>
       </div>
       </>
        ))
     } 
       
    </div>
  )
}
