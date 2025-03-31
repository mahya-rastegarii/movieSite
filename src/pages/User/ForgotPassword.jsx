import { useForm } from "react-hook-form";
import FormInput from "../../components/input/formInput/FormInput";
import Button from "../../components/Button/Button";
import BgRotate from "../../components/BackgroundRotate/BgRotate";
import { supabase } from "../../core/supabaseClient";
import { useState } from "react";
import { toast } from "react-toastify";


const ForgotPassword = () => {

  const [loading, setLoading]= useState(false);
  const { register, handleSubmit, formState: { errors },} = useForm();

  const submitForm = async(data) =>{
     const {email} = data;

     setLoading(true)
    const { error}= await supabase.auth.resetPasswordForEmail(email, {redirectTo: 'https://movie-site-topaz.vercel.app/updatePassword'})

    if(error) {
      toast.error("مشکلی یه وجود آمده، لطفا دوباره امتحان کنید")
    } 

    setLoading(false);
  }
  return (
    <div className='w-full flex justify-center items-center  px-4 md:px-0 h-screen'>




      <BgRotate padding='p-2' width=' md:w-8/12 w-full lg:w-4/12'>
     <form  className='w-full flex  flex-col justify-center items-center px-2 md:px-0' onSubmit={handleSubmit(submitForm)}>
     <div className="flex flex-col w-full lg:w-7/12  justify-center items-center mt-16 mb-6 space-y-2">

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
 
       <div className="flex justify-center items-center w-full ">

<Button width="w-full mt-6" type="submit"   disable={loading} >
بازنشانی رمزعبور
</Button>

</div>
<ul className=" mr-4 font-thin text-sm text-color-1  space-y-1">
    <li><span className=" text-red-500">*</span> ایمیل معتبر وارد کنید</li>
    <li><span className=" text-red-500">*</span> روی اینک ارسال شده از طریق ایمیل کلیک کنید تا وارد صفحه بروزرسانی رمزعبور شوید </li>
   </ul>
</div>
     </form>
     </BgRotate>
   </div>
  )
}

export default ForgotPassword;