import React, { useRef, useState ,useEffect} from 'react'
import tutorAxios from '../../Axios/TutorAxios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import GoogleLogin  from '../Google/GoogleLogin'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { tutorLogin } from '../../Redux/TutorAuth'

const Login =()=>{
    const userCookie = Cookies.get('user');
    const tutorAxiosInstance = tutorAxios()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error ,setError] = useState({})
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
                await tutorAxiosInstance.post('/login', {email,password})
                .then((res)=>{
                    const token = res.data?.token
                    const id = res.data?.id
                    if(token){
                    dispatch(tutorLogin({token : token,id : id}))
                    }
                    navigate('/tutor/')
                }).catch((error)=>{
                    navigate('/tutor/login')
                    toast.error(error.response.data.message)
                })
        }else{
            setError(validationErrors)
        }
    }

 
    return (
        <div className='bg-grey-100 flex flex-col justify-center'>
            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-white p-4'>
            <h2 className='text-lg font-bold text-center '>Tutor's</h2>
                <h2 className='text-4xl font-bold text-center pb-6'>Login In</h2>
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
                    <Link to={'/login'} className='underline'>Back</Link>
                </div>
                <div className='flex justify-between'>
               
               
                </div>
            </form> 
        </div>
  )
}

export default Login
