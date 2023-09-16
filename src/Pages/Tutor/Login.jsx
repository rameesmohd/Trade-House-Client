import React from 'react'
import loginImg from '../../assets/adam-nowakowski-D4LDw5eXhgg-unsplash.jpg'
import Login from '../../Components/Tutor/Login'
import img from './../../assets/download.jpeg'


const LoginTutor = () => {
  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2  h-screen w-full'>
            <div className='hidden md:block'>
                <img className='h-screen w-full object-cover' src={img}/>
            </div>
            <Login/> 
    </div>
    </div>
  )
}

export default LoginTutor
