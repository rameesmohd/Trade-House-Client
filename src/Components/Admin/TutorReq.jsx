import React, { useState } from 'react'
import { useEffect } from 'react'
import adminAxios from '../../Axios/AdminAxios'
import { useSelector } from 'react-redux'
import { BsDownload } from 'react-icons/bs';
import { MdCheckCircle } from 'react-icons/md';
import Modal from '../modal';
import { toast } from 'react-toastify';

const TutorReq = () => {
    const [showModal, setShowModal] = useState(false);
    const token = useSelector((state)=>state.Admin.Token)
    const [usersData , setUserData] = useState([])
    const [id,setId] = useState('')

    useEffect(()=>{
        adminAxios.get('/tutor-requests',{
            headers : { Authorization : `admin ${token}`}}).then((res)=>{
                    setUserData(res.data.result)
        }).catch((error)=>{
            console.log(error.message);
            toast.error(error.message)
        })
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

    const handleModal=(_id)=>{
        setId(_id)
        setShowModal(true)
    }

    const handleApprove=()=>{
        adminAxios.get(`/approve-request?id=${id}`,{
            headers : { Authorization : `admin ${token}`}})
        .then((res)=>{
            setUserData(res.data.result)
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
                    <button type="button" 
                    className='btn-sm bg-green-500 rounded-md text-sm flex flex-row items-center text-white hover:bg-green-600' 
                    onClick={()=>handleModal(obj._id)}>Approve<MdCheckCircle color="white"/>
                    </button>
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
       description={'Please confirm to approve this user to become a tutor.'} />  
       : '' }
 </>
  )
}

export default TutorReq
