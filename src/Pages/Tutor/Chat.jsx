import React from 'react'
import Sidebar from '../../Components/Tutor/Sidebar'
import Navbar from '../../Components/Tutor/Navbar'
import ChatRoom from '../../Components/Tutor/TutorChatRoom'
const Chat = () => {
  return (
    <div className='pt-24 md:pt-0 md:pl-64 '>
    <Navbar/>
    <Sidebar/>
    <ChatRoom/>
    </div>
  )
}

export default Chat
