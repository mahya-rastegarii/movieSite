/* eslint-disable react-refresh/only-export-components */


import react, { createContext, useContext, useState } from "react" ;

const ActiveLinkContext = createContext();


export const ActiveLinkPovider = ({childern}) => {
   const [activeGenre, setActiveGenre]= useState([]);

  return  <ActiveLinkContext.Provider value={{activeGenre, setActiveGenre}}>
    {childern}
    </ActiveLinkContext.Provider>
}

export const useActiveLinkContext = () => {
    return useContext(ActiveLinkContext);
}