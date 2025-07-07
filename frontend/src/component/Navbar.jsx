import React, { useContext, useState } from 'react'
 import { NavLink ,Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import {assets} from '../assets/frontend_assets/assets.js'
 

const Navbar = () => {
 const [visible,setVisible]=useState(false);
  const{getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext)

  const logout= () =>{
   navigate('/')
   localStorage.removeItem('token')
   setToken('')
   setCartItems({})
   
  }

 
  return (
    <div className='flex justify-between items-center py-5  font-medium '>
       <Link to="/"> <img src={assets.logo} alt="logo" className='w-20'/></Link>
       
        <ul className=' hidden sm:flex gap-5 text-sm text-gray-700'>
           <NavLink  to={'/' } className="flex flex-col items-center gap-1">
             <p>HOME </p>
             <hr className='w-2/4 h-[1.5px]  border-none bg-slate-700 hidden' />
           </NavLink>
            <NavLink to={'/collection'} className="flex flex-col items-center gap-1">
             <p>COLLECTION</p>
              <hr className='w-2/4 h-[1.5px]  border-none bg-slate-700 hidden' />
           </NavLink>
            <NavLink to={'/about'} className="flex flex-col items-center gap-1">
             <p>ABOUT</p>
              <hr className='w-2/4 h-[1.5px]  border-none bg-slate-700 hidden' />
           </NavLink>
            <NavLink to={'/contact'} className="flex flex-col items-center gap-1">
             <p>CONTACT</p>
              <hr className='w-2/4 h-[1.5px]  border-none bg-slate-700 hidden' />
           </NavLink>

        </ul>
        <div className='flex items-center gap-6 '>
      

          <div  className='group relative'>
             <img onClick={()=>token?null:navigate('/login') } src={assets.profile_icon} alt='profile' className='w-5  cursor-pointer'/>
            {
              token && 
               <div className='group-hover:block hidden absolute  right-0 pt-4 z-10'>
                <div className='flex flex-col gap-2 py-3 px-5 w-36 bg-violet-200 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My profile</p>
                     <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
             </div> 
            }  
           </div>
           <Link to='/cart' className='relative' >
              <img src={assets.cart_icon} alt='cart' className='w-5 '/>
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
           </Link>
            
         <img  onClick={()=>setVisible(true)}  src={assets.menu_icon} alt="menu" className='w-5  cursor-pointer sm:hidden'/>

        </div> 
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-gradient-to-b from-white to-green-600 transition-all z-10  ${visible?'w-full':'w-0'}`}>
             <div className='flex flex-col text-black  '>
                <div className='flex justify-end p-3'>
                    <img onClick={()=>setVisible(false)} src={assets.cross_icon} alt="cross" className=' w-5 text-3xl '/>
                </div>
                <NavLink onClick={()=>setVisible(false)} to='/' className='py-2 pl-6 border border-gray-700 text-xl'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/collection' className='py-2 pl-6 border border-gray-700 text-xl'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/about' className='py-2 pl-6 border border-gray-700 text-xl '>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} to='/contact' className='py-2 pl-6 border border-gray-700 text-xl '>CONTACT</NavLink>
             </div>
        </div> 

    </div>
  )
}

export default Navbar
