import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({id, image,name,price,discount,discountprice}) => {
    const {currency}=useContext(ShopContext);
  return (
    <Link className="bg-gray-200 cursor-pointer" to={`/product/${id}`}>
     <div className='overflow-hidden '>
      <img className="hover:scale-110 transition ease-in-out" src={image[0]} alt=" "/> 
     </div>
       <p className='pt-3 pb-1 text-base pl-3'>{name}</p>
        <div className='flex items-center gap-2 pl-3' >
        <p className='text-sm font-medium line-through text-red-700'>{currency} {price}</p>
        <p className='text-sm text-green-700 font-medium'>{discount}%<span className='text-black text-[12px]'>(off)</span></p>
        <p className='text-sm font-medium text-green-700'>{currency} {discountprice}</p>
        </div>
      
       
      
    </Link>
  )
}

export default ProductItem
