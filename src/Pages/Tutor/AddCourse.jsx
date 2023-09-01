import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'
import Addcoursecover from '../../Components/Tutor/Addcoursecover'

const AddCourse = () => {
  return (
    <div className='pt-24 md:pt-0 md:pl-64'>
      <Navbar/>
      <Sidebar/>
      <Addcoursecover/>
    </div>
  )
}

export default AddCourse
