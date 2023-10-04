import React, { useRef, useState } from 'react'
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
import MarketOverview from '../Markets/MarketOverview'
import Charts from '../Markets/Charts'
import CryptoWidget from '../Markets/CryptoWidget'
import { useNavigate } from 'react-router-dom'
import Map from './Map'
import ScrollToTopButton from '../../ScrollToTopButton'
import { toast } from 'react-toastify'
import userAxios from '../../../Axios/UserAxios'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Home() {
    const navigate = useNavigate()
    const token = useSelector((state)=>state.Client.Token)
    const emailRef = useRef()
    const subjetRef = useRef()
    const commentRef = useRef()
    const axiosInstance = userAxios()
    const [contactUsSubmited,setContactUsSubmited] = useState(false)

    const handleContactUsSubmit=async(e)=>{
        e.preventDefault()
        if(!token) return navigate('/login')
        const data = {
            email : emailRef.current.value,
            subject : subjetRef.current.value,
            comment : commentRef.current.value
        }
        if(data.email.trim() !== '' && data.subject.trim() !== '' && data.comment.trim() !== ''){
            await axiosInstance.post('/contact',{data})
            .then((res)=>{
                setContactUsSubmited(true)
            }).catch((error)=>{
                console.log(error);
                toast.error(error.message)
            })
        }else{
            toast.error('Invalid inputs')
        }
    }

  return (
    <div className='flex  flex-col'>
        <CryptoWidget/>
    {/* section-1 */}
    <div className=' lg:h-[500px]   
    w-full
    h-screen
    bg-gradient-to-r
    from-yellow-300
    via-yellow-400
    to-yellow-300 
    background-animate'>
    <div className='grid grid-cols-1 md:grid-cols-2 container mx-auto'>
        <div className='p-6 md:p-12 '>
            <img className='object-cover rounded-md shadow-2xl animate-bounce-img' src={img3} alt="" />
        </div>
        <div className='p-6 md:p-12'>
            <h1 className='mb-8 lg:mb-16 font-semibold text-2xl lg:text-3xl'>Let us help you become a Successful Trader<br/> in financial markets</h1>
            <p className='lg:pr-44 '>Our tutors  will walk you through the different steps to
            make a trade profitable.<br/> With each trade being different, you have to   </p>
            <p>understand how the market works</p>
            <p>to select a performing trade. This is exactly what you will </p>
            <p>learn with Trade House</p>
                <div className='w-100 m-14 flex justify-start'>
                <button className='w-28 h-12  bg-blue-800 text-slate-200 rounded-md hover:bg-blue-700 transition hover:scale-110 duration-300 btn-sm md:btn-md'>Get Started</button>
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
            <img className=' w-80 h-40 md:h-60 object-cover rounded-md' src={img5} alt="" />
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
                                <img className='bg-white absolute w-full h-full ' src={fxIcon} alt="" srcset="" />
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
     <div className='container md:h-[400px] mx-auto '>
            <div className='grid grid-cols-1 md:grid-cols-4 h-full gap-5 mt-2'>
                <div className='col-span-1 mr-1'></div>
                <div className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5 hover:scale-110 transition'> 
                        <h4 className='mb-5'>MetaTrader 4</h4>
                        <p className='mb-5'>The world’s most popular trading 
                            <br />platform</p>
                        <img className='' src={meta4} alt="" />
                </div>
                <div className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5 hover:scale-110 transition'>
                        <h4 className='mb-5'>MetaTrader 5</h4>
                        <p className='mb-5'>Multi-asset trading on one 
                            <br />powerful platform</p>
                            <img className='' src={meta5} alt="" />
                </div>
                <div className='col-span-1 mr-1'></div>
            </div>
        </div>

        {/* section-5 */}
        <div className='md:h-[400px] '>
            <MarketOverview/>
        </div>
        <Charts/>
        <div onClick={()=>navigate('/markets')} className='w-full h-24 text-2xl text-center flex items-center justify-center animate-bounce'>Enroll Markets <button className='btn btn-circle btn-sm mx-2'>❯</button></div>
        {/* section-6 */}
        <div className='h-full min-w-full relative my-3'>
            <img className='object-cover absolute h-full w-full -z-20 overflow-hidden opacity-50' src={img6} alt="" srcset="" />
        <div className='container  mx-auto md:h-[280px]  mt-1'>  
            <div className='w-full md:h-14 text-center md:p-10'>
                    <h1 className='text-3xl text-black font-bold'>Real Students, Real Progress</h1>
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
        
        <div className='container  mx-auto md:h-[200px] '>  
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
        </div> 
        <div className='md:grid md:grid-cols-6 p-10'>

        <section className="bg-white col-span-2">
          <div className="py-4 lg:py-5 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 font-poppins">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl font-poppins">Got a technical issue? Want to send feedback about our services? Need details about our Business plan? Let us know.</p>
                { !contactUsSubmited ?  <form  className="space-y-8">
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input ref={emailRef} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  " placeholder="name@gmail.com" required/>
                    </div>
                    <div>
                        <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input ref={subjetRef} type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm  " placeholder="Let us know how we can help you" required/>
                    </div>
                    <div className="sm:col-span-2">
                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea id="message" ref={commentRef} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300  " placeholder="Leave a comment..."></textarea>
                    </div>
                    <button type='submit' onClick={(e)=>handleContactUsSubmit(e)} className="py-2 px-3 text-sm font-medium text-center bg-blue-600 rounded-lg sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white">Send message</button>
                </form>:
                <div class="flex items-center justify-center  space-y-8">
                <div>
                    <div class="flex flex-col items-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 class="text-4xl font-bold">Thank You !</h1>
                    <p>Thank you for your interest! We will contact you back soon.</p>
                    </div>
                </div>
            </div> }
            </div> 
        </section>


        <section className='col-span-4 col-start-3'>
            <div className="container my-24 mx-auto md:px-6">
                <div className="mb-32">
                    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <div className="flex flex-wrap items-center bg-black rounded-lg">
                        <div className="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-4/6 xl:w-8/12 bg-white">
                            <div className="h-full md:h-[500px] w-full">
                                    <Map/>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/6 xl:w-4/12 p-6 md:p-0 ">
                            <div className='w-full flex justify-center items-center'>
                            <div class="mx-auto mb-5 text-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="mx-auto mb-6 h-8 w-8 text-white ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <p>office @ address</p>
                                <h6 class="font-medium">city tower,baby hospital,<br />Calicut, 94126</h6>
                            </div>
                            </div>
                            <div className="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12">   
                            <div className="flex items-start">
                                <div className="shrink-0">
                                <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" className="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                                    </svg>
                                </div>
                                </div>
                                <div className="ml-6 grow">
                                <p className="mb-2 font-bold dark:text-white">
                                    Technical support
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-200">
                                    support@example.com
                                </p>
                                <p className="text-neutral-500 dark:text-neutral-200">
                                    +1 234-567-89
                                </p>
                                </div>
                            </div>
                            </div>
                            <div className="mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:mb-0 xl:w-6/12 xl:px-12">
                                <div className="align-start flex">
                                    <div className="shrink-0">
                                    <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" className="h-6 w-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                        </svg>
                                    </div>
                                    </div>
                                    <div className="ml-6 grow">
                                    <p className="mb-2 font-bold dark:text-white">
                                        Sales questions
                                    </p>
                                    <p className="text-neutral-500 dark:text-neutral-200">
                                        sales@example.com
                                    </p>
                                    <p className="text-neutral-500 dark:text-neutral-200">
                                        +1 234-567-89
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
       </div>
        <hr />
        <br />
       <div className='h-auto'>
            <Footer/>
       </div>
       <div>
    </div>
        <ScrollToTopButton/>
    </div>
    
  )
}

export default Home
