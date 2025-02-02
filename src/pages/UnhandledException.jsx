import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import { useEffect, useState } from "react";





const UnhandledException = () => {

  const [showBtn, setShowBtn] = useState(true)
  const redirectPageHandler = () => {
    const url = new URL(window.location.href);
    const urlPage = url.pathname;
    if(urlPage !== "/"){
      setShowBtn(true);
    } else {
      setShowBtn(false)
    }
  }

  useEffect(() => {
    redirectPageHandler();
  }, [])

const navigate = useNavigate(); 

  return (
   
     <div className='flex flex-col justify-center items-center font-extrabold w-full h-screen space-y-4'>
     <h1 className=' text-7xl text-color-2'>500</h1>
     <p className='text-xl font-semibold text-color-1'> امکان پردازش درخواست شما از سمت سرور وجود ندارد </p>
    {
      showBtn && <Button bgColor="bg-color-hover" clicked={() => navigate("/")}> بازگشت به صفحه اصلی </Button>
    } 

    
     </div>
  )
}

export default UnhandledException ;