

import { useForm } from 'react-hook-form';
import BgRotate from '../../components/BackgroundRotate/BgRotate';
import Button from '../../components/Button/Button';
import FormInput from '../../components/input/formInput/FormInput';
import { supabase } from '../../core/supabaseClient';
import { useDispatch } from 'react-redux';
import { setSession } from '../../redux/slice/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ButtonLoading from '../../components/Loading/ButtonLoading';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';

export default function Login() {


  
  
  const navigate = useNavigate();
  const dispatch =useDispatch()
  
  const [loading, setLoading]= useState(false)
  const [hide, setHide] =useState(true);

  const { register, handleSubmit, formState: { errors }, setValue, watch} = useForm();

    const rememberMe = watch("rememberMe");
  

  const submitForm = async(data) =>{
    setLoading(true);
    
    console.log("data", data)
    const {email, password, rememberMe}= data;

      const toastId = toast.loading("در حال ورود...")
      
      try {
    const {data:{user}, error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
  
    if(error) {
      throw error;
    }

  console.log("user", user);

  const {data: profile} = await supabase.from('profile').select("userName").eq("userId", user.id).single();
     
        

          dispatch(setSession(profile))
  console.log(" User Loggerd in: ", user)
  navigate("/")


  toast.update(toastId, {
    render: `${profile.userName  || "کاربر عزیز"}  خوش آمدید !`,
    type: "success",
    isLoading: false,
    autoClose: 3000, 
  });
              
          

      if(rememberMe){
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

    } catch (err) {
      console.error("Error:", err);
  
     
      toast.update(toastId, {
        render: "ایمیل یا رمزعبور اشتباه است",
        type: "error",
        isLoading: false,
        autoClose: 5000, 
      });
  
    } finally {
      setLoading(false);
    }
  }
  
  

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      setValue("email", savedEmail || "");
      setValue("password", savedPassword || "");
      setValue("rememberMe", true);
    }
  }, [setValue]);

  return (
    
    <div className='w-full flex justify-center items-center px-4 md:px-0 h-screen'>

      

    <BgRotate padding='p-2' width=' md:w-8/12 w-full lg:w-4/12'>
       <form  className='w-full flex justify-center items-center px-2 md:px-0' onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col w-full lg:w-7/12  justify-center items-center mt-16 mb-6 space-y-4">

      {/* <FormInput
     
      label="userName"
      register={register}
      required="نام کاربری الزامی است"
     
      errors={errors.userName}
       type="text"  name='userName' placeholder='نام کاربری' />
      {
       errors.userName && errors.userName.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'> {errors.userName?.message}</span></div>
      )
      } */}
      <FormInput
     
      label="email"
      register={register}
      required=" ایمیل الزامی است"
     
      pattern= 
         { {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
             message: "قالب ایمیل صحیح نیست"
          }}
     
      errors={errors.email}
       type="email"  name='email' placeholder='ایمیل ' />
      {
       errors.email && errors.email.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'> {errors.email?.message}</span></div>
      )
      }
      {
       errors.email && errors.email.type === "pattern" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'> {errors.email?.message}</span></div>
      )
      }

      <div className=" w-full flex justify-center items-center">
     
      <FormInput 
      
        label="password"
        register={register}
        required= "رمز عبور الزامی است"
        
       

      errors={errors.password}

         type={hide ? "password" : "text"}  name="password" placeholder="رمز عبور"/>
          
      <div className="w-fit flex  mr-1 jistify-center items-center cursor-pointer text-color-1 relative opacity-80" onClick={()=> setHide(!hide)}>
     
       
        <FaEye />
        
        
      {
        hide && <span className="w-full border border-color-3 -rotate-45 absolute"></span> 
       
      }
       </div>
    
          </div>
      {errors.password && errors.password.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>{errors.password?.message} </span></div>
       )
      }
       <div className="w-full flex justify-start items-center text-color-1 font-semibold">

      <Link to="/forgotPassword" className="text-sm text-color-2 underline">
        رمز عبور خود را فراموش کرده اید؟
      </Link>
       </div>
      <div className="w-full flex justify-start items-center text-color-1 font-semibold">
           <input className='accent-color-1 ml-1' type="checkbox" name="rememberMe" 
                 {...register("rememberMe")}
          checked={rememberMe || false} 
              id="remember-me" />
    
            <label htmlFor="remember-me" className=' text-color-1 text-sm '>مرا به خاطر بسپار</label>
            </div>
            <div className="flex justify-center items-center w-full ">
        <Button width="w-full mt-6" type="submit" 
        disable={loading}
        >
         {
          loading ? <ButtonLoading/> : "ورود"
         }
            
        </Button>

       </div>
         </div>
      </form>
      <div className="w-full flex justify-center mb-2 items-center text-color-1 text-sm">

      <span > حساب کاربری ندارید ؟</span><Link to="/signUp"  className=' text-color-2 font-semibold mr-2  '> ثبت نام کنید</Link>
      </div>
       </BgRotate>

    </div>
  )
}
