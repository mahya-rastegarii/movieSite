
import   { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './slider3D.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import { Images } from '../../../fetch/slider3D-data';
import { useEffect, useState } from 'react';
import { supabase } from '../../../core/supabaseClient';
import { useDispatch } from 'react-redux';
import { fetchMovieSlideInfo } from '../../../redux/slice/SliderDataSlice';






export default function Slider3D() {

   
  const [slideData, setSlideData]= useState([]);


  const dispatch = useDispatch();
 
  
  
  
  useEffect(() => {

    async function moviesSlider3dDataFetch () {
  
      const {data} = await supabase.from('movies').select("*").eq('isSlide', true)
     
      
     
      
      console.log('slideData', data);
      setSlideData(data);
    }
    moviesSlider3dDataFetch();
  },[])



   
  return (
  <div className='w-full h-full'>

        <Swiper

     onSlideChange={(event) => {
      
       const filterImage = [...slideData.filter((item, index)=> index === event.realIndex)]
        const CurrentImg = filterImage[0];
       // console.log("CurrentSlider", event.realIndex, "     CurrentSliderFetch" )
       // console.log("CurrentSliderFetch", filterImage )
      
          dispatch(fetchMovieSlideInfo(CurrentImg));
         
     }}
        
        className=" w-full h-full m-8 p-20"
        
        effect={'coverflow'}
        loop={true}
        centeredSlides={true}
        slidesPerView={3}
        // loopAdditionalSlides={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 4,
          // slideShadows: true
        }}
        
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        //  pagination={{ el: '.swiper-pagination', clickable: true }}
        //  navigation={{
          //    nextEl: '.swiper-button-next',
          //    prevEl: '.swiper-button-prev',
          //    clickable: true,
          //  }}

          breakpoints={{
            640: {
              slidesPerView: 1,
            
              
            },
            768: {
              slidesPerView: 2,
              
            },
            1024: {
              slidesPerView: 3,
             
            },
          }}
          
          modules={[Autoplay, EffectCoverflow]}
          
          >
      {slideData?.map((img) => (
        <SwiperSlide className="swiper-3DSlider bg-center bg-cover w-full flex justify-center  items-center relative"  key={img.id} >
          <img className=" block w-full h-full  rounded-md " src={img.pic}   alt={img.name}/>
        </SwiperSlide>
      ))}
    </Swiper>

      </div>
  )
}
