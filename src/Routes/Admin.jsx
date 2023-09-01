import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard'
import Users from '../Pages/Admin/Users'
import Login from '../Components/Admin/login'
import { useSelector } from 'react-redux'
import TutorRequests from '../Pages/Admin/TutorRequests'
import Tutors from '../Pages/Admin/Tutors'

const Admin = () => {
  const adminAuth = useSelector((state)=>state.Admin.Token)
  return (
    <>
    <Routes >
        <Route path='/tutors' element={adminAuth ? <Tutors/> : <Login/>}/>
        <Route path='/tutor-requests' element={adminAuth ? <TutorRequests/> : <Login/>}/>
        <Route path='/users' element={adminAuth ? <Users/> : <Login/>}/>
        <Route path='/login' element={adminAuth ? <Dashboard/>  : <Login/>} />
        <Route path='/dashboard' element={adminAuth ? <Dashboard/> : <Login/>}/>    
        <Route path='/' element={adminAuth ? <Dashboard/> : <Login/>}/>
    </Routes >
    </>
  )
}

export default Admin
