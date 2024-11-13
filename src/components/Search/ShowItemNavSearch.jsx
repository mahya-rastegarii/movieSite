
import { fetchMovieInfo } from "../../core/functions";
import { fetchMovie } from "../../redux/slice/MoviesSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



const ShowItemNavSearch = ({ name, pic, imdbRating, genre, setSearchInput }) => {

  


  const navigate = useNavigate()
const dispatch = useDispatch();
  const movieInfoHandler = async() =>{

    const result = await fetchMovieInfo(name);
    
    dispatch(fetchMovie(result));
      navigate(`/movie/${name}`)
      setSearchInput("")
    }
 
  return (
    <div
      className=" text-white w-full p-3  border-b border-color-1 cursor-pointer hover:bg-color-4    flex  justify-between items-center "
      onClick={ movieInfoHandler}
    >

    <div className="w-7/12 p-1 text-center flex flex-col space-y-3">
      <span className=" font-bold">{name}</span>

      <span className=" text-sm">{genre?.join('،')}</span>
    </div>
    <div className="w-2/12">

      <img
        className=" rounded-md shadow-xl  "
        src={pic}
        width={65}
        
        alt="itemImage"
      />
    </div>

<h3 className=" w-3/12 text-center font-bold"><span className=" font-normal">{imdbRating}</span>/10</h3>
    

   

    </div>
  );
};

export default ShowItemNavSearch;
