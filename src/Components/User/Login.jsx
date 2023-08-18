import React, { useRef, useState } from 'react'

import userAxios from '../../Axios/UserAxios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error ,setError] = useState({})
    const navigate = useNavigate()
    
    const handleSubmit=(event)=>{
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const validationErrors = {}
        if(!email){
            validationErrors.email = 'Email is required';
        }else if(!/\S+@\S+\.\S+/.test(email)){
            validationErrors.email = 'Invalid email format';
        }
        if(Object.keys(validationErrors).length === 0){
            setError(validationErrors)
            userAxios.post('/login',{email,password}).then((res)=>{
                if(res.data.status){  
                    navigate('/home')} 
                else{
                    validationErrors.resError = 'Something went wrong!!'
                    setError(validationErrors)
                }
        })
        }else{
            setError(validationErrors)
        }
    }

    return (
            <div className='bg-grey-100 flex flex-col justify-center'>
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Sign In</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input ref={emailRef} type='text' className='border p-2' placeholder='enter your email'/>
                    {error.email && <div className="error text-red-700">{error.email}</div>}
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input ref={passwordRef} type='text' className='border p-2' placeholder='password'/>
                    {error.password && <div className="error text-red-700">{error.password}</div>}
                </div>
                <button type='submit' className='text-white border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-400'>Login</button>
                {error.resError && <div className="error text-red-700">{error.resError}</div>}
                <div className='flex justify-between '>
                    <p className='flex items-center'><input className='mr-2' type="checkbox"/>Remember Me</p>
                    <p>Create an account</p>
                </div>
            </form>
        </div>
  )
}

export default Login
