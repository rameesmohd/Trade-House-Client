import React from 'react'
import Navbar from '../../Components/Tutor/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'
import StudentsTable from '../../Components/Tutor/Students'

const Students = () => {
  return (
    <>
     <div className='pt-24 md:pt-0 md:pl-64'>
    <Navbar/>
    <Sidebar/>
    <StudentsTable/>
     </div>
    </>
  )
}

export default Students
