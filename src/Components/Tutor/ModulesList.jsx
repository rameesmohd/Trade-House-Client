import React, { useRef } from 'react'
import  { useState } from "react";
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import tutorAxios from '../../Axios/TutorAxios'
import { toast } from 'react-toastify'
import Modal from './../Modal'
import { Spinner } from "@material-tailwind/react";
import Loading from '../Loading'
let deleteId;

const ModulesList = () => {
  const location = useLocation()
  const courseId = location.state
  const axiosInstance = tutorAxios()
  const titleRef= useRef()
  const chapterTitleRef = useRef()
  const capterEditTitle = useRef()

  const [loading,setLoading]=useState(false)
  const [moduleData,setModuleData] = useState([]) 
  const [modal,setShowModal] = useState(false)
  const [edit,setEditId] = useState('')
  const [currInputValue,setCurrInputValue] = useState('')
  const [spinner,setSpinner] = useState(false)
  const [drop,setDrop] = useState({_id:''})
  const [chapterdata,setChapterview] = useState({})
  const [editChapter,setChapterEdit] = useState(false)
  const [video,setVideo] = useState()
  const [currentModuleId,setCurrrentModuleId] = useState()
  const [chapterDeleteModal,setchapterDeleteModal] = useState(false)

  useEffect(()=>{
    const courseData=async()=>
      await axiosInstance.get(`/modules?courseId=${courseId}`).then((res)=>{
        const moduleData = res.data.result 
        setModuleData(moduleData)
      }).catch((error)=>{
        toast.error(error.message)
      })
    courseData()
  },[])

  useEffect(()=>{
    if(Object.keys(chapterdata).length){
      setChapterview({})
    }
  },[drop])

  const addModuleHandle =async({save,cancel})=>{
    if(!save && !cancel){
      const filteredData = moduleData.filter((value)=>value.courseId=='0')
      const addModuleInput = [...moduleData ,{title:'0',courseId:'0',chapter:[]}]
      !filteredData.length && setModuleData(addModuleInput)
    }
    if(save){
      const title = titleRef.current.value
      let filteredData
      title ? filteredData = moduleData.filter((value)=>value.courseId!=='0') : toast.warning('Invalid title')
      const updatedData = [...filteredData,{title:title,courseId:courseId,chapters:[]}]
      setModuleData(updatedData)
      await axiosInstance.post('/modules',{courseId:courseId,title:title}).then((res)=>{
        const moduleData = res.result 
        toast.success(res.data.message)
      }).catch((error)=>{
        toast.error(error.message)
        console.log(error.message);
      })
    }
    if(cancel){
      const filteredData = moduleData.filter((value)=>value.courseId!=='0')
      setModuleData(filteredData)
    }
  }

  const editModuleHandle =async({id,update,cancel,currtitle})=>{
      if(!update && !cancel){
        setEditId(id)
        setCurrInputValue(currtitle)
      }
      if(update){
        const updatedTitle = currInputValue
        setModuleData((prevModuleData) =>
        prevModuleData.map((obj) =>
          obj._id === edit
            ? { ...obj, title: updatedTitle } 
            : obj
          )
        );      
       await axiosInstance.patch('/modules',{id:id,title:updatedTitle}).then((res)=>{
          toast.success(res.data.message)
          setEditId('')
        }).catch((error)=>{
          toast.error(error.message)
          console.log(error.message);
        })
      }
      if(cancel){
        setEditId('')
        setCurrInputValue('')
      }
  }
  
  const handleModal=(id)=>{
        deleteId = id
        setShowModal(true)
  }

  const deleteModule =(id)=>{
    const filteredData = moduleData.filter((obj)=>obj._id !== id)
    setModuleData(filteredData)
    setShowModal(false)
    axiosInstance.delete(`/modules?id=${id}`).then((res)=>{
      toast.success(res.data.message)
    }).catch((error)=>{
      toast.error(error.message)
      console.log(error.message);
    })
  }

  const AddChapterhandle =async({id,save,cancel}) => {
    if(!save && !cancel){
      const data = moduleData.map((obj) =>
      obj._id === id ? { ...obj, chapters: [...obj?.chapters, { _id: 'add chapter' ,video : '' ,title : ''}] } : obj
      );
      if(data)
        DropdownAndUpHandler({id:id,dropupIcon :true})
        setModuleData(data)
    }
    if(save){
      setSpinner(true)
      const title = chapterTitleRef.current.value
      await axiosInstance.post('/chapter',{moduleId:id,title:title,courseId:courseId}).then((res)=>{
        const moduleData = res.data.result 
        setModuleData(moduleData)
        toast.success(res.data.message)
        setSpinner(false)
      }).catch((error)=>{
        console.log(error);
        toast.error(error.message)
        setSpinner(false)
      })
    }
    if(cancel){
      const updatedData = moduleData.map((obj) =>
        obj._id === id ? { ...obj, chapters: obj.chapters.filter((chapter) => chapter._id !== 'add chapter') }
        : obj );
      setModuleData(updatedData);
    }
  };
  
  const DropdownAndUpHandler=({id})=>{
      setDrop({_id:id})
  }

  const expandChapter=(chapterObj,moduleId)=>{
    setChapterview(chapterObj)
    setCurrrentModuleId(moduleId)
  }
  
  const handleVideoUpload=(file)=>{
    setChapterEdit(true)
    setVideo(file)
  }
  
  const editChapterHandle=async(e)=>{
    e.preventDefault()
    const title = capterEditTitle.current.value
    const chapterId = chapterdata._id
    console.log(chapterdata);
    const currVideo = chapterdata.video
    setSpinner(true)
    await axiosInstance.patch('/chapter',{title:title,video:video ? video : currVideo,moduleId:currentModuleId,chapterId:chapterId},{
      headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
        setChapterEdit(false)
        setVideo(null)
        console.log(res.data);
        const title =  res.data.chapter_title
        const video = res.data.video
        const updatedData = moduleData.map((obj) => obj?._id === currentModuleId
        ?{...obj, 
              chapters: obj.chapters.map((chapter) =>
                  chapter?._id === chapterId
                    ? { ...chapter, video: video, chapter_title: title }
                    : chapter
                )
            }
              : obj 
          );
          setChapterview({_id:chapterId,chapter_title:title,video:video})
          setModuleData(updatedData);
          setSpinner(false);
          toast.success(res.data.message);
        }).catch((error)=>{
          setSpinner(true)
          toast.error(error.message)
        })
    }

  const DropdownIcon =()=> (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3.293 6.293a1 1 0 011.414 0L10 11.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  const DropupIcon =()=> (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 13.293a1 1 0 01-1.414 1.414L10 10.414l-5.293 5.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6z"
        clipRule="evenodd"
      />
    </svg>
  );

  const deleteChapter =async()=>{
    const chapterId = chapterdata._id
    const moduleId = currentModuleId
    setLoading(true)
    setchapterDeleteModal(false)
    await axiosInstance.delete(`/chapter?chapter_id=${chapterId}&module_id=${moduleId}&course_id=${courseId}`).then((res)=>{
      const moduleData = res.data.result 
      setModuleData(moduleData)
      setChapterview({})
      toast.success(res.data.message)
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      toast.error(error.message)
    })
  }

  return (
    <>
    <div className='lg:grid lg:grid-cols-2 w-full h-full py-2'>
      {/* section one */}
      <div className='p-12 lg:col-span-1 max-h-screen overflow-y-scroll scrollbar-hide'>
        <div className='h-12 w-full bg-gray-100 rounded-lg mb-3 flex justify-between'>
          <h1 className='font-poppins my-auto mx-5'></h1>
          <div onClick={addModuleHandle} className='bg-slate-900 rounded-md w-28 h-auto text-center flex justify-center items-center m-2 text-white hover:bg-slate-600 cursor-pointer' >Add module</div>
        </div>
        { moduleData.map((obj,index)=>{
          return(
          <div key={obj._id} className=" overflow-x-auto shadow-md sm:rounded-lg mb-5">
            <table key={obj._id} className="w-full  text-sm text-left text-gray-500 ">
              <thead className="text-sm text-gray-700 uppercase bg-yellow-400 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Module {index+1}
                  </th>
                  <th scope="col" className="px-6 py-3">
                  
                  </th>
                  <th scope="col" className="px-6 py-3">
                  
                  </th>
                </tr>
              </thead>
              <tbody>
                  <tr  className="bg-white border-b">
                      <th scope="row">
                        { obj.courseId ==='0' && 
                        <div className='relative'>
                           <p className='absolute top-0 left-3 text-xs font-poppins text-gray-400 pointer-events-none'>
                              Enter title
                              </p>
                            <input ref={titleRef} className='mx-3 mt-4 rounded-md text-sm mb-3' />
                            </div>  
                        }
                         {obj._id==edit &&
                             <div className='relative'>
                             <p className='absolute top-0 left-3 text-xs font-poppins text-gray-400 pointer-events-none'>
                                </p>
                              <input onChange={(e)=>setCurrInputValue(e.target.value)} value={currInputValue} className='mx-3 mt-4 rounded-md text-sm mb-3' />
                              </div>   
                         }
                        { obj.courseId !=='0' && obj._id !== edit && <div className=' px-6 py-4 font-medium text-gray-900 whitespace-nowrap'><p>{obj.title}</p></div> }
                      </th>
                    <td className="px-6 py-4">
                        {obj.courseId=='0' && <> 
                            <a onClick={()=>addModuleHandle({save:true})} className="font-medium text-green-600 hover:underline mx-2">
                              Save
                            </a>
                            <a onClick={()=>addModuleHandle({cancel:true})} href="#" className="font-medium text-red-600 hover:underline mx-2">
                              Cancel
                            </a>
                          </>}
                          {obj._id==edit && <> 
                            <a onClick={()=>editModuleHandle({id:obj._id,update:true})} className="font-medium text-green-600 hover:underline mx-2">
                              Update
                            </a>
                            <a onClick={()=>editModuleHandle({id:obj._id,cancel:true})} className="cursor-pointer font-medium text-red-600 hover:underline mx-2">
                              Cancel
                            </a>
                          </>}
                        {obj.courseId!=='0'&&  obj._id!==edit &&
                          <>
                            <a onClick={()=>editModuleHandle({id:obj._id,currtitle:obj.title})} className="font-medium text-blue-600 hover:underline mx-2">
                              Edit
                            </a>
                            <a onClick={()=>handleModal(obj._id)} className="font-medium text-red-600 hover:underline mx-2">
                              Delete
                            </a>
                          </>}
                      </td>
                      { !obj?.chapters?.length && <td onClick={()=>AddChapterhandle({id:obj._id})} className="hover:text-red-700 px-6 py-4 flex cursor-pointer" >Add Chapter </td> }

                      { obj?.chapters?.length ? drop._id !== obj._id &&
                      <td key={obj._id} onClick={()=>DropdownAndUpHandler({id:obj._id})} className="px-6 py-4 flex cursor-pointer">
                          <a>Chapters</a>
                           <DropdownIcon/>
                      </td> : ''}

                      { obj?.chapters?.length ? drop._id === obj._id && 
                      <td key={obj._id} onClick={()=>DropdownAndUpHandler({id:''})} className="px-6 py-4 flex cursor-pointer">
                        <a>Chapters</a>
                        <DropupIcon/>
                      </td> : ''}

                    </tr>
                    <tr className='w-full'>
                      
                    </tr>
              </tbody>
            </table>
            <div className='w-full py-3 px-4'>

              {drop._id==obj._id && obj?.chapters?.map((chapter,index)=>
                chapter._id === 'add chapter' ? 
                <div key={chapter._id} className='flex justify-between w-full mx-2 border border-black rounded-md h-auto p-3 focus:text-white' >
                  <input placeholder='Enter title' ref={chapterTitleRef} className='border-red-700 w-4/6 h-9 rounded-md' type="text" />
                  <button onClick={()=>AddChapterhandle({id:obj._id,save : true})} className='w-1/6 rounded mx-2 hover:bg-slate-900 hover:text-white text-black bg-slate-200 text-sm p-1 text-center flex items-center justify-center'>
                    {spinner ? <Spinner className='mr-2'/> : 'Add'}</button>
                  <button onClick={()=>AddChapterhandle({id:obj._id,cancel : true})} className='w-1/6 rounded mx-1 hover:bg-slate-900 hover:text-white text-black bg-slate-200 text-sm p-1 '>Cancel</button>
                </div> : 
                <button key={chapter._id} onClick={()=>expandChapter(chapter,obj._id)} className='w-full m-1 border flex justify-between border-black rounded-md h-auto p-3 focus:bg-slate-500 focus:text-white text-left ' >
                  Chapter {index+1}:{chapter?.chapter_title} 
                  {obj?.chapters.length-1 === index  && <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>AddChapterhandle({id:obj._id})} width="28" height="24" fill="currentColor" 
                       className="bi bi-plus" viewBox="0 0 16 16"> 
                       <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/> 
                   </svg>}
                </button>
              )}
              </div> 
          </div>)
        })}
      </div>
      {/* section two */}
      { Object.keys(chapterdata).length ? 
      <form key={chapterdata._id} className='lg:col-span-1 h-fit w-full bg-slate-50 flex justify-center' onSubmit={editChapterHandle} encType="multipart/form-data">
          <div className=' border border-black p-4 w-full'>
            { chapterdata.video && !editChapter ? 
            <video className="md:h-96 w-full rounded-lg" controls autoPlay muted>
              <source src={chapterdata.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            : (
                <label htmlFor="dropzone-video" className="md:h-96 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-200 dark:bg-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-300 dark:hover:bg-gray-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-200 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">MP4, AVI, or MOV</p>
                    </div>
                    <input id='dropzone-video' onChange={(e)=>handleVideoUpload(e.target.files[0])} type="file" accept="video/*" className="ml-12 border-none m-3" />
                </label> 
                )}
            <div className='w-full mt-2 bg-white h-auto p-3'>
            { !editChapter && <h1 className='text-lg font-poppins'>Title : {chapterdata.chapter_title}</h1>}
             { editChapter && <div className='flex'>
                <input type="text" value={chapterdata.chapter_title} ref={capterEditTitle} onChange={(event)=>setChapterview({...chapterdata,chapter_title: event.target.value})} 
                className='rounded-md border w-full h-10 border-black'/>
              </div>}
              <div className='flex justify-end'>
                {!editChapter && <div className='flex justify-between m-1'>
                  <div onClick={()=>setChapterEdit(true)} className='btn-sm flex justify-center items-center text-white rounded-md h-7 bg-blue-700 cursor-pointer'> Edit</div>
                </div>}
                {
                  editChapter && <div className='flex justify-between m-1'>
                  <button type='submit' className='btn-sm flex justify-center items-center text-white rounded-md h-7 bg-blue-700 cursor-pointer'>{spinner  ? <Spinner className='mr-2'/> : 'Save'}</button>
                </div>
                }
                { editChapter && <div className='flex justify-between m-1'>
                  <div onClick={()=>setChapterEdit(false)} className='btn-sm flex justify-center items-center text-white rounded-md h-7 bg-red-700 cursor-pointer'>Cancel</div>
                </div>}
                { !editChapter && <div className='flex justify-between m-1'>
                  <div onClick={()=>setchapterDeleteModal(true)} className='btn-sm flex justify-center items-center text-white rounded-md h-7 bg-red-700 cursor-pointer'>Delete</div>
                </div>}
              </div>
            </div>
          </div>
      </form> : '' }
    </div>
    {chapterDeleteModal && <Modal setShowModal={setchapterDeleteModal} confirm={deleteChapter} message={'Are you sure?'} description={'Chapter will be deleted permenently'}/>}
    {modal && <Modal setShowModal={setShowModal} confirm={()=>deleteModule(deleteId)} message={'Are you sure?'} description={'Module will be deleted permenently'}/>}
    {loading && <Loading/>}
    </>
  )
}

export default ModulesList

