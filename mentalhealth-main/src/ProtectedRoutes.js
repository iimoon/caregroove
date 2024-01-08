import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ children,...rest }) => {
  let auth = { 'token': false }
  return (
      auth.token ? <Outlet/> : <Navigate to='/login'/> 
  )
}

export default ProtectedRoutes