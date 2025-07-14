import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Orders from './components/Orders/Orders'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Wishlist from './components/WishList/WishList'

import Navbar from './components/Navbar/Navbar'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import GuardRoute from './components/GuardRoute/GuardRoute'

import UserContextProvider from './Context/UserContext'
import CartProvider from './Context/Cart.context'
import WishlistContextProvider from './Context/WishlistContext'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'cart', element: <Cart /> },
      { path: 'ProductDetails/:id', element: <ProductDetails /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'allorders', element: <Orders /> },
      { path: 'categories', element: <Categories /> },
      { path: 'brands', element: <Brands /> },
      { path: 'wishlist', element: <Wishlist /> },
    ]
  },
  {
    path: '/',
    element: (
      <GuardRoute>
        <Layout />
      </GuardRoute>
    ),
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgetPassword', element: <ForgetPassword /> },
      { path: 'verifyResetCode', element: <VerifyResetCode /> },
      { path: 'resetPassword', element: <ResetPassword /> },
    ]
  }
])

function App() {
  return (
    <UserContextProvider>
      <CartProvider>
        <WishlistContextProvider>
          <RouterProvider router={routes} />
        </WishlistContextProvider>
      </CartProvider>
    </UserContextProvider>
  )
}

export default App
