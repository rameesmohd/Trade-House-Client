import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {setAllInboxData, setSelectedChat} from '../../Redux/ClientSlice/Chat'
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';


const ChatList = ({loading,width,hidden,dataToListRole,userpanel,toggle,setToggle}) => {
  const navigate = useNavigate()
  const dispatch =  useDispatch()
  const selectedChat = useSelector((store)=>store.Chat.selectedChat)

  const inboxData = useSelector((store)=>store.Chat.inboxAllChat)
  
  const handleSelectChat=(chat)=>{
    dispatch(setSelectedChat(chat))
    if(userpanel){
      navigate('/chat')
    }
    if(setToggle && toggle)
    setToggle(!toggle)
  }

  return (
    <>
        <div className={`sidebar ${hidden} lg:flex ${width} flex-2 flex-col pr-6 min-h-[500px]`}>
                <div className="flex-1 h-full overflow-x-hidden px-2">
                    { loading ? [...Array(3)].map((value,index)=>
                      <div key={index} className='entry cursor-pointer trans05form hover:scale-1 h-16 animate-pulse duration-300 transition-transform bg-slate-200 mb-4 rounded p-4 flex shadow-md'>
                      </div>
                    ) : (inboxData.length >0 ? 
                        inboxData.slice().map((chat, index) => (
                        <div
                          key={`${chat?._id}${index}`}
                          onClick={()=>handleSelectChat(chat)}
                          className={`w-full entry cursor-pointer trans05form hover:scale-1 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md ${
                            chat._id===selectedChat?._id&&!userpanel ? 'border-l-4 border-red-500 ' : ''
                          }`}>
                          <div className="flex-2">
                            <div className="w-12 h-12 relative">
                              <img
                                className="w-12 h-12 rounded-full mx-auto"
                                src={chat?.[dataToListRole]?.image ? chat?.[dataToListRole]?.image : 'https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg'}
                                alt="chat-user"
                              />
                            </div>
                          </div>
                          <div className="flex-1 px-2">
                            <div className="truncate w-32">
                              <span className="text-gray-800">
                                {chat?.[dataToListRole]?.name}
                              </span>
                            </div>
                            <div>
                              <small className="text-gray-600">
                                {chat?.latestMessage?.content}
                              </small>
                            </div>
                          </div>
                          <div className="flex-2 text-right">
                            <div>
                              <small className="text-gray-500">
                                { chat?.latestMessage && formatDistanceToNow(new Date(chat.latestMessage.createdAt),{ addSuffix: true })}
                              </small>
                            </div>
                            <div>
                              <small class={`text-xs ${chat?.unreadMessages!=0 && 'bg-red-500'} text-white rounded-full h-6 w-6 leading-6 text-center inline-block`}>
                                { chat?.unreadMessages!=0 && chat?.unreadMessages}
                              </small>
                            </div>
                          </div>
                        </div> 
                    )) : <div className="no-data-message">No chats available</div> )}
                  </div>
            </div>
    </>
  )
}



export default ChatList
