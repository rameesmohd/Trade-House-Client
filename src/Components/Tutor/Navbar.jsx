import React from 'react'
import logo from '../../assets/icon_line.png'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { tutorLogout } from '../../Redux/TutorAuth'
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses'
import { useEffect } from 'react'
import {setBlocker} from '../../Redux/TutorAuth'


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const tutorAuth = useSelector((state)=>state.Client?.is_tutor)

  const logOut=()=>{
    dispatch(emptyMyCourse())
    dispatch(tutorLogout())
    navigate('/tutor/login')
  }

  useEffect(()=>{
    dispatch(setBlocker({logOut}))
  })
  
  return (
    <>
      <nav className="fixed top-0 left-0 z-20 w-full h-24 py-5 bg-black border-b border-black dark:bg-black dark:border-black" >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link to={'/tutor/'} className="flex items-center hover:scale-125 transition-transform">
          <img src={logo} className="h-10 mr-1 " alt="Flowbite Logo" />
          <span className="self-center text-lg font-semibold md:text-2xl whitespace-nowrap dark:text-white ">TRADE HOUSE</span>
        </Link>
        <div className="flex md:order-2">
            <button
            type="button"
            onClick={logOut}
            className="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-transparent border border-red-600 rounded-lg hover:bg-red-700 focus:ring-red-4 focus:outline-none focus:ring-red-300 md:mr-0">
            LogOut
          </button>

        </div>
      </div>
      </nav>
    </>
  )
}

export default Navbar