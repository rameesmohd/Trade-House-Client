import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatContent from './ChatContent';
import userAxios from '../../Axios/UserAxios'
import tutorAxios from '../../Axios/TutorAxios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAllInboxData } from '../../Redux/ClientSlice/Chat';


function ChatComponent({role}) {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  const [fetchAgain,setFetchAgain] = useState(false)
  
  const user_id = useSelector((store) => {
    if (role === 'tutor') {
      return store.Tutor.id;
    } else if (role === 'user') {
      return store.Client.user_id;
    }
  });

  const axiosInstance = role === 'tutor' ? tutorAxios() : userAxios();
  const receiverRole = role === 'tutor' ? 'user' : 'tutor';
  const senderRole = role;
  
  const inboxDatafetch =async()=>{
    setLoading(true)
    await axiosInstance.get(`/chat?user_role=${role}`).then((res)=>{
      dispatch(setAllInboxData(res.data.result))
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
        <div className="flex-1 bg-slate-50 w-full h-full">
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
                <ChatList loading={loading}  width={'1/3'} hidden={'hidden md:block'} dataToListRole={receiverRole}/>
                <ChatContent axiosInstance={axiosInstance} user_id={user_id} senderRole={senderRole} receiverRole={receiverRole}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent;
