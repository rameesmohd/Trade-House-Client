import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatContent from './ChatContent';
import userAxios from '../../Axios/UserAxios'
import tutorAxios from '../../Axios/TutorAxios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAllInboxData } from '../../Redux/ClientSlice/Chat';
import { io } from 'socket.io-client'

function ChatComponent({role}) {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  const [socket,setSocket]= useState('')
  const [toggle,setToggle] = useState(false)
  
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

  useEffect(() => {
    const newSocket = io("http://localhost:5001")
    setSocket(newSocket)
    newSocket.on("error",(err)=>{
      console.log(err);
    })

    newSocket.on('online', (user) => {
      console.log('Received online event:', user);
    });

    //initialising chat
    if(senderRole==='tutor'){
      newSocket.emit('initializeChat',user_id,user_id);
    }
    newSocket.on('newInitialize',(sender)=>{
      console.log('new message initialed from ',sender);
      inboxDatafetch()
    });
    
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  },[]);

  useEffect(()=>{
    inboxDatafetch()
  },[])

  return (
    <div className="w-full h-full sm:mt-20 ">
      <div className="flex h-full">
        <div className="flex-1 bg-white border w-full h-full">
          <div className="main-body m-auto w-11/12 h-full flex flex-col">
            <div className="py-4 flex-2 flex flex-row">
              <div className="flex-1">
                <span className="xl:hidden inline-block text-gray-700 hover:text-gray-900 align-bottom">
                  <span onClick={()=>setToggle(!toggle)} className="block h-6 w-6 p-1 rounded-full hover:bg-gray-400">
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
  
            </div>
            <div className="main flex-1 flex flex-col ">
              <div className="hidden lg:block heading flex-2 bg-slate-300 rounded-lg pt-2 px-3">
                <h1 className="text-3xl text-gray-700  mb-4">Chat</h1>
              </div>
              <div className="flex-1 flex h-full border-s border-e">
                <ChatList socket={socket} loading={loading}  width={'w-full md:w-1/3'} toggle={toggle} setToggle={setToggle} hidden={!toggle ? 'hidden md:block' : 'block'} dataToListRole={receiverRole}/>
                <ChatContent socket={socket} axiosInstance={axiosInstance} hidden={!toggle ? 'block' : 'hidden md:block'} user_id={user_id} senderRole={senderRole} receiverRole={receiverRole}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent;
