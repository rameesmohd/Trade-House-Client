import React, { useEffect, useState } from 'react'
import tutorAxios from '../../Axios/TutorAxios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MdCheckCircle,MdCancel  } from 'react-icons/md'
import { saveMyCourse } from '../../Redux/TutorSlice/Courses'
import Editcourse from './Editcourse'
import { Spinner } from '@material-tailwind/react'
import Addcourse from './Addcourse'
import { tutorLogout } from '../../Redux/TutorAuth'
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses'

const Mycourse = () => {
  const axiosInstance = tutorAxios()
  const id = useSelector((state)=>state.Tutor.id)
  const mycourses = useSelector((state)=>state.Courses.myCourses)
  const [myCourses,setMyCourses] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [edit,setEdit]=useState(false)
  const [editCourse,setEditCourse]=useState({})
  const [addCourse,setAddcourse] = useState(false)
  const [loading,setLoading]= useState({})

  const logOut=()=>{
    dispatch(emptyMyCourse())
    dispatch(tutorLogout())
    navigate('/tutor/login')
  }

  const fetchData=async()=>{
   await axiosInstance.get(`/courses?id=${id}`).then((res)=>{
      setMyCourses(res.data.result)
      dispatch(saveMyCourse(res.data.result))
    }).catch((error)=>{
      toast.error(error.message)
      toast.error(error.response?.data?.message)
      if(error.response.status == 403){
        logOut()
      }
    })
  }

  useEffect(()=>{
    if(!mycourses){
      fetchData()
    }else{
      setMyCourses(mycourses)
    }
  },[mycourses])

  const handleEdit=(details)=>{
    setEdit(true)
    setEditCourse(details)
  }

  return (
    <>
    {
      addCourse ? <Addcourse setAddcourse={setAddcourse} setLoading={setLoading}/>
      : 
    (!edit ? <div className='mx-5 py-5 '>
      <div className='w-full h-16 bg-slate-100 my-2  rounded-md flex justify-end items-center p-4 overflow-hidden'> 
              <div onClick={()=>setAddcourse(true)} className='btn btn-sm border-none hover:bg-black hover:text-white bg-slate-400'>
                        Add Course
              </div>
      </div>
      <div className="w-full overflow-x-scroll overflow-y-hidden pt-8">
      <table className="table">
        {/* head */}
        <thead className='bg-slate-300'>
          <tr>
          {['Banner','Preview video','Title','Price','Description','Modules','Edit','Status',''].map((head)=>
            <th className='text-sm'>{head}</th>
          )}  
          </tr>
        </thead>
        <tbody>
          {  
            myCourses.map((obj)=>{
              return(
              <tr key={obj._id}>
              <td>
                  <div className="h-[180px]">
                    { obj.banner=='loading' ? 
                      <div class="flex items-center justify-center max-w-[250px] h-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                          <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                      </div> : (
                      !obj.banner ? 
                      <div className='h-full w-full bg-slate-100 flex justify-center items-center'><h1>Upload banner</h1></div>
                      : <img className='max-w-[250px] h-full bg-slate-50 mx-auto' src={obj.banner} alt="" /> )
                    }
                  </div>
              </td>
              <td>
                <div className="max-w-[250px] h-[180px]">
                  { obj.preview=='loading' ? 
                        <div class="flex items-center justify-center max-w-[250px] h-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                        </div> : (
                    obj.preview ? 
                      <div>
                          <video className="max-w-[250px] h-[180px] rounded-lg" controls autoPlay muted>
                                <source src={obj.preview} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                      </div>
                    : <div className='h-full w-full bg-slate-100 flex justify-center items-center'>
                         <h1 className=''>Upload preview</h1>
                      </div>
                    )}
                  </div>
              </td>
              <td>
                <div className='w-44'>
                    <div className="font-bold">{obj.title}</div>
                    <div className="text-sm opacity-50">Level : {obj.level}</div>
                    <div className="text-sm opacity-50">Category : {obj.category && obj?.category.category}</div>
                    <div className="text-sm opacity-50">Duration : {obj.duration} Hours</div>
                </div>
              </td>
              <td>
                <h3 className="mb-3">{obj.price ? `₹${obj?.price}` : '₹ 0.00'}</h3>
                <div className="dropdown w-24">
                  <label tabIndex={0} className="badge badge-ghost badge-sm bg-green-500 text-white border-gray-950 p-2">Skills Offering</label>
                  <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-96 p-2 shadow bg-slate-100 text-primary-content overflow-y-scroll max-h-56">
                    <div className="card-body">
                      <h3 className="card-title">Skills offering </h3>
                      {obj?.skillsOffering.map((value)=>{
                          return  <p>-{value}</p> 
                      })}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                  <div className='card card-compact'>
                      <div className='card-body overflow-y-scroll max-h-[180px] max-w-[250px]'>
                          {obj.description}
                      </div>
                  </div>
              </td>
              <td>
                <h2 onClick={()=>navigate('/tutor/modules',{state:obj._id})} className='cursor-pointer underline text-blue-800'>Modules</h2>
              </td>
              <td>
                      {
                        loading.id === obj._id && loading.spinner  ? 
                        <Spinner/> :
                        <div onClick={()=>handleEdit(obj)} className='underline text-red-800 cursor-pointer'>Edit</div> 
                      }
              </td>
              <td>
                {
                  obj?.is_active ?
                  <div className='text-lg flex items-center'><MdCheckCircle color='green'/>active</div>
                   : <div className='text-lg flex items-center'><MdCancel color='red'/>inactive</div>
                }
              </td>
            </tr>)
            })
        }
        </tbody>
      </table>
    </div>
    </div> : <Editcourse editCourse={editCourse} goBack={setEdit} setLoading={setLoading}/>)
      }
    </>
  )
}

export default Mycourse
