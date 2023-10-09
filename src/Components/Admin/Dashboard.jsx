import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import adminAxios from '../../Axios/AdminAxios';
import { toast } from 'react-toastify';
import { CiWallet } from 'react-icons/ci';
import{FaUserClock} from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { setWalletBalance } from '../../Redux/AdminAuth';
import {FaMoneyBillAlt,FaBookReader,FaUserFriends} from 'react-icons/fa'
import {IoIosPeople} from 'react-icons/io'
import {LiaChalkboardTeacherSolid} from 'react-icons/lia'
import {GiTakeMyMoney} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
  const [recentSales,setRecentSales] = useState([])
  const [amountOnHold,setAmountOnHold] = useState('')
  const [todaySales,setTodaySales] = useState({})
  const [weekSales,setWeekSales] = useState({})
  const [monthSales,setMonthSales] = useState({})
  const [count,setCounts] = useState({
    userCount:'',
    courseCount:'',
    tutorCount:''
  })
  const [revenue,setRevenue] = useState({
    weeklyTotalRevenue:'',
    monthlyTotalRevenue:'',
    totalRevenue:'',
    monthlySalesAmountsArray : []
  })
  const axiosInstance = adminAxios()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [wallet,setWallet] = useState('')
  const [visibleTransactions,setVisibleTransactions]=useState([])
  const [walletDataSeeMore,setWalletDataSeeMore] = useState(false)

  const fetchData=async()=>{
    await axiosInstance.get('/dashboard').then((res)=>{
          setRecentSales(res.data.result)
          setWallet(res.data.wallet)
          setAmountOnHold(res.data.amountOnHold)
          setTodaySales(res.data.todaySales)
          setWeekSales(res.data.weekSales)
          setMonthSales(res.data.monthSales)
          setRevenue({
            ...revenue,
            weeklyTotalRevenue: res.data.weeklyTotalRevenue, 
            monthlyTotalRevenue: res.data.monthlyTotalRevenue, 
            totalRevenue: res.data.totalRevenue,
            monthlySalesAmountsArray:res.data.monthlySalesAmountsArray
          });
          setCounts({
              ...count,
              userCount:res.data.userCount,
              courseCount:res.data.courseCount,
              tutorCount:res.data.tutorCount
          })
      }).catch((error)=>{
        console.log(error);
        toast.error(error.message)
      })
  }
  const walletTransactionVisibleHandle=()=>{
    const transaction = wallet.b_wallet_transaction
    console.log(transaction);
    const visible = walletDataSeeMore
      ? transaction.slice().reverse()
      : transaction
          .slice()
          .reverse()
          .slice(0, 5);
    setVisibleTransactions(visible)
  }

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    if(wallet){
      walletTransactionVisibleHandle()
    }
  },[wallet,walletDataSeeMore])

  useEffect(()=>{
    dispatch(setWalletBalance(wallet.b_wallet_balance))
  },[wallet])

  const areaChartData = {
    options: {
      chart: {
        id: 'area-chart',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec'],
      },
      colors: ['#000000'], // Customize the area color
    },
    series: [
      {
        name: 'Series 1',
        data: revenue.monthlySalesAmountsArray,
      },
    ],
  };
  return (
    <div className='w-full p-3 overflow-x-hidden'>
    <div className='grid md:grid-cols-2'>
        <div className='grid md:grid-cols-4 gap-2 p-4 col-span-1'>
          <div className=' bg-red-200 p-3 rounded-2xl font-poppins text-sm md:text-base font-semibold text-gray-600 '>
            <p>Wallet </p>
                <div className='w-full bg-white rounded-lg p-1'>
                    <div title='wallet' className='flex items-center justify-between'><CiWallet className='w-6 h-full'/><p className='mx-1 text-md' >₹{wallet?.b_wallet_balance}</p></div>
                </div>
                <br />
                  <p className='text-sm'>On-Hold:</p>
                <div title='wallet' className='flex items-center justify-between bg-white rounded-lg p-1'>
                  <FaUserClock className='w-6 h-full'/>
                  <p className='mx-1 text-md'> ₹{amountOnHold}</p>
                </div>
          </div>
          <div className=' bg-yellow-100 p-3 rounded-2xl font-poppins text-sm md:text-base font-semibold text-gray-600'>
                <p>
                Today's sales
                </p>
                <div className='w-full bg-white rounded-lg p-1'>
                    <div title='wallet' className='flex items-center justify-between'><FaMoneyBillAlt className='w-6 h-full'/><p className='mx-1 text-md' >₹{todaySales?.totalAmount}</p></div>
                </div>
                <br />
                <p className='text-sm'>Number of Sales</p>
                <div className='w-full bg-white rounded-lg p-1'>
                    <div title='wallet' className='flex items-center justify-between'><IoIosPeople className='w-6 h-full'/><p className='mx-1 text-md' >{todaySales?.count}</p></div>
                </div>
          </div>
          <div className=' bg-green-200 p-3 rounded-2xl font-poppins text-sm md:text-base font-semibold text-gray-600'>
                Week sales
                <div className='w-full bg-white rounded-lg p-1'>
                    <div title='wallet' className='flex items-center justify-between'><FaMoneyBillAlt className='w-6 h-full'/><p className='mx-1 text-md' >₹{weekSales?.totalAmount}</p></div>
                </div>
                <br />
                <p className='text-sm'>Number of Sales</p>
                <div className='w-full bg-white rounded-lg p-1'>
                    <div title='wallet' className='flex items-center justify-between'><IoIosPeople className='w-6 h-full'/><p className='mx-1 text-md' >{weekSales?.count}</p></div>
                </div>
          </div> 
          <div className=' bg-blue-200 p-3 rounded-2xl font-poppins text-sm md:text-base font-semibold text-gray-600'>
                Month Sales
                <div className='w-full bg-white rounded-lg p-1'>
                    <div title='wallet' className='flex items-center justify-between'><FaMoneyBillAlt className='w-6 h-full'/><p className='mx-1 text-md' >₹{monthSales?.totalAmount}</p></div>
                </div>
                <br />
                <p className='text-sm'>Number of Sales</p>
                <div className='w-full bg-white rounded-lg p-1'>
                    <div title='wallet' className='flex items-center justify-between'><IoIosPeople className='w-6 h-full'/><p className='mx-1 text-md' >{monthSales?.count}</p></div>
                </div>
        </div>
        <div className='md:col-span-2 bg-slate-200 rounded-2xl font-poppins text-sm md:text-base font-semibold text-gray-600 py-2'>  
            <div className='flex justify-around items-center h-full'>
              <div>
                <p>Weekly Profit</p>
                <div className='w-full bg-white rounded-lg py-1 px-2'>
                    <div title='wallet' className='flex items-center justify-between'><GiTakeMyMoney className='w-6 h-full'/><p className='mx-1 text-md' >₹{revenue.weeklyTotalRevenue}</p></div>
                </div>
              </div>
            <div>
            <p>Monthly Profit</p>  
            <div className='w-full bg-white rounded-lg py-1 px-2'>
                    <div title='wallet' className='flex items-center justify-between'><GiTakeMyMoney className='w-6 h-full'/><p className='mx-1 text-md' >₹{revenue.monthlyTotalRevenue}</p></div>
            </div>
            </div>
            <div>
            <p>Total Profit</p>
            <div className='w-full bg-white rounded-lg py-1 px-2'>    
                    <div title='wallet' className='flex items-center justify-between'><GiTakeMyMoney className='w-6 h-full'/><p className='mx-1 text-md' >₹{revenue.totalRevenue}</p></div>
            </div>
            </div>
          </div>
        </div>
        <div className='md:col-span-2 bg-slate-200 rounded-2xl font-poppins text-sm md:text-base font-semibold text-gray-600 py-2'>  
            <div className='flex justify-around items-center h-full'>
              <div>
                <p>Tutors </p>
                <div className='w-full bg-white rounded-lg py-1 px-2'>
                    <div title='wallet' className='flex items-center justify-between'><LiaChalkboardTeacherSolid className='w-6 h-full'/><p className='mx-1 text-md' >₹{count.tutorCount}</p></div>
                </div>
              </div>
            <div>
            <p>Courses</p>  
            <div className='w-full bg-white rounded-lg py-1 px-2'>
                    <div title='wallet' className='flex items-center justify-between'><FaBookReader className='w-6 h-full'/><p className='mx-1 text-md' >₹{count.courseCount}</p></div>
            </div>
            </div>
            <div>
            <p>Users</p>
            <div className='w-full bg-white rounded-lg py-1 px-2'>    
                    <div title='wallet' className='flex items-center justify-between'><FaUserFriends className='w-6 h-full'/><p className='mx-1 text-md' >₹{count.userCount}</p></div>
            </div>
            </div>
          </div>
        </div>
      </div>
      {/* Graphs */}
      <div className='space-x-1 bg-slate-50 rounded-2xl p-2'>
        <div className="charts-card">
            <h2 className="chart-title">Sales Orders(Year)</h2>
            <ReactApexChart
              options={areaChartData.options}
              series={areaChartData.series}
              type="area"
              height={350}
              />
          </div>
      </div>
    </div>  

    <div className=" overflow-y-hidden grid md:grid-cols-2 gap-4 pb-10">
        <div className='md:col-span-1 '>
          <div className='flex justify-between px-3'>
              <div className='text-center text-xl font-semibold font-poppins my-2'>Wallet Transactions</div>
          </div>
          <table className="w-full max-h-44 text-sm text-left text-gray-500 overflow-x-scroll">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order_id
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount(R)
                </th>
              </tr>
            </thead>
                 <tbody className=''>
          { wallet?.b_wallet_transaction && 
            visibleTransactions.map((transaction)=>{
            return <tr key={transaction._id} className="bg-white border-b">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                  {transaction?.order_id && transaction?.order_id.slice(0, Math.floor(transaction?.order_id.length / 2))} 
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                  {transaction?.date && transaction.date.split('T')[0]}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                  {transaction?.transaction_type}
                </td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  +{transaction?.amount}
                </td>
              </tr>
              }) }
            </tbody>
          </table>
        </div>

         <div className='md:col-span-1 '>
          <div className='flex justify-between px-3'>
              <div className='text-center text-xl font-semibold font-poppins'>Recent Sales</div>
              <div onClick={()=>navigate('/admin/sales')} className='text-center text-sm font-semibold font-poppins bg-blue-400 p-1 border rounded-md my-2'>Show More</div>
          </div>
          <table  className="w-full max-h-44 text-sm text-left text-gray-500 overflow-x-scroll">
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
                
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
             {recentSales.length ? recentSales.map((order,index)=>{
              return <tr key={order._id} className="bg-white border-b">
                <td scope="row" className="px-6 xl:py-4 font-medium text-gray-900 whitespace-nowrap text-xs">
                  {order._id.slice(0, Math.floor(order._id.length / 2))}
                </td>
                <td className="px-6 xl:py-4">
                  {order.user_id.name}
                  <br />
                  <p className='text-xs'>
                  {order.user_id.email}
                  </p>
                </td>
                <td scope="row" className="px-6 xl:py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.course_id.title}
                </td>
                <td className="px-6 xl:py-4">
                  {order.date_of_purchase.split('T')[0]}
                </td>
                <td scope="row" className="px-6 xl:py-4 font-medium text-gray-900 whitespace-nowrap">
                  ₹{order.amount}
                </td>
                <td className="px-6 xl:py-4">
                  {order.status === 'success' && !order.is_refundable && <p className='text-green-500 font-semibold'>Success</p>}
                  {order.status === 'success' && order.is_refundable && <p className='text-orange-400'>Pending</p>}
                  {order.status === 'refunded' && !order.is_refundable && <p className='text-red-600 font-semibold'>Refunded</p>}
                </td>
              </tr>
             }):''}
            </tbody>
          </table>
          {!recentSales.length && <div className='text-center'>No transactions</div>}
         </div>
  

    </div>
    </div>
  )
}

export default Dashboard
