import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard'
import Users from '../Pages/Admin/Users'

const Admin = () => {
  return (
    <>
    <Routes>
        <Route path='/Dashboard' element={<Dashboard/>}/>    
        <Route path='/users' element={<Users/>}/>
        <Route path='/' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default Admin
