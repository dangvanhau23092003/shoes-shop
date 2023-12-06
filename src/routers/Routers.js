import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
//import Pages
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import New from '../pages/New'
import ProtectedRouters from './ProtectedRouters'
import Profile from '../pages/Profile'
import Favourite from '../pages/Favourite'
//Admin
import Dashboard from '../admin/Dashboard'
import AllProducts from '../admin/AllProducts'
import AddProducts from '../admin/AddProducts'
import EditProduct from '../admin/EditProduct'
import AllUsers from '../admin/AllUsers'


const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'home'} />} />
            <Route path='home' element={<Home/>} />
            <Route path='shop' element={<Shop/>} />
            <Route path='/product/:id' element={<ProductDetails/>} />
            <Route path='/new' element={<New />} />
            <Route path='cart' element={<Cart/>} />

            <Route path='/*' element={<ProtectedRouters />}> 
                <Route path='checkout' element={<Checkout />} />
                <Route path='dashboard' element={<Dashboard /> } />
                <Route path='dashboard/add-product' element={<AddProducts /> } />
                <Route path='dashboard/all-products' element={<AllProducts /> } />
                <Route path='dashboard/edit-product/:id' element={<EditProduct /> } />
                <Route path='dashboard/all-users' element={<AllUsers /> } />
            </Route>

            {/* <Route path='checkout' 
                element={<ProtectedRouters>
                            <Checkout/>
                        </ProtectedRouters> 
                        } /> */}
            <Route path='login' element={<Login/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='profile' element={<Profile />} />
            <Route path='favourite' element={<Favourite />} />
        </Routes>
    )
}

export default Routers
