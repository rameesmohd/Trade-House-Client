import React, { useState } from 'react'
import logo from '../../assets/icon_line.png'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { clientLogout } from '../../Redux/ClientAuth'
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const clientAuth = useSelector((state)=>state.Client.Token)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logOut=()=>{
    dispatch(clientLogout())
    dispatch(emptyMyCourse())
    navigate('/')
  }
  return (
    <>
      <nav className="fixed top-0 left-0 z-20 w-full h-24 py-5 bg-black border-b border-black " >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link to={'/home'} className="flex items-center hover:scale-125 w3-animate-bottom delay-75">
          <img src={logo} className="h-10 mr-1 " alt="Flowbite Logo" />
          <span className="self-center text-lg font-semibold md:text-2xl whitespace-nowrap">TRADE HOUSE</span>
        </Link>
        <div className="flex md:order-2">
          {!clientAuth ? <button
            type="button"
            onClick={()=>navigate('/login')}
            className="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-transparent border border-red-600 rounded-lg hover:bg-red-700 focus:ring-red-4 focus:outline-none focus:ring-red-300 md:mr-0 "
          >
            Login
          </button> : (
            <>
            <button
              type="button"
              onClick={()=>navigate('/userpanel')}
              className={`px-4 py-2 hidden sm:block text-sm font-medium text-center text-white ${location.pathname==='/userpanel' ||location.pathname==='/userpanel/watch' ? 'bg-green-700' :'bg-transparent'} border border-green-700 rounded-lg hover:bg-green-700 focus:ring-red-4 focus:outline-none focus:ring-red-300 md:mr-0`}>
                User
          </button>
          <button
              type="button"
              onClick={logOut}
              className="px-4 py-2 mx-3 hidden sm:block text-sm font-medium text-center text-white bg-transparent border border-red-600 rounded-lg hover:bg-red-700 focus:ring-red-4 focus:outline-none focus:ring-red-300 md:mr-0">
              LogOut
          </button>
            </>
          )}

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
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={toggleMobileMenu}
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

        <div className="items-center justify-between bg-black rounded-md  w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          
          <ul className={` flex-col p-1 mt-4 md:flex font-medium ${isMobileMenuOpen ? 'flex' : 'hidden border border-gray-800'}  rounded-lg md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-black`}>
            <li>
              <a
               onClick={()=>navigate('/home')}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-white bg-black  rounded md:p-0 ${location.pathname === '/home' ? 'text-yellow-400' : ''}  md:hover:text-yellow-400  hover:bg-gray-800 `}
                aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a
                onClick={()=>navigate('/markets')}
                className={`block py-2 pl-3 pr-4 cursor-pointer text-white bg-black  rounded  md:p-0 ${location.pathname === '/markets' ? 'text-yellow-400' : ''}  md:hover:text-yellow-400 hover:bg-gray-800  `}>
                Markets
              </a>
            </li>
            <li>
              <a
                onClick={()=>navigate('/courses')}
                className={`cursor-pointer block py-2 pl-3 pr-4  text-white bg-black rounded  md:p-0 ${location.pathname === '/courses' ? 'text-yellow-400 ' : ''}  md:hover:text-yellow-400 hover:bg-gray-800  `}>
                Courses
              </a>
            </li>
            {clientAuth && isMobileMenuOpen? <>
           <li>
              <a
                onClick={()=>navigate('/userpanel')}
                className={`cursor-pointer block py-2 pl-3 pr-4  text-white sm:hidden bg-black rounded  md:p-0 ${location.pathname === '/userpanel' ? 'text-yellow-400 ' : ''}  md:hover:text-yellow-400 hover:bg-gray-800  `}>
                User Panel
              </a>
            </li>
            <li>
              <a
                onClick={()=>logOut()}
                className={`cursor-pointer block py-2 pl-3 pr-4  text-white sm:hidden  rounded  md:p-0  hover:bg-red-800  `}>
                Logout
              </a>
            </li> 
            </> : 
                 <li>
                 <a
                   onClick={()=>navigate('/login')}
                   className={`cursor-pointer block py-2 sm:hidden pl-3 pr-4  text-white bg-black rounded  md:p-0 ${location.pathname === '/courses' ? 'text-yellow-400 ' : ''}  md:hover:text-yellow-400 hover:bg-green-500  `}>
                   Login
                 </a>
               </li>
            }
          </ul>
        </div>
      </div>
      </nav>
    </>
  )
}

export default Navbar