
import { BiMenu } from "react-icons/bi";

import ChangeThemeButton from "../Button/ChangeThemeButton";
import Logo from "../Logo/Logo";

import { Link, NavLink } from "react-router-dom";

import Button from "../Button/Button";
import NavSearchBar from "../Search/NavSearchBar";


// import {  RiArrowDownSLine } from "react-icons/ri";
// import MenuItem from "../Button/MenuItem";
// import MenuComponent from "../menu/MenuComponent";

export default function Navbar() {
  
  
 

 


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
            
              {/* <div className=" flex flex-col   space-y-11 ">
                <li className="w-28 ml-4">
                  {" "}
                  <Button
                    bgColor="bg-color-2"
                    width="w-full"
                    hover={"hover:bg-color-1"}
                   
                  >
                    {" "}
                    <RiArrowDownSLine
                      className={`${isOpen ? "rotate-180 transform" : ""} h-5 w-5 text-color-1 inline ml-6 custom-transition`}
                    />
                   userName
                  </Button>{" "}
                </li>{" "}
                <MenuComponent open={isOpen}>
                  <Link to="/Dashboard">
                    {" "}
                    <MenuItem borderType="border-t">پنل کاربری</MenuItem>
                  </Link>
                  <Link onClick={() => dispatch(userLogout())}>
                  <MenuItem
                    borderType="border-t"
                    textColor="text-red-600"
                    rounded=" rounded-b-md"
                  >
                    خروج از حساب
                  </MenuItem>
                  </Link>
                </MenuComponent>
              </div>
           */}
              <>
                {" "}
                <li className="w-24  lg:ml-3">
                  <Link to="/Register">
                    <Button bgColor="bg-color-2" width="w-full">
                      ثبت نام{" "}
                    </Button>
                  </Link>
                </li>
                <li className="w-24 ">
                  <Link to="/Login">
                    <Button bgColor="bg-color-2" width="w-full">
                      ورود{" "}
                    </Button>
                  </Link>
                </li>
              </>
            

            <li>
              <div className=" lg:flex hidden">
                <ChangeThemeButton />
              </div>
            </li>
            <li>
              <Button
                btnType="link"
                width="w-full"
                margin="ml-8"
              
              >
                <NavLink
                  to="/list"
                  className={({ isActive }) =>
                    isActive ? "text-color-2" : "text-color-1"
                  }
                >
                  250 فیلم برتر IMDb
                </NavLink>
              </Button>
            </li>
            <li>
              <Button
                btnType="link"
                width="w-full"
                ml-8
                margin="ml-8"
               
              >
                <NavLink
                  to="/list"
                  className={({ isActive }) =>
                    isActive ? "text-color-2" : "text-color-1"
                  }
                >
                  250 سریال برتر IMDb
                </NavLink>
              </Button>
            </li>
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
