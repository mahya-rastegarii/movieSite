
import { PiFilmSlateLight, PiFilmReelLight } from 'react-icons/pi';
import { BiLogoTelegram, BiLogoInstagram } from 'react-icons/bi';
import SocialMediaButton from '../Button/SocialMediaButton';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllMovies, fetchTopMovies } from '../../core/functions';
import { fetchMoviesList } from '../../redux/slice/MoviesSlice';



export default function Footer() {


  const dispatch = useDispatch();


  const fetchTop = async(type) => {
    const result = await fetchTopMovies(type);
    dispatch(fetchMoviesList(result));
  }
  const fetchAll = async(type) => {
 const result = await fetchAllMovies(type);
    dispatch(fetchMoviesList(result.data));
  }



  return (
    <>
    <div className=" w-10/12 bg-color-1 right-8  -rotate-2 rounded-3xl h-12 absolute shadow-lg"></div>
    <div className=" w-10/12 bg-color-2 right-2  -rotate-1 rounded-3xl h-12 absolute shadow-lg"></div>
      <div className='w-full p-3 flex justify-center  items-center bg-color-3 rounded-tr-3xl shadow-lg relative'>
      <div className="w-full flex flex-col space-y-5 md:space-y-16">

      <div className=' flex flex-col space-y-7 md:space-y-0 md:flex-row justify-around items-center'>

      <ul className=' text-color-1 space-y-3'>
        <li>
        
          <Link to='/list/movies/all'>
          <Button btnType='link' width='w-full' clicked={ () =>fetchAll("فیلم")}>
          <PiFilmSlateLight className=' inline text-xl ml-1'/>
          همه فیلم ها
          </Button>
          </Link>
          
        </li>
        <li>
          <Link to='/list/movies/250_top'>
           <Button btnType='link' width='w-full' clicked={() => fetchTop("فیلم")}>
          250 فیلم برتر IMDb
          </Button>
          </Link>
        {/* <button className=' hover:text-color-2 custom-transition'>
        
           250 فیلم برتر IMDb
           </button> */}
           </li>

      </ul>
      <ul className='  text-color-1 space-y-3 '>
      <li>
        <Link to='/list/series/all'>
        <Button btnType='link' width='w-full' clicked={() => fetchAll("سریال")}>
        <PiFilmReelLight className='inline text-xl ml-1' />
        همه سریال ها
        </Button>
        </Link>
      {/* <button className=' hover:text-color-2 custom-transition'>
        <PiFilmReelLight className='inline text-xl ml-1'/>
        همه سریال ها
        </button> */}

      </li>
        <li> 
          <Link to='/list/series/top_250'>
          <Button btnType='link' width='w-full' clicked={() => fetchTop("سریال")}>
           250 سریال برتر IMDb
          </Button>
          </Link>
        {/* <button className=' hover:text-color-2 custom-transition'>
          250 سریال برتر IMDb
        </button> */}
        </li>
      </ul>
     <div className=" flex flex-col justify-center space-y-4 items-center">
      {/* <h6 className='text-black  text-3xl font-semibold '> <span className=' text-color-2'>MOV</span>IES </h6> */}
      <Logo size='text-4xl'/>
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
        <hr className={` w-11/12 text-color-1 `} />
    <p className=' text-color-1 opacity-80 text-sm font-thin '> تمامی حقوق مادی و معنوی این سایت محفوظ میباشد </p>
      </div>
      </div>
      </div>
      </>
  )
}
