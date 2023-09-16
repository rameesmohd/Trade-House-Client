import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'
import ModulesList from '../../Components/Tutor/ModulesList'

const Modules = () => {
  return (
    <div className='pt-24 md:pt-0 md:pl-64'>
    {/* <Navbar/> */}
    <Sidebar/>
    <ModulesList/>
    </div>
  )
}

export default Modules
