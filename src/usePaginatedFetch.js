import { useEffect, useState } from "react"

import _ from "lodash";

const usePaginatedFetch = (pageSize, movieData) => {

    


    const [data, setData] =useState([]);

    const getData = () => {
       
        const paginatedData = _.chunk(movieData, pageSize);
        
        setData(paginatedData);
    }

useEffect( () => {
 getData();
}, [movieData])


return [data]
};

export default usePaginatedFetch;