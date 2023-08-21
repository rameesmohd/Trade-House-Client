import axios from 'axios'
import React,{ useState,useEffect }from 'react'


const Users=()=>{
    useEffect(()=>{
            
    },[])
return (
    <>
    <div className="flex flex-col">
    <div className="m-5">
        <nav className="bg-light">
            <div className="container flex justify-end mx-auto">
                <form className="flex flex-col items-start md:flex-row md:items-end" role="search">
                    <input
                        className="w-full px-2 py-1 border rounded-md form-input md:mr-2 md:w-auto focus:outline-none focus:ring focus:border-blue-300"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="p-1 rounded bg-slate-200">
                        Search
                    </button>
                </form>
            </div>
        </nav>
    </div>
    <table className="table">
        <thead>
            <tr>
                <th scope="col" className='py-2 text-center bg-slate-200' >#</th>
                <th scope="col" className='py-2 text-center bg-slate-200'>Name</th>
                <th scope="col" className='py-2 text-center bg-slate-200'>Email</th>
                <th scope="col" className='py-2 text-center bg-slate-200'>Phone</th>
                <th scope="col" className='py-2 text-center bg-slate-200'></th>
                <th scope="col" className='py-2 text-center bg-slate-200'></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="px-4 py-2 text-center">1</td>
                <td className="px-4 py-2 text-center">John Doe</td>
                <td className="px-4 py-2 text-center">john@example.com</td>
                <td className="px-4 py-2 text-center">123-456-7890</td>
                <td className="">
                </td>
                <td className="px-4 py-2">
                    <button className='mx-5 text-blue-600'>Edit</button>
                    <button className="text-red-600">Block</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</>
)}

export default Users
