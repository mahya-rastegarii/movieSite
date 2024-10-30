

import react, { createContext, useContext, useState } from "react" ;

const MovieInfoContext = createContext();


export const MovieInfoPovider = ({childern}) => {
    const [movieInfo, setMovieInfo]=useState([]);

  return  <MovieInfoContext.Provider value={{movieInfo, setMovieInfo}}>
    {childern}
    </MovieInfoContext.Provider>
}

export const useMovieInfoContext = () => {
    return useContext(MovieInfoContext);
}