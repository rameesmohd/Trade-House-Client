import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/Admin/Home'

const Admin = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default Admin
