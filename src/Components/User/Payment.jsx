import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import stripIcon from '../../assets/1280px-Stripe_Logo,_revised_2016.svg.png'
import cryptoIcon from '../../assets/100682_card_512x512.png'
import noImg from '../../assets/noImagePreview.jpg'
import bitPayImg from '../../assets/bitpay-bitcoin-fork.png'
import stripimg from '../../assets/stripe123.png'
import razorpayimg from '../../assets/razor-payment-banner.png'
import razoricon from '../../assets/razorpay-logo.webp'
import userAxios from '../../Axios/UserAxios'
import { toast } from 'react-toastify'
import { Spinner } from "@material-tailwind/react";
import ModalScroll from '../ModalScrollable'
import Failed from '../Failed'
import { useDispatch, useSelector } from 'react-redux'
import { setCourseData } from '../../Redux/ClientSlice/CourseOnPayment'
import CryptoModal from '../CryptoPaymentModal'

const Payment = () => {
    const axiosInstance = userAxios()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isChecked,setIsChecked] = useState(false)
    const [paymentMode,setPaymentMode] = useState('razorpay')
    const [loading,setLoading] = useState(false)
    const [modal,loadModal] = useState(false)
    const [showCryptoModal,setShowCryptoModal] = useState(false)
    
    const [courseData ,setCourseDataState] = useState({})
    const storeData= useSelector((state)=>state.CourseOnPayment.courseData)
    const locationData = location.state
    
    const [status,setStatus] = useState('')
    const queryParams = new URLSearchParams(location.search);
    const statusParam = queryParams.get('status');

    useEffect(()=>{
        if(locationData){
            setCourseDataState(locationData)
        }else if(storeData){
            setCourseDataState(storeData)
        }else{
            navigate('/courses')
        }

        if(statusParam){
            setStatus(statusParam)
        }
    },[])
    
    const handlePayment = async()=>{
        dispatch(setCourseData(courseData))
        setLoading(true)
        const methord = paymentMode
        if(methord === 'strip'){
            await axiosInstance.post(`/payments/${methord}`,courseData).then((res)=>{
                setLoading(false)
                window.location.href = res.data.url
            }).catch((error)=>{
                setLoading(false)
                toast.error(error.message)
            })
        }else if(methord === 'bitpay'){
            setLoading(false)
            setShowCryptoModal(true)
        }else if(methord === 'razorpay'){
             await axiosInstance.post(`/payments/${methord}`,courseData).then((res)=>{
                handleOpenRazorpay(res.data.data)
                setLoading(false)
             }).catch((error)=>{
                toast.error(error.message)
                setLoading(false)
             })
        }
    }

    const handleOpenRazorpay = (data) => {
        dispatch(setCourseData(courseData))
        const purchaseData={
            course_id:courseData._id,
            amount : courseData.price,
            mode_of_payment : 'razorpay'
        }
        const options = {
          key: 'rzp_test_spbZFEW2Mx0LLp',
          order_id: data.id,
          amount: data.amount,
          currency: data.currency,
          name: 'Trade House',
          description: `payment to trade house academy`,
          handler: function (response) {
            console.log(response, 'line 88');
            if (response.razorpay_payment_id && response.razorpay_signature) {
                axiosInstance.post('/verifyRazorpay', { response: response ,purchaseData})
                .then((res) => {
                    navigate('/payments/success')
                    toast.success(res.data.message)
                  }
                )
                .catch((error) => {
                    setStatus('failed')
                    toast.error('Error verifying transaction:', error);
                })
            } else if (response.error.code === Razorpay.Error.PAYMENT_CANCELLED) {
                setStatus('failed')
                toast.error('Transaction cancelled by the user');
            } else {
                setStatus('failed')
                toast.error('Transaction failed:', response.error);
            }
          }
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
      };

  return (
    <div className='h-auto w-full relative py-10 bg-gray-100'>
        {status==='failed' && <Failed/>}
        {showCryptoModal && <CryptoModal setShowModel={setShowCryptoModal}/>}
        <div className={`flex items-center h-full justify-center ${status==='failed'? '':'mt-24'} text-gray-800 p-8`}>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
                <div className="lg:col-span-2">
                <h2 className="text-sm font-medium">Payment Method</h2>
                            <div className="flex justify-between items-center px-8 py-5 bg-slate-50">
                                <div>   
                                    <img className='w-28' src={courseData?.banner} alt={noImg} /> 
                                </div>
                                <h2 className="text-sm font-medium">{courseData?.title}</h2>
                                    <label className=" text-center text-sm font-medium ml-4">by {courseData?.tutor?.name}</label>
                                <h2 className="text-sm font-medium">₹{courseData?.price}</h2>
                                
                            </div>
                    <h2 className="text-sm font-medium">Payment Method</h2>

                    <div className="bg-white rounded mt-4 shadow-lg">
                        <div className="flex justify-between items-center px-8 py-5">
                                <div>    
                                <input className={`appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100`} checked={paymentMode === 'razorpay'} onChange={()=>setPaymentMode('razorpay')} type="radio"/>
                                <label className="text-sm font-medium ml-4">Razorpay</label>
                                </div>
                                <img className='m-2 w-24' src={razoricon} alt="" />
                            </div>
                            <div className="flex justify-between items-center px-8 py-5 border-t">
                                <div>
                                <input className={`appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100`} checked={paymentMode === 'strip'} onChange={()=>setPaymentMode('strip')} type="radio"/>
                                <label className="text-sm font-medium ml-4">Strip</label>
                                </div>
                                <img className='w-20' src={stripIcon} alt="" />
                            </div>
                        <div className="border-t">
                            <div className="flex items-center justify-between px-8 py-5">
                                <div>
                                <input className={`appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100`} checked={paymentMode === 'bitpay'} onChange={()=>setPaymentMode('bitpay')} type="radio"/>
                                <label className="text-sm font-medium ml-4">Crypto </label>
                                <label className="text-sm opacity-80 text-red-600 ml-2">Coming soon!!</label>
                                </div>
                                <img className='w-20' src={cryptoIcon} alt="" />
                            </div>
                        </div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500 mt-2">Please select your payment methord</span>
                </div>
                <div>
                    <h2 className="text-sm font-medium">Purchase Summary</h2>
                    <div className="bg-white rounded mt-4 shadow-lg py-6">
                        <div className="px-8 h-24 w-full">
                            { paymentMode === 'razorpay' && <img src={razorpayimg} alt="" />}
                            { paymentMode === 'strip' && <img src={stripimg} alt="" /> }
                            { paymentMode === 'bitpay' && <img  src={bitPayImg} alt="" /> }
                        </div>
                        <div className="px-8 mt-4">
                            <div className="flex items-end justify-between">
                                <span className="text-sm font-semibold">Total </span>
                                <span className="text-sm text-gray-500 mb-px">₹{courseData?.price}</span>
                            </div>
                        </div>
                        <div className="px-8 mt-4 border-t pt-4">
                            <div className="flex items-end justify-between">
                                <span className="font-semibold">Grand Total (INR)</span>
                                <span className="font-semibold">₹{courseData?.price}</span>
                            </div>
                        </div>
                        <div className="flex items-center px-8 mt-8">
                            <input checked={isChecked} onClick={()=>setIsChecked(!isChecked)} type="checkbox" />
                            <label onClick={()=>loadModal(!modal)} className="text-xs text-gray-500 ml-2 hover:underline">I agree to the terms and conditions.</label>
                        </div>
                        <div className="flex flex-col px-8 pt-4">
                            <button onClick={()=>handlePayment()} 
                            className={` flex items-center justify-center
                             bg-blue-600 text-sm font-medium w-full h-10 mt-3 
                             rounded ${isChecked ? 'text-blue-50' : 'text-gray-400 cursor-not-allowed'} hover:bg-blue-700`} disabled={!isChecked}> {loading ? <Spinner/> : 'Start Subscription'} </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        { modal &&<ModalScroll showModel={loadModal}/>}
    </div>
  )
}

export default Payment
