import axios from 'axios'
import {userAPI} from '../Constants/API'

const userAxios = axios.create({
    baseURL: userAPI
})

export default userAxios;