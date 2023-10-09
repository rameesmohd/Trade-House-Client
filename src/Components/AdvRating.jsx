import React from 'react';
import StarRating from './User/CourseDetails/Star';
import { useEffect } from 'react';
import { useState } from 'react';

function RatingStats({user_ratings}) {
  const [totalRating,setTotalRating] = useState(0)
  const [ratings,setRatings ] = useState([])

  useEffect(()=>{
      let totalNumberofRating = user_ratings.length
      let data = [1,2,3,4,5].map((star,i)=>user_ratings.filter((value,i)=>value.rating===star).length )
      let ratings = data.map((value,i)=>{return {stars : `${5-i} stars`,numberofrating : totalNumberofRating ? (value/totalNumberofRating)*100 : '0'}})
      let totalRating =totalNumberofRating &&  data.reduce((total,value,index)=>total+value*index+1)/totalNumberofRating 
      setRatings(ratings)
      setTotalRating(totalRating)
  },[])
  

  return (
    <>
    <div className='flex items-center '>
    <p className='mx-2'>Total Rating</p>
    <StarRating rating={totalRating} size={'text-2xl'} disable={true}/>
    </div>
    <div>
      {ratings.map((rating, index) => (
        <div className="flex items-center mt-4" key={index}>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {rating?.stars }
          </a>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
            <div
              className="h-5 bg-yellow-300 rounded"
              style={{ width: `${rating?.numberofrating}` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {Math.floor(rating?.numberofrating)}%
          </span>
        </div>
      ))}
    </div>
    </>
  );
}

export default RatingStats;
