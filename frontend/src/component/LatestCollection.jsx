import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  
  const {products,discountPrice}= useContext(ShopContext);
  

 const [latestProducts,setLatestProducts]=useState([]);


   useEffect(()=>{
  setLatestProducts (products.slice(0,10));
 },[products]) 
  

  return (
    <div className='my-10 '>
       <div className='py-8 text-center text-3xl '>
         <Title text1={'LATEST'} text2={'COLLECTION'}  />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
           Step into style with our latest collection—where elegance meets everyday charm. From bold silhouettes to soft textures, each piece is made to make you feel fabulous. 
           Perfect for turning heads or lounging in luxury, this drop is your next obsession. Go ahead, treat yourself to something irresistibly fresh.
          </p>
       </div>
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
          {
           latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} discountprice={discountPrice(item.price,item.discount)} />
           ))
          }
        </div> 
       

    </div>
  )
}

export default LatestCollection
