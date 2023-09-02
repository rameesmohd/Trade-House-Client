import React, { useEffect, useState } from 'react'
import tutorAxios from '../../Axios/TutorAxios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MdCheckCircle,MdCancel  } from 'react-icons/md'
import { saveMyCourse } from '../../Redux/TutorSlice/Courses'



const Mycourse = () => {
  const {Token,id} = useSelector((state)=>state.Tutor)
  const [myCourses,setMyCourses] = useState([])
  const navigate = useNavigate()
  const mycourses = useSelector((state)=>state.Courses.myCourses)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!mycourses){
      tutorAxios.get(`/my-courses?id=${id}`,{headers : {Authorization : `tutor ${Token}`}}).then((res)=>{
        console.log(res.data);
        setMyCourses(res.data.result)
        dispatch(saveMyCourse(res.data.result))
      }).catch((error)=>{
        toast.error(error.message)
        console.log(error);
      })
    }else{
      setMyCourses(mycourses)
    }
  },[])


  return (
    <div className='mx-5 py-5 '>
      <div className='w-full h-16 bg-slate-100 my-2  rounded-md flex justify-end items-center p-4'> 
              <div onClick={()=>navigate('/tutor/add-course')} className='btn btn-sm border-none hover:bg-black hover:text-white bg-slate-400'>
                        Add Course
              </div>
      </div>

      <div className="overflow-x-auto">
      <table className="table h-full">
        {/* head */}
        <thead className='bg-slate-300'>
          <tr>
            <th className='text-sm'>Banner</th>
            <th className='text-sm'>Preview video</th>
            <th className='text-sm'>Title</th>
            <th className='text-sm'>Description</th>
            <th className='text-sm'>Duration(Hours)</th>
            <th className='text-sm'>Modules</th>
            <th className='text-sm'>Edit</th>
            <th className='text-sm'>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {  
            myCourses.map((obj,index)=>{
              console.log(obj);
              return(
              <tr key={obj._id}>
              <td>
                  <div className="">
                    <div className="h-[180px]">
                      {
                        !obj.banner ? 
                        <div className='h-full w-full bg-slate-100 flex justify-center items-center'><h1>Upload banner</h1></div>
                        :
                       <img className='max-w-[250px] h-full bg-slate-50 mx-auto' src={obj.banner} alt="" /> 
                      }
                    </div>
                  </div>
              </td>
              <td>
                <div className="max-w-[250px] h-[180px]">
                  {
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
                  }
                  </div>
              </td>
              <td>
                <div className='w-44'>
                    <div className="font-bold">{obj.title}</div>
                    <div className="text-sm opacity-50">Level : {obj.level}</div>
                    <div className="text-sm opacity-50">Category : {obj.category}</div>
                    <div className="text-sm opacity-50">Duration : {obj.duration} Hours</div>
                </div>
              </td>
              <td>
                <div className="dropdown w-24">
                  <label tabIndex={0} className="badge badge-ghost badge-sm bg-green-500 text-white border-gray-950 p-2">Skills Offering</label>
                  <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-96 p-2 shadow bg-slate-100 text-primary-content overflow-y-scroll max-h-56">
                    <div className="card-body">
                      <h3 className="card-title">Skills offering </h3>
                      {obj.skillsOffering.map((value)=>{
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
                <Link className='underline text-blue-800'>Modules</Link>
                <br />
              </td>
              <td>

                <Link className='underline text-red-800'>Edit</Link>
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
    </div>
  )
}

export default Mycourse
