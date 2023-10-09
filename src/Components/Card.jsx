import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
  import Rating from './RatingStar'
  import { useNavigate } from "react-router-dom";
  import StarRating from '../Components/User/CourseDetails/Star'
import { useEffect } from "react";
import { useState } from "react";
   
export function Cards({coursedata}) {
  const navigate = useNavigate()
  const [totalRating,setTotalRating] = useState(0)

  const calulateRating =()=>{
    let totalNumberofRating = coursedata.user_ratings.length

   if(totalNumberofRating){ let data = [1,2,3,4,5].map((star,i)=>
    coursedata.user_ratings.filter((value,i)=>value.rating===star).length)

    let weightedSum = data.reduce((total,value,index)=>total+value*(index+1),0)
    let total = weightedSum/totalNumberofRating
    setTotalRating(total)
  }}

  useEffect(()=>{
    calulateRating()
  },[])

  console.log(totalRating);
  
    return (
      <Card className="w-auto mx-1 my-2">
        <CardHeader shadow={false} floated={false} className="h-44">
          <img
            src={coursedata?.banner}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="text-gray-500 ">
              By {coursedata?.tutor?.firstName+' '+coursedata?.tutor?.lastName}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
             {/* <Rating/> */}
             <StarRating size={'text-2xl'} rating={totalRating} disable={true}/>
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="text-lg font-poppins"
          >
            {coursedata?.title}
          </Typography>
          <h2 className="text-sm font-poppins text-slate-500 ">
              In {coursedata?.category?.category}
          </h2>
        </CardBody>
        <div className="w-full flex justify-center">
            <hr className="w-5/6" />
        </div>
        <CardFooter className="pt-0 flex justify-between items-center">
            <h1>₹{ coursedata?.price ? coursedata.price : '0.00' }</h1>
          <div
            ripple={false}
            fullWidth={true}
            onClick={()=>navigate('/course-details',{state : coursedata})}
            className="text-right underline font-poppins cursor-pointer text-blue-800 bg-blue-gray-900/10 flex items-center  
                shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none
                active:scale-100">
           View Details 
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </CardFooter>
      </Card>
    );
  }