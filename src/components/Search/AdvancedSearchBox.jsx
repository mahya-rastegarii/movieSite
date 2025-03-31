import  { useEffect, useState } from 'react';

import RangeInput from '../input/rangeInput/RangeInput';

import Button from '../Button/Button'
import PostType from "../Button/PostType";
// import {Countries} from "../../fetch/coutries";
// import {GenresData} from "../../fetch/genere-data";


import { activeTypeGenre, fetchCountries } from '../../core/functions';
import { supabase } from '../../core/supabaseClient';
import { fetchMoviesList } from '../../redux/slice/MoviesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonLoading from '../Loading/ButtonLoading';

export default function AdvancedSearchBox() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [active, setActive]= useState("movies")
  const [genres, setGenres]= useState({
    loading:false,
    data: [],
  });

  const [countries, setCountries]= useState({
    loading:false,
    data: []
  });

  const [visible, setVisible] =useState({
    movie: true,
    serial: false
  });

   const endYear = 2024;
  const [IMDbSliderValue, setIMDbSliderValue] = useState([1, 10]);
  const [yearSliderValue, setYearSliderValue] = useState([1800, endYear]);
  const [genreValue, setGenreValue] = useState('all')
  const [countryValue, setCountryValue] = useState('none');
  const [statusValue, setStatusValue] = useState('none')
  const [loading, setLoading] = useState(false);

 



 
  

 
 
 
  const handleIMDbSliderChange= (value) =>{
     setIMDbSliderValue(value)
    
  }

  const handleYearSliderChange= (value) =>{
    setYearSliderValue(value)
 }



 const AdvancedSearchData = async() => {

  setLoading(true)
      let typeData =  active === "movies" ?  "فیلم" : "سریال"
   
 
 let query =  supabase.from('movies').select("*").eq("type", typeData).gte("imdbRating", IMDbSliderValue[0]).lte("imdbRating", IMDbSliderValue[1])

 if(typeData !== "سریال"){
   query = query.gte("year", yearSliderValue[0]).lte("year", yearSliderValue[1])
 }
  if(genreValue !== "all") {
    query = query.ilike("genre", `%${genreValue}%`)
  } 
  if(countryValue !== 'none') {
    query = query.ilike("country", `%${countryValue}%`)
  }
  if(typeData !== "فیلم" && statusValue !== 'none'){
    query = query.eq("status", statusValue)
  }


  const {data: movieData, error: movieError} = await query;
  setLoading(false)

  if(movieError) {
        console.log("Error Fetching movie", movieError)
  } else {
    const transformedData = movieData.map(item => ({
      ...item,
  genre: item.genre.split(",").map(genre => genre.trim()),
}));

  localStorage.removeItem("activeLink");
    localStorage.removeItem("activeType")
    dispatch(fetchMoviesList(transformedData))
            navigate(`/list/${typeData}/${genreValue}?page=1`)
  }
 
//   if(error){
//     console.log("Error Fetching movie", error)
//     return;
//   }
//   // setDataMovies(data);
//   console.log("Advanced", data);
//   // return true;
}


 useEffect(() => {
  async function fetchGenres() {
    
    setGenres({
     ...genres,
     loading:true
    })
     const result = await activeTypeGenre(active);
     setGenres({
      loading: false,
      data:result
     })
     
     if(active === "series") 
      setVisible({
        movie:false, 
        serial:true
      })
   else  {
    setVisible({
      movie:true, 
      serial:false
    })
   }
    }
    fetchGenres();
 }, [ active]);
 

 useEffect(() => {
   async function fetchCountriesHandler() {
   
     setCountries({
       ...countries,
       loading:true
     });
    const result = await fetchCountries();
    setCountries({
      loading: false,
      data:result
    });
  }
  
  fetchCountriesHandler()
 }, [])

  return (
  
    <div className=' bg-color-3 flex flex-col justify-center items-center w-full rounded-md shadow-md p-3  mb-14  space-y-8'>

    
        <div className=' w-full flex-col flex lg:flex-row space-y-8 lg:space-y-0 justify-around items-center'>
          <div className=" w-full lg:w-6/12 md:justify-between  lg:justify-around md:px-20 lg:px-0 justify-center items-center flex flex-col space-y-5 md:space-y-0 md:flex-row ">

        <div className='w-7/12 sm:w-4/12 bg-transparent  flex justify-center items-center text-color-1 '>
            <span className=' text-md font-bold ml-8 md:ml-2'> نوع </span>
            <PostType  active={active} setActive={setActive}/>
        </div>
        <div className=' bg-transparent  flex justify-center items-center text-color-1 font-semibold '>

            {genres.loading  && 
             <div className="flex justify-center items-center ml-1">
             <ButtonLoading/>
             </div>
            }

            <span className=' text-md ml-8 font-bold md:ml-2'> ژانر </span>
            <select className=' bg-color-4 shadow-md outline-none rounded-xl p-2 text-sm' onChange={(e) => setGenreValue(e.target.value)}>

            <option  value={genreValue}> همه </option>
              {
               
                genres.data?.map((genre) => (
                  <option key={genre.id} value={genre.moviesGenre}>
                    {genre.moviesGenre}
                </option>
                ))
              }

             </select>

        </div>
          </div>
          {/* <div className=" w-full lg:w-6/12 md:justify-around justify-center items-center flex flex-col space-y-5 md:space-y-0 md:flex-row "> */}
          <div className=" w-full lg:w-6/12 md:justify-between  lg:justify-around md:px-20 lg:px-0 justify-center items-center flex flex-col space-y-5 md:space-y-0 md:flex-row ">

        <div className=' bg-transparent  flex justify-center items-center text-color-1 font-semibold'>

            { countries.loading &&
             <div className="flex justify-center items-center ml-1">
            <ButtonLoading/>
            </div>
            
              } 

            <span className=' text-md ml-8 font-bold  md:ml-2'> کشور </span>

            <select className=' bg-color-4 shadow-md outline-none rounded-xl p-2 text-sm' onChange={(e) => setCountryValue(e.target.value)}>
              <option value={countryValue} >---</option>
            {
              countries.data?.map((c) =>{
                // console.log(index);
                return(<option key={c.id} value={c.country}>{c.country}</option>)
              })
            }
             
             </select>

        </div>
       
        <div className={` bg-transparent  flex justify-center items-center text-color-1 font-semibold ${!visible.serial ? " pointer-events-none  opacity-40" : ''}`} disabled={visible.serial}>
            <span className=' text-md font-bold ml-8  md:ml-2'> وضعیت  </span>
            <select className=' bg-color-4 shadow-md outline-none rounded-xl p-2 text-sm' name="" id="" onChange={(e) => setStatusValue(e.target.value)}>
                <option value={statusValue} >---</option>
                <option value="در حال پخش"> در حال پخش</option>
                <option value="پایان یافته">  پایان یافته </option>
                <option value="کنسل شده"> کنسل شده </option>

             </select>
        </div>
          </div>
        </div>
        <div className=' w-full flex flex-col space-y-8 px-8 lg:px-0 md:space-y-0 justify-around md:flex-row items-center '>
         {
          <div className={` w-full md:w-4/12 flex flex-col justify-center items-center space-y-3${!visible.movie ? " pointer-events-none  opacity-40" : ''}`} disabled={visible.movie}>
            <div className=" w-full flex justify-between items-center text-md font-bold text-color-1">
             <span className=' '> سال ساخت </span>
             <div className=' flex justify-center items-center '>
              <span className=' ml-2 '>{yearSliderValue[0]}</span>
              -
             <span className=' mr-2 '>{yearSliderValue[1]}</span>
             </div>
            </div>
         <RangeInput sliderValue={yearSliderValue} handleSliderChange={handleYearSliderChange} min={1800} max={endYear}/>
          </div>
          }
          <div className='w-full md:w-4/12 flex flex-col justify-center items-center space-y-3'>
            <div className=" w-full flex justify-between items-center text-md font-bold text-color-1">
             <span className=' '> امتیاز IMDB </span>
             <div className=' flex justify-center items-center '>
              <span className=' ml-2 '>{IMDbSliderValue[0]}</span>
              /
             <span className=' mr-2 '>{IMDbSliderValue[1]}</span>
             </div>
            </div>
          <RangeInput min={1} max={10} sliderValue={IMDbSliderValue} handleSliderChange={handleIMDbSliderChange} step={0.1}/>
          </div>

        </div>
        {/* <button className=' bg-slate-700  w-4/12 shadow-sm p-2 font-semibold rounded-xl ml-3 text-slate-200  hover:bg-yellow-500  custom-transition '> جستجو </button> */}
        <Button width='w-4/12' disable={loading} clicked={AdvancedSearchData}>
        <span className=' flex justify-center items-center'>
        { loading && <ButtonLoading margin='ml-1'/>}
         جستجو  
        </span>
        </Button>
    </div>
  )
}
