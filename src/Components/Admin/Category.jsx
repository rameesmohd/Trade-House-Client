import React, { useRef } from 'react'
import download from '../../assets/download (1).jpeg'
import { useEffect } from 'react'
import adminAxios from '../../Axios/AdminAxios'
import { toast } from 'react-toastify'
import { useState } from 'react'


const MarketCategory = () => {
  const axiosInstance = adminAxios()
  const newCatRef = useRef()
  const editRef = useRef()
  const [categoryData ,setCategoryData] = useState([])
  const [temp,setTemp] = useState()
  const [inputValue, setInputValue] = useState('');

  useEffect(()=>{
    axiosInstance.get('/category').then((res)=>{
      setCategoryData(res.data.result)
    }).catch((error)=>{
      toast.error(error.message)
    })
  },[])

  //ADD CATEGORY HANDLES---------------
  const handleSaveNewCategory=()=>{
    const filteredCategoryData = categoryData.filter((obj) => obj._id !== 'temp');
    const newCategoryAdded = [...filteredCategoryData , {_id:'new',category : newCatRef.current.value}]  
    setCategoryData(newCategoryAdded)
    const newCategory = newCatRef.current.value
    axiosInstance.post('/add-category',{newCategory}).then((res)=>{
        toast.success(res.data.message)
    }).catch((error)=>{
        toast.error(error.message)
    })
  }
  const handleAddCategory=()=>{
    const filteredCategoryData = categoryData.filter((obj) => obj._id == 'temp');
    if(filteredCategoryData.length==0){
      const addCat = [...categoryData , {_id:'temp',category : ''}]  
      setCategoryData(addCat)
    }
  }
  const handleCancelAddCategory = () => {
    const filteredCategoryData = categoryData.filter((obj) => obj._id !== 'temp');
    setCategoryData(filteredCategoryData);
  };

  //EDIT HANDLES------------------------
  const handleEdit=(id,category)=>{
      setTemp(id)
      let newList = categoryData.map((obj)=>({...obj,_id:obj._id===id? 'edit' : obj._id}))
      setInputValue(category)
      setCategoryData(newList)
  }
  
  const handleEditCancel=()=>{
    let newList = categoryData.map((obj)=>({...obj,_id: obj._id == 'edit' ? temp : obj._id}))
    setCategoryData(newList)
    setTemp(null)
  }

  const handleUpdateCategory=()=>{
      const newCategory = inputValue
      let newList = categoryData.map((obj)=>({...obj,_id: obj._id == 'edit' ? temp : obj._id,category : obj._id == 'edit' ? newCategory : obj.category}))
      setCategoryData(newList)
      axiosInstance.post('/update-category',{id:temp,newCategory}).then((res)=>{
        toast.success(res.data.message)
      }).catch((error)=>{
          toast.error(error.message)
      })
  }

  return (
    <div className=' w-full h-full'>
      <div className='relative flex justify-start'>
     
        <div className='absolute m-12 w-1/2'>
        <div className='h-12 w-full bg-gray-100 rounded-lg mb-3 flex justify-end'>
          { !temp && <div className='bg-slate-900 rounded-md w-28 h-auto text-center flex justify-center items-center m-2 text-white hover:bg-slate-600 cursor-pointer' onClick={()=>handleAddCategory()}>Add Category</div>
            }
        </div>
          <div className=" overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full  text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
            
                  <th scope="col" className="px-6 py-3">
                
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                categoryData.map((obj) => (
                  <tr key={obj._id} className="bg-white border-b">
                    <th scope="row">
                        {obj._id == 'edit' && <div className='w-32 px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex justify-start'>
                              <input className='rounded-md text-sm' onChange={(e)=>setInputValue(e.target.value)} type="text" value={inputValue}/>
                          </div> }
                        {obj._id !== 'temp' && obj._id !== 'edit' &&
                         <div className='w-32 px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{obj.category}</div>
                        }
                        { obj._id == 'temp' &&
                          <div className='w-32 px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex justify-start'>
                              <input className='rounded-md text-sm' ref={newCatRef} type="text" placeholder="Enter new category here" />
                          </div>
                        }
                      </th>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4">
                      { obj._id !== 'temp' && obj._id !== 'edit' &&
                        <>
                          <a onClick={()=>handleEdit(obj._id,obj.category)} className="cursor-pointer font-medium text-blue-600 hover:underline mx-2">
                            Edit
                          </a>
                          <a className="font-medium text-red-600 hover:underline mx-2 cursor-pointer">
                            active
                          </a>
                        </>
                      }
                      { obj._id == 'temp' && 
                       <>
                            <a onClick={handleSaveNewCategory} className="font-medium text-blue-600 hover:underline mx-1">
                              Save
                            </a>
                            <a onClick={handleCancelAddCategory} className="font-medium text-red-600 hover:underline mx-1">
                              Cancel
                            </a>
                        </>
                      }
                      { obj._id == 'edit' &&
                          <>
                          <a onClick={handleUpdateCategory} className="font-medium text-blue-600 hover:underline mx-1">
                            Update
                          </a>
                          <a onClick={handleEditCancel} className="font-medium text-red-600 hover:underline mx-1">
                            Cancel
                          </a>
                           </>
                      }
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          </div>

        <img className='w-full h-screen overflow-y-hidden object-cover ' src={download} alt="" />
      </div>
    </div>
  )
}

export default MarketCategory
