import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../Context/Cart.context'; 
import { Link } from 'react-router-dom';

import { FaTrashAlt, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';

export default function Cart() {
  const { 
    cartData, 
    getCart,
    updateProductCount,
    removeProduct,
    clearCart,
    loading 
  } = useContext(CartContext);


  useEffect(() => {
    if (!cartData) {
      getCart();
    }
  }, [cartData, getCart]);

  if (loading && !cartData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaShoppingBag className="text-green-500 text-6xl animate-bounce" />
      </div>
    );
  }

  if (!cartData || cartData.numOfCartItems === 0) {
    return (
      <div className="container mx-auto my-12 text-center">
        <FaShoppingBag className="text-gray-300 text-9xl mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty!</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/products" 
          className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">My Shopping Cart</h1>
        <p className="text-lg text-gray-600 mb-8">
          Total Items: <span className="font-bold text-green-600">{cartData.numOfCartItems}</span>
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Cart Items</h2>
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-semibold transition-colors flex items-center gap-2"
              >
                <FaTrashAlt /> Clear Cart
              </button>
            </div>

            {cartData.data.products.map((product) => (
              product && product.product && (
                <div key={product.product._id} className="flex items-center gap-4 border-b py-4 last:border-none">
                  <img 
                    src={product.product.imageCover} 
                    alt={product.product.title || 'Product Image'} // نص بديل آمن
                    className="w-24 h-24 object-cover rounded-md" 
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.product?.title?.split(' ').slice(0, 3).join(' ') || 'Unnamed Product'}
                    </h3>
                    <p className="text-green-600 font-semibold mt-1">{product.price} EGP</p>
                    <button 
                      onClick={() => removeProduct(product.product._id)}
                      className="text-gray-500 hover:text-red-600 mt-2 text-sm flex items-center gap-1 transition-colors"
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
                    <button 
                      onClick={() => updateProductCount(product.product._id, product.count - 1)}
                      className="text-red-500 hover:text-red-700"
                      disabled={product.count <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="font-bold text-lg text-gray-800">{product.count}</span>
                    <button 
                      onClick={() => updateProductCount(product.product._id, product.count + 1)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-semibold text-gray-700 border-b pb-4 mb-4">Order Summary</h2>
              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-gray-800">{cartData.data.totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between text-lg mb-6">
                <span className="text-gray-600">Shipping</span>
                <span className="font-bold text-green-500">FREE</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-extrabold text-gray-900">
                <span>Total</span>
                <span>{cartData.data.totalCartPrice} EGP</span>
              </div>
              <Link to="/checkout" className="block w-full text-center bg-green-500 text-white font-bold py-3 mt-6 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg text-lg">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
