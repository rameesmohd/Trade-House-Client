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
    <div className="flex flex-col w-full py-5 px-3">
    <table className="table">
        <thead>
            <tr>
            {['Image','Email','Name','Mobile','Category','Experience','Type of trader','',''].map((head)=>
                <th scope="col" className='py-4 text-center bg-slate-200 uppercase font-poppins' >{head}</th>
            )}
            </tr>
        </thead>
        <tbody>
        {tutorsData.map((obj, index) => (
            <tr key={obj._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-3 border-b border-gray-300">
                {!obj.image ? (
                  <div className='h-full w-full bg-slate-100 flex justify-center items-center'>
                    <h1 className="text-gray-500">No Image</h1>
                  </div>
                ) : (
                  <img className='max-w-[150px] h-24 bg-slate-50 mx-auto rounded' src={obj?.image} alt="" />
                )}
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-300">{obj.email}</td>
              <td className="px-4 py-2 text-center border-b border-gray-300">{obj.firstName + ' ' + obj.lastName}</td>
              <td className="px-4 py-2 text-center border-b border-gray-300">{obj.mobile}</td>
              <td className="px-4 py-2 text-center border-b border-gray-300">{obj.category}</td>
              <td className="px-4 py-2 text-center border-b border-gray-300">{obj.experience}+</td>
              <td className="px-4 py-2 text-center border-b border-gray-300">{obj.type_of_trader}</td>
              <td className="px-4 py-2 text-center border-b border-gray-300">
                <div className='underline text-center font-semibold text-md text-blue-700 cursor-pointer ' onClick={() => navigate('/admin/tutors/tutor-details', { state: obj })}>
                  More Details
                </div>
              </td>
              <td className="px-4 py-2 text-center border-b border-gray-300">
                {!obj.is_blocked ? (
                  <button type="button" className='btn-xs bg-red-600 rounded-md text-sm text-white hover:bg-red-800' onClick={() => handleModal(obj._id, true)}>
                    Block
                  </button>
                ) : (
                  <button type="button" className='btn-sm bg-green-600 rounded-md text-sm text-white hover:bg-green-800' onClick={() => handleModal(obj._id, false)}>
                    Unblock
                  </button>
                )}
              </td>
            </tr>
          ))}
          {
          loading && [...Array(5)].map((value,i)=>{
             return <tr key={999+value}>
              <td>
                <div className="animate-pulse">
                  <div className="">
                      <div className='max-w-[150px] h-24  bg-gray-300 mx-auto flex justify-center items-center'>
                      <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                          </svg>
                      </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="max-w-[150px] h-24 animate-pulse">
                    <div className=' h-16 object-cover  flex justify-center items-center'>
                 
                    </div>
                  </div>
              </td>
              <td>
                <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                <div class="w-full">
                          <div class="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                          <div class="h-2 bg-gray-200 rounded-full  max-w-[480px] "></div>
                          <div class="h-2 bg-gray-200 rounded-full  "></div>
                          <div class="h-2 bg-gray-200 rounded-full  max-w-[440px] "></div>
                          <div class="h-2 bg-gray-200 rounded-full  max-w-[460px] "></div>
                          <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
                      </div>
                      <span class="sr-only">Loading...</span>
                </div>
              </td>
              <td>
                <div class="h-2 bg-gray-200 rounded-full   animate-pulse max-w-[440px] "></div>
              </td>
              <td>
                <div class="h-2 bg-gray-200 rounded-full   animate-pulse max-w-[440px] "></div>
              </td>
              <td>
                <div class="h-2 bg-gray-200 rounded-full   animate-pulse max-w-[440px] "></div>
              </td>
              <td>
                <div class="h-2 bg-gray-200 rounded-full animate-pulse max-w-[440px] "></div>
              </td>
              </tr>

          })
          }
        </tbody>
    </table>
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
