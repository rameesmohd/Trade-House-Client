import React, { useState } from 'react'


const Trial = ({courseData,moduleData}) => {
   const [dropDown,setDropDown] = useState(false)

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
            <div className='w-full h-auto border rounded border-gray-600 border-spacing-4  p-4 bg-white my-2 transition'>
                {
                   moduleData.map((obj, index) => (
                    <ul
                      key={obj._id}
                    >
                      <li>
                        <div className="flex justify-between border p-2 w-full bg-white">
                          <div className="font-poppins font-medium p-2">
                            MODULE-{index + 1} : {obj.title}
                          </div>
                          <div className="my-1 hover:scale-125">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path
                                stroke-linecap="round"
                                strokeLinejoin="round"
                                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </li>
                    </ul>
                    ))
                }
                {/* <ul>
                    <li>
                        <div className='flex justify-between border p-2 w-full  bg-white'>
                        <div className='font-poppins font-medium  p-2 '>
                            MODULE-1 :   bnadkfhbdkfg
                        </div>
                        <div className='my-1 hover:scale-125'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round"  strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        </div>
                    </li>
                    <li>
                        <div className='flex justify-between border p-2 w-full'>
                        <div className='font-poppins font-medium opacity-75 p-2'>
                            MODULE-1 :   bnadkfhbdkfg
                        </div>
                        <div className='my-1 hover:scale-125'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 opacity-75">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        </div>
                        </div>
                    </li>

                </ul> */}
            </div> }
            <div class="w-full bg-gray-300 rounded-full h-2.5 mb-4">
                <div class="bg-green-500 h-2.5 rounded-full" style={{width: '45%'}}></div>
            </div>
            <div className='flex justify-between py-3 px-4'>
                <div className='text-md font-semibold'>MODULE-1 :{'testestest'}</div>
            <div className='w-2/6 h-full flex justify-end '>
                <div className='p-2 rounded px-3 cursor-pointer hover:bg-green-600 bg-green-500 text-white'>Resume Learning</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Trial
