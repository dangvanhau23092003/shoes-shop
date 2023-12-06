import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'

import { useLocation } from 'react-router-dom'
import AdminNav from '../../admin/AdminNav'

//Bố cục của trang
function Layouts() {
    const location = useLocation()
    return (
        <div>
            {
                location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header />
            }
            <div>
                <Routers />
            </div>
            {
                location.pathname.startsWith('/dashboard') ? '' : <Footer />
            }
        </div>
    )
}

export default Layouts
