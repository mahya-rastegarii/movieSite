
import React from 'react'

// import  BarLoader from 'react-spinners/BarLoader'

import { PropagateLoader } from 'react-spinners'

export const SliderLoading = () => {
  return (
//    <div className=" w-full h-screen flex justify-center items-center bg-white ">


<PropagateLoader
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

export default SliderLoading
