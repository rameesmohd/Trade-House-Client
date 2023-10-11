import React,{ useState,useEffect, useRef }from 'react'
import adminAxios from '../../Axios/AdminAxios'
import { toast } from 'react-toastify'
import EditUser from './EditUser'
import Modal from '../ConfirmModal'


const Users=()=>{
    const axiosInstance = adminAxios()
    const [usersData , setUsersData] = useState([])
    const [searchInput ,setSearchInput] = useState('')
    const [userDetails,setUser] = useState({})
    const [edit,setEdit] = useState(false)
    const searchRef = useRef()
    const [showModal, setShowModal] = useState(false);

    
    const fetchUserData =async()=>{
       await axiosInstance.get('/users')
            .then((res)=>{
                setUsersData(res.data.result)
            }).catch((error)=>{
                console.log(error);
                toast.error(error.message)
            })
    }

    useEffect(()=>{
        fetchUserData()
    },[edit]);

    const search=()=>{
        setSearchInput(searchRef.current.value);
        }
    const editUser =(user)=>{
        setUser(user)
        setEdit(true)
    }  

    const handleBlock=async(id,isBlock)=>{
        const action = isBlock ? 'block' : 'unblock';
        await axiosInstance
            .patch(`${action}/${id}`)
            .then((res) => {
             toast.warning(res.data.message)
             setUsersData((prev) => {
                const updated = prev.map((user) => {
                if (user._id === id) {
                    return { ...user, is_blocked: isBlock };
                }
                return user;
                });
                return updated;
            });
            })
        .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
    }
    

    const [isBlock,setIsBlock] = useState()
    const [id,setId] = useState()
    
    const handleModal=(id,state)=>{
        setId(id)
        setIsBlock(state)
        setShowModal(true)
    }

return (
    <>
    {!edit ? 
    <div className="w-full px-3 py-1 ">
    <div className="flex flex-col">
    <div className="mb-1 p-2 w-full">
        <div className="bg-slate-200 py-3 px-3 rounded-md">
            <div className="container flex justify-end mx-auto">
                <form className="flex items-start md:flex-row md:items-end" role="search">
                    <input
                        className="w-full px-2 py-1 border rounded-md form-input md:mr-2 md:w-auto focus:outline-none focus:ring focus:border-blue-300"
                        type=""
                        ref={searchRef}
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="p-1 rounded bg-blue-400 mx-2 sm:mx-0" type='button' onClick={search}>
                        Search
                    </button>
                </form>
            </div>
        </div>
    </div>
    <div className='w-full h-full overflow-x-scroll'>
    <table className="table ">
        <thead>
            <tr>
            {['#', 'Name', 'Email', 'Phone', '', ''].map((label, index) => (
            <th key={index} scope="col" className="py-4 text-center bg-slate-200">
                {label}
            </th>
            ))}
            </tr>
        </thead>
        <tbody>
            {usersData
            .filter((obj)=>obj?.email.toLowerCase().includes(searchInput))
            .map((obj,index)=>{
            return(
            <tr key={obj._id} className='border-b-gray-400'>
                <td className="px-4 py-2 text-center">{index+1}</td>
                <td className="px-4 py-2 text-center">{obj.name}</td>
                <td className="px-4 py-2 text-center">{obj.email}</td>
                <td className="px-4 py-2 text-center">{obj.mobile}</td>
                <td className="px-4 py-2">
                    <button className='mx-5 text-blue-600' onClick={()=>editUser(obj)}>Edit</button>
                    <button className='mx-5 text-red-600' onClick={()=>handleModal(obj._id,!obj.is_blocked)}>{obj.is_blocked ? 'Unblock' : 'Block'}</button>
                </td>
            </tr> )
            })}
        </tbody>
    </table>
    </div>

    </div>
    </div> : (
    <EditUser user={userDetails} func={setEdit}/>)}
    { showModal ?
       <Modal 
       setShowModal={setShowModal} 
       confirm={()=>{handleBlock(id,isBlock),setShowModal(false)}} 
       message={'Are you sure?'} 
       description={'Please confirm to proceed this action?'} />  
       : '' }
    </>
)}

export default Users
