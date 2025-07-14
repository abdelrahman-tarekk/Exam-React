import React, { useContext } from 'react'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import { CartContext } from '../../Context/Cart.context'
import { WishlistContext } from '../../Context/WishlistContext'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Card({ id, imageCover, category, title, price, description, ratingsAverage }) {
  const { addTocart } = useContext(CartContext)
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext)

  const toastOptions = {
    duration: 1000,
    position: 'top-center',
    style: {
      background: '#101010',
      color: '#fff',
    },
  }

  const isInWishlist = wishlist?.some(item => item._id === id)

  const toggleWishlist = async () => {
    try {
      if (isInWishlist) {
        await removeFromWishlist(id)
        toast('Removed from wishlist', toastOptions)
      } else {
        const res = await addToWishlist(id)
        toast.success(res?.data?.message || 'Added to wishlist', toastOptions)
      }
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full group">
      <div className="relative overflow-hidden rounded-md">
        <img src={imageCover} alt={title} className="w-full h-50 object-cover rounded-xl" />
        <div className="opacity-0 absolute bg-gray-600/40 inset-0 flex items-center justify-center gap-3 group-hover:opacity-100 transition-all">
          <Heart
            onClick={toggleWishlist}
            className={`p-1 w-8 h-8 rounded-full cursor-pointer transition-all 
              ${isInWishlist ? 'bg-red-500 text-white hover:bg-white hover:text-red-500' : 'bg-green-500 text-white hover:bg-white hover:text-green-500'}
            `}
          />
          <ShoppingCart
            onClick={() => addTocart(id)}
            className="bg-green-500 text-white p-1 w-8 h-8 rounded-full hover:bg-white hover:text-green-500 transition-all cursor-pointer"
          />
          <Link to={`/ProductDetails/${id}`}>
            <Eye className="bg-green-500 text-white p-1 w-8 h-8 rounded-full hover:bg-white hover:text-green-500 transition-all cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-green-600 font-medium">{category?.name}</p>
        <h3 className="text-gray-800 font-semibold text-lg truncate">{title}</h3>
        <p className="text-sm text-slate-500 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold">{price} EGP</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09L5.4 12.545 1 8.91l6.06-.88L10 2.5l2.94 5.53 6.06.88-4.4 3.636 1.278 5.545z" />
            </svg>
            <span className="text-sm">{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
