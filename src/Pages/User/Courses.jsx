import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Header from '../../Components/User/Courses/Header'
import Footer from '../../Components/User/Footer'
import Filter from '../../Components/User/Courses/Filter'

const CoursesPage = () => {
  return (
    <div>
       <Navbar/>
      <div className='lg:container mx-auto pt-24'>
        <Header/>
        <Filter/>
        <Footer/>
      </div>
    </div>
  )
}

export default CoursesPage
