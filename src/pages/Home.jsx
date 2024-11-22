
import "./style/style.css";

import SimpleSlider from "../components/sliders/simple-slider/SimpleSlider";




import SideContainer from "../components/sideBar/SideContainer";
import Slider3D from "../components/sliders/slider3D/Slider3D";
import SliderContainer from "../components/sliders/slider3D/SliderContainer";
// import { Images } from "../fetch/slider3D-data";
import { useEffect, useState } from "react";
import { supabase } from "../core/supabaseClient";





export default function Home() {

  

 
  const [popularMovies, setPopularMovies] = useState();
  const [popularSerials, setPopularSerials] = useState();
  


  const slider = [
   // {
    //   delay: 2500,
    //   title: " جدیدترین فیلم ها",
    //   data: Images.slice(0, 10),

    // },
    // {
    //   delay: 2500,
    //   title: " جدیدترین سریال ها",
    //   data: Images.slice(0, 10),
    // },
    {
      delay: 2500,
      title: " محبوب ترین فیلم ها",
      data: popularMovies,
      

    },
    {
      delay: 2500,
      title: " محبوب ترین سریال ها",
      data: popularSerials,
    
    },
  ];

  
  const  popularMOviesData = async() => {

    const {data} = await supabase.from("movies").select("*").eq("type", "فیلم").gte('imdbRating', 7.5).limit(10)
   
   
  
    setPopularMovies(data);
  }

  const  popularSerialsData = async() => {
  
    const {data} = await supabase.from("movies").select().eq("type", "سریال").gte('imdbRating', 7.5).limit(10)
    
  
    setPopularSerials(data);
  }
  

  useEffect(() => {
    popularMOviesData();
    popularSerialsData();
  }, [])
 
 

  return (
    <>
    
        <div className=" w-full flex flex-col justify-center items-center">
         
      
        <SliderContainer >
        <Slider3D  />
      </SliderContainer>
      

          <SideContainer>
            {slider.map((slider, index) => (
              <SimpleSlider {...slider} key={index} />
            ))}
          </SideContainer>
        </div>
      
    </>
  );
}
