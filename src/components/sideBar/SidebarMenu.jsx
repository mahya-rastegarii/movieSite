
import { useDispatch, useSelector } from 'react-redux';
import PageBackdrop from '../Backdrop/PageBackdrop';
import MenuItem from '../Button/MenuItem';
import { setShowMenu } from '../../redux/slice/MenuSlice';
import { PiFilmReelLight, PiFilmSlateLight } from 'react-icons/pi';
import { TbDeviceDesktopHeart } from 'react-icons/tb';
import { FaHome } from 'react-icons/fa';
import { fetchAllMovies, fetchTopMovies } from '../../core/functions';
import { fetchMoviesList } from '../../redux/slice/MoviesSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { IoIosCloseCircleOutline } from 'react-icons/io';


export default function SidebarMenu() {
 
 
  const dispatch = useDispatch()
 const menu =useSelector( ( state) => state.menu.showMenu)
const fetchTop = async(type) => {
  dispatch(setShowMenu(false))
    const result = await fetchTopMovies(type);
    const transformedData = result.map(item => ({
      ...item,
      genre: item.genre.split(",").map(genre => genre.trim()),
    }));
    dispatch(fetchMoviesList(transformedData));
  }
  const fetchAll = async(type) => {
    
    dispatch(setShowMenu(false))
  
 const result = await fetchAllMovies(type);
 const res = result.data;
  const transformedData = res.map(item => ({
    ...item,
    genre: item.genre.split(",").map(genre => genre.trim()),
  }));
    dispatch(fetchMoviesList(transformedData));
  }

  return (
    <>
   <PageBackdrop />
     <div 
     className={` lg:hidden ${menu ? 'w-5/12 opacity-100' : "w-0 opacity-0"}  h-full p-1 bg-color-3 flex justify-center items-start  right-0 top-0 z-40 shadow-2xl border-l border-color-1 pt-1 transition-all fixed ease-in-out delay-100`}
     >
                    <IoIosCloseCircleOutline className='absolute right-2 top-3 text-xl text-color-1 hover:text-color-2' onClick={() => dispatch(setShowMenu(false))}/>
                   <ul className=' w-full mt-24 flex justify-start flex-col items-center'>
                 <div className='w-full   mb-16 mx-2 md:mx-0 flex md:justify-center md:items-center flex-col md:flex-row   md:space-y-0  space-y-3 '>
                    <MenuItem borderType="border" rounded='rounded-xl' active   link="/signIn"
                     clicked={()=> dispatch(setShowMenu(false))}>

                      ورود
                 </MenuItem>
                
              
                    <MenuItem  borderType="border" rounded="rounded-xl" active  link="/signUp"
                                        clicked={()=> dispatch(setShowMenu(false))}>

                      ثبت نام
                    </MenuItem>
                 </div>
                 <div className="w-full ">

                 
                    <MenuItem borderType="border-y" active link="/" textRight
                    clicked={()=> dispatch(setShowMenu(false))}>

                    <FaHome  className=' inline text-xl ml-1'/>
                      خانه
                    </MenuItem>
                    <MenuItem borderType="border-b" active link="/list/movies/all?page=1" textRight
                    clicked={() => fetchAll("فیلم")}>
                              <PiFilmSlateLight className=' inline text-xl ml-1'/>
                    
                    همه فیلم ها
                    </MenuItem>
                    <MenuItem borderType="border-b" active link="/list/movies/250_top?page=1" textRight
                     clicked={() => fetchTop("فیلم")}>
                    <TbDeviceDesktopHeart className=' inline text-xl ml-1'/>
                    250 فیلم برتر IMDb
                    </MenuItem>


                    

                    <MenuItem borderType="border-b" active link="/list/series/all?page=1" textRight
                    clicked={() => fetchAll("سریال")}
                    >
                    <PiFilmReelLight className='inline text-xl ml-1' />
                    همه سریال ها
                    </MenuItem>
                    <MenuItem borderType="border-b" active link="/list/series/top_250?page=1" textRight
                    clicked={() => fetchTop("سریال")}>
                    <TbDeviceDesktopHeart className=' inline text-xl ml-1'/>
                    250 سریال برتر IMDb 
                    </MenuItem>

                    </div>  
                   </ul>
      </div>
    </>
   
  )
}
