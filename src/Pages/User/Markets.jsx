import React from 'react'
import Navbar from '../../Components/User/Navbar'
import Footer from '../../Components/User/Footer'
import PageBody from '../../Components/User/Markets/PageBody'

const Markets = () => {
  return (
    <div className='lg:container mx-auto'>
        <Navbar/>
        <PageBody/>
        <Footer/>
    </div>
  )
}

export default Markets
