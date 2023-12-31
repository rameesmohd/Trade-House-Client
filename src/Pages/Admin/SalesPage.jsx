import React from 'react'
import Sales from '../../Components/Admin/Sales'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'

const SalesPage = () => {
  return (
    <>
      <Navbar/>
      <div className='w-full h-14 top-0 bg-slate-300'/>
      <div className='flex'>
        <Sidebar/>
        <div className="w-40 h-full px-3 hidden md:block"/>
      
        <Sales/>
      </div>
    </>
  )
}

export default SalesPage

