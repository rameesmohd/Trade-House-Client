import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard'
import Users from '../Pages/Admin/Users'
import Login from '../Components/Admin/login'

const Admin = () => {
  return (
    <>
    <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>    
        <Route path='/users' element={<Users/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default Admin
