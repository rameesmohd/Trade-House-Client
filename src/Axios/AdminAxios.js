import axios from 'axios'
import {adminAPI} from '../Constants/API'
import { useSelector } from 'react-redux'

const adminAxios =()=>{
    const token = useSelector((store)=>store.Admin.Token)
    const adminAxiosInstance = axios.create({
        baseURL: adminAPI
    })
    adminAxiosInstance.interceptors.request.use((config)=>{
        if(token){
            config.headers["Authorization"]=`admin ${token}`;
        }
        return config
    },(error)=>{
        return Promise.reject(error)
    })
    return adminAxiosInstance
}

export default adminAxios;