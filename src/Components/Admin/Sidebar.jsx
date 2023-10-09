import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { setMobileViewMenuToggler } from '../../Redux/AdminAuth'


const Sidebar = () => {
const location = useLocation()
const dispatch = useDispatch()
const mobileView = useSelector((store)=>store.Admin.mobileView)

 return (
<>
<div className="flex items-center h-screen fixed z-50">
	{/* component sm */}
	<div onClick={()=>dispatch(setMobileViewMenuToggler(!mobileView))} className={` flex-col items-center w-16 transition h-full ${mobileView ? "" : '-translate-x-full'} overflow-hidden text-gray-400 bg-gray-900  md:hidden`}>
			<div className="flex flex-col items-center mt-3 border-t border-gray-700">
			<Link to={'/admin/dashboard'} className={`${location.pathname === '/admin/dashboard' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
			</Link>
			<Link to={'/admin/sales'} className={`${location.pathname === '/admin/sales' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
			</Link>
			<Link to={'/admin/users'} className={`${location.pathname === '/admin/users' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</Link>
			<Link to={'/admin/tutors'} className={`${location.pathname === '/admin/tutors' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</Link>
			<Link to={'/admin/courses'} className={`${location.pathname === '/admin/courses' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
				</svg>
			</Link>
		</div>
		<div className="flex flex-col items-center mt-2 border-t border-gray-700">
			<Link to={'/admin/tutor-requests'} className={`${location.pathname === '/admin/tutor-requests' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
				<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
			</Link>
			
			<Link to={'/admin/category'} className={`${location.pathname === '/admin/category' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
			<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
				</svg>
			
			</Link>
			<Link to={'/admin/contact-inbox'} className={`${location.pathname === '/admin/contact-inbox' ? 'bg-gray-700' : ''} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300`} href="#">
			<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
				</svg>
			</Link>
		
		</div>
	</div>

	{/* component md*/}
	<div className=" flex-col items-center w-40 h-full overflow-hidden text-gray-400 bg-gray-900  hidden md:block">
		<div className="w-full px-2">
			<div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
				<Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/admin/dashboard' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} to={'/admin/dashboard'}>
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					<span className="ml-2 text-sm font-medium">Dasboard</span>
				</Link>
				<Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/admin/sales' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} to={'/admin/sales'} >
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Sales</span>
				</Link>
				<Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/admin/users' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} to={'/admin/users'}>
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium" >Users</span>
				</Link>
				<Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/admin/tutors' || location.pathname === '/admin/tutors/tutor-details' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} to={'/admin/tutors'}>
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Tutors</span>
				</Link>
				<Link to={'/admin/courses'} className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/admin/courses' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} >
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
					</svg>
					<span className="ml-2 text-sm font-medium">Courses</span>
				</Link>
			</div>
			<div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
				<Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/admin/tutor-requests' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} to={'/admin/tutor-requests'} >
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Tutor Requests</span>
				</Link>
				<Link className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/admin/category' ? 'bg-gray-700 text-gray-300' : ''} 
					hover:bg-gray-700 hover:text-gray-300`} to={'/admin/category'}>
				<svg
					className="w-6 h-6 stroke-current" 
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
					/>
					</svg>
					<span className="ml-2 text-sm font-medium">Category</span>
				</Link>
				<Link to={('/admin/contact-inbox')} className={`flex items-center w-full h-12 px-3 mt-2 rounded ${location.pathname === '/admin/contact-inbox' ? 'bg-gray-700 text-gray-300' : ''}`} >
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Contact Req</span>
					
				</Link>
				</div>
			</div>
		</div>
	</div>
</>
  )
}

export default Sidebar
