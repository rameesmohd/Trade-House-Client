import React, { useRef, useState ,useEffect} from 'react'
import userAxios from '../../Axios/UserAxios'
import tutorAxios from '../../Axios/TutorAxios'
import { Link, useNavigate } from 'react-router-dom'
import {CgSpinner} from 'react-icons/cg'
import { toast } from 'react-toastify'
import GoogleLogin  from '../Google/GoogleLogin'
import { useDispatch } from 'react-redux'
import { clientLogin } from '../../Redux/ClientAuth'
import {BsFillShieldLockFill} from 'react-icons/bs'
import OtpInput from "otp-input-react"
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { tutorLogin } from '../../Redux/TutorAuth'

const Login =()=>{
    const userCookie = Cookies.get('user');
    const axiosInstance = userAxios()
    const tutorAxiosInstance = tutorAxios()
    const emailRef = useRef()
    const passwordRef = useRef()
    const newPassRef = useRef()
    const newPassConfirmRef = useRef()
    const [error ,setError] = useState({})
    const [forgot,setForgot] = useState(false)
    const [userExist,setUserExist] =useState(false)
    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState()
    const [otp,setOtp] = useState()
    const [otpFieldShow,setOtpFieldShow] = useState(false)
    const [compareOTP,setCompareOtp] = useState('')
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [remeberMe,setRememberMe] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    useEffect(()=>{
        if(userCookie) {
            console.log(userCookie.email);
            const userObject = JSON.parse(userCookie);
            emailRef.current.value = userObject.email;
        } 
    },[])


    const handleSubmit=async(event)=>{
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const validationErrors = {}
        if(!email){
            validationErrors.email = 'Email is required';
        }else if(!/\S+@\S+\.\S+/.test(email)){
            validationErrors.email = 'Invalid email format';
        }
        if(!password){
            validationErrors.password = 'Password is required';
        }
        if(remeberMe){
            try {
                const userObject = { email: email };
                Cookies.set('user', JSON.stringify(userObject), { expires: 30 });
                console.log('Cookie set successfully');
            } catch (error) {
                console.error('Error setting cookie:', error);
            }
        }  
        if(Object.keys(validationErrors).length === 0){
            setError(validationErrors)
            await axiosInstance.post('/login',{email,password}).then((res)=>{
                    const result = res.data.response
                 if(result.status){   
                    dispatch(clientLogin({
                        token : result?.token,
                        email : result?.email,
                        name : result?.name,
                        is_requested : result?.is_requested,
                        is_tutor : result?.is_tutor
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

    const generateOTP =()=> {
        const min = 100000; // Smallest 6-digit number
        const max = 999999; // Largest 6-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const forgotPassAuth =async(email)=>{
        if(!email){
            toast.error('Email is required');
        }else if(!/\S+@\S+\.\S+/.test(email)){
            toast.error('Invalid email format');
        }else{
            try {
                setLoading(true)
                const OTP =  generateOTP()
                setOtp(OTP)
                await axiosInstance.post('/forgetpasswordauth',{email,OTP}).then((res)=>{
                    console.log(res);
                    toast.success(res.data.message)
                    //------
                    res.status ? setOtpFieldShow(true) : ''   
                    setEmail(email)
                    timerStart()
                }).catch((error)=>{
                    toast.error(error.response.data.message)
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
            await axiosInstance.post('/forgetpassword',{password,email}).then((res)=>{
                res.status ? toast.success(res.data.msg) : 
                toast.error('something went wrong')
                setForgot(false)
                setLoading(false)
                setUserExist(false)
                setOtpFieldShow(false)
            }).catch((err)=>{
                toast.error(error.response.data.msg)
            })
        }else{
            setError(validationErrors)
        }
    }
    
    const verifyOTP=()=>{
        if(compareOTP==otp){
            console.log(compareOTP,otp);
            setUserExist(true)
        }else{
            toast.error('incurrect OTP')
        }
    }
    
    useEffect(() => {
        let timer;
        if (isActive && seconds > 0) {
        timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        }else{
            timerReset()
        }
        return () => {
        clearInterval(timer)};
    }, [isActive, seconds]);

    const timerStart = () => {
        setIsActive(true);
    };

    const timerReset = () => {
        setIsActive(false);
        setSeconds(30);
    };

 
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
                <div className='flex flex-col py-2 relative'>
                    <label>Password</label>
                    <input  ref={passwordRef} type={showPassword ? 'text' : 'password'} className='border p-2 ' placeholder='Password'/>
                    <button
                        className="toggle-password absolute right-3 top-11"
                        onClick={togglePasswordVisibility}
                        type="button"
                    >
                        <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="eye-icon"
                        />
                    </button>
                    {error.password && <div className="error text-red-700">{error.password}</div>}
                </div>
                <button type='submit' className='text-white border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-400'>Login</button>
                {error.resError && <div className="error text-red-700">{error.resError}</div>}
                <div className='flex justify-between '>
                    <p className='flex items-center'>
                        <input className='mr-2' type="checkbox" name='remember_me' id='remember_me' onChange={()=>setRememberMe(!remeberMe)} checked={remeberMe} />
                        Remember Me</p>
                    <Link to={'/signup'}>Create an account</Link>
                </div>
                <div className='flex justify-between'>
                <Link onClick={()=>setForgot(true)} className='text-blue-500'>Forget password?</Link>
                <label class="relative inline-flex items-center mb-5 cursor-pointer">
                    <span onClick={()=>navigate('/tutor/login')} class="ml-3 text-sm font-medium text-gray-500 underline">Login as Instructor</span>
                </label>
                </div>
            </form> :
            ( !userExist ?
            ( !otpFieldShow ? <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4 border '>
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
                    {error.message && <div className="error text-red-700">{error.message}</div>}
                    <Link onClick={()=>setForgot(false)} className='text-right'>Back to login</Link>
                </div>
            </form> : 
            <form  className='max-w-[400px] w-full mx-auto bg-slate-100 p-4'>
            <div className='flex flex-col py-2'>
                <label className='text-center'>Enter OTP</label>
                <div className='text-blue-600 w-fit mx-auto py-2'>
                    <BsFillShieldLockFill size={30}/>
                </div>
                <OtpInput 
                 value={compareOTP}
                 onChange={setCompareOtp}
                 OTPLength={6}
                 otpType="number" 
                 disabled={false}
                 autoFocus
                 className="opt-container mx-auto flex justify-between" />
            </div>
            { isActive ? 
                <button type='button' onClick={verifyOTP} className='text-white border w-full my-5 py-2 bg-indigo-600 flex justify-center' >
                { 
                    loading && <CgSpinner size={20} className='mt-1 animate-spin mr-2' />
                }
                <span>Verify OTP <h1>{seconds}</h1></span>
            </button> :
               <button type='button' onClick={()=>forgotPassAuth(email)} className='text-white border w-full my-5 py-2 bg-indigo-600 flex justify-center' >
               { 
                   loading && <CgSpinner size={20} className='mt-1 animate-spin mr-2' />
               }
               <span>Resend OTP </span>
           </button>
            }
            </form>    
            ) : 
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4 border '>
                 <h2 className='text-4xl font-bold text-center py-6'>Forget Password</h2>
                <div className='flex flex-col py-2'>
                    <div className='flex flex-col py-2'>
                    <label>New Password</label>
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
