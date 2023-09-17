import React, { useState } from 'react'
import List from './List'
import Card from './Card'
import emptyIcon from '../../../assets/empty-folder.png'
import userAxios from '../../../Axios/UserAxios'
import { useEffect } from 'react'
import toast from 'react-hot-toast'


const MainBody = () => {
    const axiosInstance = userAxios()
    const [purchaseDatas,setPurchaseData]= useState([])
    const [userDatas,setUserData] = useState([])
    const [moduleDatas,setModuleData] = useState([])
    const [currentCourseModules,setCurrentCourseModules] = useState([])
    let currentModule
   useEffect(()=>{
    axiosInstance.get('/userpanel').then((res)=>{
        setUserData(res.data.userData)
        setPurchaseData(res.data.purchaseData)
        setModuleData(res.data.moduleData)
    }).catch((error)=>{
        console.log(error);
        toast.error(error.message)
    })
   },[])
   console.log(purchaseDatas,'purchaseData');
   console.log(moduleDatas,'moduleDatas');


  return (
    <>
    <div className='mt-24 container mx-auto bg-slate-100'>
        <div className='w-full h-24 bg-white  flex pt-10 px-2 items-center'>
            <div className='text-3xl font-bold font-poppins'>My Courses</div>
        </div>
            <hr />
        <div className='w-full h-auto grid  md:grid-cols-4 p-2'>
            <div  className='w-full p-10 md:col-span-3 flex-row'>  
            { 
                purchaseDatas.length ? (
                purchaseDatas.map((purchase)=>{
                const modules = moduleDatas.filter((obj)=>obj.courseId === purchase?.course_id._id)
                return (
                    <div key={purchase?._id} className="col-span-4 sm:col-span-3">
                        <List courseData={purchase?.course_id} moduleData={modules}/>
                    </div>
                )})
                ):(
                <div className='w-full p-10 md:col-span-3 '>  
                    <div className="col-span-4 sm:col-span-3 p-4">
                    <div className='w-full h-full bg-slate-100 p-24 border rounded-md border-gray-600'>
                        <div className='w-full flex justify-center'>
                            <img className='h-24 w-24' src={emptyIcon} alt="" /> 
                        </div>
                        <p className='text-center'>You dont have any active at the moment.</p>
                        <p className='text-center opacity-60'>That's no fun!</p>
                    </div>
                    </div>
                </div>
                )
            }
            </div> 
            <div className='col-span-1 h-auto flex w-full justify-center items-center'>
                <Card userData={userDatas} setUserData={setUserData}/>
            </div>
        </div>
        </div>
        <hr /><br />
    </>
  )
}

export default MainBody
