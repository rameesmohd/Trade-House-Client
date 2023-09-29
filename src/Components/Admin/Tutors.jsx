import React, { useState } from 'react'
import { useEffect } from 'react'
import adminAxios from '../../Axios/AdminAxios'
import { useSelector } from 'react-redux'
import Modal from '../ConfirmModal';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Tutors = () => {
    const axiosInstance = adminAxios()
    const [showModal, setShowModal] = useState(false);
    const token = useSelector((state)=>state.Admin.Token)
    const [tutorsData , setTutersData] = useState([])
    const [id,setId] = useState('')
    const [BlockToggle,setBlockToggle] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchData =async()=>{
      setLoading(true)
        await axiosInstance.get('/tutors-list')
            .then((res)=>{
                console.log(res.data.result);
                setTutersData(res.data.result)})
                setLoading(false)
            .catch((error)=>{
                console.log(error.message);
                toast.error(error.message)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])  

    const handleModal=(_id,state)=>{
        setBlockToggle(state)
        setId(_id)
        setShowModal(true)
    }

    const handleApprove=()=>{
         axiosInstance.patch(`/toggle-block?id=${id}&blockToggle=${BlockToggle}`,
            {headers : { Authorization : `admin ${token}`}})
        .then((res)=>{
          console.log(res.data);
          setTutersData(res.data.result)
        }).catch((error)=>{
            console.log(error.message);
            toast.error(error.message);
        })
        setShowModal(false)
    }



  return (
    <>
    <div className="w-full py-3 px-3">
    <div className="flex flex-col">
    <table className="table">
        <thead>
            <tr>
            <th scope="col" className='py-4 text-center bg-slate-200' >Image</th>
                <th scope="col" className='py-4 text-center bg-slate-200' >Email</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Name</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Mobile</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Category</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Experience</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Type of trader</th>
                <th scope="col" className='py-4 text-center bg-slate-200'></th>
                <th scope="col" className='py-4 text-center bg-slate-200'></th>
            </tr>
        </thead>
        <tbody>
            {tutorsData.map((obj,index)=>{
            return(
            <tr key={obj._id}>
            <td className=''>
                    { !obj.image ? 
                      <div className='h-full w-full bg-slate-100 flex justify-center items-center'><h1>No Image</h1></div>
                      : <img className='max-w-[150px] h-24 bg-slate-50 mx-auto' src={obj?.image} alt="" /> 
                    }
              </td>
                <td className="px-4 py-2 text-center">{obj.email}</td>
                <td className="px-4 py-2 text-center">{obj.firstName+' '+obj.lastName}</td>
                <td className="px-4 py-2 text-center">{obj.mobile}</td>
                <td className="px-4 py-2 text-center">{obj.category}</td>
                <td className="px-4 py-2 text-center">{obj.experience}+</td>
                <td className="px-4 py-2 text-center">{obj.type_of_trader}</td>
                <td className="px-4 py-2 text-center"><div className='underline text-center font-semibold text-md text-blue-700' onClick={()=>navigate('/admin/tutors/tutor-details',{state:obj})}>more details</div></td>
                <td className="px-4 py-2 text-center">
                    {!obj.is_blocked ? <button type="button" 
                      className='btn-xs bg-red-600 rounded-md text-sm flex flex-row items-center text-white hover:bg-red-800' 
                      onClick={()=>handleModal(obj._id,true)}>
                      <p className='px-2'> Block </p>
                    </button> : <button type="button" 
                      className='btn-sm bg-green-600 rounded-md text-sm flex flex-row items-center text-white hover:bg-green-800' 
                      onClick={()=>handleModal(obj._id,false)}>
                      Unblock
                    </button>}
                </td>
            </tr> )
            })}
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
    </div>
    { showModal ?
       <Modal 
       setShowModal={setShowModal} 
       confirm={handleApprove} 
       message={'Are you sure?'} 
       description={'Please confirm to block this tutor?'} />  
       : '' }
 </>
  )
}

export default Tutors
