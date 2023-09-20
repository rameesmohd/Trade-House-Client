import React, { useState } from 'react';
import RefundModal from './RefundModal';
import userAxios from '../../../Axios/UserAxios';
import { toast } from 'react-toastify';

function PaymentHistory({orderData,wallet,updateData,setUpdateData}) {
  const axiosInstance = userAxios()
  const [refundModalShow,setRefundModalShow] = useState(false)
  const [order_id,setOrder_id] = useState('')
  const [courseTitle,setCourseTitle] = useState('')

  const approveRefund=async(feedback)=>{
    await axiosInstance.patch('/cancel-purchase',{order_id,feedback,wallet}).then((res)=>{
      setUpdateData(!updateData)
    }).catch((error)=>{
      toast.error(error.message)
      console.log(error);
    })
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-800">
        <thead className="text-xs text-white uppercase bg-black">
          <tr>
          <th scope="col" className="px-6 py-3">
              order Id
            </th>
            <th scope="col" className="px-6 py-3">
              Course Name
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Mode of Payment
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
        {   orderData.length ?
            orderData.map((order)=>{
                const dateObject = new Date(order?.date_of_purchase);
                const formattedDate = dateObject.toISOString().split('T')[0];
            return(
            <tr key={order._id} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {order?._id}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {order?.course_id.title}
                </th>
                <td className="px-6 py-4">
                {formattedDate}
                </td>
                <td className="px-6 py-4">
                {order?.payment_mode}
                </td>
                <td className="px-6 py-4">
                ₹{order?.amount}
                </td>
                <td className={`flex px-6 py-4 font-semibold cursor-pointer ${order?.status === 'success' ? 'text-green-500' : 'text-red-700'}`}>
                  {order?.status}
                  {
                    order?.is_refundable &&
                    <p onClick={()=>{setRefundModalShow(true),setOrder_id(order._id),setCourseTitle(order?.course_id.title)}} className={'style-none mx-1 font-normal text-red-700'}>
                    Cancel
                  </p> 
                  }
                </td>
            </tr> )
            }): 
            <tr className='h-24 '>
                <td></td>
                <td></td>
                <td>No Payments!!</td>
            </tr>
            }
        </tbody>
      </table>
            { refundModalShow && <RefundModal title={courseTitle} showModal={setRefundModalShow} approveRefund={approveRefund}/>}
    </div>
  );
}

export default PaymentHistory;
