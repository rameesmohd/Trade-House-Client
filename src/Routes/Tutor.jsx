import React from 'react'
import { Navigate, Route ,Routes } from 'react-router-dom'
import Dashboard from '../Pages/Tutor/Dashboard'
import Students from '../Pages/Tutor/Students';
import Mycourses from '../Pages/Tutor/Mycourses';
import Profile from '../Pages/Tutor/Profile'
import { useSelector } from 'react-redux';
import Modules from '../Pages/Tutor/Modules';

const Tutor = () => {
  const tutorAuth = useSelector((state)=>state.Tutor.Token)
  const PrivateRoute = ({ element, ...rest }) => {
    return tutorAuth ? element : <Navigate to="/login" />;
  };
  return (
    <>
       <Routes>
            <Route path='/' element={<Dashboard/>}/>
      
            <Route path='/overview' element={ <PrivateRoute element={<Dashboard/>}/>}/>
            <Route path='/profile' element={ <PrivateRoute element={<Profile/>} /> }/>  
            <Route path='/my-courses' element={ <PrivateRoute element={<Mycourses/>} /> }/>  
            <Route path='/students' element={ <PrivateRoute element={<Students/>} />}/>
            <Route path='/modules' element={ <PrivateRoute element={<Modules/>} />}/>
       </Routes>
    </>
  )
}

export default Tutor
