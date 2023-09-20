import React from 'react'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'
import User from '../../Components/Admin/Users'


const Users = () => {
  return (
    <>
    <Navbar/>
      <div className='w-full h-14 top-0 bg-slate-300'/>
      <div className='flex'>
          <Sidebar/>
          <div className="w-40 h-full px-3 shrink-0 hidden md:block"/>
          <div className='w-16 h-full shrink-0 md:hidden'/>
           <User/>
      </div>
    </>
  )
}

export default Users
