import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Footer from '../../Components/User/Footer'
import ChatRoom from '../../Components/Chat/ChatRoom'

const Chat = () => {
  return (
      <div className='lg:container mx-auto'>
        <Navbar/>
        <ChatRoom role={'user'}/>
        <Footer/>
    </div>
  )
}

export default Chat
