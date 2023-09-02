import React, { useEffect, useRef, useState } from 'react';
import img from '../../assets/cd5ead68d9fe4019e185abc69389ffb5.jpeg'
import tutorAxios from '../../Axios/TutorAxios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function Addcoursecover() {
  const token = useSelector((state)=>state.Tutor.Token)
  const id = useSelector((state)=>state.Tutor.id)

  const titleRef = useRef()
  const levelRef = useRef()
  const durRef = useRef()
  const categoryRef = useRef()
  const [preview,setPreview] = useState(null)
  const [banner,setBanner] = useState(null)
  const desRef = useRef()
  const [paragraph, setParagraph] = useState('');
  const [splitParagraph, setSplitParagraph] = useState([]);

  useEffect(()=>{
    splitParagraphByPeriod()
  },[paragraph])

  const splitParagraphByPeriod = () => {
    const splitArray = paragraph.split('.');
    setSplitParagraph(splitArray);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData = {
        title : titleRef.current.value,
        level : levelRef.current.value,
        duration : durRef.current.value,
        category : categoryRef.current.value,
        description : desRef.current.value,
        skillsOffering : splitParagraph,
        tutor : id ,
        preview : preview,
        banner : banner
      }
      console.log(formData);
    tutorAxios.post('/add-course',formData,{
      headers: { Authorization: `tutor ${token}`,
          'Content-Type': 'multipart/form-data'},
    }).then((res)=>{
        console.log(res);
        toast.success(res.data.message)
    }).catch((error)=>{
      toast.error(error.message)
      toast.error(error.response.data.message)
      console.log(error);
    })
  }

  return (
    <div className='md:grid  md:grid-cols-2 '>
    <form className='mx-2 md:p-10 md:col-span-1' onSubmit={handleSubmit} encType="multipart/form-data">
    <label className="w-full bg-slate-200 p-2 rounded-md block mb-2 text-2xl font-bold text-gray-900">Add Course</label>
      <div className="grid gap-6 mb-6 md:grid-cols-2 ">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            ref={titleRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter course title"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Level</label>
          <select ref={levelRef} className="select-bordered w-full max-w-xs">
              <option disabled defaultValue>Who shot first?</option>
              <option>Beginer</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Duration(Hour)</label>
          <input
            type="number"
            ref={durRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='1'
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
          <select ref={categoryRef} className="select select-bordered w-full max-w-xs">
              <option disabled defaultValue>Who shot first?</option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Preview</label>
          <input onChange={(e)=>setPreview(e.target.files[0])} type="file" className="file-input file-input-bordered w-full max-w-xs"/>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Banner</label>
          <input onChange={(e)=>setBanner(e.target.files[0])} type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </div>
      </div>

      <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900">Description</label>
        <textarea ref={desRef} placeholder="Description" className="textarea textarea-bordered textarea-md w-full" ></textarea>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">What will you learn?(students)</label>
        <textarea onChange={(e)=>setParagraph(e.target.value)} placeholder="Enter point by point" className="textarea textarea-bordered textarea-md w-full" />
      </div>
      <button
        type="submit" 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
      >
        Submit
      </button>
    </form>
    <div className='hidden md:block col-span-1 m-auto'>
      <img src={img} alt="" />
    </div>
    </div>
  );
}

export default Addcoursecover;
