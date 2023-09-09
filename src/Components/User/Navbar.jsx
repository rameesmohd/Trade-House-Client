import React from 'react'
import logo from '../../assets/icon_line.png'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { clientLogout } from '../../Redux/ClientAuth'
import { tutorLogout } from '../../Redux/TutorAuth'
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const clientAuth = useSelector((state)=>state.Client.Token)
  const tutorAuth = useSelector((state)=>state.Client?.is_tutor)

  const logOut=()=>{
    dispatch(clientLogout())
    dispatch(emptyMyCourse())
    dispatch(tutorLogout())
    navigate('/')
  }
  return (
    <>
      <nav className="fixed top-0 left-0 z-20 w-full h-24 py-5 bg-black border-b border-black dark:bg-black dark:border-black" >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link to={'/'} className="flex items-center">
          <img src={logo} className="h-10 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-lg font-semibold md:text-2xl whitespace-nowrap dark:text-white ">TRADE HOUSE</span>
        </Link>
        <div className="flex md:order-2">
          {!clientAuth ? <button
            type="button"
            onClick={()=>navigate('/login')}
            className="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-transparent border border-red-600 rounded-lg hover:bg-red-700 focus:ring-red-4 focus:outline-none focus:ring-red-300 md:mr-0 "
          >
            Login
          </button> : <button
            type="button"
            onClick={logOut}
            className="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-transparent border border-red-600 rounded-lg hover:bg-red-700 focus:ring-red-4 focus:outline-none focus:ring-red-300 md:mr-0">
            LogOut
          </button>}

          {!clientAuth ? <button
            type="button"
            onClick={()=>navigate('/signup')}
            className="hidden md:block px-4 py-2 ml-2 mr-3 text-sm font-medium text-center text-white bg-green-800 rounded-lg hover:bg-green-700 focus:ring-red-4 focus:outline-none focus:ring-red-300 md:mr-0 "
          >
            Signup
          </button> : ''}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium bg-black border border-gray-100 rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-black dark:bg-black md:dark:bg-black dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-white bg-white rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
                aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Markets
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Mentors
              </a>
            </li>
            <li>
              <a
                onClick={()=>navigate('/courses')}
                className="block py-2 cursor-pointer pl-3 pr-4 text-gray-900 rounded 
                hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0
                 md:dark:hover:text-blue-500 dark:text-white 
                 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Courses
              </a>
            </li>
            {tutorAuth && <li>
              <a
                onClick={()=>navigate('/tutor')}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded cursor-pointer
                 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0
                  md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700
                   dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Tutor Panel
              </a>
            </li>}
          </ul>
        </div>
      </div>
      </nav>
    </>
  )
}

export default Navbar