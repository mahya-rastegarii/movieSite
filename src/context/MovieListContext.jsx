

import { createContext, useState, useContext } from "react"


const MovieListContext = createContext();


export const MovieListProvider = ({children}) => {
   
const [dataMovies, setDataMovies] =useState([])

 return <MovieListContext.Provider value={{dataMovies, setDataMovies}}>
    {
        children
    }
</MovieListContext.Provider>

};

export const useMovieListContext = () => {
    return useContext(MovieListContext)
}