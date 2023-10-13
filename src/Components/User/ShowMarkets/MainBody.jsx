import React, { useRef, useState } from 'react'
import img from '../../../assets/IMAGE.png'
import Chart from './Charts'
import userAxios from '../../../Axios/UserAxios'
import {Spinner} from '@material-tailwind/react'
import { useEffect } from 'react'
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { toast } from 'react-toastify'
import ScrollToTopButton from '../../ScrollToTopButton'

const MainBody = () => {
  const axiosInstance = userAxios()
  const [loading,setLoading] = useState(false)
  const [cryptoData,setCryptoData] = useState([])
  const [cryptoPagination,setCryptoPagination] = useState(0)
  const [coinStats,setCoinStates] = useState({})
  const baseRef = useRef()
  const quoteRef = useRef()
  const [livePrice,setLivePrice] = useState('1.0546')
  const [base,setBase] = useState('EUR')
  const [quote,setQuote] = useState('USD')
  const [economicCalender,setEconomicCalender] = useState([])
  const [todayDate,setTodayDate]= useState()
  const [activeSlide, setActiveSlide] = useState(1);
  const [modifiedQuotesData,setModifiedData] = useState([])
  const [apiLoadings,setApiLoading] = useState({
    majorCurr : true,
    ecnomicCalender : true,
    cryptoPrice : true
  })
console.log(economicCalender,'economicCalender');
const goToPreviousSlide = () => {
  setActiveSlide(activeSlide === 1 ? 4 : activeSlide - 1);
};

const goToNextSlide = () => {
  setActiveSlide(activeSlide === 4 ? 1 : activeSlide + 1);
};

const fetchcalenderData=async()=>{
    await axiosInstance.get('/ecnomic-calender').then((res)=>{
      setEconomicCalender(res.data.data.forexcalender)
      setApiLoading(prevState => ({ ...prevState, ecnomicCalender: false }));
    })
}

const handleLivePriceFunction=()=>{
  const Base = baseRef.current.value
  const Quote = quoteRef.current.value
  const upperQuote = Quote.toUpperCase()
  const upperBase = Base.toUpperCase()
  if(upperQuote && upperBase){
    setBase(upperBase)
    setQuote(upperQuote)
    calculateLiveFxPrice(upperBase,upperQuote)
  }else{
    toast.error('Please enter base and quote..')
  }
}

const calculateLiveFxPrice=async(base,quote)=>{
  console.log(base,quote);
    const options = {
      method: 'GET',
      url: 'https://currency-exchange.p.rapidapi.com/exchange',
      params: {
        from: base,
        to: quote,
        q: '1.0'
      },
    headers: {
      'X-RapidAPI-Key': 'cb9a6ef3b0msh3a3d657a97c7524p1061f5jsn87ee2566a49c',
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
  }
  setLoading(true)

  await axiosInstance.request(options).then((res)=>{
    const number = res.data
    const roundedNumber = number.toFixed(4);
    setLivePrice(roundedNumber)
    setLoading(false)
  }).catch((error)=>{
      setLivePrice('Invalid')
      setLoading(false)
      console.log(error);
  })
}

const fetchCryptoData=async()=>{
  const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '30',
      skip : cryptoData.length,
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': 'cb9a6ef3b0msh3a3d657a97c7524p1061f5jsn87ee2566a49c',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };
    try {
      const response = await axiosInstance.request(options);
      setCryptoData(response.data.data.coins)
      setCoinStates(response.data.data.stats)
      setApiLoading(prevState => ({ ...prevState, cryptoPrice: false }));
    } catch (error) {
      console.error(error);
  }
}

const TABLE_HEAD = ["Rank","Name", "Price", "24 Change", "24 Volume", "Market Cap","7D Chart"]
const TABLE_ROWS = cryptoData.map((value) => {
    return {
      rank:value.rank,
      img: value.iconUrl,
      symbol: value.symbol,
      name: value.name,
      price: Number(value.price).toFixed(2), 
      change: value.change,
      marketCap: value.marketCap,
      dayVolume: value['24hVolume'],
      sparkline:value.sparkline
    }
});

const SparklineChart = ({ data }) => {
  return (
    <div>
      <Sparklines data={data} limit={20} width={200} height={50}>
        <SparklinesLine color="blue" />
      </Sparklines>
    </div>
  );
}

const fetchLiveCurrencyData=async()=>{
    //API : https://currencylayer.com/
    const targetCurrencies = 'EUR,GBP,CAD,JPY,AUD,CHF,CNY,SEK,NZD,MXN'
    fetch(`http://apilayer.net/api/live?access_key=8f81e2e34426e4884e452d86e4d32d21&currencies=${targetCurrencies}&source=USD&format=1`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const dataArray = Object.entries(data.quotes).map(([currency, price]) => ({
          currency,
          price
        }));
        const modifiedData = []
        for (let i = 0; i < dataArray.length; i += 2) {
          if (i + 1 < dataArray.length) {
            modifiedData.push([dataArray[i], dataArray[i + 1]]);
          } else {
            modifiedData.push([dataArray[i]]);
          }
        }
        setModifiedData(modifiedData)
        setApiLoading(prevState => ({ ...prevState, majorCurr: false }));
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setTodayDate(formattedDate);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(()=>{
    fetchcalenderData()
    fetchCryptoData()
    fetchLiveCurrencyData()
  },[])

  return (
  <div className='pt-20'>
   <div className='text-black w-full md:container mx-auto pt-5'>
    {/* calculator */}
    <div className='w-full md:mt-8 md:grid md:grid-cols-2 bg-black p-3'>
      <div className='col-span-1 py-5'>
          <img src="https://tradermade.com/images/Forex-hero.webp" alt=""/>
      </div>
      <div className='col-span-1 h-full w-full flex justify-center items-center px-10 '>
            <div className='card bg-white p-6 md:w-full shadow-2xl'>
            <h2 className='text-center font-poppins text-lg font-semibold m-4 underline'>Get Live Quote Price</h2>
                  <div className='w-full justify-between px-10 my-3 grid md:flex'>
                    <div>
                      <div className='font-poppins md:text-lg font-semibold'>Base Currecy</div>
                      <input ref={baseRef} type="text" className='border rounded-xl' placeholder='eg:EUR' />
                    </div>
                    <div>
                      <div className='font-poppins md:text-lg font-semibold rounded-xl'>Quote Currecy</div>
                      <input ref={quoteRef} type="text" className='border rounded-xl' placeholder='eg:USD' />
                    </div>
                </div>
            <div className='w-full flex justify-center'>
              <button onClick={()=>handleLivePriceFunction()} className='border p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm'>Get Live Price</button>
            </div>
            <div className='h-full w-full flex justify-center items-center'>
            { livePrice!=='Invalid' && !loading &&
              <div>
                    <p className='flex'>1<p className='text-red-700 mx-1 font-semibold'>{base}</p>equals</p>
                    <h2 className='text-red-600 font-poppins text-center font-bold text-4xl'>{livePrice} {quote}</h2>
              </div>
            }
            {
              livePrice==='Invalid' &&  !loading && <h2 className='text-red-600 font-poppins text-center font-bold text-2xl'>Invalid Inputs</h2>
            }
            {
              loading && <Spinner/>
            }
            </div> 
          </div>
      </div>
    </div>
    {/* fxLivePrices */}
      <div className='bg-black'>  
            <div className='text-white text-center'><p className='text-lg font-bold font-poppins'>MAJOR CURRENCY</p><p className='mb-2 font-poppins'>Live Prices</p></div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-white">
                <thead class="text-xs text-gray-700 uppercase dark:text-white font-semibold border">
                    <tr>
                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Currency
                        </th>
                        <th scope="col" class="px-6 py-3" >
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Currency
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price
                        </th>
                    </tr>
                </thead>
                {!apiLoadings.majorCurr && 
                <tbody>
                  {modifiedQuotesData.map((row, index) => (
                    <tr key={index}>
                      {row.map((item, subIndex) => (
                        <React.Fragment key={subIndex}>
                          <td className="px-6 py-3 font-semibold font-poppins bg-white text-black">{item.currency}</td>
                          <td className="px-6 py-3 font-bold text-red-500 bg-gray-200">{item.price}</td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>}
            </table>
              {apiLoadings.majorCurr && <div className='w-full flex justify-center p-10'><Spinner/></div>} 
        </div>
      </div>

    {/* Carousel */}
    <div className="carousel w-full overflow-hidden  md:h-[500px]">
      {/* Slide 1 */}
      <div id="slide1" className={`carousel-item relative w-full ${activeSlide === 1 ? 'block' : 'hidden'}`}>
        <div className="w-full grid md:grid-cols-2 p-5">
          <div className="col-span-1 h-full bg-slate-50 p-16">
            <h1 className="text-3xl font-poppins my-2">Forex Trading</h1>
            <p>
              There is a reason why the foreign exchange or forex is the largest financial market in the world;
              it empowers everyone to seize trading opportunities on currency fluctuations. Go short or long on Forex CFDs,
              take advantage of the superior trading conditions offered by HFM and become an active forex trader in the global markets.
            </p>
            <h1 className="text-lg font-semibold font-poppins my-2"> What Is the Forex Market?</h1>
            <p className="font-poppins">
              The forex market allows participants, such as banks and individuals,
              to buy, sell or exchange currencies for both hedging and speculative purposes.
              The foreign exchange (forex) market is the largest financial market in the world and is made up of banks,
              commercial companies, central banks, investment management firms, hedge funds,
              retail forex brokers, and investors.
            </p>
          </div>
          <div className="col-span-1 w-full col h-full flex items-center overflow-hidden ">
            <img src={img} alt="" className="object-cover" />
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            onClick={goToPreviousSlide}
            className={`btn btn-circle ${activeSlide === 1 ? '' : ''}`}
          >
            ❮
          </button>
          <button
            onClick={goToNextSlide}
            className={`btn btn-circle ${activeSlide === 4 ? 'hidden' : ''}`}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className={`carousel-item relative w-full ${activeSlide === 2 ? 'block' : 'hidden'}`}>
        <div className="w-full grid md:grid-cols-2 p-5">
          <div className="col-span-1 h-full bg-slate-50 p-16">
            <h1 className="text-3xl font-poppins my-2">Stock Trading</h1>
            <p>
              The term stock market refers to several exchanges in which shares of publicly held companies are bought and sold.
              Such financial activities are conducted through formal exchanges and via over-the-counter (OTC) marketplaces that operate under a defined set of regulations.
            </p>
            <h1 className="text-lg font-semibold font-poppins my-2"> What Is the Stock Market?</h1>
            <p className="font-poppins">
              Stock trading involves buying and selling stocks frequently in an attempt to time the market.
              The goal of stock traders is to capitalize on short-term market events to sell stocks for a profit,
              or buy stocks at a low. Some stock traders are day traders, which means they buy and sell several times throughout the day.
            </p>
          </div>
          <div className="col-span-1 h-full md:w-5/6 overflow-hidden">
            <img src="https://static.hfm.com/assets/hfappnew/websites/main/inside-pages/trading-instruments/stocks/images/new/stocks-header.png" alt="" className="object-cover" />
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            onClick={goToPreviousSlide}
            className={`btn btn-circle ${activeSlide === 1 ? 'hidden' : ''}`}
          >
            ❮
          </button>
          <button
            onClick={goToNextSlide}
            className={`btn btn-circle ${activeSlide === 2 ? '' : ''}`}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className={`carousel-item relative w-full ${activeSlide === 3 ? 'block' : 'hidden'}`}>
        <div className="w-full grid md:grid-cols-2 p-5">
          <div className="col-span-1 h-full bg-slate-50 p-16">
            <h1 className="text-3xl font-poppins my-2">Crypto Trading</h1>
            <p>
              Cryptocurrency markets are decentralised, which means they are not issued or backed by a central authority such as a government.
              Instead, they run across a network of computers. However, cryptocurrencies can be bought and sold via exchanges and stored in ‘wallets’.
            </p>
            <h1 className="text-lg font-semibold font-poppins my-2"> What Is Crypto Currency</h1>
            <p className="font-poppins">
              Cryptocurrency is a digital payment system that doesn't rely on banks to verify transactions.
              It’s a peer-to-peer system that can enable anyone anywhere to send and receive payments.
            </p>
          </div>
          <div className="col-span-1 h-full md:w-5/6 overflow-hidden flex items-center">
            <img src={'https://static.hfm.com/assets/hfappnew/websites/main/inside-pages/trading-instruments/cryptocurrencies/images/new/cryptos-header.png'} alt="" />
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <button
            onClick={goToPreviousSlide}
            className={`btn btn-circle ${activeSlide === 2 ? 'hidden' : ''}`}
          >
            ❮
          </button>
          <button
            onClick={goToNextSlide}
            className={`btn btn-circle ${activeSlide === 3 ? '' : ''}`}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slide 4 */}
      <div id="slide4" className={`carousel-item relative w-full ${activeSlide === 4 ? 'block' : 'hidden'}`}>
        <div className="w-full grid md:grid-cols-2 p-5">
          <div className="col-span-1 h-full bg-slate-50 p-16">
            <h1 className="text-3xl font-poppins my-2">Commodity Trading</h1>
            <p>
              Commodity trading is where various commodities and their derivatives products are bought and sold.
              A commodity is any raw material or primary agricultural product that can be bought or sold, whether wheat, gold, or crude oil, among many others.
            </p>
            <h1 className="text-lg font-semibold font-poppins my-2"> What Is the Forex Market?</h1>
            <p className="font-poppins">
              A commodity market is a market that trades in the primary economic sector rather than manufactured products,
              such as cocoa, fruit and sugar. Hard commodities are mined, such as gold and oil.
              Futures contracts are the oldest way of investing in commodities.
            </p>
          </div>
          <div className="col-span-1 h-full md:md:w-5/6 overflow-hidden flex items-center">
            <img src='https://static.hfm.com/assets/hfappnew/websites/main/inside-pages/trading-instruments/metals/images/new/metals-header.png' alt="" />
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
          <button
            onClick={goToPreviousSlide}
            className={`btn btn-circle ${activeSlide === 3 ? 'hidden' : ''}`}
          >
            ❮
          </button>
          <button
            onClick={goToNextSlide}
            className={`btn btn-circle ${activeSlide === 4 ? '' : ''}`}
          >
            ❯
          </button>
        </div>
      </div>
    </div>

    {/* table */}
    <div className='w-full text-center my-10'>
      <div className='font-semibold text-2xl  text-blue-800'>
           Today's Ecnomic Calender (FX)
      </div>
      <div className='font-semibold'>
              {todayDate}
      </div>
    </div>
    <div className='my-3'>      
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      {['Time','Currency','Impact','','Actual','Forcast','Previous'].map((value,index)=>{
                             return <th key={index+value} scope="col" class="px-6 py-3">
                                 <div class="flex items-center">
                                     {value}
                                 </div>
                             </th>
                      })} 
                    </tr>
                </thead>
                <tbody>
                { !apiLoadings.ecnomicCalender &&
                  economicCalender.map((value)=>{
                    return <tr class="bg-white border-b">
                        <td class="px-6 py-4">
                            {value.time}
                        </td>
                        <td class="px-6 py-4">
                           {value.currency}
                        </td>
                        <td class="px-6 py-4">
                          <div className={`w-4 h-4 ${value.impact==='Medium Impact Expected' ? 'bg-orange-400' : value.impact==='Low Impact Expected' ? 'bg-yellow-300' : 'bg-red-600' } bg-black`}></div>
                        </td>
                        <td class="px-6 py-4">
                            {value.name}
                        </td>
                        <td class="px-6 py-4">
                            {value.actual}
                        </td>
                        <td class="px-6 py-4">
                            {value.forecast}
                        </td>
                        <td class="px-6 py-4">
                            {value.previous}
                        </td>
                    </tr>
                  })
                }
                </tbody>
            </table>
            {apiLoadings.ecnomicCalender && <div className='w-full flex justify-center p-10'><Spinner/></div>} 
        </div>
    </div>

    {/* Chart */}
    <div className=' h-10 text-xl md:text-3xl text-center my-4 font-semibold text-blue-800'>Charts</div>
    <div className='w-full my-10'>
          <Chart/>
    </div>

    {/* cryptoTable */}
    <div className='w-full h-10 text-lg md:text-2xl  font-bold bg-slate-50 my-2 py-2'>Today's Cryptocurrency Prices</div>            
    <div className='w-full h-auto text-start flex justify-between px-4 border py-3'>
      <p className='text-xs md:text-lg mx-1' >Coins: {coinStats.totalCoins}</p>
      <p className='text-xs md:text-lg mx-1'>Market Cap: ${coinStats.totalMarketCap}</p>
      <p className='text-xs md:text-lg mx-1'>Total Exchanges: {coinStats.totalExchanges}</p>
      <p className='text-xs md:text-lg mx-1'>24H Volume: ${coinStats.total24hVolume}</p>
      <p className='text-xs md:text-lg mx-1'>Total Markets: {coinStats.totalMarkets} </p>
    </div>
    <Card className="h-full w-full">
      <CardBody className="overflow-hidden px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!apiLoadings.cryptoPrice &&
            TABLE_ROWS.slice(cryptoPagination,(cryptoPagination+5)).map(
              ({ img, symbol, name, price, change, marketCap, rank ,dayVolume,sparkline}, index) => {
                
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 ";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {rank}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {symbol}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          ${price}
                        </Typography>
                      </div>
                    </td>
                    <td className={`${change<0 ? 'text-red-700' : 'text-green-500'} font-semibold ${classes}`}>
                    {change} 
                    </td>
                    <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        ${dayVolume}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        ${marketCap}
                      </Typography>
                    </td>
                    <td className={classes}>
                    <SparklineChart data={sparkline}/>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
        {apiLoadings.cryptoPrice && <div className='w-full flex justify-center p-10'><Spinner/></div>} 
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2" >
          <Button variant="outlined" size="sm" onClick={()=>setCryptoPagination(cryptoPagination-5>0 && cryptoPagination-5)}>
            Previous
          </Button>
          <Button onClick={()=>setCryptoPagination(cryptoPagination+5<cryptoData.length && cryptoPagination+5)} variant="outlined"  size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
  <hr className='my-8'/>
  <ScrollToTopButton/>
</div>
  )
}

export default MainBody



