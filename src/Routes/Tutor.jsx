import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import Dashboard from '../Pages/Tutor/Dashboard'
import Students from '../Pages/Tutor/Students';
import AddCourse from '../Pages/Tutor/AddCourse';

const Tutor = () => {
  
  return (
    <>
        <Routes>
            <Route path='/add-course' element={<AddCourse/>}/>  
            <Route path='/overview' element={<Dashboard/>}/>
            <Route path='/students' element={<Students/>}/>
            <Route path='/' element={<Dashboard/>}/>
        </Routes>
    </>
  )
}

export default Tutor
