import React from 'react'
import footericon from '../../assets/blacklogo.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className='w-full h-auto py-3  grid grid-cols-1 md:grid-cols-3 gap-2 z-20' >
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                    <ul>
                        <h3 className='font-bold' >COMPANY</h3>
                        <li className='my-2'>About</li>
                        <li className='my-2'>Reviews</li>
                        <li className='my-2'>Mobile Apps</li>
                        <li className='my-2'>Home</li>
                        <li className='my-2'>Contact</li>
                        {<Link className='my-2 text-md underline' to={'/request-tutorship'}>Become an instructor</Link>}
                    </ul>
                </div>
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                <ul>
                        <h3 className='font-bold'>EDUCATION</h3>
                        <li className='my-2'>About</li>
                        <li className='my-2'>Reviews</li>
                        <li className='my-2'>Mobile Apps</li>
                        <li className='my-2'>Home</li>
                        <li className='my-2'>Contact</li>
                    </ul>
                </div>
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                <ul>
                        <h3 className='font-bold' >MEMBERS</h3>
                        <li className='my-2'>About</li>
                        <li className='my-2'>Reviews</li>
                        <li className='my-2'>Mobile Apps</li>
                        <li className='my-2'>Home</li>
                        <li className='my-2'>Contact</li>
                    </ul>
                </div>          
        </div>
        <div className='w-auto h-auto flex justify-center mt-5'>
            <img className='w-44 h-12' src={footericon} alt="" />
        </div>
        <div className='w-auto h-auto flex justify-center text-center text-gray-500 md:text-lg my-2'>
            <p className=' mx-3'>Terms</p>
            <p className='mx-3'>Policy</p>
        </div>
    </div> 
)}

export default Footer
