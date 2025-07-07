import React from 'react'
import ImageSlider from '../component/ImageSlider'
import LatestCollection from '../component/LatestCollection.jsx'
import BestSeller from '../component/BestSeller.jsx'
import OurPolicy from '../component/OurPolicy.jsx'

const Home = () => {
  return (
    <div>
     <ImageSlider/>
     <LatestCollection/>
     <BestSeller/>
     <OurPolicy/>
      
    </div>
  )
}

export default Home
