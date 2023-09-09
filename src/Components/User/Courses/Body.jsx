import React, { useState } from 'react'
import { Cards } from '../../Card'
import { useEffect } from 'react'
import userAxios from '../../../Axios/UserAxios'
import { toast } from 'react-hot-toast'
import Loading from '../../Loading'

const Body = () => {
    const axiosInstance = userAxios()
    const [courseData,setCourseData] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        axiosInstance.get('/all-courses').then((res)=>{
            setCourseData(res.data.result)
            setLoading(false)
        }).catch((error)=>{
            toast.error(error.message)
        })
    },[])
    console.log(courseData);
    return (
    <>
        <div className='grid md:grid-cols-3 gap-2 max-h-screen overflow-x-hidden overflow-y-scroll bg-slate-50'>
        {
            courseData.map((obj)=>{
               return <div className=' col-span-1'><Cards coursedata={obj}/></div>
            })
        }
             <div className=' col-span-1'><Cards/></div>
             <div className=' col-span-1'><Cards/></div>
             <div className=' col-span-1'><Cards/></div>
             <div className=' col-span-1'><Cards/></div>

        </div>
        {loading && <Loading/>}
    </>
  )
}

 export default Body
