import React, { useEffect, useRef } from 'react';
import tutorAxios from '../../Axios/TutorAxios'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const TutorProfile = () => {
  const axiosInstance = tutorAxios()
  const fileInputRef = useRef()
  const id = useSelector((store)=>store.Tutor.id)
  const [tutorData,setProfileData] = useState({})
  const [imgDataUrl, setImgDataUrl] = useState();
  const [editAbout,setEditAbout] = useState(false)

  const fetchData =async()=>{
    await axiosInstance.get(`/profile?id=${id}`)
    .then((res)=>{
       setProfileData(res.data.tutor)
    }).catch((error)=>{
      toast.error(error.message)
    })
  }
  useEffect(()=>{
    fetchData()
  },[])

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImgDataUrl(selectedFile)
    if (selectedFile) {
      setProfileData(prev=>({...prev,image :URL.createObjectURL(selectedFile)}))
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
      }
    }
  };

  const updateImage=async()=>{
     await axiosInstance.patch('/image',{id,image:imgDataUrl},{headers: {'Content-Type': 'multipart/form-data'}})
     .then((res)=>{
      setImgDataUrl()
      toast.success('Updated successfully')
    }).catch((error)=>{
      console.log(error);
      toast.error(error.message)
    })
  }

  imgDataUrl ? updateImage() : ''

  console.log(imgDataUrl);

  const handleAboutEdit=()=>{
    !tutorData.about_me ? 
    (() => {
      const tutorDataNew = { ...tutorData, about_me: '' };
      setProfileData(tutorDataNew);
      setEditAbout(true);
    })() : setEditAbout(true);
  }

  const handleAboutSave=async()=>{
    await axiosInstance.patch('/about',{id : id,about_me: tutorData.about_me,tutorData : tutorData})
    .then((res)=>{
     toast.success('Updated successfully')
    }).catch((error)=>{
     console.log(error);
     toast.error(error.message)
    })
    setEditAbout(false)
  }

  return(
  <div className="p-16">
    <div className="p-8 bg-slate-100 shadow mt-24 rounded-xl">  
    <div className="grid grid-cols-1 md:grid-cols-3">    
    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">      
    <div>               
       </div>          
          </div>    
          <div className="relative">      
          <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
          <img
              src={tutorData?.image ? tutorData.image : 'https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg'}
              className="w-48 h-48 rounded-full"
              alt="User"
             />
            </div>    
            </div>    
        
              </div>  
              <div className="mt-12 md:mt-24 text-center border-b pb-12">    
             <div  className='cursor-pointer hover:text-red-600 underline'
                  onClick={handleFileClick} >
                      Change
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    ref={fileInputRef} />
              <h1 className="text-4xl font-medium text-gray-700">{tutorData?.firstName+' '+tutorData?.lastName}</h1>    
              <p className="font-light text-gray-600 mt-3">{tutorData?.category}</p>    
              <p className="mt-8 text-gray-500">{tutorData?.experience}+ years</p>    
              <p className="mt-2 text-gray-500">{tutorData?.type_of_trader}</p>  </div>  
              <div className="mt-12 px-10 justify-center text-center">    
              {
              !editAbout ? 
                  <p className='resize w-full  rounded-md whitespace-normal break-words'>{tutorData?.about_me || ''}</p>
              : 
              <textarea className="resize w-full h-28 rounded-md" 
                placeholder='Please enter here' 
                value={tutorData?.about_me} 
                onChange={(e) => setProfileData({ ...tutorData, about_me: e.target.value })}>
              </textarea>
            }
            <div className=" flex justify-end">
            {
              !editAbout ? 
              <div className='cursor-pointer hover:text-red-600 underline' onClick={()=>handleAboutEdit()}>
                  Edit
              </div> : 
              <div className='cursor-pointer hover:text-red-600 underline' onClick={()=>handleAboutSave()}>
                  Save
              </div>
              }
            </div>
            </div>
      </div>
      </div>
  )
};


export default TutorProfile;
