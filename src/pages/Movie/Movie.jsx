import { BsGlobe } from "react-icons/bs";



import { FaRegCommentDots } from "react-icons/fa";
import { GrStatusUnknown } from "react-icons/gr";
import { MdOutlineDateRange, MdOutlineTimer } from "react-icons/md";
import { PiTelevisionLight } from "react-icons/pi";
import { RiUserLine } from "react-icons/ri";


import HeaderBackdrop from "../../components/Backdrop/HeaderBackdrop";
import BgRotate from "../../components/BackgroundRotate/BgRotate";
import Button from "../../components/Button/Button";
import DisclosureWrapper from "../../components/Disclosure/Disclosure";
import GenreLabel from "../../components/Label/GenreLabel";
import ImdbLabel from "../../components/Label/ImdbLabel";

import CommentBox from "../../components/box/CommentBox";
import DownloadBox from "../../components/box/DownloadBox";
// import { Images } from "../../fetch/slider3D-data";
// import { Comments } from "../../fetch/comments";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../core/supabaseClient";
import { useEffect, useState } from "react";
// import { LiaKeySolid } from "react-icons/lia";
import { FiHeart } from "react-icons/fi";

import {  useNavigate } from "react-router-dom";
import LoadingPage from "../../components/Loading/LoadingPage";
import MovieLoading from "../../components/Loading/MovieLoading";
import { toast } from "react-toastify";


export default function Movie() {
 


  const movieData = useSelector( state => state.movies.movieData);
  const session = useSelector( state => state.user.session);
 
  


  
  const [likeMovie, setLikeMovie]= useState(false);
  // const [favoriteMovies, setFavoriteMovies]= useState([])
 const [movie, setMovie] =useState({
  loading:false,
  data: [],
 })
  const [newComments, setNewComments]= useState({
    loading:false,
    comments:[],
  });
 
 const [commentText, setCommentText]= useState("");

//  const [userComments, setUserComments]= useState([]);
 
 const navigate = useNavigate();
 
//  const url = new URL(window.location.href)
// console.log("MovieName", (url.pathname).slice(7).replace(/%20/g, " "))

  const fetchComments = async() => {

    const { data} = await supabase.from('comments').select("*").eq("movieName", movieData[0].name)
    setNewComments({
      ...newComments,
      comments: data
    })
    console.log("data", data)
  }

  const getUserComments = async() => {
    const { data: comment, error: fetchError } = await supabase
    .from('profile')
    .select('comments')
    .eq('userId', session.userId)
    .single()
   
 
  if (fetchError) {
    console.error("Error fetching user:", fetchError.message);
    return null;
  }
  return comment;

  }

  const addUserComments = async(id) => {
   
    const newComment = {
      id,
      movieName:movieData[0].name,
      comment: commentText
      
    }

    const comment =await getUserComments();
 
    if(comment){


      const updatedComments= Array.isArray(comment.comments) ? [...comment.comments, newComment] : [newComment];
  
      
           
            
    
       const {error } = await supabase.from("profile").update({comments: updatedComments }).eq("userId", session.userId)
                if(!error)
                  console.log("success  Update Data")
                  else console.error("Error",error)
  }

}


  const addNewComment = async() => {

    
    if(session) {
      
      
      setNewComments({
      ...newComments,
      loading: true
    })
    
    const toastId = toast.loading("در حال ثبت کامنت...")
    
    try{

      const {data, error} = await supabase.from('comments').insert({ userName:session.userName,
        pic:null,
        movieName:movieData[0].name,
        comment: commentText,
        disLike:0,
        like:0
      }).select("id");
      if(error){
        throw error;
        
      } else {
        const commentId = data[0].id
        fetchComments();
        addUserComments(commentId)

        toast.update(toastId, {
          render: "کامنت شما ثبت شد",
          type: "success",
          isLoading: false,
          autoClose: 3000, 
        });
      } 
    } catch (err) {
      console.error("Error:", err);
    
     
      toast.update(toastId, {
        render:  "کامنت ثبت نشد. لطفا مجددا تلاش کنید",
        type: "error",
        isLoading: false,
        autoClose: 5000, 
      });
    } finally {

      setCommentText('')
      setNewComments({
       ...newComments,
       loading:false
     })
    }
    
      
        
    
    } else  navigate("/signIn")

  };
  

  const getFavoriteMoves = async() => {
    const { data: user, error: fetchError } = await supabase
    .from('profile')
    .select('movies')
    .eq('userId', session.userId)
    .single()
   
 
  if (fetchError) {
   toast.error(fetchError.message);
    return null;
  }
  return user

  }

  const fechFavoriteMovie = async(name, pic) => {
  

    if(session){

      if(likeMovie) return;
          
      
        const newMovie = {name, pic};
      
    const favoriteMoves =await getFavoriteMoves();
      const toastId = toast.loading( " در حال افرودن به لیست مورد علاقه ها")
        
    if(favoriteMoves){

      const updatedMovies = Array.isArray(favoriteMoves.movies) ? [...favoriteMoves.movies, newMovie] : [newMovie];
  
      
      
      
      try {
    
       const {error} =await  supabase.from("profile").update({movies: updatedMovies }).eq("userId", session.userId)
             
       if(error){
         throw error

       } else {

        setLikeMovie(true)

        toast.update(toastId, {
          render: "به لیست مورد علاقه هااضافه شد",
          type: "success",
          isLoading: false,
          autoClose: 3000, 
        });
       }
      } catch (err) {
        console.error("Error:", err);
    
       
        toast.update(toastId, {
          render: "فیلم به لیست موردعلاقه هااضافه نشد. مجددا تلاش کنید",
          type: "error",
          isLoading: false,
          autoClose: 5000, 
        });   
      }
    } 
   
      
    }  else {
      navigate("/signIn")
    }
  }
  useEffect(() => {
    window.scrollTo(top);

   
  }, []);

 

  const LoadData = () => {
    setMovie({
      ...movie,
      loading:true,
    })
    if(movieData){
      setMovie({
        data: movieData,
        loading:false,
      })
    }
  }

  useEffect(() => {
  LoadData();
  },[movieData])
 


  useEffect(() => {
    fetchComments();
    

  }, [])


  useEffect(() => {
    const checkIfMovieIsFavorite = async () => {
      if (!session) return;
  
      const { data: user, error } = await supabase
        .from("profile")
        .select("movies")
        .eq("userId", session.userId)
        .single();
  
      if (error) {
        toast.error("خطا در دریافت لیست علاقه‌مندی‌ها");
        return;
      }
  
      if (user?.movies) {

        const isFavorite = user.movies.some((favoriteMovie) => favoriteMovie.name === movie.data[0].name);
        console.log("isFavorite", isFavorite)
        console.log("users", user.movies)
        setLikeMovie(isFavorite);
      }
    };
  
    checkIfMovieIsFavorite();
  }, [session, movie]);

  return (
    <>
        <div className=" flex flex-col justify-center items-center mb-16 space-y-20 min-h-screen">
          {

     movie.loading ?
     (
        <div className=" w-full flex mt-2 justify-center items-start min-h-screen">
          <MovieLoading />
        </div>
      ) : movie.data?.map((movie) => (
            <>
          

          <HeaderBackdrop key={movie.id} bg={movie?.cover}>
            <div className=" w-full z-10 lg:p-10 flex lg:flex-row  flex-col justify-center items-center p-4 ">
              <div className=" mx-3 w-full lg:w-3/12 flex mt-16 md:mt-0 justify-center lg:justify-end items-center">
                <img
                  className="rounded-2xl shadow-gray-900 shadow-2xl w-44 md:w-80 "
                  src={movie?.pic}
                  alt={movie?.name}
                />
              </div>
              <div className=" mx-3 flex md:w-7/12 flex-col lg:justify-start justify-center items-start text-white font-semibold space-y-4 ">
                <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row w-full justify-center lg:justify-between items-center">
                  <h4 className=" font-bold text-white text-xl md:text-2xl">
                   {movie?.type}   {movie?.name}
                  </h4>

                  {/* <div className=' flex flex-col justify-center  items-center '>
                <div className=' flex justify-center items-center'>
                <span className='  text-white font-semibold text-sm '>10/</span>
                <span className=' font-bold text-color-2 text-lg'>7.1</span>
                </div>
                <span className=' bg-color-hover shadow-md px-2 rounded-md font-bold text-white text-md'> IMDb </span>
             
              </div> */}
<div className=" flex justify-center items-center flex-row lg:flex-col space-y-4">

                  <ImdbLabel score={movie?.imdbRating} />
                  <FiHeart className={`text-2xl text-red-700 cursor-pointer hover:fill-red-700 ${likeMovie ? "fill-red-700" : ""}`}  onClick={() =>fechFavoriteMovie(movie.name, movie.pic)}/>
</div>
                </div>
                <div className="flex  w-full flex-col text-white  justify-center lg:justify-start lg:items-start items-center space-y-4 ">
                  <div className="w-fit   gap-y-3 flex justify-around items-center flex-wrap lg:justify-center text-slate-300">
                    {movie?.genre?.map((genre, index) => (
                      <GenreLabel borderColor="border-slate-300" key={index}>
                        {genre}
                      </GenreLabel>
                    ))}
                  </div>
                  <div className="w-3/5 lg:w-full flex lg:flex-col lg:justify-start justify-center lg:space-y-5 items-center">
                    <div className="w-full flex   md:justify-start justify-center items-center">
                      <MdOutlineTimer className=" inline ml-2 text-xl text-color-2 " />
                      <span className=" ">زمان : {movie?.time} دقیقه</span>
                    </div>
                  </div>
                  <div className="w-3/5 lg:w-full flex justify-start flex-col  space-y-5 items-center">
                    {movie?.year ? (
                      <div className="w-full flex  md:justify-start justify-center items-center">
                        <MdOutlineDateRange className=" inline ml-2 text-xl text-color-2" />
                        <span className=" ">
                          {" "}
                          سال انتشار : {movie?.year}
                        </span>
                      </div>
                    ) : movie?.status ? (
                      <div className="w-full flex  md:justify-start justify-center  items-center">
                        <GrStatusUnknown className=" inline ml-2 text-xl text-color-2" />
                        <span className=" ">
                          {" "}
                          وضعیت پخش : {movie?.status}
                        </span>
                      </div>
                    ) : null}
                    {movie?.director ? (
                      <div className="w-full flex  md:justify-start justify-center items-center">
                        <RiUserLine className=" inline ml-2 text-xl text-color-2  lg:mr-0" />
                        <span className=" ">
                          کارگردان : {movie?.director}
                        </span>
                      </div>
                    ) : movie?.tv ? (
                      <div className="w-full flex  md:justify-start justify-center  items-center">
                        <PiTelevisionLight className=" inline ml-2 text-xl text-color-2  lg:mr-0" />
                        <span className=" "> شبکه : {movie?.tv}</span>
                      </div>
                    ) : null}
                  </div>
                  {/* <div className='w-full flex justify-start items-center'><PiFilmReelBold className=' inline ml-2 text-xl text-color-2'/><span className=' '>ژانر : </span></div> */}
                  <div className="w-3/5 lg:w-full flex  md:justify-start justify-center items-center">
                    <BsGlobe className=" inline ml-2 text-xl text-color-2" />
                    <span className=" ">محصول کشور : {movie?.country}</span>
                  </div>

                  <div className="w-4/5 lg:w-full flex justify-start mt-14 md:mt-0 items-center">
                    <p>{movie?.summary}</p>
                  </div>
                {
                  movie.topMovie && <div className='flex justify-start items-cente bg-color-4 py-1 rounded-lg px-2  w-fit text-lg font-thin'><span className="ml-2 text-color-1"> جزء 250 {movie?.type} برتر با رتبه </span><span className="text-color-2">{movie.topMovie}</span></div>
                }  
                  <div className="flex flex-col  lg:flex-row justify-between items-center">
                    <span className="  bg-green-600 p-2 rounded-lg text-sm">
                      زیرنویس چسبیده
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </HeaderBackdrop>
          <div className=" md:w-10/12 w-full lg:w-7/12 flex flex-col p-5 space-y-20">
           
          {/*}  {movie?.desc && (
              <BgRotate padding=" p-4">
                <div className="w-full text-right text-color-1">
                  {movie?.desc}
                </div>
              </BgRotate>
            )} */}

            <BgRotate padding="p-1" rotate1="-rotate-1" rotate2="rotate-1">
              <DisclosureWrapper title="لینک های دانلود" isOpen={true}>
                <div className="md:p-8 flex flex-col space-y-3">
                  <div>
                    <DisclosureWrapper
                      bg="bg-color-2"
                      rounded="rounded-lg"
                      border="border-color-1"
                      title="نسخه زیرنویس چسبیده فارسی"
                    >
                      <div className=" w-full flex flex-col justify-center items-center space-y-6 pt-4">
                        <DownloadBox quality="1080p" />
                        <DownloadBox quality="720p" />
                        <DownloadBox quality="480p" />
                      </div>
                    </DisclosureWrapper>
                  </div>
                  <div>
                    <DisclosureWrapper
                      bg="bg-color-2"
                      rounded="rounded-lg"
                      border="border-color-1"
                      title="نسخه دوبله فارسی"
                    >
                      <div className=" w-full flex flex-col justify-center items-center space-y-6 pt-4">
                        <DownloadBox quality="1080p" />
                        <DownloadBox quality="720p" />
                        <DownloadBox quality="480p" />
                      </div>
                    </DisclosureWrapper>
                  </div>
                </div>
              </DisclosureWrapper>
            </BgRotate>

            <BgRotate padding="p-1" rotate1="-rotate-1" rotate2="rotate-1">
              <DisclosureWrapper title="نظرات" isOpen={true}>
                <div className="w-full  flex flex-col justify-center items-center p-4 space-y-2">
                  <textarea
                    rows="6"
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-color-2 rounded-md p-2 outline-none  border shadow-sm resize-y focus:placeholder:opacity-75 focus:border-2 border-color-1"
                    value={commentText}
                    placeholder="دیدگاه خود را بنویسید..."
                  />
                  <div className=" w-full flex flex-col justify-center items-center">
                    <Button
                      width="w-full sm:w-8/12 md:w-3/12"
                      bgColor="bg-color-hover"
                      clicked={addNewComment}
                      disable={newComments.loading}
                    >
                      {" "}
                      ارسال دیدگاه{" "}
                    </Button>
                  </div>
                </div>
                <hr className=" border-color-1 opacity-50" />
                <div className=" w-full flex flex-col justify-center items-center space-y-6 pt-4">
                  <div className="w-full flex justify-between px-4 ">
                    <FaRegCommentDots className="inline text-color-2 text-2xl" />

                    <span className="text-xl text-color-2 ">
                      {newComments.comments? newComments.comments.length : 0}
                    </span>
                  </div>
             
                 
                {

                  // comments.loading ? <LoadingPage/> :
                  newComments.comments?.map((list) => (
                     <CommentBox key={list.key}  list={list} />
                    
                   ))
                  }
                
                </div>
              </DisclosureWrapper>
            </BgRotate>
          </div>

          </>
        ))
      }
        </div>
      
    </>
  );
}
