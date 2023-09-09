import React from 'react';

const Loading = () => {

  return (
    <div>
        <div className='flex w-full h-full justify-center items-center bg-transparent fixed z-10 overflow-y-auto inset-0 backdrop-blur-sm '>
        <div class="flex justify-center items-center">
            <div class="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
            </div>
        </div>

        <div className='flex justify-center ml-2'>
            <p className='text-slate-500 text-sm'>Loading......</p>
        </div>
        </div>
    </div>
  );
};

export default Loading;
