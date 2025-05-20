import React, { useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../auth'

export const ProtectedRoute = ({ currentUserRole, allowedRoles }) => {

  if (allowedRoles.includes(currentUserRole)) {
    return <Outlet />
  }else {
    return <Navigate to={'/login'}></Navigate>
  }
}