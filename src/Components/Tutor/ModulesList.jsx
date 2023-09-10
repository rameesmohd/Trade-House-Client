import React, { useRef } from 'react'
import  { useState } from "react";
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import tutorAxios from '../../Axios/TutorAxios'
import { toast } from 'react-toastify'
import Modal from './../Modal'
import { Spinner } from "@material-tailwind/react";
let deleteId;

const ModulesList = () => {
  const location = useLocation()
  const axiosInstance = tutorAxios()
  const courseId = location.state
  const [moduleData,setModuleData] = useState([]) 
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [modal,setShowModal] = useState(false)
  const [edit,setEditId] = useState('')
  const [spinner,setSpinner] = useState(false)
  const titleRef= useRef()
  const editTitleRef =useRef()
  const chapterTitleRef = useRef()

  
  useEffect(()=>{
    axiosInstance.get(`/load-modules?courseId=${courseId}`).then((res)=>{
      const moduleData = res.data.result 
      setModuleData(moduleData)
      console.log(res);
    }).catch((error)=>{
      toast.error(error.message)
      console.log(error.message);
    })
  },[])

  const addModuleHandle =({save,cancel})=>{
    if(!save && !cancel){
      const filteredData = moduleData.filter((value)=>value.courseId=='0')
      const addModuleInput = [...moduleData ,{title:'0',courseId:'0',chapter:[]}]
      !filteredData.length && setModuleData(addModuleInput)
    }
    if(save){
      const title = titleRef.current.value
      let filteredData
      title ? filteredData = moduleData.filter((value)=>value.courseId!=='0') : toast.warning('Invalid title')
      const updatedData = [...filteredData,{title:title,courseId:courseId,chapter:[]}]
      setModuleData(updatedData)
      axiosInstance.post('/save-module',{courseId:courseId,title:title}).then((res)=>{
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

  const editModuleHandle =({id,update,cancel})=>{
      if(!update && !cancel){
        setEditId(id)
      }
      if(update){
        const updatedTitle = editTitleRef.current.value
        setModuleData((value)=>value.map((obj)=>obj._id==edit ? {...moduleData,title : updatedTitle} : obj))
        axiosInstance.post('/update-module',{id:id,title:updatedTitle}).then((res)=>{
          toast.success(res.data.message)
          setEditId('')
        }).catch((error)=>{
          toast.error(error.message)
          console.log(error.message);
        })
      }
      if(cancel){
        setEditId('')
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
    axiosInstance.get(`/remove-module?id=${id}`).then((res)=>{
      toast.success(res.data.message)
    }).catch((error)=>{
      toast.error(error.message)
      console.log(error.message);
    })
  }

  const toggleAccordion =(index)=> {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const AddChapterhandle = ({id,save,cancel}) => {
    if(!save && !cancel){
      const data = moduleData.map((obj) =>
      obj._id === id ? { ...obj, chapters: [...obj.chapters, { _id: 'add chapter' }] } : obj
      );
      setModuleData(data)
    }
    if(save){
      setSpinner(true)
      const title = chapterTitleRef.current.value
      axiosInstance.post('/add-chapter',{courseId:id,title:title}).then((res)=>{
        console.log(res.data.message);
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
          return <div className=" overflow-x-auto shadow-md sm:rounded-lg mb-5">
            <table className="w-full  text-sm text-left text-gray-500 ">
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
                              <input ref={editTitleRef} placeholder={obj.title} className='mx-3 mt-4 rounded-md text-sm mb-3' />
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
                            <a onClick={()=>editModuleHandle({id:obj._id})} className="font-medium text-blue-600 hover:underline mx-2">
                              Edit
                            </a>
                            <a onClick={()=>handleModal(obj._id)} className="font-medium text-red-600 hover:underline mx-2">
                              Delete
                            </a>
                          </>}
                      </td>
                      { !obj?.chapters?.length && <td onClick={()=>AddChapterhandle({id:obj._id})} className="hover:text-red-700 px-6 py-4 flex cursor-pointer" >Add Chapter </td> }
                        {/* <td className="px-6 py-4 flex">Chapters <DropdownIcon/> 
                            {/* <DropupIcon/> 
                        </td> */}
                      
                    </tr>
                    <tr className='w-full'>
                      
                    </tr>
              </tbody>
            </table>
            <div className='w-full py-3 px-4'>
              {obj?.chapters?.map((chapter)=>
                chapter._id === 'add chapter' ? 
                <div className='flex justify-between w-full mx-2 border border-black rounded-md h-auto p-3 focus:text-white' >
                  <input placeholder='Enter title' ref={chapterTitleRef} className='border-red-700 w-4/6 h-9 rounded-md' type="text" />
                  <button onClick={()=>AddChapterhandle({id:obj._id,save : true})} className='w-1/6 rounded mx-2 hover:bg-slate-900 hover:text-white text-black bg-slate-200 text-sm p-1 text-center flex items-center justify-center'>{spinner ? <Spinner className='mr-2'/> : 'Add'}  </button>
                  <button onClick={()=>AddChapterhandle({id:obj._id,cancel : true})} className='w-1/6 rounded mx-1 hover:bg-slate-900 hover:text-white text-black bg-slate-200 text-sm p-1 '>Cancel</button>
                </div> : 
                <button className='w-full m-1 border border-black rounded-md h-auto p-3 focus:bg-red-700 focus:text-white text-left ' >Chapter 1 : {chapter?.chapter_title}</button>
              )}
              </div> 
          </div>
        })}
      </div>
      {/* section two */}
      <div className='lg:col-span-1 h-auto w-full bg-slate-50 flex justify-center '>
          <div className=' border border-black p-4'>
            <video className="md:h-96 w-full rounded-lg" controls autoPlay muted>
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className='flex justify-between mt-3'>
              <input  type="file" name="" id="" />
              <div className='btn-sm flex justify-center items-center text-white rounded-md h-7 bg-blue-700 '>Edit</div>
            </div>
            <div className='w-full mt-2 bg-white h-auto p-3'>
              <h1>Title : abcdefg</h1>
              <div className='flex'>
                <input type="text " className='rounded-md border border-black' />
                <button className='bg-blue-700 text-white mx-2 rounded-md p-1'>Save</button>
              </div>
            </div>
          </div>
      </div>
    </div>

    {modal && <Modal setShowModal={setShowModal} confirm={()=>deleteModule(deleteId)} message={'Are you sure?'} description={'Module will be deleted permenently'}/>}
    </>
  )
}

export default ModulesList

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

const Accordion = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const accordionData = [
    {
      question: "What is Flowbite?",
      answer:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
    },
    {
      question: "Is there a Figma file available?",
      answer:
        "Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.",
    },
    {
      question: "What are the differences between Flowbite and Tailwind UI?",
      answer:
        "The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.",
    },
  ];

  return (
    <div className="space-y-4">
      {accordionData.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-700 rounded p-2"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="flex items-center justify-between w-full py-2 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
            aria-expanded={activeAccordion === index}
            aria-controls={`accordion-flush-body-${index}`}
          >
            <span>{item.question}</span>
            <svg
              className={`w-3 h-3 rotate-${activeAccordion === index ? "0" : "180"} shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
          <div
            id={`accordion-flush-body-${index}`}
            className={`${
              activeAccordion === index ? "block" : "hidden"
            } py-2 text-gray-500 dark:text-gray-400`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

