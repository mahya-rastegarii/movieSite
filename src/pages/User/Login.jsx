

import { useForm } from 'react-hook-form';
import BgRotate from '../../components/BackgroundRotate/BgRotate';
import Button from '../../components/Button/Button';
import FormInput from '../../components/input/formInput/FormInput';
import { supabase } from '../../core/supabaseClient';
import { useDispatch } from 'react-redux';
import { setUserName } from '../../redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';


export default function Login() {

 const navigate = useNavigate();
const dispatch =useDispatch()
  
  const { register, handleSubmit, formState: { errors },} = useForm();

  

  const submitForm = async(data) =>{
    console.log("data", data)
    
    const {email, password}= data;

    const {data:{user}, error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if(error) {console.log("Error", error)}
  console.log("user", user)

    const {data: profile,error:profileError} = await supabase.from('profile').select("userName").eq("userId", user.id).single();

    if(profileError){
      console.error('Error fetching profile: ', profileError)} else {
        dispatch(setUserName(profile.userName))
        console.log(" User Loggerd in: ", user)
        navigate("/")
      }
  }
  
  return (
    <div className='w-full flex justify-center items-center  px-4 md:px-0 h-screen'>




      <BgRotate padding='p-2' width=' md:w-8/12 w-full lg:w-4/12'>

       <form  className='w-full flex justify-center items-center px-2 md:px-0' onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col w-full lg:w-7/12  justify-center items-center my-16 space-y-4">

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
      <FormInput 
      
        label="password"
        register={register}
        required= "رمز عبور الزامی است"
        
       

      errors={errors.password}

         type="password"  name="password" placeholder="رمز عبور"/>
      {errors.password && errors.password.type === "required" &&(
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>{errors.password?.message} </span></div>
       )
      }
      <div className="w-full flex justify-start items-center text-color-1 font-semibold">
           <input className=' ml-2' type="checkbox" name="check"
            // onChange={AuthForm.handleChange}
            //  checked={AuthForm.values.check}
              id="remember-me" />
    
            <label htmlFor="remember-me" className=' text-color-1 text-sm'>مرا به خاطر بسپار</label>
            </div>
            <div className="flex justify-center items-center w-full ">
        <Button width="w-full mt-6" type="submit"  >

         ورود   
        </Button>

       </div>
         </div>
      </form>
       </BgRotate>

    </div>
  )
}
