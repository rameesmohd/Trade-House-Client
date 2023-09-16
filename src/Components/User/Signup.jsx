import React, { useRef,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userAxios from '../../Axios/UserAxios'
import {BsFillShieldLockFill, BsTelephoneFill} from 'react-icons/bs'
import OtpInput from "otp-input-react"
import {CgSpinner} from 'react-icons/cg'
import 'react-phone-input-2/lib/style.css'
import {auth} from '../../config/firbase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {  toast } from 'react-toastify'
// import PhoneInput from 'react-phone-input-2'
// import loginImg from '../../assets/stock-exchange-trading-floor.jpg'


const Signup = () => {
    const axiosInstance = userAxios()
    const nameRef = useRef()
    const emailRef = useRef()
    const mobileRef = useRef()
    const passRef = useRef()
    const confRef = useRef()

    const [flag,setFlag] = useState(true)
    const [formData,setFormData] = useState()
    const [error,setError] = useState({})

    const [otp,setOtp] = useState()
    const [loading ,setLoading] = useState(false)
    const [showOTP,setShowOTP] = useState(false)
    // const [ph,setPh] = useState('')

    const navigate = useNavigate()

    const formValidation =()=>{
        const name = nameRef.current.value
        const email = emailRef.current.value
        const mobile = mobileRef.current.value
        const password = passRef.current.value
        const conf = confRef.current.value
        const validationErrors = {};

        if (!name){ 
            validationErrors.name = 'Name is required';
            }else if(name.trim() === ''){ 
                validationErrors.name = 'Invalid name'}
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
            setFormData({name,email,password,mobile})
            console.log(formData);
            handleOTP()
        }else{
            setError(validationErrors);}
    }

    const handleOTP =async ()=>{
        try {
            if(Object.keys(formData).length != 0){
                onCaptchaVerify()
                const appVerifier = window.recaptchaVerifier
                const formatPh = '+91'+formData.mobile
                signInWithPhoneNumber(auth, formatPh,appVerifier)
                    .then((confirmationResult) => {
                        window.confirmationResult = confirmationResult;
                        setFlag(false)
                        setLoading(false)
                        setShowOTP(true)
                        toast.success('OTP sent succesfully!!')
                    }).catch((error) => {
                        console.log(error);
                        setLoading(false)
                        const recaptchaContainer = document.getElementById('recaptcha-container');
                        if (recaptchaContainer) {
                            recaptchaContainer.innerHTML = ''; // Clear the recaptcha-container
                            const newRecaptchaContainer = document.createElement('div');
                            newRecaptchaContainer.id = 'recaptcha-container';
                            recaptchaContainer.parentNode.replaceChild(newRecaptchaContainer, recaptchaContainer);
                        }
                        toast.error('invalid mobile number')
                    });
            }else{
                toast.error('form data is invalid')
            }                
        } catch (error) {
            console.log(error);
        }
    }

    function onCaptchaVerify() {
        try{
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha-container",
                    {
                    size: "invisible",
                    callback: () => {
                    },
                    "expired-callback": () => {
                        toast.error("TimeOut");
                    }
                    },auth
                    )}
    }catch(err){
            console.log(err);
        }
    }

    const verifyOtp = ()=>{
          if (otp) {
          window.confirmationResult.confirm(otp)
              .then(async () =>{
                handleSubmit()
              })
              .catch(() => {
                setError("Enter a valid OTP");
                toast.error('Enter a valid OTP')
              });
          } else {
          setError("Enter OTP");
          toast.error('Enter OTP')
        }
    }

    const handleSubmit =async()=>{
        try {
            setLoading(true)
            await axiosInstance.post('/signup',formData).then((res)=>{
                if(res.status == 200){
                    toast.success(res?.data?.msg)
                    navigate('/login')} 
                else{
                    toast.error('Something went wrong in route!!')
                }
            }).catch((error)=>{
                toast.error(error)
            })    
        } catch (error) {
            toast.error(error.respons.data.errMsg)
        }
    }

  return (
    <div className='flex flex-col justify-center'>     
    <div id='recaptcha-container'></div>
      { flag ? 
        <div className='bg-grey-100 '>
            <form className='max-w-[400px] w-full mx-auto bg-white p-4'>
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
                    <button type='button' onClick={formValidation} className='text-white border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-400'>Sign Up</button>
                    {error.resError && <div className="error text-red-700">{error.resError}</div>}
                <div className='flex justify-between '>
                    <p className='flex items-center'><input className='mr-2' type="checkbox"/>Remember Me</p>
                    <Link to={'/login'}>Already have account</Link>
                </div>
            </form>
        </div>  : 
            <div className='bg-grey-100 flex flex-col justify-center'>
            <h2 className='text-4xl font-bold text-center py-6'>Sign Up</h2>
            {
                showOTP && 
            <>
            <form  className='max-w-[400px] w-full mx-auto bg-slate-100 p-4'>
                <div className='flex flex-col py-2'>
                    <label className='text-center'>Enter OTP</label>
                    <div className='text-blue-600 w-fit mx-auto py-2'>
                        <BsFillShieldLockFill size={30}/>
                    </div>
                    <OtpInput 
                     value={otp}
                     onChange={setOtp}
                     OTPLength={6}
                     otpType="number" 
                     disabled={false}
                     autoFocus
                     className="opt-container mx-auto flex justify-between" />
                </div>
                <button type='button' onClick={verifyOtp} className='text-white border w-full my-5 py-2 bg-indigo-600 flex justify-center' >
                    { 
                        loading && <CgSpinner size={20} className='mt-1 animate-spin mr-2' />
                    }
                    <span>Verify OTP</span>
                </button>
            </form>     
            </> 
            } 
        </div>    
        }
    </div>   
)}

export default Signup
