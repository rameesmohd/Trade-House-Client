import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center w-full lg:mt-10'> 
      <header id="header" className="relative text-center header py-10 md:pt-25 lg:text-left xl:pt-20 md:pb-0">
        <div className=" container px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className=" mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
            <h1 className="mb-5 font-bold lg:text-3xl h1-large w3-animate-opacity ">Get access to our Powerful Foundational Courses </h1>
            <p className="mb-8 p-large">that will change the way you look at the markets forever.</p>
            <button onClick={()=>navigate('/courses')} type="button" class="text-white hover:scale-100 bg-gradient-to-br from-purple-800 to-blue-700 hover:bg-gradient-to-bl 
            transform hover:translate-y-3 focus:ring-4 focus:outline-none focus:ring-blue-400 dark:focus:ring-blue-800 font-medium rounded-lg text-sm 
            px-5 py-2.5 text-center mr-2 mb-2 transition-transform">Get started
           </button>
          </div>
          <div className="xl:text-right">
            <img className="inline animate-bounce-img" src='https://www.megamindfxsignal.com/assets/images/about.jpg' alt="alternative" />
          </div>
        </div> 
      </header>
    </div>
  )} 
export default Header
