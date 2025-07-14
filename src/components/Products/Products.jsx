import React from 'react'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'

export default function Products() {
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
    
    <div className='py-10'>
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
    
    
  )
}
