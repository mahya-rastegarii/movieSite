
import React from 'react'
import ShowItemNavSearch from '../Search/ShowItemNavSearch'



const SearchBox = ({dataMovie, setSearchInput}) => {

 

   
  return (
    <div className="h-2/12  bg-color-3 text-white w-3/12 min-h-fit  flex flex-col  rounded-sm justify-center mt-3 items-center border border-color-1  absolute z-40 space-y-2" >
  
   
    {
    

      dataMovie?.length > 0 ? dataMovie?.slice(0, 3).map((item) => (
       
        <ShowItemNavSearch  {...item} key={item.id} setSearchInput={setSearchInput}/>
       
      
         
      )): <div className="flex justify-center items-center p-2"><span className=''> جستجو نتیجه ای در بر نداشت</span></div>
     
       
    }
    {

  dataMovie > 3 ?  <div className="w-full h-fit p-1 flex justify-center items-center  cursor-pointer hover:bg-color-4">
        نتایج بیشتر
        </div> : null
    }
    
    
  </div>
  )
}

export default SearchBox;