import React, { useState } from 'react'
import { useRef } from 'react'

const RefundModal = ({title,showModal,approveRefund}) => {
   const feedbackRef = useRef()
   const [error,setError] = useState('')
   const handleRefund=()=>{
    const feedback = feedbackRef.current.value
    if(!feedback){
        setError('Please enter your feedback')
    }else{
        approveRefund(feedback)
        showModal(false)
    }
   }

  return (
    <>
      <div id="staticModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" className="backdrop-blur-sm fixed flex justify-center items-center right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                        Cancel Purchase
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <p className="text-base leading-relaxed text-red-500  ">
                        Are you sure you want to cancel the purchase of Course {title}?
                    </p>
                    <p className="text-sm leading-relaxed text-gray-500 ">
                        Please enter your feedback and resons for the cancellation?
                    </p>
                    <textarea ref={feedbackRef} className='rounded-lg' name="" id="" cols="60" rows="3" required></textarea>
                    {error ? <p className="text-sm leading-relaxed text-gray-500 ">{error}</p> : ''}
                </div>
                <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
                    <button onClick={handleRefund}  data-modal-hide="staticModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Refund</button>
                    <button onClick={()=>showModal(false)} data-modal-hide="staticModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">Back</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default RefundModal
