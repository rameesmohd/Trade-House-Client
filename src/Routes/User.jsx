import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/User/Home'
import LoginAndSignup from '../Pages/User/LoginAndSignup'
const User = () => {
  return (
    <>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<LoginAndSignup props='login'/>}/>
            <Route path='/signup' element={<LoginAndSignup props='register'/>}/>
      </Routes>
    </>
  )
}

export default User
