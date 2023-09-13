import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'
import Overview from '../../Components/Tutor/Overview'
import { useEffect } from 'react'
import tutorAxios from '../../Axios/TutorAxios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { tutorLogin } from '../../Redux/TutorAuth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const axiosInstance = tutorAxios()
  const userEmail = useSelector((state)=>state.Client.email)
  const tutorToken = useSelector((state)=>state.Tutor?.Token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!userEmail){
      navigate('/')
    }else{
      console.log(userEmail);
      const verify =async()=>
      { 
       await axiosInstance.get('/verify', { params: { userEmail } })
       .then((res)=>{
         console.log( res.data?.token);
         const token = res.data?.token
         const id = res.data?.id
         if(token){
           dispatch(tutorLogin({token : token,id : id}))
         }
      }).catch((error)=>{
         navigate('/')
         toast.error(error.response.data.message)
      })}
      verify()
    }
  },[])
  
  return (
      <div className='pt-24 md:pl-64'>
          <Navbar/>
          <Sidebar/>
          <Overview/>
      </div>
  )
}

export default Dashboard
