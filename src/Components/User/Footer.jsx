import React from 'react'
import footericon from '../../assets/blacklogo.png'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillPhone} from 'react-icons/ai'
import {FiMail} from 'react-icons/fi'
import {RiHomeOfficeFill} from 'react-icons/ri'

const Footer = () => {
    const navigate =  useNavigate()
  return (
    <div className='z-20'>
        <div className='w-full h-auto py-3  grid grid-cols-1 md:grid-cols-3 gap-2 z-20' >
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                    <ul>
                        <h3 className='font-bold' >NAVIGATIONS</h3>
                        <li className='my-2 '>
                            <a onClick={()=>navigate('/home')}>Homepage</a>
                        </li>
                        <li className='my-2 '>
                        <a onClick={()=>navigate('/markets')}>Markets</a></li>
                        <li className='my-2 '>
                        <a onClick={()=>navigate('/courses')}>Courses</a>
                        </li>
                        <li className='my-2 '>
                        <a onClick={()=>navigate('/userpanel')}> User Account</a>
                        </li>
                        { <Link className='my-2 text-md underline text-red-700 font-semibold cursor-pointer' to={'/request-tutorship'}>Join as an Educator</Link> }
                    </ul>
                </div>
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                <ul>
                        <h3 className='font-bold'>USEFUL LINKS</h3>
                        <li className='my-2 underline '>
                        <a  href='https://www.metatrader4.com/en' target="_blank" >Metatrader.com</a>
                        </li>
                        <li className='my-2 underline'>
                        <a href='https://www.forexfactory.com/' target="_blank" >ForexFactory.com</a>
                        </li>
                        <li className='my-2 underline'>
                        <a href='https://www.investing.com/' target="_blank" >Investing.com</a>
                        </li>
                        <li className='my-2 underline' target="_blank">
                            <a href="https://coinmarketcap.com/" target="_blank">coinmarketcap.com</a>
                        </li>
                    </ul>
                </div>
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                <ul>
                    <h3 className='font-bold' >CONTACT</h3>
                    <li className='my-2 flex item-center'>
                        <RiHomeOfficeFill className='text-1xl md:text-2xl'/>
                        <p className='mx-2'>city tower,baby hospital,Calicut, 94126</p>
                    </li>
                    <li className='my-2 flex item-center'><AiFillPhone/><p className='mx-2'>+ 01 234 567 88</p></li>
                    <li className='my-2 flex item-center underline'><FiMail/><p className='mx-2'>th@gmail.com</p></li>
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
