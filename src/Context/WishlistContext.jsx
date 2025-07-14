import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const WishlistContext = createContext()

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('usertoken')

  async function getUserWishlist() {
    try {
      setLoading(true)
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: { token }
      })
      setWishlist(data.data)
      console.log('Wishlist loaded')
    } catch (err) {
      console.error('Failed to load wishlist:', err)
    } finally {
      setLoading(false)
    }
  }

async function addToWishlist(productId) {
  try {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      { headers: { token } }
    )

    await getUserWishlist()

    return res
  } catch (err) {
    throw err 
  }
}

async function removeFromWishlist(productId) {
  try {
    const res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: { token } }
    )
    await getUserWishlist()
    return res
  } catch (err) {
    throw err
  }
}

  useEffect(() => {
    if (token) getUserWishlist()
  }, [token])

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, getUserWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}