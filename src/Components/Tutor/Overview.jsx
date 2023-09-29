import React, { useEffect, useState } from 'react'
import walletIcon from '../../assets/pngwing.com.png'
import ReactApexChart from 'react-apexcharts';
import tutorAxios from '../../Axios/TutorAxios'
import { toast } from 'react-toastify';
import { HiSearch } from 'react-icons/hi';
import PopoverDes from '../PopoverDes';

const Overview = () => {
  const axiosInstance = tutorAxios()
  const [seeMore,setSeeMore] = useState(false)
  const [recentSales,setRecentSales] = useState([]) 
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [walletTransData,setWalletTransData] = useState()
  const [visibleTransactions,setVisibleTransactions]=useState([])
  const [walletDataSeeMore,setWalletDataSeeMore] = useState(false)

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };
  
  const expandSalesList=()=>{
    setSeeMore(!seeMore); 
  }

  const fetchData=async(expand,from,to)=>{
    await axiosInstance.get(`/overview?expand=${expand}&filter=${selectedFilter}&${from&to ? `from=${from}&to=${to}` : ''}`)
    .then((res)=>{
        setWalletTransData(res.data.transaction)
        setRecentSales(res.data.recentSales)
    }).catch((error)=>{
      console.log(error)
      toast.error(error.message)
    })
  }

  const walletTransactionVisibleHandle=()=>{
    const transaction = walletTransData.b_wallet_transaction
    console.log(transaction);
    const visible = walletDataSeeMore
      ? transaction.slice().reverse()
      : transaction
          .slice()
          .reverse()
          .slice(0, 3);
    setVisibleTransactions(visible)
  }

  useEffect(()=>{
    fetchData(seeMore)
  },[seeMore,selectedFilter])


  useEffect(()=>{
    if(walletTransData){
      walletTransactionVisibleHandle()
    }
  },[walletTransData,walletDataSeeMore])

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

  console.log(visibleTransactions);

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

const handleSearch = () => {
  if(fromDate && toDate){
    if (new Date(fromDate) > new Date(toDate)) {
      toast.error('From Date must be less than To Date');
      return; 
    }else{
      console.log('dsd');
      fetchData(seeMore,new Date(fromDate),new Date(toDate))
    }
  }
};


const handleFromDateChange = (event) => {
  setFromDate(event.target.value);
};

const handleToDateChange = (event) => {
  setToDate(event.target.value);
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

      {/* table-1 -wallet*/}
      <div className=" my-2">
        <div className='w-full bg-slate-100 h-14 flex justify-end rounded-md'>
          <div className='w-2/6 h-full flex justify-center items-center'>
            <img className='h-10' src={walletIcon} alt="" /> 
            <span className='text-sm font-bold opacity-70 ml-3'>₹.{walletTransData?.b_wallet_balance}</span>
          </div>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll scrollbar-hide max-h-[22rem]">
          <table className="w-full text-sm text-left text-gray-500 overflow-y-scroll">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
              <th scope="col" className="px-6 py-3">
                  Order
                </th>
                <th>
                  Date
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
          { walletTransData?.b_wallet_transaction && 
            visibleTransactions.map((transaction)=>{
            return <tr key={transaction._id} className="bg-white border-b">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                  {transaction?.order_id && transaction?.order_id.slice(0, Math.floor(transaction.order_id.length / 2))} 
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                  {transaction.date && transaction.date.split('T')[0]}
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
            {!walletDataSeeMore && (
              <div onClick={()=>setWalletDataSeeMore(!walletDataSeeMore)} className="text-blue-500 hover:underline focus:outline-none text-center cursor-pointer">
                See More
              </div>
            )}
            {walletDataSeeMore && (
              <div onClick={()=>setWalletDataSeeMore(!walletDataSeeMore)} className="text-blue-500 hover:underline focus:outline-none text-center cursor-pointer">
                See Less
              </div>
            )}
        </div>
      </div>
      </> }
      {/* table-2 */}
      <div className="relative my-2 h-1/3 bg-white">
      <div className={`w-full bg-slate-100 my-1 md:flex items-center justify-between rounded-md`}>
          <span className='text-lg font-bold opacity-70 ml-3 w-56'>{seeMore? selectedFilter :'Recent'} Sales</span>

         {!seeMore ? <p onClick={()=>expandSalesList()} className='mr-3 text-sm font-poppins font-bold cursor-pointer border border-double border-black px-1 border-blue rounded-lg bg-white-800 text-black flex items-center'>
          <img className='h-4 bg-white ' src="https://static.thenounproject.com/png/5014978-200.png" alt="" />
            View All
          </p> :
          <>
           <div className='text-black flex md:flex-none my-2 md:my-0 py-2'>
            <button
              className={`bg-slate-50 w-16 p-1 border ${selectedFilter === 'All' ? 'bg-slate-900 text-white' : ''}`}
              onClick={() => handleFilterClick('All')}
            >
              All
            </button>
            <button
              className={`bg-slate-50 w-16 p-1 border ${selectedFilter === 'Daily' ? 'bg-slate-900 text-white' : ''}`}
              onClick={() => handleFilterClick('Daily')}
            >
              Daily
            </button>
            <button
              className={`bg-slate-50 w-16 p-1 border ${selectedFilter === 'Weekly' ? 'bg-slate-900 text-white' : ''}`}
              onClick={() => handleFilterClick('Weekly')}
            >
              Weekly
            </button>
            <button
              className={`bg-slate-50 w-16 p-1 border ${selectedFilter === 'Yearly' ? 'bg-slate-900 text-white' : ''}`}
              onClick={() => handleFilterClick('Yearly')}
            >
              Yearly
            </button>
          </div>

          <div className='md:flex'> 
          <div date-rangepicker class="md:flex items-center">
              <div className='flex md:items-center my-2 md:my-0'>
                <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                      </svg>
                </div>
                  <input name="start" value={fromDate} type="date" onChange={handleFromDateChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start"/>
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
        <button
              className="text-black border hidden md:block border-gray-100 p-1 rounded-md mx-2"
              onClick={handlePrint}>
              🖨️ Print
          </button>
          <div className='flex justify-end'>
        <div onClick={()=>setSeeMore(!seeMore)} className='mr-3 cursor-pointer border border-double border-black px-1 border-blue rounded-lg bg-white-800 text-black flex items-center'>
          <img className='h-4 bg-white mx-1' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/minimize-button-567898.png" alt="" />
           <p className='text-xs md:text-sm font-poppins overflow-hidden m-1'> min</p>
        </div>
          </div>
          </>
          }
      </div>

        <div className="overflow-x-scroll overflow-y-hidden">
          <table id='sales-table' className="w-full max-h-44 text-sm text-left text-gray-500 ">
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
                <td scope="row" className="px-1 w-5xl py-1 font-medium text-gray-900 whitespace-nowrap">
                  {order.status==='refunded' 
                  &&
                  <p>"{order.user_message}"</p>
                  }
                </td>}
                <td className="px-6 py-4">
                  {order.status === 'success' && !order.is_refundable && <p className='text-green-500 font-semibold'>Success</p>}
                  {order.status === 'success' && order.is_refundable && 
                  <div className='flex'><p className='text-orange-400'>Payment on Hold</p>
                  <PopoverDes Description={"Your wallet will be credited with the payment once the user has successfully finished the first module of the course."}/>
                  </div>}
                  {order.status === 'refunded' && !order.is_refundable && <p className='text-red-600 font-semibold'>Canceled</p>}
                </td>
              </tr>
             })}
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
