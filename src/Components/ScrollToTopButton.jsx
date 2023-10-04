import React from 'react'
import {SlArrowUp} from 'react-icons/sl'


const ScrollToTopButton = () => {
  return (
    <div className="fixed z-50 h-12 w-12 text-center rounded-full bg-slate-300 right-2 bottom-2 animate-bounce">
    <button className=" text-lg font-mono text-gray-900 h-full rounded space-x-2"
    onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }} ><SlArrowUp className="text-xl text-black"/></button>
    </div>
  )
}

export default ScrollToTopButton
