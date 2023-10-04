import React from 'react'
import { useLocation } from 'react-router-dom'
import { BsDownload } from 'react-icons/bs';
import { useState } from 'react';
import { useEffect } from 'react';
import adminAxios from '../../Axios/AdminAxios';
import { toast } from 'react-toastify';
import { Spinner } from '@material-tailwind/react';


const MoreDetails = () => {
  const [loading,setLoading] = useState(true)
  const location = useLocation()
  const tutorData  = location.state
  const [courses,setCourse] = useState([])
  const [sales,setSales] = useState([])
  const axiosInstance = adminAxios()

  useEffect(()=>{
      fetchData()
  },[tutorData])

  const fetchData=async()=>{
    console.log(tutorData,'asasas');
    await axiosInstance.get(`/tutor-details?id=${tutorData._id}`)
    .then((res)=>{
      setCourse(res.data.courses)
      setSales(res.data.sales)
      setLoading(false)
    }).catch((error)=>{
      console.log(error.message);
      setLoading(false)
      toast.error(error.message)
    })
  }

  const handleDownload = (fileUrl,fileName) => {
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = `${fileName}cv_file.pdf`;
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
};

  console.log(courses);
  console.log(sales);

  return (
<>
    <div className='p-4 w-full '>
    <div className='w-full bg-white h-auto gap-3 grid md:grid-cols-4'>
    <section className="bg-blueGray-200 py-2 w-full  flex items-center p-3 md:col-span-2">
      <div className=" mx-auto px-4">
        <div className=" flex flex-col min-w-0 break-words bg-slate-100 shadow-xl rounded-lg ">
          <div className="p-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div className="relative">
                  <img className='w-16 h-24 rounded-md' src={tutorData.image ? tutorData.image : "https://static.thenounproject.com/png/3674270-200.png"} />
                </div>
              </div>
            </div>
            <div className="text-center ">
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                {tutorData.firstName +' '+ tutorData.lastName}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {tutorData.type_of_trader +'Trader'}
              </div>
              <div className="mb-2 text-blueGray-600 ">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Email : {tutorData.email}
              </div>
              <div className="mb-2 text-blueGray-600 ">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Qualification : {tutorData.qualification}
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>Category of trading : {tutorData.category}
              </div>
            </div>
            <div className="mt-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                <a href="#pablo" className="font-normal text-pink-500">About</a>
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {tutorData.about_me}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className=' md:col-span-2 bg-white  p-3'>
      {/* table-1 */}
      <div className=' overflow-y-hidden'>
        <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-sm font-semibold text-white uppercase bg-black  ">
          <tr>
          {['username','Mobile','is_blocked', 'wallet b/c','CV'].map((head)=>
                <th scope="col" className="px-6 py-3">
                    {head}
                </th>
            )
          }
          </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b ">
                <th scope="row" className="font-semibold px-6 py-4  text-gray-900 whitespace-nowrap ">
                    {tutorData.name}
                </th>
                <td className="px-6 py-4 font-semibold">
                    {tutorData.mobile}
                </td>
                <td className="px-6 py-4 font-semibold">
                    {tutorData.is_blocked ? 'true' : 'false'}
                </td>
                <td className="px-6 py-4 font-semibold">
                    {tutorData.t_wallet ? tutorData?.t_wallet : '0.00'}
                </td>
                <td className="px-4 py-2 font-semibold flex justify-center"><BsDownload className=' text-lg cursor-pointer' onClick={()=>handleDownload(tutorData.CV,tutorData.firstName)}/></td>
            </tr>
        </tbody>
      </table>
      </div>

      {/* table-2 */}
      <div className='w-full text-center font-poppins font-semibold mb-1 text-lg my-2'>Courses</div>
      <div className='h-72 overflow-y-auto'>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0">
          <tr>
            {['title', 'Banner', 'Category', 'Price'].map((head, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!loading && courses.map((course, index) => (
            <tr key={index} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {course?.title}
              </th>
              <td className="px-6 py-4">
                <img className='w-16 h-12' src={course?.banner} alt="" />
              </td>
              <td className="px-6 py-4">
                {course?.category}
              </td>
              <td className="px-6 py-4">
                {course?.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div className='w-full flex justify-center h-1/2 items-center'><Spinner/></div>}
    </div>

      {/* table-3 */}
      <div className='w-full text-center font-poppins font-semibold mb-1 text-lg my-2'>Sales</div>
      <div className='h-72 overflow-y-scroll'>
        <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0 ">
            <tr>
            {['Course','User','Date', 'Price'].map((head)=>
                <th scope="col" className="px-6 py-3">
                    {head}
                </th>
            )
          }
            </tr>
        </thead>
        <tbody>
        {!loading && sales.map((order)=>
            <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {order?.course_id.title}
                </th>
                <td className="px-6 py-4">
                  {order?.user_id.email} 
                </td>
                <td className="px-6 py-4">
                    {order?.date_of_purchase.split('T')[0]}
                </td>
                <td className="px-6 py-4">
                    {order?.amount}
                </td>
            </tr>
          )}
        </tbody>
      </table>
      {loading && <div className='w-full flex justify-center h-1/2 items-center'><Spinner/></div>}
      </div>


     </section>
    </div>
  </div>
</>
  )
}

export default MoreDetails
