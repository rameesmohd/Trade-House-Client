import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Sidebar from '../../Components/Tutor/Sidebar'
import TutorProfile from '../../Components/Tutor/Profile'

const Profile = () => {
  return (
    <div className='pt-24 md:pt-0 md:pl-64'>
    {/* <Navbar/> */}
    <Sidebar/>
    <TutorProfile/>
    </div>
  )
}

export default Profile
