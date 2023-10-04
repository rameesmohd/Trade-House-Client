import { Spinner } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const ChatContent = ({axiosInstance,user_id,senderRole,recieverRole}) => {
  const selectedChat =  useSelector((store)=>store.Chat.selectedChat)
  const [message,setMessage] = useState([])
  const [loading,setLoading] = useState(false)
  const [newMessage,setNewMessage] = useState("")
  const [socket,setSocket]= useState()

  useEffect(() => {
    const newSocket = io("http://localhost:5001/chat")
    setSocket(newSocket)

    newSocket.on("error",(err)=>{
      console.log(err);
    })

    console.log(selectedChat);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  },[selectedChat]);

  useEffect(() => {
    if (socket && selectedChat!==null) {
    socket.emit("joinRoom",selectedChat._id,selectedChat?.[senderRole].name)

    socket.on("messageResponse", (message, receivedChatId) => {
      console.log(message,'response');
    if (selectedChat._id === receivedChatId) {
          setMessage((prevMessages) => [...prevMessages,message])
    }});

    socket.on("error", (err) => {
      console.log("error", err);
    });
    }
  },[socket]);

const sendMessage = async () => {
  if (newMessage.length > 0) {
    let NewMessage = {
      content: newMessage,
      sender: { 
      _id:selectedChat?.[senderRole]?._id,
      image:selectedChat?.[senderRole]?.image,
      name:selectedChat?.[senderRole]?.name 
      },
      chat:selectedChat._id,
      timestamp: Date.now(),
    }
    setNewMessage("");
    socket.emit("newMessage", NewMessage, selectedChat._id);
    }
  }

const fetchMessages = async()=>{
    try {      
      setLoading(true)
      await axiosInstance.get(`/message?chatId=${selectedChat._id}`).then((res)=>{
        setMessage(res.data.result)
        setLoading(false)
      })
    } catch (error) {
      setLoading(false)
      toast.error('error occured')
    }
  }

  useEffect(()=>{
    fetchMessages()
  },[selectedChat])

  // const sendMessage =async()=>{
  //   // try{  
  //   //     console.log(newMessage);
  //   //     setNewMessage("")
  //   //     await axiosInstance.post('/message',{
  //   //       content : newMessage,
  //   //       chatId :selectedChat._id
  //   //     }).then((res)=>{
  //   //       console.log(res.data.result);
  //   //       setMessage([...message,res.data.result])
  //   //     })
  //   //   }  catch (error){
  //   //       toast.error('error occured')
  //   //   }
  // }
  

const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      sendMessage();
    }
  };

const typingHandler=(e)=>{
    e.preventDefault()
    setNewMessage(e.target.value)

    //typing logic here
  }

  return (
    <>
      <div className="chat-area flex-1 flex flex-col h-[500px]">
          <div className="flex-3">
            <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
              Chatting with <b>{selectedChat?.[recieverRole].name}</b>
            </h2>
          </div>
          <div className="messages flex-1 overflow-auto">
            { loading ? <div className='w-full flex justify-center h-full items-center'><Spinner /></div> 
            : 
            <div class="messages flex-1 overflow-auto">
               {
                    message && message.map((mssg,i)=>(
                    <>
                     { mssg?.sender._id!==user_id && <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img src={mssg.sender.image ? mssg.sender.image : 'https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg'} />
                          </div>
                        </div>
                        <div className="chat-header">
                          <time className="text-xs opacity-50">12:45</time>
                        </div>
                        <div className="chat-bubble bg-slate-200">{mssg.content}</div>
                        <div className="chat-footer opacity-50">
                          Delivered
                        </div>
                      </div> }
    
                     {mssg.sender._id===user_id && <div className="chat chat-end">
                        <div className="chat-header">
                          <time className="text-xs opacity-50">12:46</time>
                        </div>
                        <div className="chat-bubble bg-blue-500 text-white"> {mssg.content}</div>
                        <div className="chat-footer opacity-50">
                          Seen at 12:46
                        </div>
                      </div>}
                    </>
                ))}    
              </div>
              }
            </div>
          <div className="flex-2 pt-4 pb-10">
          
            <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyPress} >
                <label for="chat" class="sr-only">Your message</label>
                <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 ">
                    <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                            <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                        </svg>
                        <span class="sr-only">Upload image</span>
                    </button>
                    <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                        </svg>
                        <span class="sr-only">Add emoji</span>
                    </button>
                    <textarea value={newMessage} onChange={typingHandler} id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>
                        <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg class="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                        </svg>
                        <span class="sr-only">Send message</span>
                    </button>
                </div>
            </form>

          </div>
        </div>
    </>
  )
}

export default ChatContent
