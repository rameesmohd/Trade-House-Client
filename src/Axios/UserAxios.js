import axios from 'axios'
import {userAPI} from '../Constants/API'
import { useSelector } from 'react-redux'

const userAxios=()=>{
    const token = useSelector((store)=>store.Client.Token)
    const userAxiosInstance = axios.create({
        baseURL: userAPI
    })
    userAxiosInstance.interceptors.request.use((config)=>{
        if(token) {
            config.headers["Authorization"]=`Bearer ${token}`;
        }
        return config
    },(error)=>{
        return Promise.reject(error)
    })

    return userAxiosInstance
}


export default userAxios;
