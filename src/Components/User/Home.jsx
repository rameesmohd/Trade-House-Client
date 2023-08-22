import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {clientLogout} from '../../Redux/ClientAuth'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut=()=>{
        dispatch(clientLogout())
        navigate('/login')
    }

  return (
    <div>
        <h1 className='text-zinc-800 text-2xl'>User Home</h1>
        <button onClick={()=>logOut()}>Logout</button>
    </div>
  )
}

export default Home
