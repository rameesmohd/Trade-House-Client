import React, { useState } from 'react'
import img from '../../../assets/IMAGE.png'
import Loading from '../../Loading'
import Chart from './Charts'
import userAxios from '../../../Axios/UserAxios'
import { useEffect } from 'react'



const PageBody = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const axiosInstance = userAxios()

  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '50',
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': 'cb9a6ef3b0msh3a3d657a97c7524p1061f5jsn87ee2566a49c',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

//   const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://forex-factory-scraper1.p.rapidapi.com/get_real_time_calendar_details',
//   params: {
//     calendar: 'Forex',
//     year: '2023',
//     month: '9',
//     day: '8'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'cb9a6ef3b0msh3a3d657a97c7524p1061f5jsn87ee2566a49c',
//     'X-RapidAPI-Host': 'forex-factory-scraper1.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://currency-exchange.p.rapidapi.com/exchange',
//   params: {
//     from: 'EUR',
//     to: 'USD',
//     q: '1.0'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'cb9a6ef3b0msh3a3d657a97c7524p1061f5jsn87ee2566a49c',
//     'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }
  

// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://real-time-quotes1.p.rapidapi.com/api/v1/realtime/forex',
//   params: {
//     source: 'EUR,INR',
//     target: 'USD'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'cb9a6ef3b0msh3a3d657a97c7524p1061f5jsn87ee2566a49c',
//     'X-RapidAPI-Host': 'real-time-quotes1.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }
  
  const fetch=async()=>{
    try {
      const response = await axiosInstance.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    fetch()
  })

  return (
  <div className='pt-20'>
   <div className='text-black w-full md:container mx-auto pt-5'>
    {/* Carousel */}
      <div className="carousel w-full h-[36rem] overflow-hidden">
      {/* <div id="slide1" className="carousel-item relative w-full">
      <div className='w-full grid md:grid-cols-2 p-5'>
              <div className='col-span-1 h-full bg-slate-50 p-16'>
                <h1 className='text-3xl font-poppins my-2'>Forex Trading</h1>
                <p>
                There is a reason why the foreign exchange or forex is the largest financial market in the world; 
                it empowers everyone to seize trading opportunities on currency fluctuations. Go short or long on Forex CFDs,
                take advantage of the superior trading conditions offered by HFM and become an active forex trader in the global markets.
                </p>
                <h1 className='text-lg font-semibold font-poppins my-2'> What Is the Forex Market?</h1>
                    <p className='font-poppins'>
                    The forex market allows participants, such as banks and individuals, 
                    to buy, sell or exchange currencies for both hedging and speculative purposes.
                    The foreign exchange (forex) market is the largest financial market in the world and is made up of banks,
                      commercial companies, central banks, investment management firms, hedge funds, 
                      retail forex brokers, and investors.
                    </p>
              </div>
              <div className='col-span-1 w-full col h-full flex items-center overflow-hidden'>
                    <img src={img} alt="" className='object-cover'/>
              </div>
          </div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
      </div> 

      <div id="slide2" className="carousel-item relative w-full">
      <div className='w-full grid md:grid-cols-2 p-5'>
                  <div className='col-span-1 h-full bg-slate-50 p-16'>
                    <h1 className='text-3xl font-poppins my-2'>Stock Trading</h1>
                    <p>
                    The term stock market refers to several exchanges in which shares of publicly held companies are bought and sold. 
                    Such financial activities are conducted through formal exchanges and via over-the-counter (OTC) marketplaces that operate under a defined set of regulations. 
                    </p>
                    <h1 className='text-lg font-semibold font-poppins my-2'> What Is the Stock Market?</h1>
                        <p className='font-poppins'>
                        Stock trading involves buying and selling stocks frequently in an attempt to time the market. 
                        The goal of stock traders is to capitalize on short-term market events to sell stocks for a profit,
                        or buy stocks at a low. Some stock traders are day traders, which means they buy and sell several times throughout the day
                        </p>
                  </div>
                  <div className='col-span-1 h-full w-5/6 overflow-hidden'>
                        <img className='object-cover' src='https://www.forbes.com/advisor/wp-content/uploads/2023/03/How_Stock_Trading_Works.jpg' alt="" />
                  </div>
              </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a> 
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>  */}

      <div id="slide3" className="carousel-item relative w-full">
      <div className='w-full grid md:grid-cols-2 p-5'>
                  <div className='col-span-1 h-full bg-slate-50 p-10'>
                    <h1 className='text-3xl font-poppins my-2'>Crypto Trading</h1>
                    <p>
                    Cryptocurrency markets are decentralised, which means they are not issued or backed by a central authority such as a government. 
                    Instead, they run across a network of computers. However, cryptocurrencies can be bought and sold via exchanges and stored in ‘wallets’ .

                    </p>
                    <h1 className='text-lg font-semibold font-poppins my-2'> What Is Crypto Currency</h1>
                        <p className='font-poppins'>
                        Cryptocurrency is a digital payment system that doesn't rely on banks to verify transactions.
                        It’s a peer-to-peer system that can enable anyone anywhere to send and receive payments. 
                        </p>
                  </div>
                  <div className='col-span-1 h-full w-5/6 mt-10'>
                        <img src={'https://static.vecteezy.com/system/resources/previews/004/845/276/non_2x/cryptocurrency-with-bitcoin-litecoin-and-ethereum-symbols-combination-of-coins-on-white-background-free-photo.jpg'} alt="" />
                  </div>
              </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a> 
          <a href="#slide4" className="btn btn-circle">❯</a>
        </div>
      </div> 

      <div id="slide4" className="carousel-item relative w-full">
      <div className='w-full grid md:grid-cols-2 p-5'>
                  <div className='col-span-1 h-full bg-slate-50 p-10'>
                    <h1 className='text-3xl font-poppins my-2'>Commodity Trading</h1>
                    <p>
                  Commodity trading is where various commodities and their derivatives products are bought and sold.
              A commodity is any raw material or primary agricultural product that can be bought or sold, whether wheat, gold, or crude oil, among many others.
                    </p>
                    <h1 className='text-lg font-semibold font-poppins my-2'> What Is the Forex Market?</h1>
                        <p className='font-poppins'>
                        A commodity market is a market that trades in the primary economic sector rather than manufactured products,
                        such as cocoa, fruit and sugar. Hard commodities are mined, such as gold and oil. 
                        Futures contracts are the oldest way of investing in commodities.
                        </p>
                  </div>
                  <div className='col-span-1 h-full w-5/6 flex items-center'>
                        <img src='https://www.ajmeraxchange.co.in/files/blogimages/webp/63723503625179672111%20nov%202019.webp' alt="" />
                  </div>
              </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">❮</a> 
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>

    <div className='w-full h-96 my-2 grid grid-cols-2'>
      <div className=''>
                    lkdfgl
      </div>
      <div className='col-span-1 h-full w-full flex justify-center items-center px-10 '>
            <div className='card bg-white w-4/5 h-4/5 shadow-2xl'>
            <h2 className='text-center font-poppins text-lg font-semibold m-4 underline'>Get Live Quote Price</h2>
                  <div className='w-full flex justify-between px-10 my-3'>
                    <div>
                      <div className='font-poppins text-lg font-semibold'>Base Currecy</div>
                      <input type="text" className='border rounded-xl' />
                    </div>
                    <div>
                      <div className='font-poppins text-lg font-semibold rounded-xl'>Quote Currecy</div>
                      <input type="text" className='border rounded-xl' />
                    </div>
                  </div>
            <div className='w-full flex justify-center'>
              <button className='border p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl'>Get Live Price</button>
            </div>
            <div className='h-full w-full flex justify-center items-center'>
              <div>
                    <p className='flex'>1<p className='text-red-700 mx-1 font-semibold'>EUR</p>equals</p>
                    <h2 className='text-red-600 font-poppins text-center font-bold text-4xl'>1.52 USD</h2>
              </div>
            </div>
            </div>
      </div>
    </div>

    {/* table */}
    <div>      
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Color
                                <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
          </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Category
                                <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
          </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Price
                                <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
          </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td class="px-6 py-4">
                            Silver
                        </td>
                        <td class="px-6 py-4">
                            Laptop
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Microsoft Surface Pro
                        </th>
                        <td class="px-6 py-4">
                            White
                        </td>
                        <td class="px-6 py-4">
                            Laptop PC
                        </td>
                        <td class="px-6 py-4">
                            $1999
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

    {/* Chart */}
    <div className='w-full h-10 text-3xl text-center my-4'>Enroll Markets</div>
    <div className='w-full my-10'>
          <Chart/>
    </div>
  </div>
</div>
  )
}

export default PageBody



