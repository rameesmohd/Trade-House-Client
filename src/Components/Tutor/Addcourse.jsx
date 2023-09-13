import React, { useEffect, useRef, useState } from 'react';
import img from '../../assets/cd5ead68d9fe4019e185abc69389ffb5.jpeg'
import tutorAxios from '../../Axios/TutorAxios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses';
import {addCourse} from '../../Redux/TutorSlice/Courses';

function Addcourse({setAddcourse,setLoading}) {
  const id = useSelector((state)=>state.Tutor.id)
  const dispatch = useDispatch()
  const axiosInstance  = tutorAxios()
  const titleRef = useRef()
  const levelRef = useRef()
  const durRef = useRef()
  const desRef = useRef()
  const priceRef =useRef()
  const categoryRef = useRef()
  const [preview,setPreview] = useState(null)
  const [banner,setBanner] = useState(null)
  const [paragraph, setParagraph] = useState('');
  const [splitParagraph, setSplitParagraph] = useState([]);
  const [categoryData ,setCategoryData] = useState([])

  useEffect(()=>{
    axiosInstance.get('/category').then((res)=>{
      setCategoryData(res.data.result)
    }).catch((error)=>{
      toast.error(error.message)
    })
  },[])

  useEffect(()=>{
    splitParagraphByPeriod()
  },[paragraph])

  const splitParagraphByPeriod = () => {
    const splitArray = paragraph.split('.');
    setSplitParagraph(splitArray);
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    if (!titleRef.current.value.trim()) {
      alert('Please enter a course title.');
      return;
    }
    if (levelRef.current.value === 'Select level') {
      alert('Please select a course level.');
      return;
    }
    if (!durRef.current.value || durRef.current.value <= 0) {
      alert('Please enter a valid course duration.');
      return;
    }
    if (categoryRef.current.value === 'Who shot first?') {
      alert('Please select a category.');
      return;
    }
    if (!desRef.current.value.trim()) {
      alert('Please enter a course description.');
      return;
    }
    setAddcourse(false)
      const formData = {
        title : titleRef.current.value,
        level : levelRef.current.value,
        duration : durRef.current.value,
        category : categoryRef.current.value,
        description : desRef.current.value,
        skillsOffering : splitParagraph,
        tutor : id ,
        price : priceRef.current.value,
        preview : preview,
        banner : banner
      }
      dispatch(addCourse({    
        _id : '123456',
        title : titleRef.current.value,
        level : levelRef.current.value,
        duration : durRef.current.value,
        category : categoryRef.current.value,
        description : desRef.current.value,
        price : priceRef.current.value,
        skillsOffering : [''],
        tutor : id,
        preview : 'loading',
        banner : 'loading'
      }))
      setLoading({id:'123456',spinner:true})
      axiosInstance.post('/add-course',formData,{
      headers: {'Content-Type': 'multipart/form-data'},
    }).then((res)=>{
        toast.success(res.data.message)
        dispatch(emptyMyCourse())
        setLoading({id:'123456',spinner:false})
    }).catch((error)=>{
      toast.error(error.message)
      toast.error(error.response.data.message)
      console.log(error);
    })
  }

  return (
    <div className='md:grid  lg:grid-cols-2 '>
    <form className='mx-2 md:p-10 md:col-span-1' onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="w-full bg-slate-200 p-2 rounded-md mb-2 items-center flex justify-between">
        <p className='text-2xl font-bold text-gray-900'>Add Course</p> 
        <p onClick={()=>setAddcourse(false)} className='underline cursor-pointer'>back</p>
        </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2 ">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            ref={titleRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter course title"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Level</label>
          <select ref={levelRef} className="select-bordered w-full max-w-xs" required>
              <option disabled defaultValue>Select level</option>
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
          <select ref={categoryRef} className="select select-bordered w-full max-w-xs" required>
              <option  defaultValue>Choose category</option>
              {categoryData && categoryData.map((obj)=><option key={obj._id} value={obj._id}>{obj.category}</option>)}
            </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Price(₹)</label>
          <input
            type="number"
            ref={priceRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='0.00'
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Preview</label>
          <input onChange={(e)=>setPreview(e.target.files[0])}  accept="video/*"  type="file" className="file-input file-input-bordered w-full max-w-xs"/>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Banner</label>
          <input onChange={(e)=>setBanner(e.target.files[0])}  accept="image/jpeg, image/png"  type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </div>
      </div>

      <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900">Description</label>
        <textarea ref={desRef} placeholder="Description" className="textarea textarea-bordered textarea-md w-full" required></textarea>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">What will you learn?(students)</label>
        <textarea onChange={(e)=>setParagraph(e.target.value)} placeholder="Enter point by point" className="textarea textarea-bordered textarea-md w-full" required/>
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

export default Addcourse;
