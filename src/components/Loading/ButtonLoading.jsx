import React from 'react'
import { ClipLoader } from 'react-spinners'

const ButtonLoading = ({margin}) => {
  return (
    <span className={` flex justify-center items-center ${margin}`}>

      <ClipLoader
    color="#828282"
    size={18}
/>
    </span>
  )
}

export default ButtonLoading;