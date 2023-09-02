import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'
import Mycourse from '../../Components/Tutor/Mycourse'

const Mycourses = () => {
  return (
    <div className='pt-24 md:pt-0 md:pl-64'>
    <Navbar/>
    <Sidebar/>
    <Mycourse/>
    </div>
  )
}

export default Mycourses
