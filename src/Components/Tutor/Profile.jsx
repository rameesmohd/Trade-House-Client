import React from 'react';

const TutorProfile = () => (


  <div className="bg-gray-100">
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <div className="col-span-4 sm:col-span-3">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/men/94.jpg"
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                alt="User"
              />
              <h1 className="text-xl font-bold">John Doe</h1>
              <p className="text-gray-600">Full time trader</p>
              <SocialMediaLinks />
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <div className="flex flex-col">
              <span className="text-gray-600 uppercase font-bold tracking-wider mb-2">Skills</span>
              <ul>
             
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-9">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
              tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit
              egestas suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla
              vulputate pharetra tellus, in luctus risus rhoncus id.
            </p>
            <h3 className="font-semibold text-center mt-3 -mb-2">Find me on</h3>
            <SocialMediaLinks />
            <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
            <ExperienceItem
              title="Crypto trader"
              company="ABC Company"
              date="2017 - 2019"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit."
            />
            {/* Add more ExperienceItem components for other experiences */}
          </div>
        </div>
      </div>
    </div>
  </div>
);
const SocialMediaLinks = () => (
  <div className="flex justify-center items-center gap-6 my-6">
    <a
      className="text-gray-700 hover:text-orange-600"
      aria-label="Visit TrendyMinds LinkedIn"
      href="#"
      target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
      </svg>
    </a>
   
  </div>
);

const ExperienceItem = ({ title, company, date, description }) => (
  <div className="mb-6">
    <div className="flex justify-between">
      <span className="text-gray-600 font-bold">{title}</span>
      <p>
        <span className="text-gray-600 mr-2">{`at ${company}`}</span>
        <span className="text-gray-600">{date}</span>
      </p>
    </div>
    <p className="mt-2">{description}</p>
  </div>
);

export default TutorProfile;
