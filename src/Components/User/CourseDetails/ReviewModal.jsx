import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import StarRating from './Star'

const ReviewModal = ({showModal,addReview,success}) => {
    const feedbackRef = useRef()
    const titleRef = useRef()
    const [error,setError] = useState('')
    const [rating,setRating] = useState(0)
    const [count,setCount] = useState(3)
    
    const handleFunction=()=>{
        let feedback = feedbackRef.current.value
      
        if(rating < 1){
            setError('Please give rating')
        }else if(!feedback.length){
            setError('Please enter your feedback')
        }
        else{
            addReview(rating,feedback)
        }
    }

    useEffect(()=>{
        if(success){
            setTimeout(() => {
                if(count > 1){
                    setCount((prev)=>(prev-1))
                }else{
                    showModal(false)
                }
            }, 1000);
        }
    },[success,count])

  return (
    <div>
<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={()=>showModal(false)}></div>
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className=" bg-white rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                        Add Review
                    </h3>
                    <button type="button" onClick={()=>showModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {!success &&<p>Rate this course now</p>}
                <StarRating setRating={setRating} rating={rating} size={'text-5xl'}/>

                {success && <><div class="flex items-center justify-center w-96 pb-3">
                <div>
                    <div class="flex flex-col items-center space-y-2 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 class="text-2xl font-bold">Thank You !</h1>
                    <p>Thank you for your feedback.</p>
                    </div>
                </div>
                </div>
                <div className='pb-6 text-font text-xl animate-pulse text-gray-500'>{count}</div>
                </>
                }

                {!success && <div className="p-6 ">
                    
                    <p className="text-sm leading-relaxed text-start text-gray-500 ">
                        Please enter your review
                    </p>
                    <textarea ref={feedbackRef} className='rounded-lg' name="" id="" cols="40" rows="3" required></textarea>
                    {error ? <p className="text-xs text-start leading-relaxed text-red-500 ">{error}</p> : ''}
                </div>}
          
                {!success && <div className="flex items-center justify-end p-2  space-x-2 border-t border-gray-200 rounded-b">
                    <button onClick={()=>handleFunction()}  data-modal-hide="staticModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center ">Submit</button>
                    <button onClick={()=>showModal(false)} data-modal-hide="staticModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2 hover:text-gray-900 focus:z-10 ">Back</button>
                </div>}

             
            </div>
            
        </div>
        </div>

    </div>
    </div>
  )
}

export default ReviewModal


