import React from 'react'
import { useState } from 'react'
import adminAxios from '../../Axios/AdminAxios'
import { toast } from 'react-toastify'

const EditUser = ({user,func}) => {
    const axiosInstance = adminAxios()
    const [id,setId] = useState(user._id)
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [mobile ,setMobile] = useState(user.mobile);

    const updateProfile=async()=>{
     await axiosInstance.patch("/user",{ id,name,email,mobile
        }).then((res)=>{
            toast.success('success')
            func(false)
        }).catch((error)=>{
          console.log(error.message);
          toast.error(error.message)
        })
    }

return (
<div className='w-full'>
<div className="bg-slate-100 ">
  <div className="container py-5">
    <div className="grid grid-cols-1 gap-4 justify-center md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-1">
        <div className="card mb-4">
          <div className="card-body  border-zinc-700">
            <div className="flex mb-4">
              <p className="w-1/4 mb-0">Name :</p>
              <div className="w-3/4">
                <input type="text" className="w-full h-full border"

                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
              </div>
            </div>
            <hr className="mb-4" />
            <div className="flex mb-4">
              <p className="w-1/4 mb-0">Email :</p>
              <div className="w-3/4">
                <input type="email" className="w-full border"
                value={email}
                placeholder={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
            </div>
            <hr className="mb-4" />
            <div className="flex mb-4">
              <p className="w-1/4 mb-0">Mobile :</p>
              <div className="w-3/4">
                <input type="tel" className="w-full border"
                value={mobile}
                placeholder={mobile} 
                onChange={(e)=>setMobile(e.target.value)}
                />
              </div>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-center">
              <button
                type="button"
                className="btn bg-blue-400 btn-sm"
                onClick={()=>updateProfile()}
                >
                Update Profile
              </button>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
     </div>
  </div>
)}

export default EditUser
    