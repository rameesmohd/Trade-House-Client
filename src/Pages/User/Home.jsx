import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Header from '../../Components/User/Home/Header'
import Home from '../../Components/User/Home/Home'


function HomePage() {
  return (
    <>
      <Navbar/>
      <div className='lg:container mx-auto pt-24 lg:pt-5'>
      <Header/>
      <Home/>
      </div>
    </>
  )
}

export default HomePage
