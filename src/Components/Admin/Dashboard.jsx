import React from 'react'
import Table from './SalesTable'
import ReactApexChart from 'react-apexcharts';


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

const Dashboard = () => {
  return (
    <div className='w-full p-3'>
    <div className='grid md:grid-cols-2'>
    <div className='grid md:grid-cols-4 gap-2 p-4 col-span-1 '>
        <div className=' bg-red-200 p-3 rounded-2xl font-poppins text-base font-semibold text-gray-600 '>
              Wallet 
        </div>
        <div className=' bg-yellow-100 p-3 rounded-2xl font-poppins text-base font-semibold text-gray-600'>
              Today's sales
        </div>
        
        <div className=' bg-green-200 p-3 rounded-2xl font-poppins text-base font-semibold text-gray-600'>
              Monthly sales
        </div> 
        <div className=' bg-blue-200 p-3 rounded-2xl font-poppins text-base font-semibold text-gray-600'>
        Yearly Sales
        </div>
        
        <div className='col-span-4 bg-slate-100 p-3 rounded-2xl font-poppins text-base font-semibold text-gray-600'>  
            Yearly 
            Monthly Revenue
            Total Revenue
        </div>
        
    </div>
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
    </div>
    </div>

      <Table/>
    </div>
  )
}

export default Dashboard
