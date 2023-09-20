import React, { useState } from 'react'
import { Cards } from '../../Card'
import { useEffect } from 'react'
import userAxios from '../../../Axios/UserAxios'
import { toast } from 'react-toastify'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
  } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux'
import { setCoursesLoad} from '../../../Redux/ClientSlice/CoursesLoad'


const Body = () => {
    const CourseDataRedux= useSelector((store)=>store.CoursesLoad.courseData)
    const axiosInstance = userAxios()
    const dispatch = useDispatch()
    const [courseData,setCourseData] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        if(!CourseDataRedux){
            setLoading(true)
            axiosInstance.get('/all-courses')
            .then((res)=>{
            setCourseData(res.data.result)
            console.log(res.data.result);
            dispatch(setCoursesLoad(res.data.result))
        }).catch((error)=>{
            error.code === 'ECONNABORTED' ? console.log('Request canceled due to timeout') 
            : toast.error(error.message)
        }).finally(()=>{
            setLoading(false)
        })
    }else{
        setCourseData(CourseDataRedux)
    }
    },[])
    
    return (
    <>
        <div className='grid md:grid-cols-3 gap-2 h-screen overflow-x-hidden overflow-y-scroll bg-slate-50'>
        {
            courseData.map((obj)=>{
               return <div className=' col-span-1 hover:scale-105'><Cards coursedata={obj}/></div>
            })
        }
        
        {
          loading && [1,2,3,4,5,6].map((obj)=>{
               return (
                <Card key={obj} className="w-auto mx-1 my-2">
                 <CardHeader shadow={false} floated={false} className="h-44">
                    <div className='w-full h-full animate-pulse bg-slate-300'>
                    </div>
                    </CardHeader>
                    <CardBody>
                    <div className='w-full h-full animate-pulse bg-slate-300'>  </div>
                    <div className='w-full h-full animate-pulse bg-slate-300'>  </div>
                    </CardBody>
                    <div className="w-full flex justify-center">
                    </div>
                    <CardFooter className="pt-0 ">
                    <div className='w-full h-full rounded-lg py-3 animate-pulse bg-slate-300'>  </div>
                    <div className='w-full h-full animate-pulse my-2 rounded-lg bg-slate-300'>  </div>
                    <Button
                    className="text-right underline text-blue-800 bg-blue-gray-900/10  
                        shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none
                        active:scale-100">
                    </Button>
                </CardFooter>
                </Card>
               )
            })
        }
        </div>
    </>
  )
}

 export default Body
