
import { fetchMovieInfo } from "../../core/functions";
import { fetchMovie } from "../../redux/slice/MoviesSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";



const ShowItemNavSearch = ({ name, pic, imdbRating, genre, setSearchInput, setInputShow }) => {

  


  const navigate = useNavigate()
const dispatch = useDispatch();
  const movieInfoHandler = async() =>{

    const result = await fetchMovieInfo(name);
    
    dispatch(fetchMovie(result));
      navigate(`/movie/${name}`)
      setSearchInput("")
      setInputShow(false)
    }
 
  return (
    <div
      className=" text-white w-full p-3  border-b border-color-1 cursor-pointer hover:bg-color-4    flex  justify-between items-center "
      onClick={ movieInfoHandler}
    >

    <div className="w-7/12 p-1 text-center flex flex-col space-y-3">
      <span className=" font-bold">{name}</span>

      <span className=" text-sm">{genre?.slice(0, 2).join('،')}</span>
    </div>
    <div className="w-2/12">

      <img
        className=" rounded-md shadow-xl w-full "
        src={pic}
        alt="itemImage"
      />
    </div>

<div className=" w-2/12 flex flex-col justify-center items-center text-center font-bold">
<FaStar className=" text-color-2"/>
<span className=" font-normal">{imdbRating}</span>
</div>
    

   

    </div>
  );
};

export default ShowItemNavSearch;
