import React, { useEffect, useRef, useState } from 'react';
import img from '../../assets/cd5ead68d9fe4019e185abc69389ffb5.jpeg'
import tutorAxios from '../../Axios/TutorAxios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { emptyMyCourse } from '../../Redux/TutorSlice/Courses';

function Editcourse({editCourse,goBack,setLoading}) {

  const tutorId = useSelector((state)=>state.Tutor.id)
  const axiosInstance  = tutorAxios()
  const dispatch = useDispatch()
  const [title,setTitle] = useState()
  const [level,setLevel] = useState()
  const [duration,setDuration] = useState()
  const [category,setCategory]=useState()
  const [preview,setPreview] = useState(null)
  const [banner,setBanner] = useState(null)
  const [description,setDescription]=useState()
  const [paragraph, setParagraph] = useState('');
  const [splitParagraph, setSplitParagraph] = useState([]);
  const [categoryData ,setCategoryData] = useState([])
  const [price,setPrice] = useState()

  const fetchChategory=async()=>{
    await axiosInstance.get('/category').then((res)=>{
      setCategoryData(res.data.result)
    }).catch((error)=>{
      toast.error(error.message)
    })
  }

  useEffect(()=>{
    fetchChategory()
  },[])

  const disableCourse=async()=>{
      
      await axiosInstance.put(`/courses?courseId=${editCourse._id}`).then((res)=>{
        goBack(false)
        toast.success(res.data.message)
      }).catch((error)=>{
        console.log(error);
        toast.error(error.message)
      })
  }

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
        id : editCourse._id,
        title : title ? title : editCourse?.title,
        level : level ? level : editCourse?.level,
        duration : duration ? duration : editCourse?.duration,
        category : category ? category : editCourse?.category,
        description : description ? description : editCourse?.description,
        skillsOffering : splitParagraph[0].length ? splitParagraph : editCourse?.skillsOffering,
        price : price ? price :  editCourse?.price,
        tutor : tutorId,
        preview : preview ? preview : editCourse?.preview,
        banner : banner ? banner : editCourse?.banner
      }
      const id=editCourse._id
      setLoading({id : id,spinner : true})
      goBack(false)
      await axiosInstance.patch('/courses',formData,{
      headers: {'Content-Type': 'multipart/form-data'},
    }).then((res)=>{
        toast.success(res.data.message)
        dispatch(emptyMyCourse())
        setLoading({id : id,spinner : false})
    }).catch((error)=>{
        toast.error(error.message)
        toast.error(error.data.response.message)
        console.log(error);
    })
  }

  return (
    <div className='md:grid  lg:grid-cols-2 '>
    <form className='mx-2 md:p-10 md:col-span-1' onSubmit={handleSubmit} encType="multipart/form-data">
    <div className="w-full bg-slate-200 p-2 rounded-md mb-2 items-center flex justify-between">
        <p className='text-2xl font-bold text-gray-900'>Edit Course</p> 
        <p onClick={()=>goBack(false)} className='underline cursor-pointer'>back</p>
        </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2 ">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            defaultValue={editCourse?.title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter course title"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Level</label>
          <select defaultValue={editCourse?.level} onChange={(e)=>setLevel(e.target.value)} className="select-bordered w-full max-w-xs">
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
            defaultValue={editCourse?.duration}
            onChange={(e)=>setDuration(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='1'
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
          <select  defaultValue={editCourse?.category} onChange={(e)=>setCategory(e.target.value)} className="select select-bordered w-full max-w-xs">
              <option disabled defaultValue>Choose category</option>
              {categoryData && categoryData.map((obj)=><option key={obj._id} value={obj._id}>{obj.category}</option>)}
            </select>
        </div>
        
        <div>
        <div className="max-w-[250px] h-[180px]">
                  {
                    editCourse?.preview ? 
                      <div>
                          <video className="max-w-[250px] h-[180px] rounded-lg" controls autoPlay muted>
                                <source src={editCourse.preview} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                      </div>
                    : <div className='h-full w-full bg-slate-100 flex justify-center items-center'>
                         <h1 className=''>Upload preview</h1>
                      </div>
                  }
                  </div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Preview</label>
          <input onChange={(e)=>setPreview(e.target.files[0])} type="file" accept="video/*" className="file-input file-input-bordered w-full max-w-xs"/>
        </div>
        <div>
        <div className="">
                    <div className="h-[180px]">
                      {
                        !editCourse?.banner ? 
                        <div className='h-full w-full bg-slate-100 flex justify-center items-center'><h1>Upload banner</h1></div>
                        :
                       <img className='max-w-[250px] h-full bg-slate-50 mx-auto' src={editCourse.banner} alt="" /> 
                      }
                    </div>
                  </div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Banner</label>
          <input onChange={(e)=>setBanner(e.target.files[0])} type="file" accept='image/jpeg, image/png' className="file-input file-input-bordered w-full max-w-xs" />
        </div>
      </div>
      <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Price(₹)</label>
          <input
            type="number" 
            defaultValue={editCourse?.price}
            onChange={(e)=>setPrice(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder='0.00'
            required
          />
        </div>
      <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900">Description</label>
        <textarea  defaultValue={editCourse?.description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="textarea textarea-bordered textarea-md w-full" ></textarea>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900">What will you learn?(students)</label>
        <textarea onChange={(e)=>setParagraph(e.target.value)} defaultValue={editCourse?.skillsOffering} placeholder="Enter point by point" className="textarea textarea-bordered textarea-md w-full" />
      </div>
      <div className='flex justify-between'>
        <button
          type="submit" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1.5 text-center mb-5">
          Submit
        </button>
        <button
          type="button" 
          onClick={()=>disableCourse()}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 text-center mb-5">
          Suspend course
        </button>
      </div>
    </form>
    <div className='hidden md:block col-span-1 m-auto'>
      <img src={img} alt="" />
    </div>
    </div>
  )
}

export default Editcourse;
