import React from 'react'

// import  BarLoader from 'react-spinners/BarLoader'
import  SyncLoader from 'react-spinners/SyncLoader'


export const LoadingPage = () => {
  return (
//    <div className=" w-full h-screen flex justify-center items-center bg-white ">


<SyncLoader
  color="rgb(234 179 8)"
  cssOverride={{}}
  loading
  margin={3}
  size={11}
  speedMultiplier={1}
/>




    
        // </div>
  )
}

export default LoadingPage
