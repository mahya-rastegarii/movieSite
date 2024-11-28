
import { BiMenu } from "react-icons/bi";

import ChangeThemeButton from "../Button/ChangeThemeButton";
import Logo from "../Logo/Logo";

import {  Link, redirect, useNavigate } from "react-router-dom";
import { logOut } from "../../core/functions";
import Button from "../Button/Button";
import NavSearchBar from "../Search/NavSearchBar";

import { RiArrowDownSLine } from "react-icons/ri";

import MenuComponent from "../menu/MenuComponent";
import MenuItem from "../Button/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setSession } from "../../redux/slice/UserSlice";

// import {  RiArrowDownSLine } from "react-icons/ri";
// import MenuItem from "../Button/MenuItem";
// import MenuComponent from "../menu/MenuComponent";

export default function Navbar() {

  const navigate =useNavigate()
  const dispatch = useDispatch()
  const session = useSelector( (state) => state.user.session);
  const [isOpen, setIsOpen] = useState(false);
  
  const menuRef = useRef(null);

 
const LogoutUser = async() =>{
const result = await logOut();
if(result) {
  const url = new URL(window.location.href);
  
  dispatch(setSession(null))
   if(url.pathname === "/dashboard/profile" ||  url.pathname === " /dashboard/comments" || url.pathname === " /dashboard/favoriteList")
    navigate("/")
    else {
     navigate(url.pathname);
   }


}
else{
  console.log("Error")
}
setIsOpen(false)
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
    <div className=" w-full  z-30 bg-color-3 border-b border-color-1 overflow-x-hidden p-6 flex justify-between items-center ">
      <div className=" w-full px-2">
        <div className="lg:hidden flex justify-start items-center w-full">
          <button
        
           >
            <BiMenu className=" text-color-2 text-2xl" />
          </button>
          <NavSearchBar />
          <ChangeThemeButton />
        </div>

        <div className=" hidden lg:flex">
          <ul className=" flex    justify-start items-center space-x-3 text-sm text-md">
           
             {
              session ? (
              <div className=" flex flex-col   space-y-11" ref={menuRef}>
               <li className="w-28 ml-4">
                 {" "}
                 <Button
                   bgColor="bg-color-2"
                   width="w-full"
                   hover={"hover:bg-color-1"}
                   clicked ={ () => setIsOpen(!isOpen)}
                 >
                   {" "}
                   <RiArrowDownSLine className={`${isOpen ? "rotate-180 transform" : ""} h-5 w-5 text-color-1 inline ml-6 custom-transition`} />
                {
                 session.userName
                }
                 </Button>{" "}
               </li>{" "}
               <MenuComponent open={isOpen}>
                 <Link to="/dashboard/profile">
                   {" "}
                   <MenuItem borderType="border-t"
                    clicked ={ () => setIsOpen(false)}
                   >پنل کاربری</MenuItem>
                 </Link>
                
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
                :
             <>
                {" "}
                <li className="w-24  lg:ml-3">
                  <Link to="/signUp">
                    <Button bgColor="bg-color-2" width="w-full">
                      ثبت نام{" "}
                    </Button>
                  </Link>
                </li>
                <li className="w-24 ">
                  <Link to="/signIn">
                    <Button bgColor="bg-color-2" width="w-full">
                      ورود{" "}
                    </Button>
                  </Link>
                </li>
            
            

            <li>
              <div className=" lg:flex hidden">
                <ChangeThemeButton />
              </div>
            </li>
           </>
            }
          </ul>
        </div>
      </div>
      <div className="w-full px-2 flex justify-end items-center">
        <div className="ml-6 w-6/12 hidden lg:block">
          <NavSearchBar />
        </div>
        <Link to="/">
          {" "}
          <Logo size=" text-2xl md:text-3xl lg:text-4xl" />
        </Link>
      </div>
    </div>
  );
}
