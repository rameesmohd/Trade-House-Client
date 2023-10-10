import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from '../Pages/UserPage/Home'
import LoginAndSignup from '../Pages/UserPage/LoginAndSignup'
import { useSelector } from 'react-redux'
import Reqform from '../Pages/UserPage/Reqform'
import Courses from '../Pages/UserPage/Courses'
import CourseDetails from '../Pages/UserPage/CourseDetails'
import Payment from '../Pages/UserPage/Payments'
import Success from '../Pages/UserPage/Success'
import Userpanel from '../Pages/UserPage/Userpanel'
import LearningRoom from '../Pages/UserPage/LearningRoom'
import Market from '../Pages/UserPage/Market'
import Chat from '../Pages/UserPage/Chat'
import NotFoundPage from '../Pages/NotFoundPage'

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
            <Route path='/markets' element={<Market/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={ userAuth ? <Navigate to={'/home'}/> : <LoginAndSignup props='login'/>}/> 
            <Route path='/signup' element={ userAuth ? <Navigate to={'/home'}/> : <LoginAndSignup props='register'/>}/>
            
            {/* Private routes */}
            <Route path='/request-tutorship' element={ <PrivateRoute element={<Reqform/>}/> }/>
            <Route path='/payments' element={ <PrivateRoute element={<Payment/>}/> }/>
            <Route path='/payments/success' element={ <PrivateRoute element={<Success/>}/> }/>
            <Route path='/userpanel' element={ <PrivateRoute element={<Userpanel/>}/> }/>
            <Route path='/userpanel/watch' element={ <PrivateRoute element={<LearningRoom/>}/> }/>
            <Route path='/chat' element={ <PrivateRoute element={<Chat/>}/> }/>

             {/* 404 route */}
            <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default User
