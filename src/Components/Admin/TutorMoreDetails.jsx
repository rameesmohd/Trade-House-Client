import React from 'react'
import { useLocation } from 'react-router-dom'
import { BsDownload } from 'react-icons/bs';


const MoreDetails = () => {
  const location = useLocation() 
  const tutorData = location.state 
  console.log(tutorData);

  const handleDownload = (fileUrl,fileName) => {
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = `${fileName}cv_file.pdf`;
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
};

  return (
<>
    <div className='px-2 w-full '>
    <div className='w-full bg-white h-auto gap-3 grid md:grid-cols-4'>
    <div className='w-full   flex items-center p-3 md:col-span-2'>
    <section className="bg-blueGray-200 py-2">
        <div className=" mx-auto px-4">
          <div className=" flex flex-col min-w-0 break-words bg-slate-100   shadow-xl rounded-lg ">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img   src={tutorData.image ? tutorData.image : "https://static.thenounproject.com/png/3674270-200.png"} className=' rounded-md' />
                  </div>
                </div>
              </div>
              <div className="text-center ">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                 {tutorData.firstName +' '+ tutorData.lastName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                 {tutorData.type_of_trader +'Trader'}
                </div>
                <div className="mb-2 text-blueGray-600 ">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Email : {tutorData.email}
                </div>
                <div className="mb-2 text-blueGray-600 ">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Qualification : {tutorData.qualification}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>Category of trading : {tutorData.category}
                </div>
              </div>
              <div className="mt-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                  <a href="#pablo" className="font-normal text-pink-500">About</a>
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {tutorData.about_me}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div className=' md:col-span-2 bg-white  p-3'>
      {/* table-1 */}
      <div className='h-1/6'>
        <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-sm font-semibold text-white uppercase bg-black  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    username
                </th>
                <th scope="col" className="px-6 py-3">
                    Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                is_blocked
                </th>
                <th scope="col" className="px-6 py-3">
                wallet b/c
                </th>
                <th scope="col" className="px-6 py-3">
                    CV
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b ">
                <th scope="row" className="font-semibold px-6 py-4  text-gray-900 whitespace-nowrap ">
                    {tutorData.name}
                </th>
                <td className="px-6 py-4 font-semibold">
                    {tutorData.mobile}
                </td>
                <td className="px-6 py-4 font-semibold">
                    {tutorData.is_blocked ? 'true' : 'false'}
                </td>
                <td className="px-6 py-4 font-semibold">
                    {tutorData.t_wallet ? tutorData?.t_wallet : '0.00'}
                </td>
                <td className="px-4 py-2 font-semibold flex justify-center"><BsDownload className=' text-lg cursor-pointer' onClick={()=>handleDownload(tutorData.CV,tutorData.firstName)}/></td>
            </tr>
        </tbody>
      </table>
      </div>

      {/* table-2 */}
      <div className='w-full text-center font-poppins font-semibold mb-1 text-lg'>Courses</div>
      <div className='h-1/3'>
        <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    username
                </th>
                <th scope="col" className="px-6 py-3">
                    Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                is_blocked
                </th>
                <th scope="col" className="px-6 py-3">
                wallet b/c
                </th>
                <th scope="col" className="px-6 py-3">
                    CV
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {tutorData.name}
                </th>
                <td className="px-6 py-4">
                    {tutorData.mobile}
                </td>
                <td className="px-6 py-4">
                    {tutorData.is_blocked ? 'true' : 'false'}
                </td>
                <td className="px-6 py-4">
                    {tutorData.wallet}
                </td>
                <td className="px-4 py-2 flex justify-center"><BsDownload className=' text-lg cursor-pointer' onClick={()=>handleDownload(tutorData.CV,tutorData.firstName)}/></td>
            </tr>
        </tbody>
      </table>
      </div>

      {/* table-3 */}
      <div className='w-full text-center font-poppins font-semibold mb-1 text-lg'>Sales</div>
      <div className='h-1/3'>
        <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    username
                </th>
                <th scope="col" className="px-6 py-3">
                    Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                is_blocked
                </th>
                <th scope="col" className="px-6 py-3">
                wallet b/c
                </th>
                <th scope="col" className="px-6 py-3">
                    CV
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {tutorData.name}
                </th>
                <td className="px-6 py-4">
                    {tutorData.mobile}
                </td>
                <td className="px-6 py-4">
                    {tutorData.is_blocked ? 'true' : 'false'}
                </td>
                <td className="px-6 py-4">
                    {tutorData.wallet}
                </td>
                <td className="px-4 py-2 flex justify-center"><BsDownload className=' text-lg cursor-pointer' onClick={()=>handleDownload(tutorData.CV,tutorData.firstName)}/></td>
            </tr>
        </tbody>
      </table>
      </div>


     </div>
    </div>
  </div>
</>
  )
}

export default MoreDetails
