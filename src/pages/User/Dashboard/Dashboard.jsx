import React, { useEffect, useState } from 'react';
import { AiOutlineComment, AiOutlineProfile } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdOutlineLogout } from 'react-icons/md';

import BgRotate from '../../../components/BackgroundRotate/BgRotate';
import MenuItem from '../../../components/Button/MenuItem';
import Profile from './Profile';

import ProfilePhoto from '/assets/img/user.png';
import { NavLink, Outlet, redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FavoritesList from './FavoritesList';
import { logOut } from '../../../core/functions';
import { setSession } from '../../../redux/slice/UserSlice';
import Comments from './Comments';
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
    <div className='  flex md:flex-row flex-col space-y-8 md:space-y-0  justify-center md:justify-center   items-center my-16 px-7 md:px-0 py-2 lg:h-screen'>

        <div className="md:w-3/12 lg:w-2/12 w-full flex shadow-md flex-col md:ml-12 relative justify-center items-center bg-color-3 rounded-xl  font-semibold text-md space-y-16 text-color-1 ">
        
          <div className=' w-full flex flex-col justify-center items-center  '>
                <img className=' rounded-full absolute ' src={ProfilePhoto} width={122} alt="ProfilePhoto" />
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
        <div className="  w-full md:w-5/12 md:mr-12 lg:w-4/12">
        <BgRotate>
           <div className="w-full rounded-lg p-2">
           <Outlet/>
           </div>
        </BgRotate>
        </div>

    </div>
  )
}
