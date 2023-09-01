import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/User/Home'
import LoginAndSignup from '../Pages/User/LoginAndSignup'
import { useSelector } from 'react-redux'
import Reqform from '../Pages/User/Reqform'

const User = () => {
  const userAuth = useSelector((state)=>state.Client.Token)

  return (
    <>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={userAuth ? <Home/> : <LoginAndSignup props='login'/>}/>
            <Route path='/signup' element={userAuth ? <Home/> : <LoginAndSignup props='register'/>}/>
            <Route path='/request-tutorship' element={userAuth ? <Reqform/> : <LoginAndSignup props='login'/> }/>
      </Routes>
    </>
  )
}

export default User
