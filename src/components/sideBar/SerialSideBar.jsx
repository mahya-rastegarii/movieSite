
import { useEffect, useState } from "react";
// import { MoviesData } from "../../fetch/movies-data";
import { supabase } from "../../core/supabaseClient";
import { fetchMovieInfo } from "../../core/functions";
import { fetchMovie } from "../../redux/slice/MoviesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import ButtonLoading from "../Loading/ButtonLoading";


export default function SerialSideBar() {
 
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [serialList, setSerialList]= useState();
  const [loading, setLoading] =useState({
    allData:false,
    serialBtn: '',
  });
  

 
  const fetchUpdateSerialsData = async() =>{
    setLoading({
      ...loading,
      allData: true,
    });
    const {data} = await supabase.from('movies').select("*").eq("status", "در حال پخش");
    setSerialList(data);
    setLoading({
      ...loading,
      allData: false,
    })
}

const showSerial = async(name) => {
 
  setLoading({
    ...loading,
    serialBtn: name,
  })
  const result = await fetchMovieInfo(name)
  dispatch(fetchMovie(result));
  navigate(`/movie/${name}`)
  setLoading({
    ...loading,
    serialBtn: '',
  })
}

useEffect(() => {

 fetchUpdateSerialsData();
 
}, []) 

  return (

 
    <div className=" w-full flex flex-col justify-center shadow-md items-center bg-color-3 rounded-md p-3 space-y-4 font-semibold text-md h-full  text-color-1 lg:ml-2 ">
    
      <h3> سریال های به روز شده</h3>


      {
      loading.allData ? <div className=" mt-2"><LoadingPage/></div> : serialList?.map((serial) => (
        <div
          className={`w-full h-16 flex justify-center items-center rounded-md shadow-md p-2 bg-color-2  cursor-pointer hover:opacity-80 custom-transition ${ loading.serialBtn === serial.name && "opacity-80"}`}
          key={serial.id}
          onClick={() => showSerial(serial.name)}
        >

          <div className=" w-2/12 h-full ml-2">
            <img
              className=" w-full h-full object-cover   rounded-md"
              src={serial.pic}
              alt={serial.name}
            />
          </div>
          <div className=" w-10/12  font-semibold">
            <p className=" mb-2 "> {serial.name}</p>
            
          </div>
          {
          loading.serialBtn === serial.name && <ButtonLoading/>
          }
        </div>

      ))
      
    }
    </div>
  );
}
