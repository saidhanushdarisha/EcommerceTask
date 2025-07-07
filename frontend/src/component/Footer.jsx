import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-24'>
            <div>
                <Link
                 to='/'
                 onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
                ><img src={assets.logo} alt="logo "className='h-8 w-15 '/></Link>
                <p className='w-full md:w-2/4 text-black font-normal'>
                 Style for everyone — men, women, and kids. Fashion that fits every generation.
                </p>
            </div>
            <div>
                <p className=' text-xl font-medium mb-5'>
                   COMPANY
                </p>
                <ul className='flex flex-col gap-1 text-black'>
                  <NavLink to='/'
                   onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
                  ><li className=' hover:underline hover:text-gray-700' >Home</li></NavLink>
                  <NavLink to='/about'
                   onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
                  ><li className=' hover:underline hover:text-gray-700'>About</li></NavLink>
                  <NavLink to='/contact'
                   onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
                  ><li className=' hover:underline hover:text-gray-700'>Contact</li></NavLink>
                 
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5' >GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-black font-normal'>
                  <li>+91 8476971464</li>
                  <li>mohdayanmalik7@gmail.com</li>
                </ul>
            </div>
            
        </div>
        <div >
            <hr/>
            <p className='text-center py-6 text-sm font-medium'>Copyright  @2025 all rights are reserved</p>  
        </div>
      
    </div>
  )
}

export default Footer
