import axios from 'axios'
import {adminAPI} from '../Constants/API'

const adminAxios = axios.create({
    baseURL: adminAPI
})

export default adminAxios;