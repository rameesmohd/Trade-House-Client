import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../Pages/Admin/Dashboard'
import Users from '../Pages/Admin/Users'
import Login from '../Components/Admin/login'
import { useSelector } from 'react-redux'
import TutorRequests from '../Pages/Admin/TutorRequests'
import Tutors from '../Pages/Admin/Tutors'
import Categories from '../Pages/Admin/Categories'

const Admin = () => {
  const adminAuth = useSelector((state) => state.Admin.Token)
  const PrivateRoute = ({ element, ...rest }) => {
    return adminAuth ? element : <Navigate to="/admin/login" />;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={adminAuth? <Navigate to={'/admin/'}/> : <Login />} />

      {/* Private routes */}
      <Route path="/*" element={<PrivateRoute element={<Dashboard />}/>}/>
      <Route path="/tutors" element={<PrivateRoute element={<Tutors/>}/>}/>
      <Route path="/tutor-requests" element={<PrivateRoute element={<TutorRequests />}/>}/>
      <Route path="/users" element={<PrivateRoute element={<Users />}/>}/>
      <Route path="/category" element={<PrivateRoute element={<Categories/>}/>}/>
    </Routes>
  );
}

export default Admin
