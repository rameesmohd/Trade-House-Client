import React, { useEffect, useState } from 'react';
import ChatList from '../../ChatList';
import ChatContent from '../../ChatContent';
import userAxios from '../../../Axios/UserAxios'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';



function ChatComponent() {
   const axiosInstance = userAxios()
   const user_id = useSelector((store)=>store.Client.user_id)
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

  return (
    <div className="w-full h-full mt-24 ">
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
              </div>
            </div>

            <div className="main flex-1 flex flex-col">
              <div className="hidden lg:block heading flex-2">
                <h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
              </div>
              <div className="flex-1 flex h-full">
                <ChatList inboxData={inboxData} width={'1/3'} hidden={'hidden md:block'} dataToListRole={'tutor'}/>
                <ChatContent axiosInstance={axiosInstance} user_id={user_id} senderRole={'user'} recieverRole={'tutor'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent;
