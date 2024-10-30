import React from 'react'
import { PuffLoader } from 'react-spinners'
 const MovieLoading = () => {
  return (
   
    <PuffLoader
    color="rgb(234 179 8)"
    cssOverride={{}}
    loading
    margin={3}
    size={33}
    speedMultiplier={1}
/>


  )
}

export default MovieLoading;
