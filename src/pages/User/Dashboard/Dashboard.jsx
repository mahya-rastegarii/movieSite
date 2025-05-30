import  { useEffect } from 'react';
import { AiOutlineComment, AiOutlineProfile } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdOutlineLogout } from 'react-icons/md';

import BgRotate from '../../../components/BackgroundRotate/BgRotate';
import MenuItem from '../../../components/Button/MenuItem';


import {  Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../core/functions';
import { setSession } from '../../../redux/slice/UserSlice';
import { toast } from 'react-toastify';



export default function Dashboard() {

  const dispatch = useDispatch();
  

  const session = useSelector( ( state) => state.user.session);


 const navigate = useNavigate();
 

  const LogoutUser = async() =>{
    const result = await logOut();
    if(result) {
      dispatch(setSession(null))
      return navigate("/")
    }
    else{
     toast.error("لطفا مجددا تلاش کنید")
    }
  
    } 


    useEffect( ()=> {
      if(!session) {
        return navigate("/")
      }
    }, [session])

  return (
    <div className='  flex md:flex-row flex-col space-y-12 md:space-y-0  justify-center md:justify-center   items-center my-16 px-7 md:px-0 py-2 lg:h-screen'>

        <div className="md:w-3/12 xl:w-2/12 w-full flex shadow-md flex-col md:ml-8  lg:ml-12 relative justify-center items-center bg-color-3 rounded-xl  font-semibold text-md space-y-16 text-color-1 ">
        
          <div className=' w-full flex flex-col justify-center items-center'>
                <span className="w-24 h-24 rounded-full border border-color-1 bg-color-hover absolute flex justify-center items-center text-color-1 font-sans text-3xl"> {session?.userName.slice(0,1).toUpperCase()} </span>
          </div>

                <span className='font-bold text-xl text-color-1'>{session?.userName}</span>

          <div className='  w-full  flex flex-col '>
            <ul className=' rounded-xl'>

          
        

           <MenuItem borderType="border-t" active link="/dashboard/profile">
            <AiOutlineProfile className=' inline ml-2 text-xl'/>
           داشبورد
           </MenuItem>
   
        
   
           <MenuItem borderType="border-t" active link="/dashboard/favoriteList">
            <MdOutlineFavoriteBorder className=' inline ml-2 text-xl'/>
          لیست مورد علاقه ها 
           </MenuItem>
 
          
           <MenuItem borderType="border-t" active link="/dashboard/comments">
            <AiOutlineComment className=' inline ml-2 text-xl'/>
            کامنت ها
           </MenuItem>
  
           <MenuItem borderType="border-t" textColor="text-red-500" rounded=" rounded-b-xl" clicked={LogoutUser}>
            <MdOutlineLogout className=' inline ml-2 text-xl'/>
             خروج از حساب
           </MenuItem>
           </ul>
          </div>
        </div>
        <div className="  w-full md:w-7/12 md:mr-12 lg:w-5/12 xl:w-4/12">
        <BgRotate>
           <div className="w-full rounded-lg p-2">
           <Outlet/>
           </div>
        </BgRotate>
        </div>

    </div>
  )
}
