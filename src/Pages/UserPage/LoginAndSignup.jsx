import React from 'react'
import loginImg from '../../assets/adam-nowakowski-D4LDw5eXhgg-unsplash.jpg'
import Login from '../../Components/User/Login'
import Signup from '../../Components/User/Signup'


const LoginAndSignup = ({props}) => {
  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2  h-screen w-full'>
            <div className='hidden md:block'>
                <img className='max-h-screen w-full object-cover' src={loginImg}/>
            </div>
            {
                props == 'login' ? <Login/> :  <Signup/> 
            }
    </div>
    </div>
  )
}

export default LoginAndSignup
