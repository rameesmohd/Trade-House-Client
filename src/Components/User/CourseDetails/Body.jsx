import React from 'react'
import { useLocation } from 'react-router-dom'
import Rating from '../../RatingStar'
import AdvRating from '../../AdvRating'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import userAxios from '../../../Axios/UserAxios'
import { toast } from 'react-toastify'
import { setPurchsedCourses} from '../../../Redux/ClientSlice/CoursesLoad'
import {BiChat} from 'react-icons/bi'
import { Spinner } from '@material-tailwind/react'

const Body = () => {
    const purchasedCourses= useSelector((store)=>store.CoursesLoad.purchasedCourses)
    const token = useSelector((store)=>store.Client.Token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosInstance = userAxios()
    const location = useLocation()
    const courseData = location.state
    const [isPurchased,setIsPurchased] = useState(false)
    const [loading,setLoading] = useState(false)
    
    useEffect(()=>{
        const loadPurchasedCourses=async()=>{
            await axiosInstance.get('/purchased-courses').then((res)=>{
                dispatch(setPurchsedCourses(res.data.result))
            }).catch((error)=>{
                toast.error(error.message)
                console.log(error);
            })
        }
        if(token){
            loadPurchasedCourses()
        }
    },[])

    useEffect(()=>{
        if(Array.isArray(purchasedCourses)){
            const purchased = purchasedCourses.filter((value)=>value === courseData._id)
            purchased.length !== 0 ? setIsPurchased(true) : setIsPurchased(false)
        }
    })

    const accessChat=async()=>{
        setLoading(true)
        console.log('other_id:', courseData.tutor._id);
        console.log('user_role:', 'user');
        await axiosInstance.post('/chat',{other_id:courseData.tutor._id,user_role:'user'})
        setLoading(false)
        navigate('/chat')  
    }

  return (
    <div>
        {/* section one */}
        <div className='w-full grid md:grid-cols-2'>
            <div className='bg-slate-50 h-auto w-full p-8 md:col-span-1'>
                <h1 className='underline text-sm font-poppins'>Course</h1>
                <br />
                <h1 className='text-3xl font-poppins'>{courseData?.title}</h1>
                <br />
                <p className='font-sans'>{courseData?.description}</p> 
                <br />  
                <div className='flex '>
                <Rating/> <p className='ml-4'>{courseData?.user_ratings ? (courseData?.user_ratings.length+" ratings") : 'No reviews'}</p>
                </div>
                <br />
                {
                    isPurchased ? <button onClick={()=>navigate('/userpanel')} className='rounded-md text-white btn-sm w-28 bg-blue-600'>Start</button> 
                    : <button onClick={()=>navigate('/payments',{state:courseData})} className='rounded-md text-white btn-sm w-28 bg-blue-600'>Purchase</button>
                }
            </div>
            <div className='md:col-span-1'>
            <video className="h-full w-full rounded-lg p-8 bg-white" controls autoPlay muted>
                <source src={courseData?.preview} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
        {/* section two */}
        <div className='w-11/12 mx-auto h-auto bg-yellow-50 mt-2 rounded-md'>
            <div className='w-11/12 mx-auto h-auto px-11 py-5'>
                <div className='bg-amber-500 grid grid-cols-1 md:grid-cols-3 p-5 rounded-3xl gap-3 hover:scale-105 transition'>
                <div className=' md:col-span-1 py'>
                    <img className='mx-auto mt-4 object-cover transition-transform  w-60 h-60 rounded-3xl shadow-md drop-shadow-2xl shadow-black' src={courseData?.tutor.image ? courseData?.tutor.image : 'https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg'} alt="" />
                </div>
                <div className='md:col-span-2 py-8'>
                    <p className='text-white mb-2'>About the Trainer</p>
                    <h1 className='text-white text-3xl mb-2'>{courseData?.tutor?.firstName+ " " +courseData?.tutor?.lastName}</h1>
                    <p className='text-white'>{courseData?.tutor?.about_me}</p>
                    {!loading ? <button onClick={()=>accessChat()} className='border p-1 font-poppins rounded-lg bg-slate-200 text-black border-white mt-2 flex items-center justify-center w-36'><BiChat className='mx-1'/><p>Chat with me</p></button>:
                    <button className='border p-1 font-poppins rounded-lg bg-slate-200 text-black border-white mt-2 flex items-center justify-center w-36'><Spinner/></button>}
                </div>
                </div>
            </div>
        </div>
        <div className='w-full h-auto bg-blue-50 px-5 py-8 mt-2 rounded-md'>
            <h1 className='text-black'>What Will You Learn?</h1>
            <ul class="list-disc">
                {courseData.skillsOffering.map((value)=><li class="ml-8 text-black font-poppins ">{value}</li>)}
            </ul>   
        </div>
        {/* section three */}
        <h1 className='text-4xl underline mx-auto mt-12 text-center'>Student Rating</h1>

        <div className='grid md:grid-cols-2 w-full h-auto mb-5'>

            <div className='col-span-1 my-16 ml-12'>
             <AdvRating/>
            </div>

            <div className='col-span-1 my-16'>
                <h1 className='font-poppins text-lg'>All Reviews</h1>
                <div className='w-full h-24 bg-slate-50 flex flex-row items-center rounded-md'>
                    <div className='w-1/6 h-full p-3 flex justify-center items-center'>
                            <div style={{ overflow: 'hidden' }} className='mx-auto my-auto h-14 w-14 rounded-full bg-slate-600 flex justify-center items-center text-4xl text-white'>M</div>
                    </div>
                    <div className='flex flex-col h-full ml-2 py-3'>
                    <div className='text-lg'>Mbcdefg</div>
                    <p className='text-xs opacity-75'>1/2/3333</p>
                    <p className='whitespace-normal break-words'>ewdfdfsdaf qwerfawef awefqwef awefwedsfefwerfwerfg awefawef</p>
                    </div>
                </div>

                <div className='w-full h-24 bg-slate-50 flex flex-row items-center rounded-md'>
                    <div className='w-1/6 h-full p-3 flex justify-center items-center'>
                            <div style={{ overflow: 'hidden' }} className='mx-auto my-auto h-14 w-14 rounded-full bg-slate-600 flex justify-center items-center text-4xl text-white'>M</div>
                    </div>
                    <div className='flex flex-col h-full ml-2 py-3'>
                    <div className='text-lg'>Mbcdefg</div>
                    <p className='text-xs opacity-75'>1/2/3333</p>
                    <p className='whitespace-normal break-words'>ewdfdfsdaf qwerfawef awefqwef awefwedsfefwerfwerfg awefawef</p>
                    </div>
                </div>
                <div className='w-full h-24 bg-slate-50 flex flex-row items-center rounded-md'>
                    <div className='w-1/6 h-full p-3 flex justify-center items-center'>
                            <div style={{ overflow: 'hidden' }} className='mx-auto my-auto h-14 w-14 rounded-full bg-slate-600 flex justify-center items-center text-4xl text-white'>M</div>
                    </div>
                    <div className='flex flex-col h-full ml-2 py-3'>
                    <div className='text-lg'>Mbcdefg</div>
                    <p className='text-xs opacity-75'>1/2/3333</p>
                    <p className='whitespace-normal break-words'>ewdfdfsdaf qwerfawef awefqwef awefwedsfefwerfwerfg awefawef</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Body
