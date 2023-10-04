import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Footer from '../../Components/User/Footer'
import ChatRoom from '../../Components/User/ChatRoom/UserChatRoom'

const Chat = () => {
  return (
      <div className='lg:container mx-auto'>
        <Navbar/>
        <ChatRoom/>
        <Footer/>
    </div>
  )
}

export default Chat
