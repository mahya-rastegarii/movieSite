import  { useState,useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SidebarMenu from '../components/sideBar/SidebarMenu';

import { ToastContainer } from "react-toastify";




const MovieSiteContainer = () => {
  
  const menu = useSelector( (state) => state.menu.showMenu);

  const [backToTop, setBackToTop] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        const currentProgress = window.scrollY;
        if (currentProgress > 100) {
          setBackToTop(true);
        } else {
          setBackToTop(false);
        }
      });
    });


  

  return (
    <div className="w-full relative bg-color-4 dark:theme-dark custom-transition min-h-screen">
 <Navbar />
 
 <ToastContainer
        rtl={true}
      
        position="top-right"
      />
 <Outlet/>
   <Footer />

          
            {backToTop && <ScrollToTop />}
                 {
                  menu && <SidebarMenu/>
                 }
               </div>
  )
}

export default MovieSiteContainer