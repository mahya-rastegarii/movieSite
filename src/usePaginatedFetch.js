import { useEffect, useState } from "react"

import _ from "lodash";

const usePaginatedFetch = (pageSize, movieData) => {

    

    const [loading, setLoading]= useState(false);
    const [data, setData] =useState([]);

    const getData = () => {
        setLoading(true)
        const paginatedData = _.chunk(movieData, pageSize);
         console.log("paginatedData", paginatedData)
         setLoading(false)
        setData(paginatedData);
    }

useEffect( () => {
 getData();
}, [movieData])


return [loading, data]
};

export default usePaginatedFetch;