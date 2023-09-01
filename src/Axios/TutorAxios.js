import axios from "axios";
import { tutorAPI } from "../Constants/API";

const tutorAxios = axios.create({
        baseURL : tutorAPI
})

export default tutorAxios