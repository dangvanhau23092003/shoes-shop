import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiFillSetting, AiFillBell } from 'react-icons/ai'
import { BsArrowRightCircleFill } from 'react-icons/bs'
import useAuth from '../custom-hooks/useAuth'

function AdminNav() {

    const linkSidebar = [
        {
            path: 'dashboard',
            display: 'Trang chủ'
        },
        {
            path: '/dashboard/all-users',
            display: 'Người dùng'
        },
        {
            path: '/dashboard/all-products',
            display: 'Sản phẩm'
        },
        {
            path: '/dashboard/order',
            display: 'Đơn hàng'
        },
        // {
        //     path: '/dashboard/category',
        //     name: 'Loaij'
        // },
    ]

    const { currentUser } = useAuth()

    return (
        <>
            <header className=' bg-[#2f8cd7] fixed w-full top-0'>
                <div className='container mx-auto w-full h-[70px] flex items-center justify-center gap-[6rem]'>
                    <div>
                        <img src="" alt="" />
                        <Link to={'/dashboard'} className='text-[#fff] font-semibold '>
                            ADMIN
                        </Link>
                    </div>
                    <div className=' w-full'>
                        <input type="text" placeholder='Tìm kiếm...' className='w-full h-[35px] outline-none rounded p-2 ' />
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <AiFillSetting className='text-[#fff] text-[35px]  ' />
                        <AiFillBell className='text-[#fff] text-[35px]' />
                        <img src={currentUser.photoURL} alt="" className='w-[35px] h-[35px] rounded-full object-cover  ' />
                    </div>
                </div>
            </header>
            <section className='fixed top-[70px] left-0 h-full'>
                <div className='w-[250px] h-full bg-[#2f8cd7]'>
                    <div className='py-[20px]'>
                        <div className='flex items-center justify-center'>
                            <img src={currentUser.photoURL} alt=""
                                className='w-[80px] h-[80px] object-cover ' />
                        </div>
                        <div className='pt-[20px] flex items-center flex-col px-2 text-[#60ee39] '>
                            {
                                linkSidebar.map((item, index) => (
                                        <NavLink 
                                            key={index}
                                            to={item.path}
                                            className={(navClass) => navClass.isActive 
                                                ? 'w-full bg-[#00ccff] text-[16px] font-medium rounded p-2 text-[#fff] my-1  ' 
                                                : 'w-full bg-[#2f8cd7] text-[16px] font-medium rounded p-2 text-[#fff] my-1 '}
                                        >
                                            {item.display}
                                        </NavLink>                                  
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='absolute text-[35px] text-[#ff6237] -right-2 z-10 top-10 '>
                    <BsArrowRightCircleFill />
                </div>
            </section>
        </>
    )
}

export default AdminNav
