import React from 'react'
import  { useState } from "react";
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import tutorAxios from '../../Axios/TutorAxios'
import { toast } from 'react-toastify'

const ModulesList = () => {
  const location = useLocation()
  const axiosInstance = tutorAxios()
  const courseId = location.state
  const array = [1,2,3]

  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };


  // useEffect(()=>{
  //   axiosInstance.get('/load-modules',{courseId}).then((res)=>{
  //     const moduleData = res.result 
  //     console.log(res);
  //   }).catch((error)=>{
  //     toast.error(error.message)
  //     console.log(errror.message);
  //   })
  // },[])


  const DropdownIcon = () => (
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

  const DropupIcon = () => (
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
  

  return (
    <div className='grid md:grid-cols-2 w-full h-full'>
      <div className='m-12 col-span-1'>
        <div className='h-12 w-full bg-gray-100 rounded-lg mb-3 flex justify-between'>
          <h1 className='font-poppins my-auto mx-5'>MODULES</h1>
          <div className='bg-slate-900 rounded-md w-28 h-auto text-center flex justify-center items-center m-2 text-white hover:bg-slate-600 cursor-pointer' >Add module</div>
        </div>
        
        {array.map((value,index)=>{
          return <div className=" overflow-x-auto shadow-md sm:rounded-lg mb-5">
            <table className="w-full  text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                  
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

                  <tr  className="bg-white border-b">
                    <th scope="row">
                         <div className='w-32 px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>ssssssssssssss</div>               
                      </th>
                    <td className="px-6 py-4">
                        <>
                          <a  className="font-medium text-blue-600 hover:underline mx-2">
                            Edit
                          </a>
                          <a href="#" className="font-medium text-red-600 hover:underline mx-2">
                            Delete
                          </a>

                        </>
                      </td>
                    <td className="px-6 py-4 flex">Chapters <DropdownIcon/> <DropupIcon/>
                    </td>
                    </tr>
                    <tr>
                      
                    <Accordion/>
                    </tr>
              </tbody>
            </table>
          </div>
        }) }
      </div>
      <div className=' h-full w-full bg-slate-50'>
      </div>
    </div>
  )
}

export default ModulesList



{/* <>
<a  className="font-medium text-blue-600 hover:underline mx-1">
  Save
</a>
<a  className="font-medium text-red-600 hover:underline mx-1">
  Cancel
</a>
</> */}


// <>
// <a onClick={''} className="font-medium text-blue-600 hover:underline mx-1">
//   Update
// </a>
// <a onClick={()=>navigate(-1)} className="font-medium text-red-600 hover:underline mx-1">
//   Cancel
// </a>
//  </>




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

