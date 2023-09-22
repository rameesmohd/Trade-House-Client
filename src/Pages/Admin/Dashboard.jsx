import React from 'react'
import Dashboard from '../../Components/Admin/Dashboard'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'


const Home = () => {
  return (
    <>
      <Navbar/>
      <div className='w-full h-14 top-0 bg-slate-300 '/>
      <div className='flex h-screen w-screen'>
        <div className="w-40 h-full px-3 hidden md:block"/>
        <div className='w-16 h-full md:hidden bg-black'/>
        <Sidebar/>
        <Dashboard/>
      </div>
    </>
  )
}

export default Home
