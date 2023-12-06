import React from 'react'
import useAuth from '../custom-hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRouters = () => {
    const { currentUser } = useAuth()
    return currentUser ? <Outlet /> : <Navigate to={'/login'} />
}

export default ProtectedRouters
