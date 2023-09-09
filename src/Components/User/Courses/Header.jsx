import React from 'react'
import image from '../../../assets/image 3.png'


const Header = () => {
  return (
    <div className='relative w-full h-56 bg-slate-300 mt-2'>
      <img className='absolute w-full h-full object-cover' src={image} alt="" srcset=""/>
      <div className='absolute grid grid-cols-4 w-full h-full'>
        <div className='w-full h-full p-12 col-span-3'>
             <h1 className='text-white text-4xl md:text-6xl font-poppins my-1'>Unlock your Potential</h1>
             <h2 className='text-white text-lg md:text-2xl font-poppins my-3'>with our concept-builder courses</h2>
        </div> 
      </div>
    </div>
  )
}

export default Header
