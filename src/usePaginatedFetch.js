import { useEffect, useState } from "react"

import _ from "lodash";
import { useSelector } from "react-redux";

const usePaginatedFetch = (pageSize) => {

    const movieList = useSelector( state => state.movies.movieList);

    const [loading, setLoading]= useState(true);
    const [data, setData] =useState([]);

    const getData = () => {
      
        const paginatedData = _.chunk(movieList, pageSize);
         console.log("paginatedData", paginatedData)
        setData(paginatedData);
        setLoading(false)
    }

useEffect( () => {
 getData();
}, [])


return [loading, data]
};

export default usePaginatedFetch;