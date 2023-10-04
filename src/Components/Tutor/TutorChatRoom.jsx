import React, { useEffect, useState } from 'react';
import ChatList from '../ChatList';
import ChatContent from '../ChatContent';
import tutorAxios from '../../Axios/TutorAxios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


function ChatComponent() {
   const axiosInstance = tutorAxios()
   const [inboxData,setInboxData] = useState([])
   const user_id = useSelector((store)=>store.Tutor.id)
   const [loading,setLoading] = useState()

  const inboxDatafetch =async()=>{
    setLoading(true)
    await axiosInstance.get('/chat?user_role=tutor').then((res)=>{
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

  return (
    <div className="w-full h-full">
      <div className="flex h-full">
        <div className="flex-1 bg-gray-100 w-full h-full">
          <div className="main-body m-auto w-11/12 h-full flex flex-col">
            <div className="py-4 flex-2 flex flex-row">
              <div className="flex-1">
                <span className="xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                  <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </span>
                </span>
                
              </div>
              <div className="flex-1 text-right">
                <span className="inline-block text-gray-700">
                  Status:{' '}
                  <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>{' '}
                  <b>Online</b>
                  <span className="inline-block align-text-bottom">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </span>

                <span className="inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom">
                  <span className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                  </span>
                </span>
              </div>
            </div>

            <div className="main flex-1 flex flex-col">
              <div className="hidden lg:block heading flex-2">
                <h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
              </div>

              <div className="flex-1 flex h-full">
                <ChatList inboxData={inboxData} width={'1/3'} hidden={'hidden md:block'} dataToListRole={'user'} />
                <ChatContent axiosInstance={axiosInstance} user_id={user_id} senderRole={'tutor'} recieverRole={'user'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent;
