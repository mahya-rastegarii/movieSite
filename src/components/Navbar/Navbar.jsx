
import { BiMenu } from "react-icons/bi";

import ChangeThemeButton from "../Button/ChangeThemeButton";
import Logo from "../Logo/Logo";

import {  Link, NavLink } from "react-router-dom";
import Button from "../Button/Button";
import NavSearchBar from "../Search/NavSearchBar";

import { useDispatch, useSelector } from "react-redux";
import { setShowMenu } from "../../redux/slice/MenuSlice";
import LoginMenu from "../menu/LoginMenu";



export default function Navbar() {


  const dispatch = useDispatch()
  const session = useSelector( (state) => state.user.session);
 
  
 
  


  return (
    <div className=" w-full  z-30 bg-color-3 border-b border-color-1 overflow-x-hidden p-6 flex justify-between items-center ">
      <div className=" w-full px-2">
        <div className="lg:hidden flex justify-start items-center w-full">
          <button
          onClick={() => dispatch(setShowMenu(true))}
          >
            <BiMenu className=" text-color-2 text-2xl ml-3"/>
          </button>
         
          <ChangeThemeButton />
        </div>

        <div className=" hidden lg:flex">
          <ul className=" flex    justify-start items-center space-x-3 text-sm text-md">
           
             {
            session ? ( <LoginMenu response="lg"/> )
                : <>
                {" "}
                <li className="w-24  lg:ml-3">
                  <NavLink to="/signUp" >
                  {({isActive}) => (

                    <Button bgColor="bg-color-2" width="w-full" active={isActive}>
                      ثبت نام{" "}
                    </Button>
                  )}
                  </NavLink>
                </li>
                <li className="w-24 ">
                  <NavLink to="/signIn">
                  {({isActive}) => (
                    <Button bgColor="bg-color-2" width="w-full" active={isActive}>
                      ورود{" "}
                    </Button>
                  )}
                  </NavLink>
                </li>
            
            

           </>
            }
            <li>
              <div className=" md:flex hidden">
                <ChangeThemeButton />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full px-2 flex justify-end items-center">
        <div className="md:ml-6  md:w-9/12 lg:w-6/12 ">
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
