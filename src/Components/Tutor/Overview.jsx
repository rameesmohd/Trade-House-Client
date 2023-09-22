import React, { useEffect, useState } from 'react'
import walletIcon from '../../assets/pngwing.com.png'
import ReactApexChart from 'react-apexcharts';
import tutorAxios from '../../Axios/TutorAxios'
import { toast } from 'react-toastify';

const Overview = () => {
  const axiosInstance = tutorAxios()
  const [loading,setLoading] = useState(false)
  const [seeMore,setSeeMore] = useState(false)
  const [walletTransData,setWalletTransData] = useState({})
  const [recentSales,setRecentSales] = useState([]) 

  const fetchData=async(expand)=>{
    await axiosInstance.get(`/overview?expand=${expand}`)
    .then((res)=>{
        setWalletTransData(res.data.transaction)
        setRecentSales(res.data.recentSales)
    }).catch((error)=>{
      console.log(error)
      toast.error(error.message)
    })
  }
  
  useEffect(()=>{
    fetchData(seeMore)
  },[seeMore])

  const expandSalesList=()=>{
    setSeeMore(!seeMore); 
  }

  console.log(recentSales);

  const chartData = {
    options: {
      chart: {
        id: 'bar-chart',
      },
      xaxis: {
        categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 8'],
      },
      colors: ['#000000'], // Customize the bar color
    },
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  const areaChartData = {
    options: {
      chart: {
        id: 'area-chart',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      },
      colors: ['#FFAA33'], // Customize the area color
    },
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
<div className='p-2'>
  <div className={`w-full ${!seeMore && 'grid grid-cols-1  md:grid-cols-2'} gap-1 my-3`}>
   
    {/* Graphs */}
    {!seeMore && <div className='space-x-1 bg-slate-50 rounded-2xl p-2'>
      <div className="charts-card">
          <h2 className="chart-title">Purchase and Sales Orders</h2>
          <ReactApexChart
            options={areaChartData.options}
            series={areaChartData.series}
            type="area"
            height={350}
          />
        </div>
      <div className="charts">
        <div className="charts-card">
          <h2 className="chart-title">Top 5 Products</h2>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
       
        {/* Add more charts here */}
      </div>
    </div>}

    <div className='bg-slate-100 rounded-2xl p-2 col-span-1'>
    { !seeMore &&  <>
    <div className='flex p-2'>
      <div className='relative card bg-green-500 border m-1 w-1/2 h-20 text-white font-poppins font-semibold p-1 text-sm md:text-lg'>
        <p className='absolute ml-2'>
          Today's Earnings
        </p>
      </div>
      <div className='relative card bg-red-500 border m-1 w-1/2 h-20 font-poppins text-white font-semibold p-1 text-sm md:text-lg'>
        <p className='absolute ml-2'>
          Montly Earnings
        </p>
      </div>
      <div className='relative card bg-red-500 border m-1 w-1/2 h-20 font-poppins text-white font-semibold p-1 text-sm md:text-lg'>
        <p className='absolute ml-2'>
          Yearly Earnings
        </p>
      </div>
      </div>

      {/* table-1 */}
      <div className=" my-2">
        <div className='w-full bg-slate-100 h-14 flex justify-end rounded-md'>
          <div className='w-2/6 h-full flex justify-center items-center'>
            <img className='h-10' src={walletIcon} alt="" /> 
            <span className='text-sm font-bold opacity-70 ml-3'>₹.{walletTransData.b_wallet_balance}</span>
          </div>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll scrollbar-hide max-h-[22rem]">
          <table className="w-full text-sm text-left text-gray-500 overflow-y-scroll">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
              <th scope="col" className="px-6 py-3">
                  Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Transactions
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount(₹)
                </th>
              </tr>
            </thead>
            <tbody className=''>
            {     
           walletTransData?.b_wallet_transaction && 
           walletTransData?.b_wallet_transaction.map((transaction)=>{
                  return <tr key={transaction._id} className="bg-white border-b">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                  {transaction?.order_id && transaction?.order_id.slice(0, Math.floor(transaction.order_id.length / 2))} 
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                  {transaction?.transaction_type}
                </td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  +{transaction?.amount}
                </td>
              </tr>
                })
            }
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
      </> }
      {/* table-2 */}
      <div className="relative my-2 h-1/3 bg-white">
      <div className='w-full bg-slate-100 my-1 flex items-center justify-between rounded-md'>
          <span className='text-lg font-bold opacity-70 ml-3'>{seeMore? 'All' :'Recent'} Sales</span>
         {!seeMore ? <p onClick={()=>expandSalesList()} className='mr-3 text-sm font-poppins font-bold cursor-pointer border border-double border-black px-1 border-blue rounded-lg bg-white-800 text-black flex items-center'>
          <img className='h-4 bg-white ' src="https://static.thenounproject.com/png/5014978-200.png" alt="" />
            View All
          </p> :
          <p onClick={()=>setSeeMore(!seeMore)} className='mr-3 text-sm font-poppins font-bold cursor-pointer border border-double border-black px-1 border-blue rounded-lg bg-white-800 text-black flex items-center'>
          <img className='h-4 bg-white mx-1' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/minimize-button-567898.png" alt="" />
            Minimize
          </p>}
        </div>

        <div className="overflow-x-scroll overflow-y-hidden">
          <table className="w-full max-h-44 text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order_id
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Course
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                {seeMore&&
                <th scope="col" className="px-6 py-3">
                  Feedback
                </th>}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
             { recentSales.map((order,index)=>{
              return <tr key={order._id} className="bg-white border-b">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-xs">
                  {order._id.slice(0, Math.floor(order._id.length / 2))}
                </td>
                <td className="px-6 py-4">
                  {order.user_id.name}
                  <br />
                  <p className='text-xs'>
                  {order.user_id.email}
                  </p>
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.course_id.title}
                </td>
                <td className="px-6 py-4">
                {order.date_of_purchase.split('T')[0]}
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                ₹{order.amount}
                </td>
                {seeMore &&
                <td scope="row" className="px-1 py-1 font-medium text-gray-900 whitespace-nowrap">
                  {order.status==='refunded' 
                  &&
                  <>
                  <textarea max-rows="2" disabled cols={15} value={order.user_message} 
                  className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder=""></textarea>
                  </>
                  }
                </td>}
                <td className="px-6 py-4">
                  {order.status === 'success' && !order.is_refundable && <p className='text-green-500 font-semibold'>Success</p>}
                  {order.status === 'success' && order.is_refundable && <p className='text-orange-400'>Pending</p>}
                  {order.status === 'refunded' && !order.is_refundable && <p className='text-red-600 font-semibold'>Refunded</p>}
                </td>
              </tr>
             })}
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Overview
