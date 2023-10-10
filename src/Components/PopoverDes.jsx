import React, { useState } from 'react';

const PopoverDes = ({Description}) => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  return (
    <div>
      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <button
          onClick={togglePopover}
          type="button"
        >
          <svg
            className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
             <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Show information</span>
        </button>
      </p>
      {/* Add a conditional class to the popover based on visibility */}

      <div
        data-popover
        id="popover-description"
        role="tooltip"
        className={`absolute z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm ${
          isPopoverVisible ? 'opacity-100' : 'opacity-0 invisible'
        } w-54 h-auto text-sm p-2`}
      >
        {/* Popover content */}
        {Description}
      </div>
    </div>
  );
};

export default PopoverDes;
