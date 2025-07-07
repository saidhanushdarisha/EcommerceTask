import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../component/Title';
import {toast} from 'react-toastify';
import axios from 'axios';

const Orders = () => {


 const {backendUrl,token,currency,discountPrice}=useContext(ShopContext);

 const [orderData,setOrderData]=useState([])
  const loadOrderData=async()=>{
    try {
      if(!token){
       return null
      
      }
        const response= await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}}) 
        if(response.data.success){
            let allOrderItem=[]
            response.data.orders.map((order)=>{
             order.items.map((item)=>{
              item ['status']=order.status
              item ['payment']=order.payment
              item  ['paymentMethod']=order.paymentMethod
              item ['data']=order.data
              allOrderItem.push(item)
              
             
             })
            })
            setOrderData(allOrderItem.reverse())
      
        }
        else{
          toast.error(response.data.message)
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  
  }
  useEffect(()=>{
    loadOrderData();
  },[token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>
       <div>
        {
        orderData.map((item,index)=>(
         
          <div key={index} className='flex flex-col md:flex-row md:justify-between md:items-center border-b border-t gap-4 py-4 '>
           
            <div className="flex items-start gap-6 text-sm ">
               <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className=' font-medium sm:text-base'>{item.name}</p>
               <div className='flex items-center gap-3 mt-1 text-base font-medium text-gray-700 '>
                  <p> {currency} {discountPrice(item.price,item.discount)}</p>
                  <p> Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
              </div>
                <p className='mt-1'>Date: <span className='text-gray-400'> {new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment: <span className='text-gray-400'> {item.paymentMethod}</span></p>

              </div>
             </div>

             <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                 <p className='h-2 min-w-2 rounded-full border bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
               <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
             
             </div>
            
            </div>
          
        ))
        }
       </div>
      
    </div>
  )
}

export default Orders
