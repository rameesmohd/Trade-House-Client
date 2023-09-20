import React, { useEffect, useState } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import userAxios from '../../../Axios/UserAxios'
import {toast} from 'react-toastify'
import Videoplayer from '../Videoplayer'

const Body = () => {
    const axiosInstance = userAxios()
    const location =  useLocation()
    const navigate = useNavigate()
    const module_id  = location.state.state
    const module_index = location.state.index
    const [moduleData,setModuleData] = useState({})
    const [currVideo,setCurrVideo] = useState('')
    const [index,incrementIndex] = useState(0)


    useEffect(()=>{
        const loadModules=async()=>{
            await axiosInstance.get(`/loadmodule/${module_id}`).then((res)=>{
                setModuleData(res.data.moduleData)
                setCurrVideo(res.data.moduleData.chapters[0].video) 
            }).catch((error)=>{
                toast.error(error.message)
                navigate(-1)
            })
        }
        loadModules()
    },[])

    useEffect(()=>{
        if(Object.keys(moduleData)!==0){
            if(moduleData?.chapters) {
                setCurrVideo(moduleData.chapters[index].video) 
            } 
        }
    },[index])
    
    const increamant=async()=>{
        if(index !== moduleData.chapters.length-1){
            incrementIndex(index+1)
        }
        if(index === moduleData.chapters.length-1){
                await axiosInstance.patch('/module-completed',{module_id,module_index}).then((res)=>{
                    toast.success(res.data.message)
                    navigate('/userpanel')  
                }).catch((error)=>{
                    toast.error(error.message)
                })
        }
    }

    const decreament=()=>{
        if(index !== 0){
            incrementIndex(index-1)
        }
    }
    console.log(moduleData);
  return (
    <div className='lg:container mx-auto  pt-24'>
    
        <div className=' bg-black h-screen grid md:grid-cols-5 px-5'>
            <div key={currVideo} className='md:col-span-3 rounded  '>
             <div onClick={()=>navigate(-1)} className='text-white font-poppins font-bold underline px-4 py-2 cursor-pointer'>Back</div>
                <div className='py-4 px-5'>
                 <Videoplayer height={'auto'} width={'full'} video={currVideo} controls={true} disabled={false} autoPlay={true}/>
                 </div>
              <div className='flex justify-between'>
              <a onClick={decreament} class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>
                Previous
            </a>
              {
                index === moduleData?.chapters?.length-1 ?
                <a onClick={increamant} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Completed
                </a>
                :
                <a onClick={increamant} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next Chapter
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </a>
              }
              </div>
            </div>

            <div className=' md:col-span-2 w-full md:h-full bg-black overflow-y-scroll scrollbar-hide md:p-10'>
                <h1 className='text-white w-full bg-gray-950 p-2 rounded-xl mb-2 font-bold'>MODULE {module_index+1}</h1>
            { 
                moduleData?.chapters && moduleData.chapters.map((chapter,i)=>
                    <div key={chapter._id} className=' rounded-lg my-1'>
                        <a onClick={()=>changevideo(chapter?.video)} className={`flex border border-slate-800 items-center ${i===index ? 'bg-gray-900' : 'bg-black'}  rounded-lg shadow flex-row max-w-xl  hover:bg-gray-900`}>
                            <Videoplayer height={'auto'} width={48} video={chapter?.video} controls={false} disabled={true} autoPlay={false}/>    
                            <div className="flex flex-col justify-between p-1 ml-1 leading-normal">
                                <p className='mb-1 text-sm font-bold text-white'>Chapter {i+1}</p>
                                <p className="mb-3 text-sm font-bold text-white">{chapter?.chapter_title}</p>
                            </div>
                        </a>
                    </div>
                )
            }
            </div>
        </div>
    </div>
  )
}

export default Body
