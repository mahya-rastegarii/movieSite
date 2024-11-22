import { useEffect, useState } from "react"

import _ from "lodash";

const usePaginatedFetch = (pageSize, movieData) => {

    const [loading, setLoading]= useState(false);
    const [data, setData] =useState([]);

    const getData = () => {

        const paginatedData = _.chunk(movieData, pageSize);
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