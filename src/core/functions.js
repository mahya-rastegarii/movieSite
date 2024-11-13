import { setUserName } from "../redux/slice/UserSlice";
import { supabase } from "./supabaseClient";


//? Movies
export  const activeTypeGenre = async(active) => {

    if(active === "movies") {
      const {data} = await supabase.from("genres").select('moviesGenre');
      return data;
    }
    else {
      const {data} = await supabase.from("genres").select('serialsGenre');
      return data;

    }
  }

 export const fetchAllMovies = async(type) => {
  
    const respopnse = (await supabase.from("movies").select("*", {count: "exact"}).eq("type", type))
   
    return respopnse;
   }

  // export const fetchAllMovies = async(type) => {
  //   const {data} = await supabase.from("movies").select('*').eq("type", type);
  //   return data;
  // }

  export const genreMovieList = async(type, activeGenre) => {
    
    const {data} = await supabase.from("movies").select("*").eq("type", type).contains("genre", [activeGenre]);
    return data;

  }


  export const fetchTopMovies = async(type) => {
    const {data} = await supabase.from("movies").select('*').eq("type", type).gt("topMovie", 0);
    return data;
  }


  export const fetchCountries = async() => {

    const {data}= await supabase.from('countries').select('*');
    return data;
  }


  export const fetchMovieInfo = async(name) =>{
    const {data}= await supabase.from("movies").select('*').eq("name",name)
    return data;
  }

export const logOut = async() => {
  const {error} = await supabase.auth.signOut()
  if(error) {
    return false;
  }
  else {
      return true;
  }
  
 
}

 