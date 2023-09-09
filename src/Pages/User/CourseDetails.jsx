import React from 'react'
import Header from './../../Components/User/Courses/Header'
import Navbar from '../../Components/User/Navbar'
import Body from '../../Components/User/CourseDetails/Body'
import Footer from '../../Components/User/Footer'

const CourseDetails = () => {
  return (
    <>
    <Navbar/>
    <div className='lg:container mx-auto pt-24'>
      <Header/>
      <Body/>
      <Footer/>
    </div>
    </>
  )
}

export default CourseDetails
