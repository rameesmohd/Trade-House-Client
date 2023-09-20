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
    const navigate = useNavigate()

    const fetchData =async()=>{
        await axiosInstance.get('/tutors-list')
            .then((res)=>{
                console.log(res.data.result);
                setTutersData(res.data.result)})
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
                  <div className="h-[180px]">
                    { !obj.image ? 
                      <div className='h-full w-full bg-slate-100 flex justify-center items-center'><h1>No Image</h1></div>
                      : <img className='max-w-[250px] h-full  bg-slate-50 mx-auto' src={obj?.image} alt="" /> 
                    }
                  </div>
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
