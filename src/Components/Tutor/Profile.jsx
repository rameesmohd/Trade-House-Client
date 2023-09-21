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
  const [imgDataUrl, setImgDataUrl] = useState('');
  const [editAbout,setEditAbout] = useState(false)

  useEffect(()=>{
      axiosInstance.get(`/profile?id=${id}`)
      .then((res)=>{
         setProfileData(res.data.tutor)
      }).catch((error)=>{
        toast.error(error.message)
      })
  },[])

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfileData({...tutorData,image :URL.createObjectURL(selectedFile)})
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setImgDataUrl(reader.result)
      }
    }
  };

  const updateImage=()=>{
     axiosInstance.patch('/image',{id,imgDataUrl})
     .then((res)=>{
      setImgDataUrl('')
      toast.success('Updated successfully')
      setProfileData(res.data.tutor)
    }).catch((error)=>{
      console.log(error);
      toast.error(error.message)
    })
  }

  imgDataUrl ? updateImage() : ''

  const handleAboutEdit=()=>{
    !tutorData.about_me ? 
    (() => {
      const tutorDataNew = { ...tutorData, about_me: '' };
      setProfileData(tutorDataNew);
      setEditAbout(true);
    })() : setEditAbout(true);
  }

  const handleAboutSave=()=>{
    axiosInstance.patch('/about',{id : id,about_me: tutorData.about_me,tutorData : tutorData})
    .then((res)=>{
     toast.success('Updated successfully')
    //  setProfileData(res.data.tutor)
    }).catch((error)=>{
     console.log(error);
     toast.error(error.message)
    })
    setEditAbout(false)
  }

  return(
  <div className="bg-black">
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
        <div className="col-span-4 sm:col-span-3">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={tutorData?.image ? tutorData.image : 'https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg'}
                className="bg-gray-300 w-44 rounded-md mb-4 shrink-0"
                alt="User"
              />
                <div className=" flex justify-end">
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
              </div>
              <h1 className="text-xl font-bold">{tutorData?.firstName+' '+tutorData?.lastName}</h1>
              <p className="text-gray-600">{tutorData?.type_of_trader}</p>
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <div className='flex justify-between'>
            <div className="flex flex-col">
              <span className="text-gray-600 tracking-wider mb-2">Category</span>
              <p>
              {tutorData?.category}
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 tracking-wider mb-2">Experience</span>
              <p>
              {tutorData?.experience}+ years
              </p>
            </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-9 ">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
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
    </div>
  </div>)
};



const ExperienceItem = ({ title, company, date, description }) => (
  <div className="mb-6">
    <div className="flex justify-between">
      <span className="text-gray-600 font-bold">{title}</span>
      <p>
        <span className="text-gray-600 mr-2">{`at ${company}`}</span>
        <span className="text-gray-600">{date}</span>
      </p>
    </div>
    <p className="mt-2">{description}</p>
  </div>
);

export default TutorProfile;
