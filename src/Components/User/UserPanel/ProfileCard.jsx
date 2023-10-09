import React, { useRef, useState } from 'react'
import userAxios from '../../../Axios/UserAxios'
import {toast} from 'react-toastify'

const Card = ({userData,setUserData}) => {
  const inputRef =  useRef()
  const axiosInstance = userAxios()
  const [imageUrlData,setImageUrlData] = useState('')

  const handleInputClick=()=>{
    inputRef.current.click()
  }

  const handleImageChange=(file)=>{
      if(file){
        setUserData({...userData,image : URL.createObjectURL(file)})
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setImageUrlData(reader.result)
        }
      }
  }

  imageUrlData ? updateImage() : ''

  async function updateImage(){
    await axiosInstance.patch('/image',{id:userData._id,imageUrlData})
    .then((res)=>{
     toast.success(res.message)
   }).catch((error)=>{
     console.log(error);
     toast.error(error.message)
   }).finally(()=>{
    setImgDataUrl('')
   })
 }

  return (
    <>
     <div className='px-10 py-2 w-full'>
            <div className="bg-white shadow rounded-lg p-6 border">
            <div className="flex flex-col items-center">
              <img
                src={userData?.image ? userData.image : 'https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg'}
                className="bg-gray-300 rounded-md mb-4  w-60 h-60 object-cover"
                alt="User"
              />
                <div className=" flex justify-end">
                  <div onClick={handleInputClick} className='cursor-pointer hover:text-red-600 underline'>
                      Change
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    ref={inputRef}
                    onChange={(e)=>handleImageChange(e.target.files[0])}
                    style={{ display: 'none' }} />
              </div>
              <h1 className="text-xl font-bold">{userData?.name ? userData.name.toUpperCase() : 'name'}</h1>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <div className='flex justify-between'>
            <div className="flex flex-col">
              <span className="text-gray-600 tracking-wider mb-2">Mobile</span>
              <p>+91{' '} 
              {userData?.mobile}
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 tracking-wider mb-2">User</span>
              <p>
             
              </p>
            </div>
            </div>
          </div>
            </div>
    </>
  )
}

export default Card
