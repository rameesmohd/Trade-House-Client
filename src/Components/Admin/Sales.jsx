import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import adminAxios from '../../Axios/AdminAxios'
import {  toast } from 'react-toastify';
import { HiSearch } from 'react-icons/hi'



const Sales = () => {
  const axiosInstance = adminAxios()
  const [loading,setLoading]= useState(false)
  const [salesData,setSalesData] = useState([])
  const [selectedFilter,setFilter] = useState('Weekly')
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter,setStatusFilter] = useState('all')

  const fetchData =async(from,to)=>{
    await axiosInstance.get(`/sales?filter=${selectedFilter}&${from&to ? `from=${from}&to=${to}` : ''}`).then((res)=>{
      setSalesData(res.data.result)
    }).catch((error)=>{
      console.log(error.message)
      toast.error(error.message)
    })
  }
  
  useEffect(()=>{
     fetchData()
  },[selectedFilter])

  const handleFilterClick=(filter)=>{
    setFilter(filter)
  }

  const handlePrint = () => {
    const printContents = document.getElementById('sales-table').outerHTML;
    // Open a new window or tab with the printContents
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
        <html>
        <head>
            <title>Print</title>
        </head>
        <body>
            ${printContents}
        </body>
        </html>
    `);
    printWindow.document.close();
    // Print the new window/tab
    printWindow.print();
    // Close the new window/tab after printing (optional)
    printWindow.close();
}

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleSearch = () => {
    if(fromDate && toDate){
      if (new Date(fromDate) > new Date(toDate)) {
        toast.error('From Date must be less than To Date');
        return; 
      }else{
        console.log('dsd');
        fetchData(new Date(fromDate),new Date(toDate))
      }
    }
  };

  const handleStatusFilter=(status)=>{
    setStatusFilter(status)
  }

  return (
    <>
    <div className='w-full h-auto px-5 '>
    <div className="mt-2 mb-8 flex flex-col gap-12">
      <Card>
        <div  className="black bg-slate-200 text-center p-2 md:flex justify-around my-3 rounded-md">
          <div className='md:text-2xl text-black font-poppins h-full w-56 '>
            {selectedFilter} Sales 
          </div>
          <div className='text-black flex md:flex-none my-2 md:my-0 py-2'>
          <button
              className={`bg-slate-50 w-20 p-1 border font-poppins ${selectedFilter === 'All' ? 'bg-slate-900 text-white' : ''}`}
              onClick={() => handleFilterClick('All')}
            >
              All
            </button>
            <button
              className={`bg-slate-50 w-20 p-1 border font-poppins ${selectedFilter === 'Daily' ? 'bg-slate-900 text-white' : ''}`}
              onClick={() => handleFilterClick('Daily')}
            >
              Daily
            </button>
            <button
              className={`bg-slate-50 w-20 p-1 border font-poppins ${selectedFilter === 'Weekly' ? 'bg-slate-900 text-white' : ''}`}
              onClick={() => handleFilterClick('Weekly')}
            >
              Weekly
            </button>
            <button
              className={`bg-slate-50 w-20 -1 border font-poppins ${selectedFilter === 'Monthly' ? 'bg-slate-900 text-white' : ''}`}
              onClick={() => handleFilterClick('Monthly')}
            >
              Monthly
            </button>
          </div>
       
          
        <div className='flex'> 
          <div date-rangepicker class="md:flex items-center">
              <div className='flex md:items-center my-2 md:my-0'>
                <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                      </svg>
                </div>
                  <input name="start" value={fromDate} type="date" onChange={handleFromDateChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
                </div>
                <span class="mx-4 text-gray-500">to</span>
                <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                      </svg>
                </div>
                <input name="end" value={toDate} type="date" onChange={handleToDateChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end"/>
                </div>
              </div>
              <button className='border border-gray-300 p-1 md:p-3 rounded-lg mx-2 my-2 md:my-0' onClick={handleSearch}><HiSearch/></button>
          </div>
        </div>
          <div className="dropdown mt-3 flex">
            
            <label tabIndex={0} className='flex items-center font-poppins font-semibold'>Filter 
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-52 bg-white">
              <li onClick={()=>handleStatusFilter('all')} className='bg-slate-200 cursor-pointer font-poppins p-1 rounded-md my-1'>All</li>
              <li onClick={()=>handleStatusFilter('success')} className='bg-green-400 cursor-pointer font-poppins p-1 rounded-md my-1'>Success</li>
              <li onClick={()=>handleStatusFilter('pending')} className='bg-yellow-400 cursor-pointer font-poppins p-1 rounded-md my-1'>Pending</li>
              <li onClick={()=>handleStatusFilter('refunded')} className='bg-red-600 cursor-pointer font-poppins p-1 rounded-md my-1'>Refunded </li>
            </ul>
            {/* <div className='flex items-center'><CiWallet className='w-10 h-full'/><p className='mx-1 text-sm' >0.00</p></div> */}
          </div>
          <button
                className="text-black border hidden md:block border-gray-100 p-1 rounded-md mx-2"
                onClick={handlePrint}>
               🖨️ Print
          </button>

        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table id="sales-table" className="w-full min-w-[640px] table-auto ">
            <thead>
              <tr>
                {["Order_id", "User",'Course',"Tutor", "Date","Mode of Payment","Amount","Status","Admin Share","Tutor Share"].map((el) => (
                  <th key={el} className="border border-blue-gray-50 py-3 px-5 text-left bg-slate-200">
                    <Typography variant="small" className="text-sm font-semibold  font-poppins">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {
              loading && [...Array(7)].map((value)=>{
                    const className = 'py-3 px-5 border-b border-blue-gray-50';
                    return(
                    <tr key={1599+value} className='animate-pulse overflow-x-hidden'>
                    <td className={className}>
                    <div className="flex items-center gap-4">
                      <div className=" h-3 w-32 bg-gray-300" >
                    </div>
                    </div>
                    </td>
                  <td className={className}>
                    <div className="flex items-center gap-4">
                      <div className=" h-3 w-32 bg-gray-300" >
                    </div>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="text-xs font-semibold h-8 w-56 bg-gray-300">
                    </div>
                  </td>
                  <td className={className}>
                    <div className="text-xs font-semibold h-8 w-56 bg-gray-300">
                    </div>
                  </td>
                  <td className={className}>
                  <div className="flex items-center gap-4">
                      <div className=" h-3 w-32 bg-gray-300" >
                  </div>
                  </div>
                  </td>
                    <td className={className}>
                    <div className="flex items-center gap-4">
                      <div className=" h-3 w-32 bg-gray-300" >
                  </div>
                  </div>
                  </td>
                  <td>
                      <div className="flex items-center gap-4">
                      <div className=" h-3 w-32 bg-gray-300" >
                  </div>
                  </div>
                  </td>
                </tr>)
              })
            }
            { !loading && salesData
            .filter((order) => {
              if (statusFilter === 'all') {
                return true; 
              }
              
              if (statusFilter === 'refunded') {
                return order.status === 'refunded';
              }
   
              if (statusFilter === order.status && order.status === 'success' && !order.is_refundable) {
                  return true; 
                }
                
              if (statusFilter !== order.status && order.status === 'success' && order.is_refundable) {
                  return true; 
              }
              return false; 
            }).map(
                (order, key) => {
                  const className = `py-3 px-5 ${
                    key === salesData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  return (
                  
                    <tr key={key}>
                      <td className={`text-sm ${className}`}>
                          {order._id.slice(0, Math.floor(order._id.length / 2))}
                      </td>
         
                      <td className={className}>
                      <p className="text-sm font-medium font-poppins">
                        {order.user_id.name}
                       </p> 
                      <p className='text-xs font-poppins'>
                        {order.user_id.email}
                      </p>
                      </td>
                      <td className={className}>
                        <p className="text-sm font-medium font-poppins">
                          {order.course_id.title}
                        </p>
                      </td>
                      <td className={className}>
                        <p className="text-sm font-medium font-poppins">
                          {order.course_id.tutor.firstName+" "+order.course_id.tutor.lastName}
                        </p>
                      </td>
                      <td className={className}>
                      <p className="text-sm font-medium font-poppins">
                      {order.date_of_purchase.split('T')[0]}
                        </p>
                      </td>
                      <td className={className}>
                      <p className="text-sm font-medium font-poppins">
                        {order.payment_mode}
                        </p>
                      </td>
                      <td className={className}>
                      <p className="text-sm font-medium font-poppins">
                      ₹{order.amount}
                        </p>
                      </td>
                      <td className={className}>
                      <p className="text-sm font-medium font-poppins">
                      {order.status === 'success' && !order.is_refundable && <p className='text-green-500 font-semibold'>Success</p>}
                      {order.status === 'success' && order.is_refundable && <p className='text-orange-400'>Pending</p>}
                      {order.status === 'refunded' && !order.is_refundable && <p className='text-red-600 font-semibold'>Refunded</p>}
                        </p>
                      </td>
                      <td className={className}>
                      <p className="text-sm text-green-600 font-semibold ">
                        {order.status === 'success' && !order.is_refundable && '+₹'+order.amount*0.25}
                        </p>
                      </td>
                      <td className={className}>
                      <p className="text-sm text-red-600 font-semibold ">
                        { order.status === 'success' && !order.is_refundable && '-₹'+order.amount*0.75}
                        </p>
                      </td>
                    </tr>
                  );
                }
            )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
     </div>
</>
  )
}

export default Sales
