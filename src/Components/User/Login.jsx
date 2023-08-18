import React, { useRef, useState } from 'react'

import userAxios from '../../Axios/UserAxios'
import { Link, useNavigate } from 'react-router-dom'
import {CgSpinner} from 'react-icons/cg'
import { toast } from 'react-toastify'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error ,setError] = useState({})
    const [forgot,setForgot] = useState(false)
    const [userExist,setUser] =useState(true)
    const [loading,setLoading] = useState(false)
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
    
    const forgotPass =async(email)=>{
      
        if(!email){
            toast.error('Email is required');
        }else if(!/\S+@\S+\.\S+/.test(email)){
            toast.error('Invalid email format');
        }else{
            setLoading(true)
            await userAxios.post('/forgetpassword',{email}).then((res)=>{
                if(res.status){
                    setUser(true)
                }
            })
        }
    }

    return (
        <div className='bg-grey-100 flex flex-col justify-center'>
            { !forgot ? 
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Sign In</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input ref={emailRef} type='text' className='border p-2' placeholder='Enter your email'/>
                    {error.email && <div className="error text-red-700">{error.email}</div>}
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input ref={passwordRef} type='text' className='border p-2' placeholder='Password'/>
                    {error.password && <div className="error text-red-700">{error.password}</div>}
                </div>
                <button type='submit' className='text-white border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-400'>Login</button>
                {error.resError && <div className="error text-red-700">{error.resError}</div>}
                <div className='flex justify-between '>
                    <p className='flex items-center'><input className='mr-2' type="checkbox"/>Remember Me</p>
                    <Link to={'/signup'}>Create an account</Link>
                </div>
                <Link onClick={()=>setForgot(true)}>Forget password</Link>
            </form> :( !userExist ?
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4 border '>
                <h2 className='text-4xl font-bold text-center py-6'>Forget Password</h2>
                <div className='flex flex-col py-2'>
                    <input ref={emailRef} type='text' className='border p-2' placeholder='Enter your email'/>
                    <button type='button' onClick={()=>forgotPass(emailRef.current.value)} className='text-white border
                     w-full my-8 py-2 bg-indigo-600 hover:bg-indigo-400 flex justify-center'>
                    { 
                        loading && <CgSpinner size={20} className='mt-1 animate-spin mr-2' />
                    }
                        <span>Submit</span>
                    </button>
                    <Link onClick={()=>setForgot(false)} className='text-right'>Back to login</Link>
                </div>
            </form> : 
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4 border '>
                 <h2 className='text-4xl font-bold text-center py-6'>Forget Password</h2>
                <div className='flex flex-col py-2'>
                    <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2' required/>
                    {error.password && <div className="error text-red-700">{error.password}</div>}
                    </div>
                    <div className='flex flex-col py-2'>
                    <label>Confirm Password</label>
                    <input type='password' className='border p-2'  required/>
                    {error.nomatch && <div className="error text-red-700">{error.nomatch}</div>}
                    </div>
                    <button type='button' onClick={()=>forgotPass(emailRef.current.value)} className='text-white border
                     w-full my-8 py-2 bg-indigo-600 hover:bg-indigo-400 flex justify-center'>
                    { 
                    loading && <CgSpinner size={20} className='mt-1 animate-spin mr-2' />
                    }
                    <span>Submit</span>
                    </button>
                    <Link onClick={()=>setForgot(false)} className='text-right'>Back to login</Link>
                </div>
            </form> )}
        </div>
  )
}

export default Login
