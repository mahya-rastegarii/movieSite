import React from 'react';

import { MdOutlineDateRange, MdOutlineHighQuality, MdOutlineTimer } from 'react-icons/md';
// import { PiFilmReelBold } from 'react-icons/pi';
import { BsGlobe } from 'react-icons/bs';
import { LuDownload } from 'react-icons/lu';
import { RiUserLine } from 'react-icons/ri';
import { PiTelevisionLight } from 'react-icons/pi';
import { GrStatusUnknown } from 'react-icons/gr';
// import image from '../../assets/img/64ea845ca1606-57593-210x315.jpg';

import BgRotate from '../BackgroundRotate/BgRotate';
import ImdbLabel from '../Label/ImdbLabel';
import GenreLabel from '../Label/GenreLabel';
import { fetchMovie } from '../../redux/slice/MoviesSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMovieInfo } from "../../core/functions";



export default function MoviesBox({data}) {


 
const navigate  = useNavigate()
  const dispatch= useDispatch()


 const movieInfoHandler = async(name) =>{
  const result = await fetchMovieInfo(name)
  dispatch(fetchMovie(result));

  navigate(`/movie/${name}`)

 }

 


 

  return (
    <BgRotate>

   
    <div className='w-full p-4   flex flex-col space-y-4 md:space-y-0 md:flex-row justify-center items-center  rounded-md shadow-md'>
       <img className=' rounded-md shadow-xl  w-56' src={data?.pic}  alt="coverImage" />
       <div className='w-full flex flex-col justify-center items-center md:mr-4'>
        <div className="flex w-full flex-col md:flex-row justify-between items-center">
            <h4 className=' font-bold text-color-1 text-lg'>{data?.type} {data?.name} </h4>
            {/* <div className=' flex flex-col justify-center  items-center ml-4'>
                <div className=' flex justify-center items-center'>
                <span className='  text-color-1 font-semibold text-sm '>10/</span>
                <span className=' font-bold text-color-2 text-lg'>7.1</span>
                </div>
                <span className=' bg-color-hover shadow-md px-2 rounded-md font-bold text-color-1 text-md'> IMDb </span>
              </div> */}
              <ImdbLabel textColor='text-color-1' score={data?.imdbRating}/>
        </div>
        <div className="flex w-full flex-col text-color-1 text-bold space-y-3 ">
        <div className=' flex justify-center md:justify-start opacity-60 items-center my-4 text-color-1 text-sm'>
          {/* <span className='border  border-color-3 bg-transparent  rounded-xl px-3 py-1 mx-2 '> اکشن</span>
          <span className='border  border-color-3 bg-transparent  rounded-xl px-3 py-1 mx-2 '> فانتزی</span>
          <span className='border  border-color-3 bg-transparent  rounded-xl px-3 py-1 mx-2 '> کلاسیک</span> */}
        {
          data?.genre?.map((g, index) => (

          <GenreLabel key={index} borderColor= "border-color-3" >
            {g}
          </GenreLabel>
          ))
        }
         
          </div>
            {/* <div className='w-full flex justify-start items-center'><MdOutlineHighQuality className=' inline ml-2 text-xl text-color-2'/><span className=' '>کیفیت : </span></div> */}
            <div className='w-full flex justify-start items-center'><MdOutlineTimer className=' inline ml-2 text-xl text-color-2'/><span className=' '>زمان : {data?.time}  دقیقه </span></div>
            {
            data?.year ?  <div className='w-full flex  lg:justify-start justify-center items-center'><MdOutlineDateRange className=' inline ml-2 text-xl text-color-2'/><span className=' '> سال انتشار : {data?.year}</span></div> : <div className='w-full flex  lg:justify-start justify-center items-center'><GrStatusUnknown className=' inline ml-2 text-xl text-color-2'/><span className=' '>  وضعیت پخش : {data?.status}</span></div>
          }    
            {/* <div className='w-full flex justify-start items-center'><PiFilmReelBold className=' inline ml-2 text-xl text-color-2-500'/><span className=' '>ژانر : </span></div> */}
            {
              data?.director ? <div className='w-full flex  lg:justify-start justify-center items-center'><RiUserLine className=' inline ml-2 text-xl text-color-2 mr-7 lg:mr-0'/><span className=' '>کارگردان : {data?.director}</span></div> : <div className='w-full flex  lg:justify-start justify-center items-center'><PiTelevisionLight className=' inline ml-2 text-xl text-color-2 mr-7 lg:mr-0'/><span className=' '> شبکه : {data?.tv}</span></div>
            } 
            <div className='w-full flex justify-start items-center'><BsGlobe className=' inline ml-2 text-xl text-color-2'/><span className=' '>محصول کشور : {data?.country}</span></div>
            
            <p> {data?.summary} </p>
        </div>
        <div className="w-full flex justify-center md:justify-end items-center text-color-1 px-3 mt-4">
           <button className=' w-full md:w-3/12 bg-color-hover rounded-md px-2 text-lg  py-1 font-bold shadow-md hover:bg-color-hover custom-transition' onClick={() => movieInfoHandler(data.name)}>دانلود<LuDownload className='inline mr-1'/></button>
        </div>
       </div>

    </div>
    </BgRotate>
  )
}
