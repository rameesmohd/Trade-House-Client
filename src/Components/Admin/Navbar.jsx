import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../../Redux/AdminAuth'
import { useNavigate } from 'react-router-dom'
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses'
import { CiWallet } from 'react-icons/ci'
import { setMobileViewMenuToggler } from '../../Redux/AdminAuth' 

const Navbar = () => {
  const Token =  useSelector((state) => state.Admin.Token)
  const mobileView = useSelector((state)=>state.Admin.mobileView)
  const walletbc =  useSelector((state)=>state.Admin.wallet)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut=()=>{
      dispatch(adminLogout())
      dispatch(emptyMyCourse())
      navigate('/admin/login')
  }
  

  return (
    <div>
    <div className="card-header p-0 z-50 h-fit bg-slate-900 col-span-8 top-0 fixed w-full ">
        <div className="bg-gradient-dark shadow-dark rounded-lg pt-4 pb-3">
        <div className="flex justify-between items-center px-3">

        <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex position-absolute top-0 items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={()=>dispatch(setMobileViewMenuToggler(!mobileView))}
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

            <span className="ml-10 text-lg text-white font-medium">ADMIN</span>
            <div className=' bg-slate-200 rounded-lg px-1'>
                <div title='wallet' className='flex items-center justify-between'><CiWallet className='w-10 h-full'/><p className='mx-1 text-md font-mono' >₹{walletbc ? walletbc :'0.00'}</p></div>
            </div>
            { Token ? 
            <a onClick={logOut} className="btn btn-light btn-sm border border-slate-400 rounded p-1 text-white">LogOut</a>
            : <a className="btn btn-light btn-sm border border-slate-400 rounded p-1 text-white">LogIn</a>
          }

        </div>
    </div>
  </div>
          </div>
  )
}
                          
export default Navbar
