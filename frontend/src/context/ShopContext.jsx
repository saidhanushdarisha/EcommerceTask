import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

export  const ShopContext=createContext();
const ShopContextProvider=(props)=>{

  const currency='₹'
  const backendUrl="http://localhost:5174/"
  const delivery_fee= 10 ;

  const [search,setSearch]=useState('');
  const [cartItem, setCartItems]=useState({})
  const [products,setProducts] =useState([])
  const [token,setToken] =useState('')
  const navigate=useNavigate();

 const discountPrice= (price,discount)=>{
   if(!discount || discount<=0) return price;

   return Math.floor(price-(price*(discount/100)));

 }

  const addToCart = async (itemId,size)=>{

   if(!size){
     toast.error("Select a size");
     return;

   } 
   
   if(!token){ 
     toast.error("Please login to add items to cart.");
    return;
   }
  
    let cardData=structuredClone(cartItem);
     
     if(cardData[itemId]){
       if(cardData[itemId][size]){
         cardData[itemId][size]+=1;
       }
       else{
       cardData[itemId][size]=1;
       }
     }
      else{
       cardData[itemId]={};
       cardData[itemId][size]=1
       }
      setCartItems(cardData);

        try {
        const response= await axios.post(backendUrl + '/api/cart/add',{itemId,size}, {headers:{token}})
        if(response.data.success){
          toast.success(response.data.message)
        }
        else{
        toast.error(response.data.message)
        }
          
        } catch (error) {
        console.log(error);
        toast.error(error.message)
          
        
      
      }
  }
  useEffect(()=>{
  },[cartItem])

  const getCartCount=()=>{
   let totalCount=0;
    for(const items in cartItem){
       for(const item in cartItem[items]){
        try {
          
           if(cartItem[items][item]>0){
             totalCount+=cartItem[items][item];
           }
        } catch (error) {
          
        }
       }
    }
    return totalCount;
  }
   const updateQuantity= async(itemId,size,quantity )=>{
    let cartData=structuredClone(cartItem)
    if(cartData[itemId]){
    cartData[itemId][size]=quantity
    }
    
     setCartItems(cartData);

     if (token){
      try {
       await axios.post(backendUrl+ '/api/cart/update' ,{itemId,size,quantity}, {headers:{token}})
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
     
     }
   }
   const getCartAmount= ()=>{
     let totalAmount=0;
     for(const items in cartItem){
      let itemInfo=products.find((product)=>product._id=== items)
        for(const item in cartItem[items]){
           try {
            if(cartItem[items][item]>0){
              totalAmount+=discountPrice(itemInfo.price,itemInfo.discount)*cartItem[items][item];
            }
            
           } catch (error) {
            
           }
        }
     }
      return totalAmount;
   }

   const getProductData = async() =>{
     try {
      const response= await axios.get(backendUrl + '/api/product/list')
       if(response.data.success){
        setProducts(response.data.products.reverse())
       } else{
        toast.error(response.data.message)
       }
     } catch (error) {
       console.log(error)
       toast.error(error.message)
     }
   }

    const getUserCart=async(token)=>{
    try {
    const response=await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
     if(response.data.success){
     
     setCartItems(response.data.cartData);
     
     }
     else{
     toast.error(response.data.message);
     }
      
    } catch (error) {
     console.log(error)
     toast.error(error.message)
      
    }
    
    
    }
   useEffect(()=>{
    getProductData()
   },[])

  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken && token) {
    getUserCart(token);  // Call whenever token changes
  }
}, [token]);
   
    // getUserCart(localStorage.getItem('token'));
  // const [showSearch,setShowSearch]=useState(true);   

   const value={
   products,
   currency,
   delivery_fee,
   search,
   setSearch,
   addToCart,
   getCartCount,
   cartItem,
   setCartItems,
   updateQuantity,
   getCartAmount,
   navigate,
   backendUrl,
   token,
   setToken,
   discountPrice,
   getProductData
   
   }
   return (
   <ShopContext.Provider value={value}>
     {props.children}
   </ShopContext.Provider>
   )
}

export default ShopContextProvider;