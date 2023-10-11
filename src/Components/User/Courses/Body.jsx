import React, { useState } from 'react'
import { Cards } from '../../Card'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
  } from "@material-tailwind/react";

const Body = ({loading,courseData}) => {
    
    return (
    <>
        <div className='grid md:grid-cols-3 gap-2 h-screen overflow-x-hidden overflow-y-scroll bg-slate-50'>
        {
            !loading && courseData.map((obj)=>{
               return <div className=' col-span-1 hover:scale-105'><Cards coursedata={obj}/></div>
            })
        }
        
        {
          loading && [...Array(4)].map((obj,i)=>{
               return (
                <Card key={i} className="w-auto mx-1 my-2">
                 <CardHeader shadow={false} floated={false} className="h-56">
                    <div className='w-full h-full animate-pulse bg-slate-300'>
                    </div>
                    </CardHeader>
                    <CardBody>
                    <div className='w-full h-2 animate-pulse bg-slate-300'>  </div>
                    <div className='w-full h-2 animate-pulse bg-slate-300'>  </div>
                    </CardBody>
                    <div className="w-full flex justify-center">
                    </div>
                    <CardFooter className="pt-0 ">
                    <div className='w-full h-full rounded-lg py-3 animate-pulse bg-slate-300'>  </div>
                   
                    <Button
                    className="text-right underline text-blue-800 bg-blue-gray-900/10  
                        shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none
                        active:scale-100">
                    </Button>
                </CardFooter>
                </Card>
               )
            })
        }
        </div>
    </>
  )
}

 export default Body
