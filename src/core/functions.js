

import { supabase } from "./supabaseClient";


//? Movies
export  const activeTypeGenre = async() => {

   
      const {data} = await supabase.from("genres").select("*");
      return data;
  
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
    
    // const {data , error} = await supabase.from("movies").select("*").contains("genre", [activeGenre]).eq("type", type); 
      
      const {data , error} = await supabase.from("movies").select("*").ilike("genre", `%${activeGenre}%`).eq("type", type); 
      // const {data , error} = await supabase.from("movies").select("*").in("genre", `%${activeGenre}%`).eq("type", type); 
    if(error) {
      console.error("respo.error", error)
    }
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
    const {data}= await supabase.from("movies").select('*').eq("name",name);
    
    const transformedData = data.map(item => ({
      ...item,
      genre: item.genre.split(",").map(genre => genre.trim()),
    }));
    return transformedData;
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

 