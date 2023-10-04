import React, { useState } from 'react';

const SortDropdown = ({role,options,handle}) => {
  const [openSort, setOpenSort] = useState(false);
  const [sortType, setSortType] = useState(role);

  return (
    <div className=" flex justify-center items-center">
      <div className="w-full flex justify-center">
        <div className="relative">
          <button onClick={() => setOpenSort(!openSort)} className="flex text-black bg-gray-200 items-center justify-start w-40 py-2 mt-2 text-sm  text-left bg-transparent rounded-lg">
            <span>{sortType}</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className={`w-4 h-4 transition-transform duration-200 transform ${openSort ? 'rotate-180' : 'rotate-0'}`}
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {openSort && (
            <div className="absolute z-50 w-full origin-top-right">
              <div className="px-2 pt-2 pb-2 bg-white rounded-md shadow-lg">
                {
                  options.map((value)=>
                    <a onClick={() => handle(value)} className="flex flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200 text-sm" href="#">
                      <div>
                        <p >{value}</p>
                      </div>
                    </a>
                  )
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
