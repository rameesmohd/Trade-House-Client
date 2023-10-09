import { Spinner } from '@material-tailwind/react'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { debounce } from 'lodash'
import {TbMessages} from 'react-icons/tb' 
import Picker from 'emoji-picker-react'; 


const ChatContent = ({hidden,socket,axiosInstance,user_id,senderRole,receiverRole}) => {
  const selectedChat =  useSelector((store)=>store.Chat.selectedChat)
  const [message,setMessage] = useState([])
  const [loading,setLoading] = useState(false)
  const [newMessage,setNewMessage] = useState("")
  const [typing,setTyping] = useState(false)
  const [isTyping,setIsTyping] = useState(false)
  const messagesRef = useRef()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const scrollToBottom = debounce(() => {
  //   messagesRef.current?.scrollIntoView({behavior: 'smooth'});
  // }, 300);

  useEffect(() => {
    // if (messagesRef.current) {
    //   messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    // }
  },[]);

  useEffect(() => {
    if (socket && selectedChat !== null) {
    socket.emit("joinRoom", selectedChat._id, selectedChat?.[senderRole]._id);

    socket.on("messageResponse", (message, ChatId) => {
        console.log('messageResponse',message);
        setMessage((prevMessages) => [...prevMessages,message])
        scrollToBottom();
    });

    socket.on("typing",()=>setIsTyping(true))
    socket.on("stoptyping",()=>setIsTyping(false))
    socket.on("error", (err) => {
      console.log("error", err);
    });
    }
  },[socket,selectedChat]);

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
      timestamp: Date.now()
    }
    socket.emit('stoptyping',selectedChat._id)
    socket.emit("newMessage",NewMessage, selectedChat._id);
    if(!message.length && senderRole==='user'){
      socket.emit('initializeChat',selectedChat.tutor._id,user_id);
    }
    setNewMessage("");
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
      toast.error('something went wrong')
    }
  }

  useEffect(()=>{
    if(selectedChat){
      fetchMessages()
    }
  },[selectedChat])
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      sendMessage();
    }
  };

  const typingHandler = (e) => {
    let typingTimeout;
    e.preventDefault();
    setNewMessage(e.target.value);
  
    if (!socket) return;
  
    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
  
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    typingTimeout = setTimeout(() => {
      socket.emit("stoptyping", selectedChat._id);
      setTyping(false); 
    },3000); 
  };

  const handleEmojiClick = (emojiObject, emoji) => {
    setNewMessage((newMessage)=>newMessage+emojiObject.emoji)

  };
  

  return (
    <>
      <div className={`chat-area flex-1 flex flex-col h-[500px] relative ${hidden}`}>
          <div className="flex-3">
           {selectedChat&& <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
              Chatting with <b>{selectedChat?.[receiverRole]?.name}</b>
            </h2>}
          </div>
          {selectedChat ? <>
          <div className="messages flex-1 overflow-auto" >
            { loading && <div className='w-full flex justify-center h-full items-center'><Spinner /></div> }
            {!loading && 
            <>
            <div class="messages flex-1 overflow-auto relative" >
               { message?.map((mssg,i)=>
               <React.Fragment>
                  { mssg?.sender._id!==user_id && 
                  <div key={`start-${mssg._id + i}`} className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img src={mssg.sender.image ? mssg.sender.image : 'https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg'} />
                          </div>
                        </div>
                        <div className="chat-header">
                          <time className="text-xs opacity-50">
                          {mssg?.createdAt ?
                            new Date(mssg.createdAt).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }) : new Date().toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </time>
                        </div>
                        <div className="chat-bubble bg-slate-200">{mssg.content}</div>
                        <div className="chat-footer opacity-50">
                        </div>
                      </div> }

                  { mssg.sender._id===user_id && 
                  <div key={`end-${mssg._id + i}`} className="chat chat-end">
                        <div className="chat-header">
                        <time className="text-xs opacity-50">
                          {mssg?.createdAt &&
                            new Date(mssg.createdAt).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </time>
                       </div>
                      <div className="chat-bubble bg-blue-500 text-white"> {mssg.content}</div>
                      <div className="chat-footer opacity-50">
                      </div>
                   </div> }
                  </React.Fragment>
                )}
              
                {
                  isTyping && <div key={selectedChat._id} className="chat chat-start" style={{ opacity: isTyping ? 1 : 0, transition: 'opacity 0.3s' }}>
                  <div className="chat-bubble bg-slate-200">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                  </div>
                } 
                <div ref={messagesRef}></div>
              </div>
              </> 
            }
            </div>
        

          <div className="relative flex-2 pt-4 pb-10">
            <form onSubmit={(e) => e.preventDefault()} onKeyDown={handleKeyPress} >
                <label for="chat" class="sr-only">Your message</label>
                <div class="flex  items-center px-3 py-2 rounded-lg bg-gray-50 ">
                
                 
           
                    <button onClick={()=>setShowEmojiPicker(!showEmojiPicker)} type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                        </svg>
                        <span class="sr-only">Add emoji</span>
                    </button>

                    {showEmojiPicker && (
                        <div className="absolute bottom-16 right-4 bg-transparent">
                        <Picker onEmojiClick={(emojiObject, emoji) => handleEmojiClick(emojiObject, emoji)} />
                      </div>
                    )}

                    <textarea value={newMessage} onChange={typingHandler} id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>
                        <button onClick={()=>sendMessage()} type="button"  class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                        <svg class="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                        </svg>
                        <span class="sr-only">Send message</span>
                    </button>
                </div>
            </form>
          </div>
          </> :
          <div className='flex justify-center items-center h-full w-full bg-slate-200'>
          <div>
            <div className='w-full flex justify-center'>
              <TbMessages className='w-24 h-24 opacity-75'/>
            </div >
            <div className='w-full text-center font-poppins'>Start Chatting Now</div>
            <div className='w-full text-center text-sm font-poppins'>"Engage in meaningful conversations</div>
          </div>
          </div>
          }
        </div>
    </>
  )
}

export default ChatContent
