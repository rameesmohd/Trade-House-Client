import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation()
    const [showsideBar,setShowSideBar] = useState(false)
  return (
        <div className=' md:mt-24' onClick={()=>setShowSideBar(!showsideBar)}>
            <button onClick={()=>setShowSideBar(!showsideBar)} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="false" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
            </button>

            <aside id="default-sidebar" className={`md:mt-24 ${!showsideBar ? '-translate-x-full' : ''}  fixed top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0`} aria-label="Sidenav">
                <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-black dark:border-gray-700">
                <ul className="space-y-2">
                    <li>
                    <Link to={'/tutor/'} className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group ${location.pathname === '/tutor/' ? 'bg-gray-700' : ''} dark:text-white dark:hover:bg-gray-700`} >
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2 4a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0h14v2H4V4zm0 4h5v2H4V8zm0 4h8v2H4v-2z" clipRule="evenodd"></path>
                            </svg>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/tutor/my-courses'} className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group ${location.pathname === '/tutor/my-courses' ? 'bg-gray-700' : ''} dark:text-white dark:hover:bg-gray-700`}>
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2 2a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2v-1h2a2 2 0 002-2V6a2 2 0 00-2-2H2zm2 2h12v6H4V4zm0 8v2h3v-2H4zm5 0v2h9v-2H9z" clipRule="evenodd"></path>
                        </svg>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">My Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/tutor/students'} className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group ${location.pathname === '/tutor/students' ? 'bg-gray-700' : ''} dark:text-white dark:hover:bg-gray-700`}>
                        <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H5zm-2 2a2 2 0 012-2h10a2 2 0 012 2v2H3V4zm0 4v8h14V8H3zm3 2a1 1 0 100 2h8a1 1 0 100-2H6zm-1 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z" clipRule="evenodd"></path>
                        </svg>
                            <span  className="flex-1 ml-3 text-left whitespace-nowrap">My Students</span>
                        </Link>
                    </li>
                </ul>
                <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <Link to={'/tutor/chat'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                            <span className="ml-3">Chats</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/tutor/profile'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path></svg>
                            <span className="ml-3">Profile</span>
                        </Link>
                    </li>
                </ul>
                </div>
            </aside>    
        </div>
  )
}

export default Sidebar
