import React from 'react'
import img from '../../../assets/p10-bg1.png'
import img2 from '../../../assets/55e84af7c61c5ef6a6f15c2c7f7a8578.png'

const Header = () => {
  return (
    <>
    <div className='flex justify-center w-full '> 
      <header id="header" className="text-center header py-10 md:pt-25 lg:text-left xl:pt-20 md:pb-0">
        <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
            <h1 className="mb-5 font-bold lg:text-3xl h1-large">Get access to our Powerful Foundational Courses </h1>
            <p className="mb-8 p-large">that will change the way you look at the markets forever.</p>
              {/* <span class="animate-ping absolute inline-flex  rounded-full bg-yellow-500 opacity-55 -z-20"></span> */}
            <button type="button" class="text-white hover:scale-100 bg-gradient-to-br from-purple-800 to-blue-700 hover:bg-gradient-to-bl 
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
    </>
  )} 
export default Header
