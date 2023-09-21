import React from 'react'
import walletIcon from '../../assets/pngwing.com.png'
import ReactApexChart from 'react-apexcharts';


const Overview = () => {

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
  <div className='w-full grid grid-cols-1  md:grid-cols-2 gap-1 my-3'>
   
    {/* Graphs */}
    <div className='space-x-1 bg-slate-50 rounded-2xl p-2'>
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
    </div>

    <div className='bg-slate-100 rounded-2xl p-2 col-span-1'>
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
            <span className='text-sm font-bold opacity-70 ml-3'>₹.{0}</span>
          </div>
        </div>
        <div className="overflow-x-scroll overflow-y-scroll scrollbar-hide max-h-[22rem]">
          <table className="w-full text-sm text-left text-gray-500 overflow-y-scroll">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
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
                [1,2,3,4,5,6,8,9].map((value)=>{
                  return <tr key={value+78} className="bg-white border-b">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Apple MacBook Pro 17"
                </td>
                <td className="px-6 py-4 text-green-600 font-semibold">
                  +2999
                </td>
              </tr>
                })
              }
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
      {/* table-2 */}
      <div className="relative my-2 h-1/3 bg-white">
        <div className='w-full bg-slate-100 my-1 flex justify-center rounded-md'>
          <span className='text-lg font-bold opacity-70 ml-3'>Recent Sales</span>
        </div>
        <div className="overflow-x-scroll overflow-y-hidden">
          <table className="w-full max-h-44 text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
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
             { [1,2,3,4].map((value,index)=>{
              return <tr key={1325+value} className="bg-white border-b">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Apple MacBook Pro 17"
                </td>
                <td className="px-6 py-4">
                  $2999
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Apple MacBook Pro 17"
                </td>
                <td className="px-6 py-4">
                  $2999
                </td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  2323
                </td>
                <td className="px-6 py-4">
                  $2999
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
