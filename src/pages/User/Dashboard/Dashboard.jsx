import React from 'react';
import { AiOutlineComment, AiOutlineProfile } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdOutlineLogout } from 'react-icons/md';

import BgRotate from '../../../components/BackgroundRotate/BgRotate';
import MenuItem from '../../../components/Button/MenuItem';
import Profile from './Profile';

import ProfilePhoto from '/assets/img/user.png';

export default function Dashboard() {
  return (
    <div className='flex md:flex-row flex-col space-y-8 md:space-y-0  justify-center md:justify-around  items-center my-16 px-7 md:px-0 py-2 lg:h-screen'>

        <div className="md:w-3/12 lg:w-2/12 w-full flex shadow-md flex-col relative  justify-center items-center bg-color-3 rounded-xl  font-semibold text-md space-y-16 text-color-1 ">
          <div className=' w-full flex flex-col justify-center items-center  '>
                <img className=' rounded-full absolute ' src={ProfilePhoto} width={122} alt="ProfilePhoto" />
          </div>

                <span className='font-bold text-xl text-color-1'>Name</span>

          <div className='  w-full  flex flex-col '>
            <ul className=' rounded-xl'>

          
           <MenuItem borderType="border-t" >
            <AiOutlineProfile className=' inline ml-2 text-xl'/>
           داشبورد
           </MenuItem>
           <MenuItem borderType="border-t" >
            <MdOutlineFavoriteBorder className=' inline ml-2 text-xl'/>
          لیست مورد علاقه ها 
           </MenuItem>
           <MenuItem borderType="border-t" >
            <AiOutlineComment className=' inline ml-2 text-xl'/>
            کامنت ها
           </MenuItem>
           <MenuItem borderType="border-t" textColor="text-red-500" rounded=" rounded-b-xl">
            <MdOutlineLogout className=' inline ml-2 text-xl'/>
             خروج از حساب
           </MenuItem>
           </ul>
          </div>
        </div>
        <div className="  w-full md:w-7/12  lg:w-6/12">
        <BgRotate>
           <div className="w-full rounded-lg p-2">
             <Profile/>
             {/* <FavoritesList/> */}
           </div>
        </BgRotate>
        </div>

    </div>
  )
}
