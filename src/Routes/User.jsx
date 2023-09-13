import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from '../Pages/User/Home'
import LoginAndSignup from '../Pages/User/LoginAndSignup'
import { useSelector } from 'react-redux'
import Reqform from '../Pages/User/Reqform'
import Courses from '../Pages/User/Courses'
import CourseDetails from '../Pages/User/CourseDetails'

const User = () => {
  const userAuth = useSelector((state)=>state.Client.Token)

  const PrivateRoute = ({ element, ...rest }) => {
    return userAuth ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/courses' element={<Courses/>}/>
            <Route path='/course-details' element={<CourseDetails/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={ userAuth ? <Navigate to={'/home'}/> : <LoginAndSignup props='login'/>}/> 
            <Route path='/signup' element={ userAuth ? <Navigate to={'/home'}/> : <LoginAndSignup props='register'/>}/>

            {/* Private routes */}
            <Route path='/request-tutorship' element={ <PrivateRoute element={<Reqform/>}/> }/>
            <Route path='/purchase' element={ <PrivateRoute element={<Reqform/>}/> }/>
      </Routes>
    </>
  )
}

export default User
