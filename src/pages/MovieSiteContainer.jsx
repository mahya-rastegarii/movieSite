import  { useState,useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import { Outlet } from 'react-router-dom';



const MovieSiteContainer = () => {
  
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
 
 <Outlet/>
   <Footer />
            {backToTop && <ScrollToTop />}
               </div>
  )
}

export default MovieSiteContainer