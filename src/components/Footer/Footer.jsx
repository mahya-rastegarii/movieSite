
import { PiFilmSlateLight, PiFilmReelLight } from 'react-icons/pi';
import { BiLogoTelegram, BiLogoInstagram } from 'react-icons/bi';
import SocialMediaButton from '../Button/SocialMediaButton';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import {  NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllMovies, fetchTopMovies } from '../../core/functions';
import { fetchMoviesList } from '../../redux/slice/MoviesSlice';




export default function Footer() {


  const dispatch = useDispatch();

  



  const fetchTop = async(type) => {
    
    localStorage.removeItem("activeLink");
      localStorage.removeItem("activeType");
    const result = await fetchTopMovies(type);
    const transformedData = result.map(item => ({
      ...item,
      genre: item.genre.split(",").map(genre => genre.trim()),
    }));
    dispatch(fetchMoviesList(transformedData));
  }


  const fetchAll = async(type) => {

    localStorage.removeItem("activeLink");
    localStorage.removeItem("activeType");
 const result = await fetchAllMovies(type);
 const res = result.data;
  const transformedData = res.map(item => ({
    ...item,
    genre: item.genre.split(",").map(genre => genre.trim()),
  }));
    dispatch(fetchMoviesList(transformedData));
  }


 
  

  return (
    <div className='mt-16'>
    <div className=" w-10/12 bg-color-1 right-8  -rotate-2 rounded-3xl h-12 absolute shadow-lg"></div>
    <div className=" w-10/12 bg-color-2 right-2  -rotate-1 rounded-3xl h-12 absolute shadow-lg"></div>
      <div className='w-full p-3 flex justify-center  items-center bg-color-3 rounded-tr-3xl shadow-lg relative'>
      <div className="w-full flex flex-col space-y-5 md:space-y-16">

      <div className=' flex flex-col space-y-7 sm:space-y-0 sm:flex-row justify-around items-center'>
     
      <ul className=' text-color-1 space-y-3'>
        <li>
        
          <NavLink to='/list/movies/all?page=1'>
          {({isActive}) => (
          <Button
          btnType='link'
           width='w-full'
            clicked={ () =>fetchAll("فیلم")}
            active={isActive}
            >
          <PiFilmSlateLight className=' inline text-xl ml-1'/>
          همه فیلم ها
          </Button>
          )}
          </NavLink>
          
        </li>
        <li>
          <NavLink to='/list/movies/250_top?page=1'>
          {({isActive}) => (
           <Button
            btnType='link'
             width='w-full'
              clicked={() => fetchTop("فیلم")}
              active={isActive}
              
              >
          250 فیلم برتر IMDB
          </Button>
          )}
          </NavLink>
       
           </li>

      </ul>
      <ul className='  text-color-1 space-y-3 '>
      <li>
        <NavLink to='/list/series/all?page=1'>
        {({isActive}) => (
        <Button
         btnType='link'
          width='w-full'
           clicked={() => fetchAll("سریال")}
           active={isActive}
           >
        <PiFilmReelLight className='inline text-xl ml-1' />
        همه سریال ها
        </Button>
        )}
        </NavLink>
   

      </li>
        <li> 
          <NavLink to='/list/series/top_250?page=1'>
          {({isActive}) => (
          <Button
           btnType='link'
            width='w-full'
             clicked={() => fetchTop("سریال")}
             active={isActive}

             >
           250 سریال برتر IMDB
          </Button>
          )}
          </NavLink>
       
        </li>
      </ul>
     <div className=" flex flex-col justify-center space-y-4 items-center">
     
      <Logo size='text-4xl '/>
      <ul className=' flex justify-center items-center'>
        <li>
          
            <SocialMediaButton hover= 'hover:bg-pink-700'>
              <BiLogoInstagram className='text-2xl'/>
            </SocialMediaButton>
        </li>
        <li>
            
            <SocialMediaButton hover='hover:bg-blue-700'>
              <BiLogoTelegram className='text-2xl'/>
            </SocialMediaButton>
        </li>
      </ul>

     </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-3">
        <hr className={` w-11/12 text-color-1 opacity-80`} />
    <p className=' text-color-1 opacity-80 text-sm font-thin '> تمامی حقوق مادی و معنوی این سایت محفوظ میباشد </p>
      </div>
      </div>
      </div>
      </div>
  )
}
