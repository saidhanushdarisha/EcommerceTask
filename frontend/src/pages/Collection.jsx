import React, { useContext, useEffect, useState } from 'react'
import {assets} from "../assets/frontend_assets/assets"
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../component/ProductItem';
import Title from "../component/Title"
import { useNavigate, useSearchParams } from 'react-router-dom';

const Collection = () => {
  const navigate=useNavigate()
  const [searchParams] = useSearchParams();
  const discountFilter = parseInt(searchParams.get("discount"));
  
  const [showFilter,setShowFilter]=useState(false);
  const {products,search,discountPrice}=useContext(ShopContext) ; 
  const [filterProduct,setFilterProduct]=useState([]);
  const [category, setCategory] =useState([])
  const [subCategory,setSubCategory] =useState([])
  const [sortType,setSortType]=useState("relavant")

   
  
   const toggelCategory=(e)=>{
     if(category.includes(e.target.value)){
       setCategory(prev=> prev.filter(item=>item!=e.target.value))
     }
     else{
      setCategory(prev => [...prev,e.target.value])
     }
   }
    const toggleSubCategory=(e)=>{
     if(subCategory.includes(e.target.value)){
     setSubCategory(prev => prev.filter(item => item!=e.target.value))
     }
     else {
     setSubCategory(prev =>[...prev,e.target.value])
     }
    }
     const applyFilter=()=>{
      let productsCopy=products.slice();
       if(search){
        productsCopy=productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
       }
      if(category.length >0){
      productsCopy=productsCopy.filter(item => category.includes(item.category))
      }
      if(subCategory.length >0){
      productsCopy=productsCopy.filter(item => subCategory.includes(item.subCategory))
      }
      if (!isNaN(discountFilter)) {
       productsCopy = productsCopy.filter(item =>
      item.discount === discountFilter
    );
  }
        setFilterProduct(productsCopy)
     }
      const sortProduct=()=>{
      let fpCopy=filterProduct.slice();
       switch(sortType){
        case 'low-high':
        setFilterProduct(fpCopy.sort((a,b)=>(discountPrice(a.price,a.discount) - discountPrice(b.price,b.discount))));
         break;

         case 'high-low' :
         setFilterProduct(fpCopy.sort((a,b)=>(discountPrice(b.price,b.discount) - discountPrice(a.price,a.discount))));
         break;
         default:
         applyFilter();
         break;
       }
      }

    useEffect(()=>{
      applyFilter();
      
    },[category,subCategory, search,products])

     useEffect(()=>{
      sortProduct();
     },[sortType]) 

  useEffect(()=>{
    if (searchParams.has("discount")) {
      const params = new URLSearchParams(searchParams);
      params.delete("discount");
      navigate({
        pathname: '/collection',
        search: params.toString(),
      }, { replace: true });
    }
  }, 
  [])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
       <div className='min-w-60 '>
         <p className='flex items-center my-2  text-xl cursor-pointer gap-2'>FILTERS
         <img onClick={()=>(setShowFilter(!showFilter))} className={`h-3 sm:hidden  ${showFilter ?'rotate-90':''}`} src={assets.dropdown_icon} alt=""/>
         </p>
          <div className={`border border-gray-600 pl-5 py-3 mt-6 ${showFilter ? '':'hidden sm:block'} `}>
            <p className='mb-3 text-sm font-medium'>Catagary</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
              <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggelCategory} /> Men
              </p>
              <p className='flex gap-2'>
              <input className="w-3" type="checkbox"  value={'Women'} onChange={toggelCategory} /> Women
              </p>
              <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggelCategory} /> Kids
              </p>
            </div>
          </div>
           <div className={`border border-gray-600 pl-5 py-3 mt-6 ${showFilter ? '':'hidden sm:block'} `}>
            <p className='mb-3 text-sm font-medium'>Type</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
              <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory}  /> Topwear
              </p>
              <p className='flex gap-2'>
              <input className="w-3" type="checkbox"  value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
              </p>
              <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
              </p>
            </div >
         </div>
         </div>
           <div className='flex-1 '>
             <div className='flex justify-between text-base sm:text-2xl mb-4'>
              <Title  text1={'ALL'} text2={'COLLECTION'} />
               <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
               <option value="relavant">Sort by:Relavant</option>
               <option value="low-high">Sort by:Low to High</option>
               <option value="high-low">Sort by:High to Low</option>
               </select>
             </div>


            <div className='grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 gap-y-6 '>
         {
              filterProduct.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} discount={item.discount} discountprice={discountPrice(item.price,item.discount)} />
              ))
            }
            </div> 
           </div>
         

      
    </div>
  )
}

export default Collection
