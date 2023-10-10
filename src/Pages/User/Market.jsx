import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Footer from '../../Components/User/Footer'
import MainBody from './../../Components/User/Markets/MainBody'

const Market = () => {
  return (
    <div className='lg:container mx-auto'>
        <Navbar/>
        <MainBody/>
        <Footer/>
    </div>
  )
}

export default Market
