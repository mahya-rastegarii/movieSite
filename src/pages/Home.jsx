
import "./style/style.css";

import SimpleSlider from "../components/sliders/simple-slider/SimpleSlider";




import SideContainer from "../components/sideBar/SideContainer";
import Slider3D from "../components/sliders/slider3D/Slider3D";
import SliderContainer from "../components/sliders/slider3D/SliderContainer";
import { Images } from "../fetch/slider3D-data";
import { useState } from "react";




export default function Home() {

  

 

  


  const slider = [
    {
      delay: 2500,
      title: " جدیدترین فیلم ها",
      // data: newMovie,
      data: Images.slice(0, 10),

    },
    {
      delay: 2500,
      title: " جدیدترین سریال ها",
      // data: NewSerial,
      data: Images.slice(0, 10),
    },
    // {
    //   delay: 2700,
    //   title: "محبوب ترین فیلم ها",
    //   data: PopularMovie.slice(0, 10),
    // },
    // {
    //   delay: 3000,

    //   title: "محبوب ترین سریال ها",
    //   data: PopularSerial.slice(0, 10),
    // },
  ];

  const [movieInfo, setMovieInfo]= useState([Images[0]]);

 
 

  return (
    <>
    
        <div className=" w-full flex flex-col justify-center items-center">
         
        <SliderContainer movieInfo={movieInfo}>
        <Slider3D setMovieInfo={setMovieInfo} />
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
