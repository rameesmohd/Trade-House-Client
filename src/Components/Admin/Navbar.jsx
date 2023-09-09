import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../../Redux/AdminAuth'
import { useNavigate } from 'react-router-dom'
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses'

const Navbar = () => {
  const Token =  useSelector((state) => state.Admin.Token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut=()=>{
      dispatch(adminLogout())
      dispatch(emptyMyCourse())
      navigate('/admin/login')
  }

  return (
    <div className="card-header p-0 z-40 h-fit bg-slate-900 col-span-8 sticky top-0 w-screen ">
        <div className="bg-gradient-dark shadow-dark rounded-lg pt-4 pb-3">
        <div className="flex justify-between items-center px-3">
            <span className="ml-10 text-lg text-white font-medium">ADMIN</span>
            { Token ? 
            <a onClick={logOut} className="btn btn-light btn-sm border border-slate-400 rounded p-1 text-white">LogOut</a>
            : <a className="btn btn-light btn-sm border border-slate-400 rounded p-1 text-white">LogIn</a>
            }
        </div>
    </div>
  </div>
  )
}
                          
export default Navbar
