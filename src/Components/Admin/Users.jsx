import React,{ useState,useEffect, useRef }from 'react'
import adminAxios from '../../Axios/AdminAxios'
import { toast } from 'react-toastify'
import EditUser from './EditUser'


const Users=()=>{
    const [usersData , setUsersData] = useState([])
    const [searchInput ,setSearchInput] = useState('')
    const [userDetails,setUser] = useState({})
    const [edit,setEdit] = useState(false)
    const searchRef = useRef()
    
    useEffect(()=>{
            adminAxios.get('/users-details').then((res)=>{
                console.log(res.data.result);
                setUsersData(res.data.result)
            }).catch((error)=>{
                console.log(error);
                toast.error(error.message)
            })
    },[edit]);

    const search=()=>{
        setSearchInput(searchRef.current.value);
        // if(searchInput == ''){
        //     setData(usersData)
        // }else{
        //     let Data = usersData.filter(user => {
        //         const lowerSearchInput = searchInput.toLowerCase();
        //         let emailMatch = user.email.toLowerCase().includes(lowerSearchInput);
        //         let nameMatch = user.name.toLowerCase().includes(lowerSearchInput);
        //         let mobileMatch = false; 
        
        //         if (!isNaN(searchInput)) {
        //           const mobileString = String(user.mobile); 
        //           mobileMatch = mobileString.includes(searchInput);
        //         }
              
        //         return emailMatch || nameMatch || mobileMatch;})
        //     setData(Data)
        //     }   
        }
    const editUser =(user)=>{
        setUser(user)
        setEdit(true)
    }    
    const block=(id)=>{
        adminAxios.get(`block-user?id=${id}`).then((res)=>{
            // SetBlockHandle(true)
            setUsersData(prev =>{
                const updated = prev.filter(user =>{
                    if(user._id == id) user.is_blocked = true
                    return user
                })
            return updated
            })
        }).catch((error)=>{
            console.log(error);
            toast.error(error.message)
        })
    }
    const unBlock=(id)=>{
        adminAxios.get(`unblock-user?id=${id}`).then((res)=>{
            setUsersData(prev =>{
                const updated = prev.filter(user =>{
                    if(user._id == id) user.is_blocked = false
                    return user
                })
            return updated
            })
        }).catch((error)=>{
            console.log(error);
            toast.error(error.message)
        })
    }
return (
    <>
    {!edit ? 
    <div className="w-full px-3">
    <div className="flex flex-col">
    <div className="m-5">
        <nav className="bg-light">
            <div className="container flex justify-end mx-auto">
                <form className="flex flex-col items-start md:flex-row md:items-end" role="search">
                    <input
                        className="w-full px-2 py-1 border rounded-md form-input md:mr-2 md:w-auto focus:outline-none focus:ring focus:border-blue-300"
                        type=""
                        ref={searchRef}
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="p-1 rounded bg-slate-200" type='button' onClick={search}>
                        Search
                    </button>
                </form>
            </div>
        </nav>
    </div>
    <table className="table">
        <thead>
            <tr>
                <th scope="col" className='py-2 text-center bg-slate-200' >#</th>
                <th scope="col" className='py-2 text-center bg-slate-200'>Name</th>
                <th scope="col" className='py-2 text-center bg-slate-200'>Email</th>
                <th scope="col" className='py-2 text-center bg-slate-200'>Phone</th>
                <th scope="col" className='py-2 text-center bg-slate-200'></th>
                <th scope="col" className='py-2 text-center bg-slate-200'></th>
            </tr>
        </thead>
        <tbody>
            {usersData
            .filter((obj)=>obj.email.toLowerCase().includes(searchInput))
            .map((obj,index)=>{
            return(
            <tr key={obj._id}>
                <td className="px-4 py-2 text-center">{index+1}</td>
                <td className="px-4 py-2 text-center">{obj.name}</td>
                <td className="px-4 py-2 text-center">{obj.email}</td>
                <td className="px-4 py-2 text-center">{obj.mobile}</td>
            
                <td className="px-4 py-2">
                    <button className='mx-5 text-blue-600' onClick={()=>editUser(obj)}>Edit</button>
                    
                    {obj?.is_blocked ? <button className="text-red-600" onClick={()=>unBlock(obj._id)}>Unblock</button>
                    : <button className="text-red-600" onClick={()=>block(obj._id)}>Block</button>
                    }
                </td>
            </tr> )
            })}
        </tbody>
    </table>
    </div>
    </div> : (
    <EditUser user={userDetails} func={setEdit}/>
    )}
</>
)}

export default Users
