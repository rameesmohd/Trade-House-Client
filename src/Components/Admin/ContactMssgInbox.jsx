import React from 'react'
import { useEffect } from 'react'
import adminAxios from '../../Axios/AdminAxios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import contactUs from '../../assets/contact-Us.gif'


const Inbox = () => {
    const axiosInstance = adminAxios()
    const [inboxData,setInboxData] = useState([])
    const [showMssg,setShowMssg] = useState({}) 
    const fetchData=async()=>{
        await axiosInstance.get('/contact-inbox').then((res)=>{
            setInboxData(res.data.result)
        }).catch((error)=>{
            console.log(error) 
            toast.error(error.message)})
    }
    console.log(inboxData);
    useEffect(()=>{
        fetchData()
    },[])

    const handleShowMssg=async(mssg)=>{
        setShowMssg(mssg)
        setInboxData((prev) =>prev.map((message)=>message._id === mssg._id ? {...message,is_read : true} : message))
        await axiosInstance.patch('/contact-inbox',{id:mssg._id}).then((res)=>{
        setInboxData(res.data.result)
    }).catch((error)=>{
        console.log(error) 
        toast.error(error.message)})
    }
    return (
        <main className="flex w-full h-full shadow-lg rounded-3xl px-5 border m-5">
            <section className="flex flex-col pt-3 md:w-4/12  h-full overflow-y-scroll">
              <ul className="mt-6">
               { inboxData.map((mssg)=>
                <li onClick={()=>handleShowMssg(mssg)} key={mssg._id} className={`py-5 border-b px-3 ${showMssg._id===mssg._id && 'bg-indigo-100'} transition  hover:bg-indigo-100`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{mssg.subject}</h3>
                    <div>
                    <p className="text-md text-gray-400">{mssg.date && formatDistanceToNow(new Date(mssg.date), { addSuffix: true })}</p>
                    <div className='w-full flex justify-end mt-1'>
                     {!mssg.is_read && <div className='rounded-full  w-2 h-2 bg-blue-600 text-end'></div>}
                    </div>
                    </div>
                  </div>
                  <div className="text-md italic text-gray-400">{mssg.email}</div>
                </li>
                )}
              </ul>
            </section>

            <section className="md:w-6/12 px-4 flex flex-col bg-white rounded-r-3xl">
            { <> <div className="flex justify-between items-center h-48 border-b-2 mb-8">
                <div className="flex space-x-4 items-center">
                  <div className="flex flex-col">
                    <h3 className=" text-lg">Email : </h3>
                    <p className="text-light font-semibold text-gray-800">{showMssg.email}</p>
                  </div>
                </div>
              </div>
              <section>
                <h1 className="font-bold text-2xl">Subject : {showMssg.subject}</h1>
                <comment className="mt-8 text-gray-500 leading-7 tracking-wider">
                  {showMssg.comment&&<p>Hi,</p>}
                  <p>{showMssg.comment}</p>
                </comment>
              </section> </>
              }
            </section>
          </main>
  )
}

export default Inbox
