import React from 'react'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'
import Tutor from '../../Components/Admin/Tutors'

const Tutors = () => {
  return (
    <>
      <Navbar/>
      <div className='w-full h-14 top-0 bg-slate-300'/>
      <div className='flex'>
          <Sidebar/>
          <div className="w-40 h-full px-3 shrink-0 hidden md:block"/>
          <Tutor/>
      </div>
    </>
  )
}

export default Tutors
