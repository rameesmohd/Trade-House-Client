import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MdCheckCircle,MdCancel  } from 'react-icons/md'
import adminAxios from '../../Axios/AdminAxios'
import people from '../../assets/people.svg'
import Rating from '../RatingStar'
import Modal from '../ConfirmModal'
let toggle;

const Courses = () => {
  const axiosInstance = adminAxios()
  const [myCourses,setMyCourses] = useState([])
  const [showModal,setShowModal] = useState(false)
  const [loading,setLoading] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true); 
  const threshold = 50;

  const fetchMyCourses = async() => {
    setLoading(true);
    await axiosInstance
      .get(`/all-courses?count=${myCourses.length}`)
      .then((res) => {
        if (res.data.result.length < 4) {
          setHasMoreData(false);
        }
        setLoading(false);
        setMyCourses([...myCourses,...res.data.result]);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error(error);
      });
  };

  useEffect(()=>{
    fetchMyCourses();
  },[])


  useEffect(() => {
    const handleScroll = () => {
      if (!loading && hasMoreData && window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold) {
        fetchMyCourses();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[loading]);


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
      <table className="table overflow-x-scroll">
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
                    <div className="text-sm text-red-600">Price :  ₹{obj.price}</div>
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
                  {obj.total_purchases}
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
        {
          loading && [1,2,3,4,5].map((value,i)=>{
             return <tr key={999+value}>
              <td>
                <div className="animate-pulse">
                  <div className="h-[180px]">
                      <div className='w-[250px] h-full  bg-gray-300 mx-auto flex justify-center items-center'>
                      <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                          </svg>
                      </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="max-w-[150px] h-[150px] animate-pulse">
                    <div className='w-full h-full object-cover bg-gray-300 flex justify-center items-center'>
                    <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                          </svg>
                    </div>
                  </div>
              </td>
              <td>
                <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                <div class="w-full">
                          <div class="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                          <div class="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
                          <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                          <div class="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
                          <div class="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
                          <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
                      </div>
                      <span class="sr-only">Loading...</span>
                </div>
              </td>
              <td>
                <div class="h-2 bg-gray-200 rounded-full   animate-pulse max-w-[440px] mb-2.5"></div>
              </td>
              <td>
                <div class="h-2 bg-gray-200 rounded-full   animate-pulse max-w-[440px] mb-2.5"></div>
              </td>
              <td>
                <div class="h-2 bg-gray-200 rounded-full   animate-pulse max-w-[440px] mb-2.5"></div>
              </td>
              <td>
                <div class="h-2 bg-gray-200 rounded-full animate-pulse max-w-[440px] mb-2.5"></div>
              </td>
              </tr>

          })
        }
        </tbody>
      </table>
    </div>
    {showModal && <Modal setShowModal={setShowModal} confirm={toggle} message={'Please confirm'} description={'Do you want to procced?'}/> }
    </>
  )
}

export default Courses
