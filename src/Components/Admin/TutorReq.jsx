import React, { useState } from 'react'
import { useEffect } from 'react'
import adminAxios from '../../Axios/AdminAxios'
import { BsDownload } from 'react-icons/bs';
import { MdCheckCircle,MdCancel } from 'react-icons/md';
import Modal from '../ConfirmModal';
import { toast } from 'react-toastify';
var action;

const TutorReq = () => {
    const axiosInstance = adminAxios()
    const [showModal, setShowModal] = useState(false);
    const [usersData , setUserData] = useState([])
    const [id,setId] = useState('')

    const fetchdata=async()=>{
        await axiosInstance.get('/tutor-requests').then((res)=>{
            setUserData(res.data.result)
        }).catch((error)=>{
            console.log(error.message);
            toast.error(error.message)
        })
    }

    useEffect(()=>{
        fetchdata()
    },[])  

    const handleDownload = (fileUrl,fileName) => {
        const anchor = document.createElement('a');
        anchor.href = fileUrl;
        anchor.download = `${fileName}cv_file.pdf`;
        anchor.target = '_blank';
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    
    const handleModal=async({_id,status})=>{
        if (status) {
            action = handleApprove; 
        } else {
            action = handleReject; 
        }
        setId(_id)
        setShowModal(!showModal)
    }

    const handleApprove=async()=>{
        if(id){       
        await axiosInstance.patch(`/approve-request?id=${id}`)
        .then((res)=>{
                setUserData(res.data.result)
        }).catch((error)=>{
            toast.error(error.message);
        }).finally(()=>{
            setShowModal(false)
        })
    }
    }

    const handleReject=async()=>{
    if(id){
        await axiosInstance.patch(`/reject-request?id=${id}`)
        .then((res)=>{
            setUserData(res.data.result)
        }).catch((error)=>{
            toast.error(error.message);
        }).finally(()=>{
            setShowModal(false)
        })
    }
    }

  return (
    <>
    <div className="w-full py-3 md:px-3">
    <div className="flex flex-col">
    <table className="table">
        <thead>
            <tr>
                <th scope="col" className='py-4 text-center bg-slate-200' >User</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Name</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Mobile</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Category</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Experience</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Type of trader</th>
                <th scope="col" className='py-4 text-center bg-slate-200'>Download CV</th>
                <th scope="col" className='py-4 text-center bg-slate-200'></th>
            </tr>
        </thead>
        <tbody>
            {usersData.map((obj,index)=>{
                return(
                    <tr key={obj._id}>
                <td className="px-4 py-2 text-center">{obj.email}</td>
                <td className="px-4 py-2 text-center">{obj.firstName+' '+obj.lastName}</td>
                <td className="px-4 py-2 text-center">{obj.mobile}</td>
                <td className="px-4 py-2 text-center">{obj.category}</td>
                <td className="px-4 py-2 text-center">{obj.experience}+</td>
                <td className="px-4 py-2 text-center">{obj.type_of_trader}</td>
                <td className="px-4 py-2 flex justify-center"><BsDownload className=' text-lg cursor-pointer' onClick={()=>handleDownload(obj.CV,obj.firstName)}/></td>
                <td className="px-4 py-2 text-center">
                    <div className='flex'>
                    <button type="button" 
                    className='btn-sm mx-2 bg-green-500 rounded-md text-sm flex flex-row items-center text-white hover:bg-green-600' 
                    onClick={()=>handleModal({_id:obj._id,status:true})}>Approve<MdCheckCircle color="white"/>
                    </button>
                    <button type="button" 
                    className='btn-sm bg-red-500 rounded-md text-sm flex flex-row items-center text-white hover:bg-red-600' 
                    onClick={()=>handleModal({_id:obj._id,status:false})}>Reject<MdCancel color="white"/>
                    </button>
                    </div>
                </td>
            </tr> )
            })}
        </tbody>
    </table>
    {!usersData.length && <div className='text-center text-3xl mt-5'>No requests!</div>}
    </div>
    </div>
    { showModal ?
       <Modal 
       setShowModal={setShowModal} 
       confirm={action} 
       message={'Are you sure?'} 
       description={'Please confirm to approve this user to become a tutor.'} />  
       : '' }
 </>
  )
}

export default TutorReq
