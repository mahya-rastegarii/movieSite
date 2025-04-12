import { useForm } from "react-hook-form";
import BgRotate from "../components/BackgroundRotate/BgRotate";
import FormInput from "../components/input/formInput/FormInput";
import Button from "../components/Button/Button";
import { supabase } from "../core/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonLoading from "../components/Loading/ButtonLoading";
import { setSession } from "../redux/slice/UserSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../core/functions";
import { setShowMenu } from "../redux/slice/MenuSlice";



const UpdatePassword = () => {



  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loading, setLoading] =useState(false)

  const { register, handleSubmit, watch, formState: { errors }} = useForm();


  const submitForm = async(data) =>{
    setLoading(true)
    const {password} = data;

    const toastId = toast.loading("در حال به‌روزرسانی رمز عبور...")
  try{

    const {data:{user}, error}= await supabase.auth.updateUser({password});
    if(error) throw error;
  
    
  
    navigate("/signIn")
    const { error: profileError } = await supabase
  .from("profile")
  .update({ password }) 
  .eq("userId", user.id); 

   if(profileError) throw error

    toast.update(toastId, {
      render: `تغییر رمزعبور با موفقیت انجام شد`,
      type: "success",
      isLoading: false,
      autoClose: 3000, 
    });

  }catch (err) {
    console.error("Error:", err);

   
    toast.update(toastId, {
      render: "مشکلی یه وجود آمده، لطفا دوباره امتحان کنید",
      type: "error",
      isLoading: false,
      autoClose: 5000, 
    });

  } finally {
    setLoading(false);
  }
  }

useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");

    if (accessToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: "",
      });
    }
  }, []);
  

  useEffect( () => {
    const logoutUser = async() =>{
      const result = await logOut();
      if(result) {
        dispatch(setSession(null))
       dispatch(setShowMenu(false))
        
      }
     
      } 

      logoutUser();
  }, [])



  

  return (
   
    <div className='w-full flex justify-center items-center px-4 md:px-0 h-screen'>

      

       <BgRotate padding='p-2' width=' md:w-8/12 w-full lg:w-4/12'>
       <form  className='w-full flex justify-center items-center px-2 md:px-0'  onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col w-full lg:w-7/12  justify-center items-center mt-16 mb-6 space-y-4">
          
        <FormInput
        
          label="password"
          register={register}
          required="رمز عبور الزامی است"
         
          errors={errors.password}
            type="password" name="password" placeholder="رمزعبور جدید"/>
        
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

           type="password" name='confirmPassword' placeholder="تکرار مرزعبور جدید"/>
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
        <Button width="w-full mt-6" type="submit"  disable={loading}>

{
   loading ? <ButtonLoading/> : "به روزرسانی رمز عبور"
}
       
        </Button>

       </div>
           </div>
           </form>
           </BgRotate>
           </div>
  )
}

export default UpdatePassword;