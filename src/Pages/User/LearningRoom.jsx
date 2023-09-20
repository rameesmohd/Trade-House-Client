import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Footer from '../../Components/User/Footer'
import Body from '../../Components/User/LearningRoom/Body'

const LearningRoom = () => {
  return (
    <div className='bg-gray-900'>
        <Navbar/>
        <Body/>
        <Footer/>
    </div>
  )
}

export default LearningRoom
