import React from 'react'
import Title from '../component/Title';
import {assets} from "../assets/frontend_assets/assets"

const About = () => {
  return (
    <div>
    <div className='text-2xl pt-10 text-center border-t'>
    <Title text1={'ABOUT'} text2={'US'} />
    </div>
     <div className='flex flex-col md:flex-row my-10 gap-16'>
       <img className="w-full md:max-w-[450px]" src={assets.about_img} alt=""/>
       <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
       <p>At ZAYNO, fashion isn't just clothing—it's a lifestyle, an attitude, and a statement. 
       We specialize in premium-quality apparel for men, women, and kids who dare to stand out. From sophisticated 
       silhouettes to bold streetwear, every piece in our collection is crafted to combine luxury with everyday wearability. 
       We believe style should speak without saying a word—and with us, it does.
       </p>
       <p>
        Rooted in elegance and driven by design, our brand merges comfort, confidence, and class. Whether you're dressing for
         a power move, a night out, or a laid-back weekend, we deliver fashion that elevates your vibe. We don’t 
         follow trends—we create them. Because when you wear ZAYNO, you wear power, passion, and personality.
       </p>
         <b className='text-gray-800'>Our Mission</b>
         <p>
          To redefine everyday fashion through effortless luxury.
          <br/>
          We’re on a mission to empower individuals to express their boldest selves with style that speaks class, comfort, and confidence. Our pieces are
           designed to inspire and impress—because luxury isn’t just what you wear, it’s how you carry it.
         </p>
       </div>
     </div>
     <div className='text-xl py-4'>
     <Title text1={'WHY'} text2={'CHOOSE US'} />
     </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
       <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>Every piece is crafted with precision and passion. We follow strict quality control to ensure luxurious comfort, durable fabrics,
         and flawless finishes in every order.</p>
       </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convienience:</b>
        <p className='text-gray-600'>From curated collections to fast checkout and secure delivery—shopping with us is smooth, simple, and satisfying.</p>
       </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Expectional Customer Service:</b>
        <p className='text-gray-600'> Our support team is here for you at every step. We believe in fashion that fits perfectly—and service that feels personal.</p>
       </div>
      </div>
      
    </div>
  )
}

export default About;
