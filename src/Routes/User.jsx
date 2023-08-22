import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/User/Home'
import LoginAndSignup from '../Pages/User/LoginAndSignup'
import { useSelector } from 'react-redux'

const User = () => {
    const Auth = useSelector((state)=>state.Client)

  return (
    <>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={Auth.Token ? <Home/> : <LoginAndSignup props='login'/>}/>
            <Route path='/signup' element={Auth.Token ? <Home/> : <LoginAndSignup props='register'/>}/>
      </Routes>
    </>
  )
}

export default User
