import React, { useRef, useState ,useEffect} from 'react'
import tutorAxios from '../../Axios/TutorAxios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { tutorLogin } from '../../Redux/TutorAuth'

const Login =()=>{
    const tutorAxiosInstance = tutorAxios()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error ,setError] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

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
        if(Object.keys(validationErrors).length === 0){
            setError(validationErrors)
                await tutorAxiosInstance.post('/login', {email,password})
                .then((res)=>{
                    console.log(res);
                    const token = res.data.token
                    const id = res.data.id
                    if(token){
                    dispatch(tutorLogin({token : token,id : id}))}
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
            <h2 className='text-lg font-bold text-center font-poppins'>Tutor's</h2>
                <h2 className='text-4xl font-bold text-center pb-6 font-poppins'>Login In</h2>
                     <div className='flex flex-col py-2'>
                    <label className='font-poppins'>Username</label>
                    <input ref={emailRef} type='text' className='border p-2 rounded-md font-poppins' placeholder='Enter your email'/>
                    {error.email && <div className="error text-xs text-red-700">{error.email}</div>}
                </div>
                <div className='flex flex-col py-2 relative'>
                    <label className='font-poppins'>Password</label>
                    <input  ref={passwordRef} type={showPassword ? 'text' : 'password'} className='border p-2 rounded-md font-poppins' placeholder='Password'/>
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
                    {error.password && <div className="error text-xs text-red-700">{error.password}</div>}
                </div>
                <button type='submit' className='text-white border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-400 rounded-lg'>Login</button>
                {error.resError && <div className="error text-red-700">{error.resError}</div>}
                <div className='flex justify-between '>
                    <Link to={'/login'} className='underline'>Back</Link>
                </div>
                <div className='flex justify-between'>
               
               
                </div>
            </form> 
        </div>
  )
}

export default Login
