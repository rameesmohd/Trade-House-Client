import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import successIcom from '../../../assets/icons8-success-64.png'
import userAxios from '../../../Axios/UserAxios'



const Trial = ({progressData,order_id,courseData,moduleData,user_id}) => {
   const [dropDown,setDropDown] = useState(true)
   const [progress,setProgress] = useState(0)
   const [resumeState,setResumeState] = useState()
   const navigate = useNavigate()
   const axiosInstance = userAxios()
   let next_module_id;

   const handleProgress = async() => {
      let completedModuleCount = 0 
      let resume = []
      let index=[]
      let resumeTitle=[]

      moduleData.map((module,i) =>{
        if(module.completed_users.includes(user_id)){
          completedModuleCount++ }
          else{
            resume.push(module._id) 
            index.push(i)
            resumeTitle.push(module.title)
          }
        })  
        setResumeState({state:resume[0],index:index[0],resumeTitle:resumeTitle[0]}) 
        if (completedModuleCount > 0) {
          const value = (completedModuleCount / moduleData.length) * 100;
          setProgress(Math.floor(value)); 
          if (Math.floor(value) !== progressData) { 
            await axiosInstance.patch('/update-progress', { order_id, progress: Math.floor(value) }); 
          }
        }
    }

  useEffect(()=>{
    handleProgress()
  },[])


  const DropdownIcon =()=> (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 hover:scale-125"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
        fillRule="evenodd"
        d="M3.293 6.293a1 1 0 011.414 0L10 11.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
        clipRule="evenodd"
        />
    </svg>
      );
    
    const DropupIcon =()=> (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 hover:scale-125"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
        fillRule="evenodd"
        d="M16.707 13.293a1 1 0 01-1.414 1.414L10 10.414l-5.293 5.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6z"
        clipRule="evenodd"
        />
    </svg>
    );

  return (
    <>
    <div className='w-full h-auto border animate-fade-in border-gray-500 rounded-lg p-3 my-2 bg-slate-50'>
            <div className='flex justify-between'>
                <div className='h-full w-5/6 py-1'>
                    <p className='text-sm font-poppins'>Course</p>
                    <p className='ml-3 text-2xl font-poppins font-bold'>{courseData?.title}</p>
                </div>
                <div onClick={()=>setDropDown(!dropDown)} className='w-1/6 h-full hover:scale-125 flex justify-center items-center py-4'>
                    <div className='border p-1 rounded cursor-pointer'>
                    {dropDown? <DropupIcon/> : <DropdownIcon/>}
                    </div>
                </div>
            </div>
          
           { dropDown &&
            <div className='w-full h-auto border rounded border-gray-600 border-spacing-4  p-4 bg-white my-2 transition duration-300 delay-150 ' >
                {
                 moduleData.map((module, index) => {
                  next_module_id = index+1 > moduleData.length-1 ? 'completed' : moduleData[index+1]._id
                   return (<ul key={module._id} >
                      <li>
                        <div className="flex justify-between border p-2 w-full my-1 bg-slate-200 rounded-lg">
                            <div className="font-poppins font-medium p-2">
                              MODULE-{index + 1} : {module.title}
                            </div>
                          { index === 0 && !module.completed_users.includes(user_id) && 
                            <div onClick={()=>navigate('/userpanel/watch',{state :{state : module._id,index,next_module_id : next_module_id}})} className="my-1 hover:scale-125">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                            </div> }
                          { index === 0 && module.completed_users.includes(user_id) &&
                            <div onClick={()=>navigate('/userpanel/watch',{state :{state : module._id,index,next_module_id : next_module_id}})} className="my-1 hover:scale-125">
                             <img className='w-8 h-8' src={successIcom} alt="" />
                            </div> }
                          { index > 0 && !module.completed_users.includes(user_id) && moduleData[index-1].completed_users.includes(user_id) &&
                            <div onClick={()=>navigate('/userpanel/watch',{state :{state : module._id,index,next_module_id : next_module_id}})} className="my-1 hover:scale-125">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            </div> }
                          { index > 0 && module.completed_users.includes(user_id) && moduleData[index-1].completed_users.includes(user_id) &&
                            <div onClick={()=>navigate('/userpanel/watch',{state :{state : module._id,index,next_module_id : next_module_id}})} className="my-1 hover:scale-125">
                             <img className='w-8 h-8' src={successIcom} alt="" />
                            </div> }
                          { index > 0 && !moduleData[index-1].completed_users.includes(user_id) && 
                              <div className='my-1 hover:scale-125'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-75">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div> }
                        </div>
                      </li>
                    </ul>)
                  })}
            </div> 
            }
            <div className="bg-gray-300 rounded-full h-2.5 mb-4 w-5/6 flex ml-3">
                <div className="bg-green-500 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
            </div>
            <div className='flex justify-between py-3 px-4'>
              { typeof(resumeState?.state)!=='undefined' ? 
                <div className='text-md font-semibold text-red-700 flex'>MODULE-{resumeState.index} :{resumeState?.resumeTitle ? <p className='text-black'>{resumeState.resumeTitle}</p>: ''}</div>
              : 
              <div className='text-lg font-bold text-green-500' >Congratulations!</div> }
            <div className='w-3/6 h-full flex justify-end '>
            { typeof(resumeState?.state)!=='undefined' ? 
                <div onClick={()=>navigate('/userpanel/watch',{state :{
                  ...resumeState,
                  next_module_id : next_module_id}})} className='p-2 rounded px-3 cursor-pointer hover:bg-green-600 bg-green-500 text-white'>Resume Learning</div>
            : 
            <div className='p-2 rounded px-3 cursor-pointer hover:bg-green-600 bg-green-500 text-white'>Completed</div>
              }
           </div>
        </div>
    </div>
    </>
  )
}

export default Trial
