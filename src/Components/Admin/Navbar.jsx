import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../../Redux/AdminAuth'
import { useNavigate } from 'react-router-dom'
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses'
import { CiWallet } from 'react-icons/ci'

const Navbar = () => {
  const Token =  useSelector((state) => state.Admin.Token)
  const walletbc =  useSelector((state)=>state.Admin.wallet)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut=()=>{
      dispatch(adminLogout())
      dispatch(emptyMyCourse())
      navigate('/admin/login')
  }
  console.log(walletbc,'sdasdased');

  return (
    <div>
    <div className="card-header p-0 z-50 h-fit bg-slate-900 col-span-8 top-0 fixed w-full ">
        <div className="bg-gradient-dark shadow-dark rounded-lg pt-4 pb-3">
        <div className="flex justify-between items-center px-3">
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
