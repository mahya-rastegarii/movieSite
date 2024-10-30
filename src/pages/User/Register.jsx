

import BgRotate from '../../components/BackgroundRotate/BgRotate';
import Button from '../../components/Button/Button';
import FormInput from '../../components/input/formInput/FormInput';




export default function Register() {






  

  
 
  return (
   
    <div className='w-full flex justify-center items-center px-4 md:px-0 h-screen'>

      

       <BgRotate padding='p-2' width=' md:w-8/12 w-full lg:w-4/12'>
       <form  className='w-full flex justify-center items-center px-2 md:px-0'>
        <div className="flex flex-col w-full lg:w-7/12  justify-center items-center my-16 space-y-4">
          
           
        <FormInput
        //  onChange={AuthForm.handleChange}
          // onBlur={AuthForm.handleBlur}
          //  value={AuthForm.values.userName}
             type="text" name="userName" placeholder="نام کاربری"/>
        {
        // AuthForm.errors.userName && AuthForm.touched.userName &&
         <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>Text</span></div>
       }
        <FormInput
        //  onChange={AuthForm.handleChange} 
        //  onBlur={AuthForm.handleBlur}
          // value={AuthForm.values.email}
            type="email" name='email' placeholder="ایمیل"/>
        {
        // AuthForm.errors.email && AuthForm.touched.email &&
         <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>Text</span></div>
      }
        <FormInput
        //  onChange={AuthForm.handleChange}
          // onBlur={AuthForm.handleBlur} 
          // value={AuthForm.values.password}
            type="password" name="password" placeholder="رمز عبور"/>
        {
        // AuthForm.errors.password && AuthForm.touched.password && 
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>Text </span></div>
      }
        <FormInput
        //  onChange={AuthForm.handleChange} 
        //  onBlur={AuthForm.handleBlur}
          // value={AuthForm.values.confirmPassword} 
           type="password" name='confirmPassword' placeholder="تکرار رمز عبور"/>
        {
        // AuthForm.errors.confirmPassword && AuthForm.touched.confirmPassword && 
        <div className="w-full flex justify-start items-center"><span className=' text-red-500 text-sm'>Text </span></div>
      }
       
       <div className="flex justify-center items-center w-full ">
        <Button width="w-full mt-6" type="submit" clicked={Register}>

          ثبت نام
        </Button>

       </div>
            </div>
      </form>
        {/* <button className=' bg-color-4 p-2 rounded-md w-full text-color-1 text-lg '> ثبت نام </button> */}
       </BgRotate>
    </div>
  )
}
