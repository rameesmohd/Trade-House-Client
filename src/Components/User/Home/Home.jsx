import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {clientLogout} from '../../../Redux/ClientAuth'
import { useNavigate } from 'react-router-dom'
import img from '../../../assets/p10-bg1.png'
import img2 from '../../../assets/55e84af7c61c5ef6a6f15c2c7f7a8578.png'
import img3 from '../../../assets/fa5efcff953089b225cbdb8a122d116a.png'

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut=()=>{
        dispatch(clientLogout())
        navigate('/login')
    }

  return (
    <>   
    {/* <div className='w-full h-[430px] bg-slate-100 flex justify-center'>
      <div className='grid grid-cols-1 px-10 overflow-hidden lg:grid-cols-2 '>
          <div className='flex justify-end'>
              <img className='object-cover' src={img3} alt="" />
          </div>
           <div className='py-8 pl-16 text-left pr-52'>
              <h1 className='text-3xl'>Let us help you become a Successful Trader</h1>
              <p className='space-x-3 text-lg'>
              Our tutors  will walk you through the different steps to
              make a trade profitable. With each trade being different, you have to
              understand how the market works to select a performing trade. 
              This is exactly what you will learn with Trade House
              </p>
          </div> 
      </div>

    </div> */}
    <div>
      <div className="container px-8 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <div className="mb-12 lg:mb-0 xl:mr-14">
            <img className="inline" src={img3} alt="alternative" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="xl:mt-12">
          <h1 className='mb-6 font-bold md:text-2xl lg:text-3xl'>Let us help you become a Successful Trader</h1>
            {/* <h2 className="">Instant results for the marketing department</h2> */}
            <ul className="space-y-2 list mb-7">
              <li className="flex">
                <i className="fas fa-chevron-right"></i>
                <div>Features that will help you and your marketers</div>
              </li>
              <li className="flex">
                <i className="fas fa-chevron-right"></i>
                <div>Smooth learning curve due to the knowledge base</div>
              </li>
              <li className="flex">
                <i className="fas fa-chevron-right"></i>
                <div>Ready out-of-the-box with minor setup settings</div>
              </li>
            </ul>
            <a className="btn-solid-reg popup-with-move-anim mr-1.5" href="#details-lightbox">Lightbox</a>
            <a className="btn-outline-reg" href="article.html">Details</a>
          </div>
        </div>
      </div>
    </div>
    

    <div className="container px-8 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-12">
        <div className="lg:col-span-7">
        <div class="text-box mb-12 ">
                    <h3 class="mb-2 font-bold text-3xl">Visitors love a beautiful and efficient website</h3>
                    <p class="mb-4"> All designers, developers and tech-savvy people will be able to customize this template with basic web coding skills. Among the features you will find details lightbox for more details information, tabbed content for feature details, video lightbox, card slider for testimonials, statistics numbers, image slider for customer logos, dropdown navigation and useful extra pages for article details, terms.</p>
        </div>
      </div>
    </div>
      
        <h1 className='text-2xl text-zinc-800'>User Home</h1>
      <button onClick={()=>logOut()}>Logout</button>
    </>
  )
}

export default Home
