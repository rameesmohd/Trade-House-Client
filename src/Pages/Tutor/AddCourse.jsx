import React from 'react'
import Navbar from '../../Components/Tutor/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'
import Addcourse from '../../Components/Tutor/Addcourse'

const AddCourse = () => {
  return (
    <div className='pt-24 md:pt-0 md:pl-64'>
      <Navbar/>
      <Sidebar/>
      <Addcourse/>
    </div>
  )
}

export default AddCourse
