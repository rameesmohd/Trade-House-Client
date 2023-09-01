import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import Dashboard from '../Pages/Tutor/Dashboard'
import Students from '../Pages/Tutor/Students';

const Tutor = () => {
  
  return (
    <>
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/students' element={<Students/>}/>
            <Route path='/' element={<Dashboard/>}/>
        </Routes>
    </>
  )
}

export default Tutor
