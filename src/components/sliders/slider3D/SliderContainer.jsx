
import { useDispatch, useSelector } from "react-redux";

import HeaderBackdrop from "../../Backdrop/HeaderBackdrop";
import Button from "../../Button/Button";
import GenreLabel from "../../Label/GenreLabel";
import ImdbLabel from "../../Label/ImdbLabel";
// import { fetchMovieInfo } from "../../../core/functions";
import { fetchMovie } from "../../../redux/slice/MoviesSlice";
import { useNavigate } from "react-router-dom";
import { fetchMovieInfo } from "../../../core/functions";
import { useEffect, useState } from "react";
import LoadingPage from "../../Loading/LoadingPage";
// import { supabase } from "../../../core/supabaseClient";




const SliderContainer = ({ children }) => {


  const navigate = useNavigate()
  const dispatch = useDispatch();

  const movieSlideInfo = useSelector( (state) => state.slider.slider3D)
  
const [loading, setLoading]= useState(false);

const [error, setError]= useState(false);
const [data, setData] = useState([]);

  const movieInfoHandler = async(name) => {
    
    const result = await fetchMovieInfo(name);
     dispatch(fetchMovie(result))
     
    navigate(`/movie/${name}`);
  }



  useEffect( () => {
      setLoading(true);
    if(movieSlideInfo){

      setData(movieSlideInfo);
      setError(false)
    } else {
      
      setError(true)

    }

    setLoading(false);
    
  }, [loading, movieSlideInfo])

  return (
    <>
    {
      loading   && <LoadingPage/>
    }

    {
      !loading &&  (

        
    <HeaderBackdrop bg={data?.cover}>
      <div className="w-full md:w-8/12 lg:w-5/12 flex flex-col justify-center items-center mt-2 md:mt-0 lg:items-start z-10 space-y-4 lg:space-y-14 ">
        <h2 className="font-bold text-2xl text-white ">{data?.name}</h2>
        <div className="w-9/12 flex-col flex lg:flex-row justify-center lg:justify-start items-center  space-y-3 lg:space-y-0 lg:items-end ">
          <ImdbLabel score={data?.imdbRating} />

          <div className="hidden md:flex justify-between items-center  text-slate-300  ">
            {data?.genre?.map((genre, index) => (
              <GenreLabel borderColor="border-slate-300" key={index}>
                {genre}
              </GenreLabel>
            ))}
          </div>
        </div>
        <p className=" hidden lg:block  w-9/12  text-white ">
          {data?.summary}
        </p>
        <div className="w-5/12 md:w-2/12">
          <Button
            bgColor="bg-color-hover"
            width="w-full"
            clicked={() => movieInfoHandler(data.name)}
           
          >
            دانلود
           
          </Button>
        </div>
      </div>
      <div className=" w-full md:w-8/12 lg:w-5/12  flex justify-center items-center backdrop-blur-md  border shadow-sm border-white border-opacity-5 px-3 py-7 rounded-sm  z-10">
        {children}
      </div>
    </HeaderBackdrop>
      )
    }
    </>
  );
}

export default SliderContainer;
