
import React from "react"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export const HomeLoading = () => {
 
  return (
   <div className=" h-full w-full mb-10">
     <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className=" mx-2 pb-2">

      <Skeleton height="75vh" width="100%" className=" rounded-md"/>
      </div>
      <div className=' w-full flex justify-center items-start'>
        <div className="flex flex-col space-y-4 w-3/12 ml-3">
    <div className=' w-full  flex flex-col justify-center items-center  rounded-md p-3 space-y-4 border border-color-5 ml-2 mx-2'>
        <Skeleton height={12} width={130} />
        <Skeleton height={6} width={70} />
        <Skeleton height={52} width={350} />
        <Skeleton height={52} width={350} />
        <Skeleton height={52} width={350} />
        <Skeleton height={52} width={350} />
        <Skeleton height={52} width={350} />
       
              
      </div>
    <div className=' w-full  flex flex-col justify-center items-center  rounded-md p-3 space-y-4 border border-color-5 ml-2 mx-2'>
        <Skeleton height={12} width={130} />
        {/* <Skeleton height={6} width={70} /> */}
        <Skeleton height={52} width={350} />
        <Skeleton height={52} width={350} />
        <Skeleton height={52} width={350} />
        <Skeleton height={52} width={350} />
       
              
      </div>
      </div>
      <div className=' w-9/12 mx-2  flex flex-col'>
        <div className=" border border-color-5 p-3 rounded-md space-y-16">

     <div className="w-full flex justify-around items-center">
      
         <Skeleton height={12} width={135} />
         <Skeleton height={12} width={135} />
         <Skeleton height={12} width={135} />
         <Skeleton height={12} width={135} />
         </div>
     <div className="w-full flex justify-around items-center">
         <Skeleton height={12} width={265} />
         <Skeleton height={12} width={265} />
  
         </div>
      
      </div>
      <div className="space-y-14">
        <div className=" flex flex-col mt-11 m-3 space-y-2">

      
      <Skeleton height={12} width={130} />
      <div className="  flex justify-between items-center">
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        
      </div>
      </div>
      <div className=" flex flex-col  m-3 space-y-2">
      <Skeleton height={12} width={130} />
      <div className="  flex justify-between items-center">
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        
      </div>
     </div>
     <div className=" flex flex-col m-3 space-y-2">
      <Skeleton height={12} width={130} />
      <div className=" flex justify-between items-center">
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        <div className=" m-2">
        <Skeleton width={208} height={256}/>
        </div>
        
      </div>
     </div>
      </div>
      
        </div>
      </div>
   

  </SkeletonTheme>
   </div>
   
  
  )
}

