import React from 'react'
import Sidebar from '../../Components/Tutor/Sidebar'
import Navbar from '../../Components/Tutor/Navbar'
import ChatRoom from '../../Components/Chat/ChatRoom'
const Chat = () => {
  return (
    <div className='pt-24 md:pt-0 md:pl-64 '>
    <Navbar/>
    <Sidebar/>
    <ChatRoom role={'tutor'}/>
    </div>
  )
}

export default Chat
