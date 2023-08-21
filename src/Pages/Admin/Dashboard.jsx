import React from 'react'
import Dashboard from '../../Components/Admin/Dashboard'
import Navbar from '../../Components/Admin/Navbar'
import Sidebar from '../../Components/Admin/Sidebar'


const Home = () => {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <Dashboard/>
    </>
  )
}

export default Home
