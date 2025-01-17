import  {  useState } from 'react'
// import { CiEdit } from "react-icons/ci";
// import { MdOutlineAddAPhoto } from "react-icons/md";


import Button from '../../../components/Button/Button'
import { useForm } from 'react-hook-form';
import FormInput from '../../../components/input/formInput/FormInput'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../core/functions';
import { setSession } from '../../../redux/slice/UserSlice';
import { supabase } from '../../../core/supabaseClient';
import LoadingPage from '../../../components/Loading/LoadingPage';
// import { redirect } from 'react-router-dom';




export default function Profile() {
 
  const session = useSelector( ( state) => state.user.session);
  const dispatch = useDispatch()
  // const [visible, setVisible]= useState(false)
const [isChecked, setIsChecked] =useState(false)
  const { register, handleSubmit, formState: { errors }, reset} = useForm({
    defaultValues:{
      userName:  session?.userName,
      email:  session?.email,
      oldPass: '',
      newPass: ''
    }
  });
  
  const submitForm = async(data) => {
   const {userName, email, newPass, oldPass} = data;
   if(isChecked && oldPass !== session.password){
    alert("پسورد فعلی نادرست است");
   } else if(!isChecked || oldPass === session.password) {

     const {data: {user}, error: userError} = await supabase.auth.updateUser({
      email,
      password: newPass ? newPass : session.password
     })
     if(!userError){
      const {data: dataProfile, error:profileError} = await supabase.from('profile').update({userName, email, password:user.password}).eq("userId", user.id).select("*");
      if(profileError){
        console.error('Error fetching profile: ', profileError)
      } else {
        console.log('fetching profile: ', dataProfile)
        dispatch(setSession(dataProfile));
        console.log("session", session)
        }
     } else {
       console.log("Error", userError);
     }
   reset();
   }


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

<div className="w-full flex items-center justify-between"> <label htmlFor="userName">   نام کاربری :</label>  <div className='w-7/12 flex flex-col justify-center items-center'><FormInput  width='w-full' dir='ltr' type='text' id="userName"   label="userName"
register={register}
errors={errors.userName}
required=" نام کاربری الزامی است"/>
 {
       errors.userName && errors.userName.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'> {errors.userName?.message}</span></div>
      )
      }
</div></div>

  <div className="w-full flex items-center justify-between"> <label htmlFor="email"> ایمیل :</label>  <div className='w-7/12 flex flex-col justify-center items-center'><FormInput  width='w-full' dir='ltr'  type='email' id="email"   label="email"
register={register}
errors={errors.email}
required=" ایمیل الزامی است "/>
 {
       errors.email && errors.email.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'> {errors.email?.message}</span></div>
      )
      }
</div></div>

</div>


             
<hr className='w-full border-color-4'/>

   
{/* <div className="flex flex-col w-full lg:w-7/12  justify-center items-center my-16 space-y-4"> */}
<div  className="w-full  flex flex-col space-y-2">
  <div className="flex justify-start items-center"> <input type="checkbox" name="checkBoxPass" id="checkBoxPass" checked={isChecked} className='accent-color-1' onChange={() => setIsChecked(!isChecked)}/><label htmlFor='checkBoxPass' className='mr-2 font-semibold text-color-1'> تغییر رمزعبور</label></div>
       <div className={`w-full flex items-center justify-between  ${isChecked ? '' : "opacity-40"}`} > <label htmlFor="oldPass" >  رمز عبور فعلی :</label> <div className='w-7/12 flex flex-col justify-center items-center '><FormInput disable={!isChecked}  width='w-full' dir='ltr'  type='password' id="oldPass"   label="oldPass"
       name="oldPass"
register={register}
errors={errors.oldPass}
required={isChecked ? " لطفا رمزعبور فعلی خود را وارد کنید" : false}/>
 {
       errors.oldPass && errors.oldPass.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'> {errors.oldPass?.message}</span></div>
      )
      }
</div>
</div>
 
       <div className={`w-full flex items-center justify-between  ${isChecked ? '' : "opacity-40"}`}> <label htmlFor="newPass"> رمز عبور جدید :</label> <div className='w-7/12 flex flex-col justify-center items-center '><FormInput disable={!isChecked} width='w-full' name="newPass" type='password' dir='ltr' id="newPass"
        register={register}
         label="newPass"
         errors={errors.newPass}
         required={isChecked ? " لطفا روزعبور جدید را وارد کنید" : false}/>
       {
       errors.newPass && errors.newPass.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'> {errors.newPass?.message}</span></div>
      )
      }
       </div></div>
       <div className='w-full p-5'>

       </div>  
         <Button width='w-full' type="submit">

         ذخیره
         
         </Button>
       </div>
 {/* </div> */}

         
</form>
  
             
               
               
    </div>
  )
}
