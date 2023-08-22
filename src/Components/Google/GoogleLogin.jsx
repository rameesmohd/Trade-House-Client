import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { decodeJwt } from 'jose'
import userAxios from '../../Axios/UserAxios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {clientLogin} from '../../Redux/ClientAuth'

const Login = ( ) => {
    const dispatch = useDispatch()
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
