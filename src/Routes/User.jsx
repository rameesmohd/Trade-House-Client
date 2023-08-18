import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/User/Home'
import Login from '../Pages/User/Login'
import Signup from '../Pages/User/Signup'
const User = () => {
  return (
    <>
      <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default User
