import React from 'react'
import { Navigate } from 'react-router-dom'

export default function GuardRoute({ children }) {
  const token = localStorage.getItem('usertoken')

  if (token) {
    return <Navigate to="/"/>
  }else{
    return children
  }

}
