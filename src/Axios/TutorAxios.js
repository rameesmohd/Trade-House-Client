import axios from "axios";
import { tutorAPI } from "../Constants/API";
import { useSelector } from "react-redux";

const tutorAxios=()=>{
        const token = useSelector((store)=>store.Tutor.Token)
        const tutorAxiosInstance = axios.create({
                baseURL : tutorAPI
        })
        tutorAxiosInstance.interceptors.request.use((config)=>{
                if(token) {
                    config.headers["Authorization"]=`tutor ${token}`;
                }
                return config
            },(error)=>{
                return Promise.reject(error)
            })
        
        return tutorAxiosInstance
}

export default tutorAxios