import axios from "axios"
import { useSelector } from "react-redux";

export const axiosInstance = axios.create({});
// const {token} = useSelector((state)=>(state.auth)) ;    
export const apiConnector = (method, url, bodyData, headers, params) => {
    // console.log("URL :",url) ;
    // console.log("bodyData :",bodyData) ;
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}