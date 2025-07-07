import React, { useContext, useState, useEffect } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const BestSeller = () => {
 const {products,discountPrice}=useContext(ShopContext);
  const [bestSeller,setBestSeller]= useState([])

   useEffect(()=>{
    const bestProduct=products.filter((item)=>(item.bestseller))
   setBestSeller(bestProduct.slice(0,5))
   },[products])

  return (
    <div className='my-10'>
      <div className="py-8 text-center text-3xl">
         <Title text1={'BEST'} text2={'SELLER'} />
         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
         Discover our best-selling products loved by thousands of happy customers. These top-rated items are popular for their quality, comfort, and unbeatable value. 
         From casual wear to stylish essentials, each piece is a proven favorite. Shop our most in-demand collection and see why these picks never go out of style.
         </p>

      </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8 '>
         { 
         bestSeller.map((item,index)=>(
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} discountprice={discountPrice(item.price,item.discount)}/>
         ))
         }
       </div>
      
      
    </div>
  )
}

export default BestSeller
