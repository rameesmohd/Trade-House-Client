import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MdCheckCircle,MdCancel  } from 'react-icons/md'
import adminAxios from '../../Axios/AdminAxios'
import people from '../../assets/people.svg'
import Rating from '../RatingStar'
import Modal from '../modal'
import Loading from '../Loading'
let toggle;

const Courses = () => {
  const axiosInstance = adminAxios()
  const [myCourses,setMyCourses] = useState([])
  const [showModal,setShowModal] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
      setLoading(true)
       axiosInstance.get('/all-courses').then((res)=>{
        console.log(res.data.result);
        setLoading(false)
        setMyCourses(res.data.result)
      }).catch((error)=>{
        toast.error(error.message)
        console.log(error);
      })
  },[])

  const activeToggleHandler=(id,state)=>{
        const updateData =  myCourses.map((obj)=>({...obj ,is_active:obj._id === id ? state : obj.is_active}))
        setMyCourses(updateData)
        axiosInstance.patch(`/toggle-activecourse?id=${id}&toggle=${state}`).then((res)=>{
            console.log(res);
        }).catch((error)=>{
            console.log(error);
        })
  }

  const toggleHandle=(id,state)=>{
        if(state){
            toggle = ()=>{
                activeToggleHandler(id,state)
                setShowModal(false)
            }
        }else{
            toggle =()=>{
                activeToggleHandler(id,state)
                setShowModal(false)
            }
        }
        setShowModal(true)
  }

  return (
    <>
    <div className='mx-5 py-5 w-full'>
      <table className="table">
        {/* head */}
        <thead className='bg-slate-300'>
          <tr>
            <th className='text-sm'>Banner</th>
            <th className='text-sm'>Tutor</th>
            <th className='text-sm'>Title</th>
            <th className='text-sm'></th>
            <th className='text-sm flex justify-center'><img src={people} className='w-8 h-8' alt="" /></th>
            <th className='text-sm '>Rating</th>
            <th className='text-sm'></th>
            <th className='text-sm'>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {  
            myCourses.map((obj,index)=>{
              return(
              <tr key={obj._id}>
              <td>
                <div className="">
                  <div className="h-[180px]">
                    { !obj.banner ? 
                      <div className='h-full w-full bg-slate-100 flex justify-center items-center'><h1>No banner</h1></div>
                      : <img className='max-w-[250px] h-auto  bg-slate-50 mx-auto' src={obj?.banner} alt="" /> 
                    }
                  </div>
                </div>
              </td>
              <td>
                <div className="max-w-[150px] h-[150px]">
                    <img className='w-full h-full object-cover' src={obj?.tutor?.image ? obj?.tutor?.image : 'https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg'} alt="" />
                    <h2 className='w-full text-center font-semibold text-base'>{obj.tutor?.firstName+' '+obj.tutor?.lastName }</h2>
                  </div>
              </td>
              <td>
                <div className='w-32'>
                    <div className="font-bold">{obj.title}</div>
                    <div className="text-sm">Level : {obj.level}</div>
                    <div className="text-sm opacity-50">Category : {obj.category && obj?.category.category}</div>
                    <div className="text-sm opacity-50">Duration : {obj.duration} Hours</div>
                </div>
              </td>
              <td>
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
              <td >
                  <div className='card card-compact text-center'>
                      1
                  </div>
              </td>
              <td>
                <div>
                      <Rating/>
                </div>
              </td>
              <td>

              </td>
              <td>
                {
                  obj?.is_active ?
                  <div onClick={()=>toggleHandle(obj._id,false)} className='text-lg flex items-center cursor-pointer'><MdCheckCircle color='green'/>active</div>
                   : <div onClick={()=>toggleHandle(obj._id,true)} className='text-lg flex items-center cursor-pointer'><MdCancel color='red'/>inactive</div>
                }
              </td>
            </tr>)
            })
        }
        </tbody>
      </table>
    </div>
    {showModal && <Modal setShowModal={setShowModal} confirm={toggle} message={'Please confirm'} description={'Do you want to procced?'}/> }
    {loading && <Loading/>}
    </>
  )
}

export default Courses
