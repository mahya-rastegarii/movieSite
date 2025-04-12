

import { useForm } from 'react-hook-form';

import BgRotate from '../../components/BackgroundRotate/BgRotate';
import Button from '../../components/Button/Button';
import FormInput from '../../components/input/formInput/FormInput';
import { supabase } from '../../core/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';





export default function Register() {


  const { register, handleSubmit, watch, formState: { errors }} = useForm();
 const navigate = useNavigate();

 const [loading, setLoading]= useState(false)


 const submitForm = async(data) =>{
  setLoading(true);
  
  const {userName, email, password}= data;

  const toastId = toast.loading("درحال ثبت نام ...")

  try{

    const { data: existingUser} = await supabase
    .from('profile')
    .select('email')
    .eq('email', email)
    .single();
  
  if (existingUser) {
    throw new Error("این ایمیل قبلاً ثبت شده است.");
  }
  
  const {data: {user}, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
   
    if (error.message.includes("invalid")) {
      throw new Error("لطفاً یک ایمیل معتبر وارد کنید.");
    }


    throw new Error("مشکلی در ثبت‌ نام پیش آمد. لطفاً دوباره تلاش کنید.");
  }

 

    const {error:profileError } = await supabase.from("profile")
    .insert({userId:user.id, userName, email, password});

    if (profileError) {
      throw new Error("خطا در ذخیره اطلاعات کاربر.");
    }else {

      navigate("/signIn");
      toast.update(toastId, {
        render: "لینک تایید ایمیل برای شما ارسال شد",
        type: "success",
        isLoading: false,
        autoClose: 3000, 
      });
      
    }
   

  
}   catch (err) {
  toast.update(toastId, {
    render: err.message,
    type: "error",
    isLoading: false,
    autoClose: 5000, 
  });

} finally {
  setLoading(false);
}
}
  
 
  return (
   
    <div className='w-full flex justify-center items-center px-4 md:px-0 h-screen'>

      

       <BgRotate padding='p-2' width=' md:w-8/12 w-full lg:w-4/12'>
       <form  className='w-full flex justify-center items-center px-2 md:px-0'  onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col w-full lg:w-7/12  justify-center items-center mt-16 mb-6 space-y-4">
          
           
        <FormInput
       
          label="userName"
          register={register}
          required="نام کاربری الزامی است"
          
          errors={errors.userName}
             type="text" name="userName" placeholder="نام کاربری"/>
        {
       errors.userName && errors.userName.type === "required" &&(
         <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'> {errors.userName?.message}</span></div>
       )
       }
        <FormInput
       
          label="email"
          register={register}
          required="ایمیل الزامی است"
          pattern= 
         { {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
             message: "قالب ایمیل صحیح نیست"}}
          errors={errors.email}
            type="email" name='email' placeholder="ایمیل"/>
       
        {errors.email && errors.email.type === "required" &&(
         <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>{errors.email?.message}</span></div>
        )
      }
        {errors.email && errors.email.type === "pattern" &&(
         <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>{errors.email?.message}</span></div>
        )
      }
        <FormInput
       
          label="password"
          register={register}
          required="رمز عبور الزامی است"
         
          errors={errors.password}
            type="password" name="password" placeholder="رمز عبور"/>
        
       {errors.password && errors.password.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>{errors.password?.message} </span></div>
       )
      }
        <FormInput
       
          label="confirmPassword"
          register={register}
          required="تکرار رمز عبور الزامی است"
          validate= { value => {
              if(watch("password") !== value) {
               return "عدم تطابق با رمزعبور وارد شده"
              }}
            }
          
         
          errors={errors.confirmPassword}

           type="password" name='confirmPassword' placeholder="تکرار رمز عبور"/>
        {errors.confirmPassword && errors.confirmPassword.type === "required" &&( 
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>{errors.confirmPassword?.message} </span></div>
        )
      }

      {
        errors.confirmPassword && 
        errors.confirmPassword.type === "validate" && (
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>{errors.confirmPassword?.message} </span></div>
        )
      }
       
       <div className="flex justify-center items-center w-full ">
        <Button width="w-full mt-6" type="submit"
        disable={loading} >


            ثبت نام

        </Button>

       </div>
            </div>
      </form>
      <div className="w-full flex justify-center mb-2 items-center text-color-1 text-sm">

<span > حساب کاربری دارید ؟</span><Link to="/signIn"  className=' text-color-2 font-semibold mr-2  '> وارد شوید</Link>
</div>
       </BgRotate>
    </div>
  )
}
