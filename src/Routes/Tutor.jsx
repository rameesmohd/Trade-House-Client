import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import Dashboard from '../Pages/Tutor/Dashboard'
import Students from '../Pages/Tutor/Students';
import Mycourses from '../Pages/Tutor/Mycourses';
import Profile from '../Pages/Tutor/Profile'

const Tutor = () => {
  
  return (
    <>
       <Routes>
            <Route path='/profile' element={<Profile/>}/>  
            <Route path='/my-courses' element={<Mycourses/>}/>  
            <Route path='/overview' element={<Dashboard/>}/>
            <Route path='/students' element={<Students/>}/>
            <Route path='/*' element={<Dashboard/>}/>
       </Routes>
    </>
  )
}

export default Tutor
