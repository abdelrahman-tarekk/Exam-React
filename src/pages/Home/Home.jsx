import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'


export default function Home() {
  const [products, setproducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getallproducts() {
    setIsLoading(true)
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      setproducts(data.data)
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getallproducts()
  }, [])

  return (
    <div className='py-10' >
      <HomeSlider/>


    <CategorySlider/>
      <div className="py-10 px-4">
              {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 justify-items-center">
          {products.map(product => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      )}
      </div>
    </div>
    
  )
}
