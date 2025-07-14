import React from 'react'
import homeslider1 from '../../../assets/images/slider-image-1.jpeg'
import homeslider2 from '../../../assets/images/slider-image-2.jpeg'
import homeslider3 from '../../../assets/images/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function HomeSlider() {
  return (
<div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto items-center">
  <div className="col-span-12 md:col-span-8">

    <Swiper loop={true}>
        <SwiperSlide >
                <img src={homeslider3} alt="" className="w-full h-[415px] rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
                <img src={homeslider1} alt="" className="w-full h-[415px] rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
                <img src={homeslider2} alt="" className="w-full h-[415px] rounded-lg object-cover" />
        </SwiperSlide>
    </Swiper>

  </div>
  <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
    <img src={homeslider1} alt="" className="w-full h-[200px] rounded-lg object-cover" />
    <img src={homeslider2} alt="" className="w-full h-[200px] rounded-lg object-cover" />
  </div>
</div>

  )
}
