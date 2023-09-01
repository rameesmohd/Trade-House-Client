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
  const userEmail = useSelector((state)=>state.Client.email)
  const tutorToken = useSelector((state)=>state.Tutor?.Token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!userEmail){
      navigate('/')
    }else{
      if(!tutorToken){
        tutorAxios.post('/t-verify',{userEmail}).then((res)=>{
          console.log( res.data?.token);
          const token = res.data?.token
          if(token){
            dispatch(tutorLogin({token : token}))
          }
        }).catch((error)=>{
          navigate('/')
          toast.error('Unautherised access!!.Please contact admin!!')
        })
      }
    }
  },[])
    
  return (
      <div className='flex pt-24 md:pl-64'>
          <Navbar/>
          <Sidebar/>
          <Overview/>
      </div>
  )
}

export default Dashboard
