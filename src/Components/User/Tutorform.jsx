import React, { useEffect, useState } from 'react'
import teachIcon from '../../assets/59505.png'
import inspireicon from '../../assets/5736725-200.png'
import rewardIcon from '../../assets/2666513.png'
import banner from '../../assets/656665.jpg'
import { useRef } from 'react'
import userAxios from '../../Axios/UserAxios'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { tutorReqSubmit, updateTutorStates } from '../../Redux/ClientAuth'
import Loading from '../Loading'

const Tutorform = () => {
    const axiosInstance = userAxios()
    const email =  useSelector((state)=>state.Client.email)
    const is_requested =  useSelector((state)=>state.Client.is_requested)
    const is_tutor =  useSelector((state)=>state.Client.is_tutor)
    const categoryRef = useRef()
    const experienceRef = useRef()
    const qualificationRef = useRef()
    const typeRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [pdfDataUrl, setPdfDataUrl] = useState({})
    const [loading,setLoading] = useState(false)
    const [reqStatus,setReqStatus]=useState('')
    const { pathname } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(()=>{
        axiosInstance.get(`/tutor-load?email=${email}`)
        .then((res)=>{
          console.log(res);
          const result = res.data.result
          dispatch(updateTutorStates({
            is_requested : result.is_requested,
            is_tutor : result.is_tutor
          }))
          setReqStatus(result.req_status)
        }).catch((error)=>{
          toast.error(error.message)
          console.log(error);
        })
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const obj = {
            category:categoryRef.current.value,
            experience :experienceRef.current.value,
            qualification : qualificationRef.current.value,
            type : typeRef.current.value,
            firstName : firstNameRef.current.value,
            lastName : lastNameRef.current.value,
            email : email,
            file :pdfDataUrl,
        }
        setLoading(true)
        axiosInstance.post('/tutor-request',obj,{headers:{ 'Content-Type': 'multipart/form-data'}}).then((res)=>{
            setLoading(false)
            dispatch(tutorReqSubmit())
            toast.success(res.data.message)
        }).catch((error)=>{
            console.log(error);
            toast.error(error.message)
        })
    }

    const handleFileChange = (event) => {
            const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            // pdfConverter(selectedFile);
            setPdfDataUrl(selectedFile);

        }
    };
    // const pdfConverter = (pdfFile) => {
            // let reader = new FileReader();
            // reader.readAsDataURL(pdfFile);
            // reader.onload = () => {
            // setPdfDataUrl(reader.result);
            // setPdfDataUrl(pdfFile);

    //   };
    // };
    // const imageConverter = (event) => {
    //         const imageFile = event.target.files[0]
    //         let reader = new FileReader();
    //         reader.readAsDataURL(imageFile);
    //         reader.onload = () => {
    //         setImgDataUrl(reader.result);
    //     }}   
  
  return (
    <>
        <div className="w-full container mx-auto">
            <div className="relative">
                <img className="w-full h-[700px] object-cover" src={banner} alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-center md:text-left px-4">
                    <h1 className="text-3xl md:text-6xl font-bold leading-tight md:leading-snug">Come teach <br className="hidden md:block" /> with us</h1>
                    <h3 className="text-lg md:text-3xl mt-2">Teach your technical strategies and <br className='hidden md:block'/>make a big impact</h3>
                </div>
                <button className="btn bg-black text-white hover:text-black border-none absolute top-3/4 left-1/2 md:left-1/3 md:ml-20 transform -translate-x-1/2">
                    GET STARTED
                </button>
            </div>
        </div>

        <div className=' h-auto mt-2 bg-slate-50 grid md:grid-cols-5 gap-2 py-2'>
                <div className='md:col-start-2 col-span-1 flex-row justify-center bg-slate-100 rounded-2xl'>
                    <div className='flex justify-center'>
                        <img className='w-1/3' src={teachIcon} alt=""/>
                    </div>
                    <div className='flex-row justify-center text-center'>
                         <h1>Teach your way</h1>
                         <h6>Publish the course you want,in the way you want,always have control of your own  content</h6>
                    </div>
                </div>
                <div className='md:col-start-3 col-span-1 flex-row justify-center bg-white rounded-2xl'>
                    <div className='flex justify-center'>
                        <img className='w-1/3' src={inspireicon} alt=""/>
                    </div>
                    <div className='flex-row justify-center text-center'>
                         <h1>Inspire learners</h1>
                         <h6>Teach your tehcnical and fundamental strategies and healp learners explore there trading career,gain new skills and advance there trading journey </h6>
                    </div>
                </div>
                <div className='md:col-start-4 col-span-1 flex-row justify-center bg-slate-100 rounded-2xl'>
                    <div className='flex justify-center'>
                        <img className='w-1/3' src={rewardIcon} alt=""/>
                    </div>
                    <div className='flex-row justify-center text-center'>
                         <h1>Get rewarded</h1>
                         <h6>Exapand your proffessional network,build your expertise and earn money on each paid enrollment</h6>
                    </div>
                </div>
          </div>
        {reqStatus!=='rejected' && <>
        { !is_requested && !is_tutor &&
          <div className='bg-slate-950 container mx-auto w-1/2 md:w-1/3 border rounded-lg border-gray-400 p-10 my-3' >
            <h1 className='text-center text-lg text-cyan-50'>Request Tutorship</h1>
           
         <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='mb-6'>    
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Market category</label>
                <select  id="" ref={categoryRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option >Choose a market</option>
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
                <option value="ind_stock">Indian Stock</option>
                <option value="equity">Equity</option>
                <option value="option">Option</option>
                <option value="margin">Margin</option>
                <option value="other">Other</option>
                </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="number" ref={experienceRef} name="experience" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Experirence (years)</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" ref={qualificationRef} name="qualification" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Qualification</label>
            </div>
            <div className='mb-6'>    
            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of trader</label>
                <select id="" ref={typeRef} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="swing">Swing trader</option>
                <option value="short_term">Short term trader</option>
                <option value="intra_day">Intraday trader</option>
                <option value="scalper">Scalper</option>
                <option value="investor">Investor</option>
                <option value="other">Other</option>
                </select>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" ref={firstNameRef} name="first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" ref={lastNameRef} name="last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        type="file"
                        name="document"
                        accept=".pdf,application/pdf" 
                        id="file" 
                        required
                        onChange={handleFileChange} 
                        />
                    <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Upload CV</label>
                </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Request</button>
            </form> 
        </div> }

           {!is_tutor && is_requested && 
           <div class="flex items-center justify-center h-auto my-10">
           <div class="p-4 rounded shadow-lg ring ring-indigo-600/50">
             <div class="flex flex-col items-center space-y-2">
               <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <h1 class="text-4xl font-bold">Request sent!!</h1>
               <p>You have successfully submited tutorship request!!</p>
               <a
                 class="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                 </svg>
                 <span onClick={()=>navigate('/')} class="text-sm font-medium">
                   Home
                 </span>
               </a>
             </div>
           </div>
         </div> }
         {
            is_tutor && 
            <div class="flex items-center justify-center h-auto my-10 ">
            <div class="p-4 rounded shadow-lg ring ring-green-600/50 bg-slate-200">
              <div class="flex flex-col items-center space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-green-500 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 class="text-4xl text-green font-bold">Request Approved!!</h1>
                <p className='text-green'>Your Tutorship request approved!</p>
                <a
                  class="cursor-pointer inline-flex items-center px-4 py-2 text-black bg-green-500 border border-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring">
                  <span onClick={()=>navigate('/tutor')} class="text-sm text-white font-medium">
                    Go to Tutor Panel
                  </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-white font-bold w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
              </div>
            </div>
          </div>
         }
         </> }

         { reqStatus==='rejected' &&
           <div class="flex items-center justify-center h-auto my-10">
           <div class="p-4 rounded shadow-lg ring ring-indigo-600/50">
             <div class="flex flex-col items-center space-y-2">
               <svg xmlns="http://www.w3.org/2000/svg" class="text-red-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <h1 class="text-4xl font-bold">Request Rejected!!</h1>
               <a
                 class="cursor-pointer inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                 </svg>
                 <span onClick={()=>navigate('/')} class="text-sm font-medium">
                   Home
                 </span>
               </a>
             </div>
           </div>
         </div> }

        <div className='w-full bg-slate-300 h-10'>
        </div>
        { loading && <Loading/> }
    </>
  )
}

export default Tutorform
