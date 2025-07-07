import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

 const {search,setSearch}=useContext(ShopContext);
 const [visible,setVisible] =useState(false)
   const location=useLocation();
   useEffect(()=>{
     if(location.pathname.includes('collection')){
      setVisible(true);
     }
     else{ 
     setVisible(false)
     }
   },[location])
  return visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
     <div className='inline-flex justify-center items-center border border-gray-400 px-5 py-2 my-5 mx-3 w-3/4 sm:w-1/2 rounded-full'>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text"  placeholder='Search' className='flex-1 outline-none bg-inherit text-sm'/>
      <img  className="w-4 cursor-pointer" src={assets.search_icon} alt="" />
     </div>
    </div>
  ):null
}

export default SearchBar
