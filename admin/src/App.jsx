import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar.jsx'
import Sidebar from './component/Sidebar.jsx'
import Add from './pages/Add.jsx'
import {Routes,Route} from 'react-router-dom'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import Login from './component/Login.jsx'

  import { ToastContainer } from 'react-toastify';

 export const backendUrl="http://localhost:4000"
 export const currency='₹'
const App = () => {

 const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  useEffect (()=>{

   localStorage.setItem('token',token)

  },[token])

  return (
  <div className='bg-gray-50 min-h-screen'>
    <ToastContainer />
       {token === "" ? <Login  setToken={setToken}/> :
     <>
       <Navbar setToken={setToken}/>
       <hr />
        <div className='flex w-full'>
            <Sidebar/>
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
            <Routes>
             <Route path='/add' element={<Add token={token} />} />
              <Route path='/list' element={<List token={token} />} />
               <Route path='/orders' element={<Orders token={token}/>} />
            
            </Routes>
            
            </div>
            
     
        </div>
     </>
     }
    
   </div>
  )
}

export default App
