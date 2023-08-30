import React from 'react'
import img3 from '../../../assets/fa5efcff953089b225cbdb8a122d116a.png'
import img4 from '../../../assets/ed1bbf2c34d28bb5646b27c11e7cf54c.png'
import img5 from '../../../assets/b88d216fac1c7c82d38e983045849906.png'
import fxIcon from '../../../assets/forex-icon.png'
import CommIcon from '../../../assets/commodity-icon.jpg'
import stockIcon from '../../../assets/stock-icon.png'
import IntIcon from '../../../assets/indices-icon.png'
import graph1 from '../../../assets/grade1-trendlines.png'
import meta4 from '../../../assets/meta4.jpeg'
import meta5 from '../../../assets/meta5.jpeg'
import img6 from '../../../assets/faa2b801f1a2a58d3458bd13983842d3.jpeg'
import Footer from '../Footer'


function Home() {
  return (
    <>
    <div className='flex  flex-col'>
    {/* section-1 */}
    <div className='bg-yellow-300 lg:h-[500px]'>
    <div className='grid grid-cols-1 md:grid-cols-2 container mx-auto'>
        <div className='p-6 md:p-12 '>
            <img className='object-cover rounded-md shadow-2xl' src={img3} alt="" />
        </div>
        <div className='p-6 md:p-12'>
            <h1 className='mb-8 lg:mb-16 font-semibold text-2xl lg:text-3xl'>Let us help you become a Successful Trader<br/> in financial markets</h1>
            <p className='lg:pr-44'>Our tutors  will walk you through the different steps to
            make a trade profitable.<br/> With each trade being different, you have to   </p>
            <p>understand how the market works</p>
            <p>to select a performing trade. This is exactly what you will </p>
            <p>learn with Trade House</p>
                <div className='w-100 m-14 flex justify-start'>
                <button className='w-28 h-12 bg-blue-800 text-slate-200 rounded-md hover:bg-gray-500 transition duration-300 btn-sm md:btn-md'>Get Started</button>
                </div>
        </div>
    </div>
    </div>
    {/* section-2 */}
    <div className='grid grid-rows-2 lg:grid-cols-1 h-auto lg:px-40 container mx-auto'>
    <div className='w-auto h-auto grid grid-cols-1 sm:grid-cols-12 md:px-16 '>
        <div className='col-span-3 p-4'>
            <img className=' w-80 h-40 md:h-60 object-cover rounded-md ' src={img4} alt="" />
        </div>
        <div className='col-span-9 md:py-10 px-4 md:my-2 bg-slate-100 rounded-md shadow-sm'>
            <div className="container px-8 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-12">
            <div className="lg:col-span-7">
            <div className="text-box mb-12 ">
            <h3 className="mb-2 md:mb-5 font-bold text-3xl">What is Trade House?</h3>
            <p className="mb-4">Trade House is an online platform created by Rameez so he can share his and other expert tutors knowledge for new ideas in trading. 
                Rameez and team created powerful online video programs in which you can learn 
                how to trade using price action and variety of strageties by our experienced tutors</p>
            </div>
            </div>
            </div>
        </div>
        </div>
    
      <div className='w-auto h-auto grid grid-cols-1 sm:grid-cols-12 md:px-16'>
        <div className='col-span-3 p-4'>
            <img className=' w-80 h-40 md:h-60 object-cover rounded-md ' src={img5} alt="" />
        </div>
        <div className='col-span-9 md:py-10 px-4 md:my-2 bg-slate-100 rounded-md shadow-sm'>
            <div className="container px-8 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-12 ">
            <div className="lg:col-span-7">
            <div className="text-box mb-12 ">
            <h3 className="mb-2 md:mb-5 font-bold text-3xl">Who is Trade House for?</h3>
            <p className="mb-4"> Any new trader who wants to start trading the right way.
                    Any experienced trader who hasn't found yet the correct method to turn profitable.
                    Any profitable trader who would like an additional tool to understand how the market works.</p>
            </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    {/* section-3 */}
     <div className='w-full h-auto px-5 bg-slate-100 hidden md:block'>
        <div className='w-full h-full  mx-auto container '>
        <div className='grid md:grid-cols-2 h-full'>
            <div className='bg-slate-50 h-100 text-left flex-col px-16 py-20'>
                    <div className='mb-4'>
                    Trade House is the paramount one-stop solution for all your investment and trading needs. 
                    . We assist both individual and institutional clients in reaping maximum benefits from the outstanding investing and trading possibilities available with currencies, 
                        commodities, CFDs, and other instruments.
                    </div>
                    <div>
                        <ul>
                            <li className='text-2xl'>200+</li>
                            <li className='mb-2'>Clients</li>
                            <li className='text-2xl'> 10+</li>
                            <li className='mb-2'>Tutors</li>
                            <li className='text-2xl'>25+</li>
                            <li className='mb-2'>Courses</li>
                        </ul>
                    </div>
            </div>
            <div className='h-full grid grid-cols-6 '>
                    <div className='h-96 m-10 bg-slate-50 grid grid-rows-4 col-span-1'>
                        <div className='col-span-1 h-20 w-20  border-red-300 border bg-white relative'>
                                <img className='bg-white absolute w-full h-full' src={fxIcon} alt="" srcset="" />
                        </div>
                        <div className='col-span-1 h-20 w-20 border-red-300 border relative'>
                            <img className='bg-white absolute w-full h-full' src={CommIcon} alt="" srcset="" />
                        </div>
                        <div className='col-span-1 h-20 w-20 border-red-300 border relative'>
                            <img className='bg-white absolute w-full h-full' src={stockIcon} alt="" srcset="" />
                        </div>
                        <div className='col-span-1 h-20 w-20 border-red-300 border relative'>
                            <img className='bg-white absolute w-full h-full' src={IntIcon} alt="" srcset="" />
                        </div>
                    </div>
                    <div className='col-span-5 mt-12 ml-5'>
                        <img src={graph1} alt="" srcset="" />
                    </div>
            </div>
        </div>
        </div>
     </div>
     {/* section-4 */}
     <div className='container h-[400px] mx-auto '>
            <div className='grid grid-cols-1 md:grid-cols-4 h-full gap-5 mt-2'>
                <div className='col-span-1 mr-1'></div>
                <div className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5'> 
                        <h4 className='mb-5'>MetaTrader 4</h4>
                        <p className='mb-5'>The world’s most popular trading 
                            <br />platform</p>
                        <img src={meta4} alt="" />
                </div>
                <div className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5'>
                        <h4 className='mb-5'>MetaTrader 5</h4>
                        <p className='mb-5'>Multi-asset trading on one 
                            <br />powerful platform</p>
                            <img src={meta5} alt="" />
                </div>
                <div className='col-span-1 mr-1'></div>
            </div>
     </div>

     {/* section-5 */}
        <div className='container  mx-auto h-[280px]  mt-1'>  
            <div className='w-full h-14 text-center p-10'>
                    <h1 className='text-4xl'>Real Students, Real Progress</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 m-6'>
                <div className='md:col-start-2 col-span-1 shadow-md rounded-3xl h-36 bg-violet-600 text-center'>
                    hhdgvchjchchvch
                </div>
                <div className='shadow-md rounded-3xl col-span-1 bg-green-700 text-center'>
                    sacacssssss
                </div>
                <div className=' shadow-md rounded-3xl col-span-1  bg-blue-500 text-center'>
                    acsssssssssss
                </div>
            </div>         
        </div>
        <div className='container  mx-auto h-[200px] '>  
            <div className='grid grid-cols-1 md:grid-cols-10 gap-4 m-6'>
                <div className='md:col-start-2 col-span-2 shadow-md rounded-3xl h-36 bg-violet-600 text-center'>
                    hhdgvchjchchvch
                </div>
                <div className='shadow-md rounded-3xl col-span-2 bg-green-700 text-center'>
                    sacacssssss
                </div>
                <div className=' shadow-md rounded-3xl col-span-2  bg-blue-500 text-center'>
                    acsssssssssss
                </div>
                <div className=' shadow-md rounded-3xl col-span-2  bg-blue-500 text-center'>
                    acsssssssssss
                </div>
            </div>         
        </div>
        {/* section-6 */}
        <div className='h-auto min-w-full' >
                <img className='object-cover' src={img6} alt="" srcset="" />
        </div> 
        <Footer/>
        </div>
    </>
  )
}

export default Home
