import React from 'react'
import {
    CardHeader,
    Typography,
    Avatar,
    Chip
  } from "@material-tailwind/react";
import { useEffect } from 'react';
import tutorAxios from '../../Axios/TutorAxios';
import { toast } from 'react-toastify';
import { useState } from 'react'
import { Progress } from '@material-tailwind/react';


const Students = () => {
    const axiosInstance =  tutorAxios()
    const [studentsData,setStudentsData]= useState([])
    const [loading,setLoading] = useState(false)

    const fetchData = async()=>{
      setLoading(true)
      await axiosInstance.get('/my-students').then((res)=>{
        setStudentsData(res.data.result)
      }).catch((error)=>{
        toast.error(error.message)
      }).finally(()=>{
        setLoading(false)
      })
    }
    useEffect(()=>{
      fetchData()
    },[])

  return (
    <div className="mt-10 mb-8 flex flex-col gap-12 px-2" >
      <div>
        <CardHeader variant="gradient" color="blue" className="h-16 bg-slate-700 flex mt-2">
          <Typography variant="h6" color="white" className='flex items-center p-3'>
            Students
          </Typography>
        </CardHeader>
        <div className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["No." , "Name", "Course", "Date of purchase", "Progress","Order ID"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading &&studentsData.map((students,index) => {
                  const className = 'py-3 px-5 border-b border-blue-gray-50';
                  return (
                    <tr key={students._id}>
                        <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {index+1}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={students?.user_id?.image} alt={name} size="sm" loading='lazy'/>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {students?.user_id?.name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {students?.user_id?.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {students?.course_id?.title}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {students.course_id._id}
                        </Typography>
                      </td>
                   
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {students?.date_of_purchase.split('T')[0]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className='flex items-center'>
                        { students.status === 'refunded' ? <p className='font-poppins text-red-400 text-xs'>Purchase Withdrawn</p>: 
                        <>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600 mx-1"
                          >
                          {students.learning_progress ? students?.learning_progress+'%' : '1%'}
                          </Typography>
                          <Progress value={students?.learning_progress ? students?.learning_progress : 1} color="green" />
                        </>}
                        </div>
                      </td>
                         <td className={className}>
                        <Chip
                          variant="gradient"
                          color={"green"}
                          value={"online"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                        {students._id && students._id.slice(0, Math.floor(students._id.length / 2))}
                      </td>
                    </tr>
                  )
                }
              )}
              {
                loading && [...Array(4)].map((value)=>{
                    const className = 'py-3 px-5 border-b border-blue-gray-50';
                    return(
                    <tr key={1599+value} className='animate-pulse '>
                    <td className={className}>
           
                  </td>
                  <td className={className}>
                    <div className="flex items-center gap-4">
                      <Avatar   size="sm" className='bg-gray-300 w-10 h-10' />
                    <div>
                    <div className=" h-3 w-32 bg-gray-300" >
                    </div>
                      </div>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="text-xs font-semibold text-blue-gray-600 h-8 w-56 bg-gray-300">
                    </div>
                  </td>
                  <td className={className}>
                    <div className="text-xs font-semibold text-blue-gray-600 h-8 w-56 bg-gray-300">
                    </div>
                  </td>
                  <td className={className}>
                    <div className='flex items-center'>
                    <Typography
                      as="a"
                      href="#"
                      className="text-xs font-semibold text-blue-gray-600 mx-1 bg-gray-300"
                      >
                     
                    </Typography>
                      <div  className="text-xs font-semibold text-blue-gray-600 h-4 w-24 bg-gray-300" />
                    </div>
                  </td>

                     <td className={className}>
                    <Chip
                      variant="gradient"
                      color={"green"}
                      className="py-0.5 px-2 text-[11px] font-medium bg-gray-300"
                    />
                  </td>
                </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
</div>
  )
}

export default Students
