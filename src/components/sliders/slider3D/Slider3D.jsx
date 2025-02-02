
import   { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './slider3D.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';
import { supabase } from '../../../core/supabaseClient';
import { useDispatch } from 'react-redux';
import { fetchMovieSlideInfo } from '../../../redux/slice/SliderDataSlice';






export default function Slider3D() {

   
  
  const [slideData, setSlideData]= useState([]);
  

  const dispatch = useDispatch();
  

  const moviesSlider3dDataFetch = async() => {

    const {data, error} = await supabase.from('movies').select('*').eq('isSlide', true)

    if(!error){

      const transformedData = data.map((item, index )=> ({
        ...item,
        id: index + 1,
        genre: item.genre.split(",").map(genre => genre.trim()),
      }));
    
      setSlideData(transformedData);
      console.log('slideData', transformedData);

    } else {
      
      console.error('Error', error);
    }
  }
  

  useEffect(() => {
    moviesSlider3dDataFetch();
    // dispatch(fetchMovieSlideInfo(slideData[0]))
  },[])

  useEffect(() => {
    if (slideData.length > 0) {
      dispatch(fetchMovieSlideInfo(slideData[0])); 
    }
  }, [slideData]);
   
  return (
  <div className='w-full h-full'>

        <Swiper
     key={slideData.length}  
     onSlideChange={(event) => {
      
       const filterImage = [...slideData.filter((item)=>  item.id === (event.realIndex) + 1)]
        const CurrentImg = filterImage[0];
        if(CurrentImg){
          dispatch(fetchMovieSlideInfo(CurrentImg));
        }
        //  console.log("CurrentSlider", event.realIndex, "     CurrentSliderFetch" )
        //  console.log("CurrentSliderFetch", filterImage );
         
     }}
        
        className=" w-full h-full m-8 p-20"
        
        effect={'coverflow'}
        loop={true}
         grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
       
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 300,
          modifier: 1,
          // modifier: 1,
          slideShadows: false
        }}
        spaceBetween={-70}
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
              slidesPerView: 3,
              
            },
            1024: {
              slidesPerView: 3,
             
            },
          }}
          
          modules={[Autoplay, EffectCoverflow]}
          
          >
      {slideData?.map((movie) => (
        <SwiperSlide  className="swiper-3DSlider bg-center bg-cover w-full flex justify-center  items-center relative"  key={movie.id} >
          <img  className=" block  rounded-md " src={movie.pic} width={200} alt={movie.name}/>
        </SwiperSlide>
      ))}
    </Swiper>

      </div>
  )
}
