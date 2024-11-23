import { useForm } from "react-hook-form";
import FormInput from "../../components/input/formInput/FormInput";
import Button from "../../components/Button/Button";
import BgRotate from "../../components/BackgroundRotate/BgRotate";
import { supabase } from "../../core/supabaseClient";


const ForgotPassword = () => {

  const { register, handleSubmit, formState: { errors },} = useForm();

  const submitForm = async(data) =>{
     const {email} = data;
    const {data : dataUpdata, error}= await supabase.auth.resetPasswordForEmail(email, {redirectTo: 'https://movie-site-topaz.vercel.app/updatePassword'})

    if(error) {
      console.log("forgotPasswordError", error)
    } else {
      console.log('ResetPass', dataUpdata);
    }
  }
  return (
    <div className='w-full flex justify-center items-center  px-4 md:px-0 h-screen'>




      <BgRotate padding='p-2' width=' md:w-8/12 w-full lg:w-4/12'>
     <form  className='w-full flex  flex-col justify-center items-center px-2 md:px-0' onSubmit={handleSubmit(submitForm)}>
     <div className="flex flex-col w-full lg:w-7/12  justify-center items-center mt-16 mb-6 space-y-4">

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

<Button width="w-full mt-6" type="submit"  >
بازنشانی رمزعبور
</Button>
</div>
</div>
     </form>
     </BgRotate>
   </div>
  )
}

export default ForgotPassword;