import  { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../core/functions';
import { setSession } from '../../redux/slice/UserSlice';
import { toast } from 'react-toastify';
import Button from '../Button/Button';
import { RiArrowDownSLine } from 'react-icons/ri';
import MenuComponent from './MenuComponent';
import MenuItem from '../Button/MenuItem';
import { setShowMenu } from '../../redux/slice/MenuSlice';

const LoginMenu = ({response}) => {

    const dispatch = useDispatch()
  const session = useSelector( (state) => state.user.session);

    const [isOpen, setIsOpen] = useState(false);
  
    const menuRef = useRef(null);

  const LogoutUser = async() =>{
  
    
  const result = await logOut();
  if(result) {
    dispatch(setSession(null))
    dispatch(setShowMenu(false))
    
  
  
  }
  else{
   toast.error("لطفا مجددا تلاش کنید")
   
  }
  setIsOpen(false)
  } 

  const goToDashboard = () => {
   
    setIsOpen(false);
  }

  
    const handleClickOutside = (e) =>{
        if(menuRef.current && !menuRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }
        useEffect(() => {
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          }
        }, [])
  return (
    <div className=" flex flex-col  justify-center items-center lg:space-y-11" ref={menuRef}>
    <li className="w-full lg:w-fit lg:ml-4">
      {" "}
      <Button
        bgColor="bg-color-2"
        width="w-full"
        notRounded={response === "sm"}
        hover={"hover:bg-color-1"}
        clicked ={() => setIsOpen(!isOpen)}
      >
        {" "}
        <RiArrowDownSLine className={`${isOpen ? "rotate-180 transform" : ""} h-5 w-5 text-color-1 inline ml-6 custom-transition`} />
     {
      session?.userName
     }
      </Button>{" "}
    </li>{" "}
    <MenuComponent open={isOpen}>
     
        <MenuItem borderType="border-t"
         clicked ={goToDashboard}
         link="/dashboard/profile"
        >پنل کاربری</MenuItem>
     
     
      <MenuItem
        borderType="border-t"
        textColor="text-red-600"
        rounded=" rounded-b-md"
        clicked={LogoutUser}
      >
        خروج از حساب
      </MenuItem>
     
    </MenuComponent>
  </div>
  )
}

export default LoginMenu