import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'


const Dashboard = () => {
  return (
      <div className='flex pt-24 md:pl-64'>
          <Navbar/>
          <Sidebar/>
          <div className='w-full h-[500px] bg-green-300 grid grid-cols-6 gap-1'>
            <div className='space-x-1 bg-slate-500 '></div>
            <div className='space-x-1 bg-slate-500 '></div>
            <div className='space-x-1 bg-slate-500 '></div>
            <div className='space-x-1 bg-slate-500 '></div>
            <div className='space-x-1 bg-slate-500 '></div>
            <div className='space-x-1 bg-slate-500 '></div>
          </div>
      </div>
  )
}

export default Dashboard
