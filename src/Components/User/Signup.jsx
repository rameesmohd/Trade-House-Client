import React, { useRef,useState} from 'react'
import loginImg from '../../assets/stock-exchange-trading-floor.jpg'
import { Link, useNavigate } from 'react-router-dom'
import userAxios from '../../Axios/UserAxios'

const Signup = () => {
    const nameRef = useRef()
    const emailRef = useRef()
    const mobileRef = useRef()
    const passRef = useRef()
    const confRef = useRef()
    const navigate = useNavigate()
    const [error,setError] = useState({})

    const handleSubmit =(event)=>{
        event.preventDefault()
        const name = nameRef.current.value
        const email = emailRef.current.value
        const mobile = mobileRef.current.value
        const password = passRef.current.value
        const conf = confRef.current.value
        const validationErrors = {};

        if (!name){ validationErrors.name = 'Name is required';}
            else if(name.trim() === ''){ validationErrors.name = 'Invalid name'}
        if (!email){
            validationErrors.email = 'Email is required'
        }else if (!/\S+@\S+\.\S+/.test(email)){
            validationErrors.email = 'Invalid email format';
        }
        if (!mobile) {validationErrors.mobile = 'Mobile is required';}
        else if(!/^\d{10}$/.test(mobile)) {validationErrors.mobile = 'Mobile must be a 10-digit number';}

        if (!password){validationErrors.password = 'Password is required';}

        if(conf != password){validationErrors.nomatch = 'Password entered not matching'}

        if(Object.keys(validationErrors).length === 0) {
            setError(validationErrors);
            console.log('Form values:', { name, email, mobile, password });
            userAxios.post('/signup',{name,email,mobile,password}).then((res)=>{
                    if(res.data.status){
                        navigate('/login')} 
                    else{
                        validationErrors.resError = 'Something went wrong!!'
                        setError(validationErrors)
                    }
            })
        }else{
            setError(validationErrors);}
    }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg}/>
            </div>
            <div className='bg-grey-100 flex flex-col justify-center'>
            <form onSubmit={handleSubmit} action="" className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-4xl font-bold text-center py-6'>Sign Up</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input ref={nameRef} type='text' className='border p-2' required/>
                    {error.name && <div className="error">{error.name}</div>}
                </div>
                <div className='flex flex-col py-2'>
                    <label>Email</label>
                    <input ref={emailRef} type='email' className='border p-2' required/>
                    {error.email && <div className="error text-red-700">{error.email}</div>}
                </div> 
                <div className='flex flex-col py-2'>
                    <label>Mobile</label>
                    <input ref={mobileRef} type='number' className='border p-2' required/>
                    {error.mobile && <div className="error text-red-700">{error.mobile}</div>}
                </div>   
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input ref={passRef} type='password' className='border p-2' required/>
                    {error.password && <div className="error text-red-700">{error.password}</div>}
                </div>
                <div className='flex flex-col py-2'>
                    <label>Confirm Password</label>
                    <input ref={confRef} type='password' className='border p-2' required/>
                     {error.nomatch && <div className="error text-red-700">{error.nomatch}</div>}
                </div>
                    <button type='submit' className='text-white border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-400'>Sign Up</button>
                    {error.resError && <div className="error text-red-700">{error.resError}</div>}
                <div className='flex justify-between '>
                    <p className='flex items-center'><input className='mr-2' type="checkbox"/>Remember Me</p>
                    <Link to={'/login'}>Already have account</Link>
                </div>
            </form>
        </div>
    </div>
)}

export default Signup
