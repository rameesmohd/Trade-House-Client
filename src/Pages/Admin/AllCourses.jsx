import React from 'react'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'
import Courses from '../../Components/Admin/Courses'


const Users = () => {
  return (
    <>
    <Navbar/>
      <div className='flex'>
          <Sidebar/>
          <div className="w-40 h-full px-3 shrink-0 hidden md:block"/>
          <div className='w-16 h-full shrink-0 md:hidden'/>
          <Courses/>
      </div>
    </>
  )
}

export default Users
