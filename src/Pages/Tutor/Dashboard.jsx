import React from 'react'
import Navbar from '../../Components/Tutor/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'
import Overview from '../../Components/Tutor/Overview'


const Dashboard = () => {
  return (
      <div className='pt-24 md:pt-0 md:pl-64'>
          <Navbar/>
          <Sidebar/>
          <Overview/>
      </div>
  )
}

export default Dashboard
