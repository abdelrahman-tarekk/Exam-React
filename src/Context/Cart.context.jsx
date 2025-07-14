import axios from 'axios';
import { createContext, useState, useCallback, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const CartContext = createContext();

const API_BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

export default function CartProvider({ children }) {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(null);
  const token = localStorage.getItem('usertoken');

  const handleRequest = useCallback(async (requestPromise, successMessage) => {
    if (!token) {
      toast.error('Please log in first.');
      return;
    }

    await toast.promise(
      requestPromise.then(response => response),
      {
        loading: 'Processing...',
        success: successMessage || 'Done!',
        error: err => err.response?.data?.message || 'Something went wrong!',
      }
    );
  }, [token]);

  const getCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/cart`, { headers: { token } });
      setCartData(data);
      setCartId(data.data._id);
    } catch {
      setCartData(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getCart();
  }, [token, getCart]);

  const addTocart = useCallback(async (productId) => {
    const promise = axios.post(`${API_BASE_URL}/cart`, { productId }, { headers: { token } });
    await handleRequest(promise, 'Product added successfully to cart!');
    await getCart();
  }, [handleRequest, token, getCart]);

  const updateProductCount = useCallback(async (productId, count) => {
    if (count < 1) return removeProduct(productId);
    const promise = axios.put(`${API_BASE_URL}/cart/${productId}`, { count }, { headers: { token } });
    await handleRequest(promise, 'Product quantity updated!');
    await getCart();
  }, [handleRequest, token, getCart]);

  const removeProduct = useCallback(async (productId) => {
    const promise = axios.delete(`${API_BASE_URL}/cart/${productId}`, { headers: { token } });
    await handleRequest(promise, 'Product removed from cart.');
    await getCart();
  }, [handleRequest, token, getCart]);

  const clearCart = useCallback(async () => {
    const promise = axios.delete(`${API_BASE_URL}/cart`, { headers: { token } });
    await handleRequest(promise, 'Cart has been cleared.');
    await getCart();
  }, [handleRequest, token, getCart]);

  const resetCart = () => {
    setCartData(null);
    setCartId(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        loading,
        cartId,
        addTocart,
        getCart,
        updateProductCount,
        removeProduct,
        clearCart,
        setCartData,
        resetCart
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { background: '#363636', color: '#fff' },
        }}
      />
      {children}
    </CartContext.Provider>
  );
}