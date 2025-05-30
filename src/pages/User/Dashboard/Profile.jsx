

import  { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux';
import { supabase } from '../../../core/supabaseClient';
import LoadingPage from '../../../components/Loading/LoadingPage';
import { MdAccessTime, MdDateRange } from 'react-icons/md';
import { toast } from 'react-toastify';




export default function Profile() {
 
  const [userInfo, setUserInfo] =useState({});
  const session = useSelector( ( state) => state.user.session);
  const [isLoading, setIsLoading]= useState(false);


  const getUserInfo = async() => {
 setIsLoading(true)
    const {data:{user} , error:errorUser} = await supabase.auth.getUser();
    if(errorUser) {
      toast.error("خطا در دریافت اطلاعات کاربر")
    } else {
    
      const [date, time] = user.last_sign_in_at.split("T");
      const [dateCreate, timeCreate] = user.created_at.split("T");

      const cleanTime = time.split(".")[0]
      const cleanTimeCreate = timeCreate.split(".")[0]


    
      setUserInfo({
        lastSign: {date, cleanTime},
        createAccunt: {dateCreate, cleanTimeCreate},
        email: user.email,
        userName: session?.userName
      })
    }
    setIsLoading(false)
    }
  useEffect(() => {

    getUserInfo();
  

  }, [session])
  


    
  
 

  return (

    <div className=' flex flex-col justify-center py-4 items-center space-y-5 text-color-1'>
    
       {
        isLoading ?  <LoadingPage/> :


              <>
    <div className="w-full flex flex-col  justify-center items-center space-y-2">

                <div className="w-full flex justify-between items-center  px-2 md:px-6">
               <span className=" font-bold "> نام کاربری : </span> 
              
                <span className=""> {userInfo?.userName}  </span>
               
               
               </div> 

               <div className="w-full flex justify-between items-center px-2 md:px-6">
               <span className=" font-bold "> ایمیل : </span> 
               
                <span className=""> {userInfo?.email} </span>
    
                
               </div> 

               
    </div>

    <hr className='w-full border-color-4'/>

    <div className="w-full flex flex-col justify-center items-center space-y-2">

    <div className="w-full flex justify-between items-center px-2 md:px-6">
               <span className=" font-bold "> تاریخ عضویت : </span> 
              
              <div className="flex justify-center items-center ">
               
                 <span className='ml-4 flex justify-center items-center '> {userInfo.lastSign?.cleanTime}  <MdAccessTime className='inline text-color-1 mr-1' /></span>
                <span className="flex justify-center items-center"> {userInfo.lastSign?.date} <MdDateRange className='inline text-color-1 mr-1' />  </span>
              </div>
              
               
               </div> 

               <div className="w-full flex justify-between items-center  px-2 md:px-6">
               <span className=" font-bold "> آخرین بازدید شما : </span> 
               
               <div className="flex justify-center items-center">
               
               <span className="ml-4 flex justify-center items-center "> {userInfo.createAccunt?.cleanTimeCreate} <MdAccessTime className='inline text-color-1 mr-1' /> </span>
              <span className="flex justify-center items-center"> {userInfo.createAccunt?.dateCreate} <MdDateRange className='inline text-color-1 mr-1' /></span> 
            </div>
               
               
                
               </div> 
    </div></>
    }
    </div>
  )
}
