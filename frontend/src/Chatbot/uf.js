import React from "react";
import { BASE_URL } from "../utils/config.js";
import useFetch from "../hooks/useFetch.js";

const uf = ()=>{
    const {
        data: tours,
        loading,
        error,
      } = useFetch(`${BASE_URL}/tours/:660eca8cb68e3f3f36dc7f79`);
    console.log("title", tours.title);
    return(tours, loading, error);
};

export default uf;