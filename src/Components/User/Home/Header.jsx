import React from 'react'
import img from '../../../assets/p10-bg1.png'
import img2 from '../../../assets/55e84af7c61c5ef6a6f15c2c7f7a8578.png'

const Header = () => {
  return (
    <>
    <div className='flex justify-center w-full'> 
      <header id="header" className="text-center header py-28 md:pt-25 lg:text-left xl:pt-20 md:pb-0">
        <div className="container px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
            <h1 className="mb-5 font-bold lg:text-3xl h1-large">Get access to my Powerful Foundational Courses </h1>
            <p className="mb-8 font-bold p-large">that will change the way you look at the markets forever.</p>
            <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
             focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Get Access Now</button>
          </div>
          <div className="xl:text-right">
            <img className="inline" src={img} alt="alternative" />
          </div>
        </div> 
      </header>
    </div>
    </>
  )} 
export default Header
