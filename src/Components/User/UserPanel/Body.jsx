import React, { useState } from 'react'
import List from './ModuleList'
import Card from './ProfileCard'
import PaymentHistory from './Payments'
import emptyIcon from '../../../assets/empty-folder.png'
import userAxios from '../../../Axios/UserAxios'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import walletIcon from '../../../assets/pngwing.com.png'
import ChatList from '../../ChatList'


const MainBody = () => {
    const axiosInstance = userAxios()
    const [userDatas,setUserData] = useState({})
    const [purchaseDatas,setPurchaseData]= useState([])
    const [moduleDatas,setModuleData] = useState([])
    const [updateData,setUpdateData] = useState(false)

    const [inboxData,setInboxData] = useState([])
    const [loading,setLoading] = useState()
 
   const inboxDatafetch =async()=>{
     setLoading(true)
     await axiosInstance.get('/chat?user_role=user').then((res)=>{
       setInboxData(res.data.result)
       setLoading(false)
     }).catch((error)=>{
       console.log(error)
       toast.error(error.message)
     })
    }
    useEffect(()=>{
        inboxDatafetch()
    },[])

    const fetchData=async()=>{
        await axiosInstance.get('/userpanel').then((res)=>{
            setUserData(res.data.userData)
            setPurchaseData(res.data.purchaseData)
            setModuleData(res.data.moduleData)
        }).catch((error)=>{
            toast.error(error.message)
        })
    }

   useEffect(()=>{
    fetchData()
   },[updateData])

//    const inboxData = [
//     {
//       subject: 'Sample Subject 1',
//       email: 'sample@email.com',
//       time: '23m ago',
//     },
//     {
//       subject: 'Sample Subject 2',
//       email: 'sample@email.com',
//       time: '1h ago',
//     },
//   ];

  return (
    <>
    <div className='mt-24 md:container mx-auto bg-slate-100'>
        <div className='w-full h-24 bg-white justify-between  flex pt-10 px-2 items-center'>
            <div className='text-3xl font-bold font-poppins'>My Courses</div>
            <div className='w-2/6 h-full flex justify-center items-center'>
                <img className='h-10' src={walletIcon} alt="" /> 
                <span className='text-sm font-bold opacity-70 ml-3'>₹.{userDatas.wallet}</span>
            </div>
        </div>
            <hr/>
        <div className='w-full md:h-auto md:grid  md:grid-cols-4 p-2'>
            <div  className='w-full p-10 md:col-span-3 md:flex-row'>  
            { 
                purchaseDatas.length ? (
                purchaseDatas.filter((obj)=>obj.status!=='refunded').map((purchase)=>{
                const modules = moduleDatas.filter((obj)=>obj.courseId === purchase?.course_id._id)
                console.log(purchase);
                return (
                    <div key={purchase?._id} className="col-span-4 sm:col-span-3">
                        <List progressData={purchase.learning_progress} order_id={purchase._id} courseData={purchase?.course_id} moduleData={modules} user_id={userDatas._id}/>
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
            <div className='md:col-span-1 bg-black'>
                <div className="flex w-full justify-center items-center">
                    <Card userData={userDatas} setUserData={setUserData}/>
                </div>
                <div className="flex-1 flex h-full ">
                    <div className="main flex-1 flex flex-col">
                        <div className=" heading flex-2">
                            <h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
                        </div>
                        <div>
                                {/* <ChatList inboxData={inboxData} width={'full'}/> */}
                                <ChatList inboxData={inboxData} width={'full'} hidden={'hidden md:block'} dataToListRole={'tutor'}/>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
        <div className='md:container mx-auto my-5'>
            <div className='font-bold text-xl font-poppins px-3 '>
                Payment History
            </div>
            <div className='my-5 border'>
                <PaymentHistory orderData={purchaseDatas} wallet={userDatas.wallet}  updateData={updateData} setUpdateData={setUpdateData} />
            </div>
        </div>
        <hr /><br />
    </>
  )
}

export default MainBody
