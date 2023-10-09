import React from 'react'
import { Navigate, Route ,Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../Pages/Tutor/Dashboard'
import Students from '../Pages/Tutor/Students';
import Mycourses from '../Pages/Tutor/Mycourses';
import Profile from '../Pages/Tutor/Profile'
import { useSelector } from 'react-redux';
import Modules from '../Pages/Tutor/Modules';
import Login from '../Pages/Tutor/Login'
import Chat from '../Pages/Tutor/Chat';
import NotFoundPage from '../Pages/NotFoundPage'


const Tutor = () => {
  const tutorAuth = useSelector((state)=>state.Tutor.Token)
  const PrivateRoute = ({ element, ...rest }) => {
    return tutorAuth ? element : <Navigate to="/tutor/login"/>;
  };
  return (
    <>      
       <Routes>
            <Route path='/login' element={ tutorAuth ? <Navigate to='/tutor/'/> : <Login/>}/>
            
            <Route path='/' element={ <PrivateRoute element={<Dashboard/>}/>}/>
            <Route path='/overview' element={ <PrivateRoute element={<Dashboard/>}/>}/>
            <Route path='/profile' element={ <PrivateRoute element={<Profile/>} /> }/>  
            <Route path='/my-courses' element={ <PrivateRoute element={<Mycourses/>} /> }/>  
            <Route path='/students' element={ <PrivateRoute element={<Students/>} />}/>
            <Route path='/modules' element={ <PrivateRoute element={<Modules/>} />}/>
            <Route path='/chat' element={ <PrivateRoute element={<Chat/>} />}/>

            <Route path='*' element={<NotFoundPage />} />
       </Routes>
    </>
  )
}

export default Tutor
