import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { decodeJwt } from 'jose'
import userAxios from '../../Axios/UserAxios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = ( ) => {
    const navigate = useNavigate()
  return (
    <>
        <GoogleLogin 
            onSuccess={(credentialResponse) =>{
                console.log(credentialResponse);
                const {credential} = credentialResponse
                const payload = credential ? decodeJwt(credential) : undefined
                if(payload){
                    console.log(payload);
                    userAxios.post('/login',{payload,google:true}).then((res)=>{
                        res.status ? navigate('/home') : (
                            setError(validationErrors),
                            toast.error('client side error'))
                    }).catch((error)=>{
                        toast.error(error.response?.data?.response?.message) 
                    })
                }
            }}
            onError={error=> console.log(error)}
            useOneTap
        />
    </>
  )
}

export default Login
