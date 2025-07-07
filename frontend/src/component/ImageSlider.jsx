import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { assets } from "../assets/frontend_assets/assets";

import { useNavigate } from "react-router-dom";


const images = [
 {
 src:assets.sliderimg1,
 discount:50
 },
 {
 src:assets.sliderimg2,
 discount:30
 },
 {
  src:assets.sliderimg3,
  discount:70
 }

];

const ImageSlider = () => {
  const navigate = useNavigate();

  const handleImageClick = (discount) => {
    // Navigate to product listing page with discount in URL
    navigate(`/collection?discount=${discount}`);
  };
  return (
    <div className="w-full  mt-10 ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg shadow-lg "
      >
        {images.map((imgObj, index) => (
          <SwiperSlide key={index}>
            <img src={imgObj.src} alt={`Slide ${index + 1}`} className="w-full h-96   rounded-lg"
                  onClick={() => handleImageClick(imgObj.discount)}
             />

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
 