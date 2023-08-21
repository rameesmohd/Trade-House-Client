import axios from 'axios'
import {AdminAPI} from '../Constants/API'

const adminAxios = axios.create({
    baseURL: AdminAPI
})

export default adminAxios;