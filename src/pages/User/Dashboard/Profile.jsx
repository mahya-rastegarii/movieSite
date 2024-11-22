import  {  useState } from 'react'
import { CiEdit } from "react-icons/ci";
// import { MdOutlineAddAPhoto } from "react-icons/md";


import Button from '../../../components/Button/Button'
import { useForm } from 'react-hook-form';
import FormInput from '../../../components/input/formInput/FormInput'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../core/functions';
import { setSession } from '../../../redux/slice/UserSlice';
// import { redirect } from 'react-router-dom';
export default function Profile() {
 
  const session = useSelector( ( state) => state.user.session);
  const dispatch = useDispatch()
  // const [visible, setVisible]= useState(false)

  const { register, handleSubmit, formState: { errors }} = useForm();
  
  const submitForm = (data) => {
    console.log("FormData", data)
  }
  
  
  
  return (

    <div className=' flex flex-col justify-center py-4 items-center space-y-5 text-color-1'>
      {/* <div className="flex flex-col justify-center items-center space-y-4">

               
                
               </div> */}

<form onSubmit={handleSubmit(submitForm)} className='w-full flex flex-col justify-center items-center  md:p-3  px-4 md:px-6 py-2 pt-3 space-y-4'>
    <div className="w-full flex flex-col space-y-2">
               {/* <div className="flex justify-center items-center ">
               <span className="ml-5 font-bold "> نام کاربری : </span> <span className="ml-6"> {session?.userName}  </span>
                <CiEdit className=' inline hover:text-color-2'/>
               </div> */}

               {/* <div className="flex justify-center items-center ">
               <span className="ml-5 font-bold "> ایمیل : </span> <span className="ml-6"> {session?.email} </span>
                <CiEdit className='inline hover:text-color-2'/>
               </div> */}

<div className="w-full flex items-center justify-between"> <label htmlFor="oldPass">   نام کاربری :</label> <FormInput value={session?.userName} width='w-7/12'  type='text' id="oldPass"   label=" userName"
register={register}
errors={errors.userName}
required=" نام کاربری الزامی است"/></div>
  <div className="w-full flex items-center justify-between"> <label htmlFor="oldPass"> ایمیل :</label> <FormInput value={session?.email} width='w-7/12'  type='email' id="oldPass"   label=" email"
register={register}
errors={errors.email}
required=" ایمیل الزامی است "/></div>


</div>


             


   
{/* <div className="flex flex-col w-full lg:w-7/12  justify-center items-center my-16 space-y-4"> */}
<div  className="w-full  flex flex-col space-y-2">
       <div className="w-full flex items-center justify-between"> <label htmlFor="oldPass">  رمز عبور فعلی :</label> <FormInput  width='w-7/12'  type='password' id="oldPass"   label="password"
register={register}
errors={errors.password}
required=" رمز عبور الزامی است"/></div>
       <div className="w-full flex items-center justify-between"> <label htmlFor="newPass"> رمز عبور جدید :</label> <FormInput width='w-7/12'  type='password' id="newPass" register={register} label="password" 
        errors={errors.password}
required=" رمز عبور الزامی است"/></div>
       <div className='w-full p-5'>

       </div>  
         <Button width='w-full' >

         ذخیره
         
         </Button>
       </div>
 {/* </div> */}

         
</form>
  
             
               
               
    </div>
  )
}
