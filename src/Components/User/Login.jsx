import React, { useRef, useState } from 'react'
import userAxios from '../../Axios/UserAxios'
import { Link, useNavigate } from 'react-router-dom'
import {CgSpinner} from 'react-icons/cg'
import { toast } from 'react-toastify'
import GoogleLogin  from '../Google/GoogleLogin'
import { useDispatch } from 'react-redux'
import { clientLogin } from '../../Redux/ClientAuth'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const newPassRef = useRef()
    const newPassConfirmRef = useRef()
    const [error ,setError] = useState({})
    const [forgot,setForgot] = useState(false)
    const [userExist,setUserExist] =useState(false)
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                console.log(res.data);
                const result = res.data.response
                 if(result.status){                    
                     dispatch(clientLogin({
                        token : result?.token,
                        email : result?.email,
                        name : result?.name
                     }))
                     navigate('/home')
                 }else{
                     toast.error(result.message)     
                 }
            }).catch((error)=>{
                console.log(error);
                toast.error(error.response.data?.response?.message) 
            })
        }else{
            setError(validationErrors)
        }
    }
    
    const forgotPassAuth =async(email)=>{
        if(!email){
            toast.error('Email is required');
        }else if(!/\S+@\S+\.\S+/.test(email)){
            toast.error('Invalid email format');
        }else{
            try {
                setLoading(true)
                await userAxios.get(`/forgetpassword?email=${email}`).then((res)=>{
                    console.log(res);
                    res.status ? setUserExist(true) : ''   
                    setEmail(email)
                }).catch((error)=>{
                    toast.error(error.response.data.msg)
                })
                setLoading(false)    
            } catch (error) {
                toast.error('somthing went wrong')
            }
            
        }
    }

    const forgotPass =async()=>{
        const password = newPassRef.current.value
        const confirmPass = newPassConfirmRef.current.value
        const validationErrors = {}

        if (!password)
            validationErrors.password = 'Password is required';
        if(confirmPass != password)
            validationErrors.nomatch = 'Password entered not matching'
        if(Object.keys(validationErrors).length === 0) {
            setLoading(true)
            await userAxios.post('/forgetpassword',{password,email}).then((res)=>{
                res.status ? toast.success(res.data.msg) : 
                toast.error('something went wrong')
                setForgot(false)
                setLoading(false)
                setUserExist(false)
            }).catch((err)=>{
                toast.error(error.response.data.msg)
            })
        }else{
            setError(validationErrors)
        }
    }

    return (
        <div className='bg-grey-100 flex flex-col justify-center'>
            { !forgot ? 
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Sign In</h2>
                    <div className=' flex justify-center'><GoogleLogin/> </div>
                    <p className='text-center'>or</p>
                    <hr className='my-5' />
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
                <Link onClick={()=>setForgot(true)} className='text-blue-500'>Forget password?</Link>
            </form> :
            ( !userExist ?
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4 border '>
                <h2 className='text-4xl font-bold text-center py-6'>Forget Password</h2>
                <div className='flex flex-col py-2'>
                    <input ref={emailRef} type='text' className='border p-2' placeholder='Enter your email'/>
                    <button type='button' onClick={()=>forgotPassAuth(emailRef.current.value)} className='text-white border
                     w-full my-8 py-2 bg-indigo-600 hover:bg-indigo-400 flex justify-center'>
                    { 
                        loading && <CgSpinner size={20} className='mt-1 animate-spin mr-2' />
                    }
                        <span>Submit</span>
                    </button>
                    {error.user && <div className="error text-red-700">{error.user}</div>}
                    <Link onClick={()=>setForgot(false)} className='text-right'>Back to login</Link>
                </div>
            </form> : 
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4 border '>
                 <h2 className='text-4xl font-bold text-center py-6'>Forget Password</h2>
                <div className='flex flex-col py-2'>
                    <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input ref={newPassRef} type='text' className='border p-2' required/>
                    {error.password && <div className="error text-red-700">{error.password}</div>}
                    </div>
                    <div className='flex flex-col py-2'>
                    <label>Confirm Password</label>
                    <input ref={newPassConfirmRef} type='password' className='border p-2'  required/>
                    {error.nomatch && <div className="error text-red-700">{error.nomatch}</div>}
                    </div>
                    <button type='button' onClick={()=>forgotPass()} className='text-white border
                     w-full my-8 py-2 bg-indigo-600 hover:bg-indigo-400 flex justify-center'>
                    { 
                    loading && <CgSpinner size={20} className='mt-1 animate-spin mr-2' />
                    }
                    <span>Submit</span>
                    </button>
                    <Link onClick={()=>{setForgot(false),setUserExist(false)}} className='text-right'>Back to login</Link>
                </div>
            </form> )}
        </div>
  )
}

export default Login
