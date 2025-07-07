import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../component/RelatedProduct';

const Product = () => {
  
const {productId}=useParams();
const {products,currency,addToCart,discountPrice}=useContext(ShopContext);
const [productData,setProductData]=useState(false);
const [image,setImage]=useState('');
const [size,setSize]=useState('');

const fetchPorductData = async ()=>{
 products.map((item)=>{
     if(item._id===productId){
        setProductData(item)
        setImage(item.image[0])
       
        return null
  }
 })
}
 useEffect(()=>{
    fetchPorductData();
 },[productId])


  return productData ? (
    <div className=' pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse  gap-3 sm:flex-row '>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
             {
          productData.image.map((item, index)=>(
          <img onClick={()=>setImage(item)} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer " src={item } key={index} alt="" />
          ))
          }
          </div>
          <div className='w-full sm:w-[80%]'>
             <img className='w-full h-auto' src={image} alt="" />
          </div>
      </div>
       { /* ----------product details----------*/}
       <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
             <img className="w-3.5" src={assets.star_icon} alt="" />
             <img className="w-3.5" src={assets.star_icon} alt="" />
             <img className="w-3.5" src={assets.star_icon} alt="" />
             <img className="w-3.5" src={assets.star_icon} alt="" />
             <img className="w-3.5" src={assets.star_dull_icon} alt="" />
              <p className='pl-2 font-medium'>(122)</p>
           </div>
            <div className='flex items-center mt-5 gap-3'>
            <p className="  font-medium text-3xl line-through text-red-700 ">{currency} {productData.price}</p>
            <p className="font-medium text-3xl text-green-700">{productData.discount}%<span className='text-black text-[20px]'>(off)</span></p>
            <p className='font-medium text-3xl text-green-700'>{currency} {discountPrice(productData.price,productData.discount)}</p>
            </div>
              <p className=' mt-5 text-gray-500 w-4/5'>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8'>
                 <p>Select Size</p>
                  <div className=' flex gap-2'>
                   {
                     productData.sizes.map((item,index)=>(
                      <button onClick={()=>setSize(item)} className={`bg-gray-100 py-2 px-4 border ${item==size ? 'border-orange-500' :" "}`} key={index} >{item}</button>
                     ))
                    }
          
                  </div>
              </div> 
             <button onClick={()=> addToCart(productData._id, size)} className=' px-8  py-3 rounded-full bg-black text-white text-base  active:bg-gray-700'>ADD to Cart</button>
              <hr className=' mt-8 sm:w-4/5' />
              <div className=' flex flex-col gap-1 mt-5 text-gray-500 text-sm'>
                <p>100% Original Product.</p>
                <p>Cash on Delivery is available on this product.</p>
                <p> Easy return and exchange policy within 7 days.</p>
              </div>
       </div>
      </div>
         {/* --------Description and Review Section--------*/}
          <div className='mt-20'>
          <div className='flex'>
            <b className=" border px-5 py-3 text-sm">Description</b>
            <p className='border py-3 px-5 text-sm'>Reviws (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
           <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolor laudantium sed itaque explicabo, 
           earum deleniti consectetur voluptatem numquam animi tenetur suscipit quasi est maiores, officia accusantium in odit facere.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus non eius aspernatur suscipit consequatur similique iusto, nemo 
            odio pariatur veritatis voluptatem velit cum explicabo doloremque porro est nulla placeat at?</p>
          </div>
          </div>
          {/* -------Related Products*/}

           <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ):
  <div className='opacity-0'></div>
}

export default Product
