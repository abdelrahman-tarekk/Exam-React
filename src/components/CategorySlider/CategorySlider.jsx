import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


export default function CategorySlider() {
    const [categories, setcategories] = useState([])
    async function getallcategories() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'get'
        }
        const { data } = await axios.request( options )
        setcategories(data.data)
    }
    useEffect(() => {
        getallcategories()
    }, [])
  return (
  <div className='countainer p-5 m-5 max-w-7xl mx-auto'>

<h2 className='text-2xl semobold'>Shop All Categories</h2>
<Swiper
  slidesPerView={6}
  spaceBetween={20}
  loop={true}
>
  {categories.map((category) => (
    <SwiperSlide key={category._id}>
      <div className="text-center">
        <img src={category.image} alt={category.name} className="h-64 object-cover rounded-lg mx-auto" />
        <h2 className="mt-2 font-medium text-sm">{category.name}</h2>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  </div>
  )
}
