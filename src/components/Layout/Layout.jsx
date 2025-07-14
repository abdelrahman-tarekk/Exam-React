import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'


export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto max-w-6xl'>
      <Outlet />
      </div>
      <Footer />
    </div>
  )
}
