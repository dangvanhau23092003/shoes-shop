import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { GiConverseShoe } from 'react-icons/gi'
import { BsBag, BsHeart } from 'react-icons/bs'
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import logo from '../../assets/images/avt2.jpg'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { toast } from 'react-toastify'

const nav__links = [
    {
        path: 'home',
        display: 'Trang chủ',
    },
    {
        path: 'shop',
        display: 'Shop',
    },
    // {
    //     path: 'cart',
    //     display: 'Cart',
    // },
    {
        path: 'new',
        display: 'Tin tức',
    },
]


function Header() {
    const [header, setHeader] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenMenu = () => {
        setIsOpen(!isOpen);
    }
    // useSelector: Lấy dữ liệu từ cửa hàng Redux trong thành phần React.
    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const favouriteItem = useSelector(state => state.favourite.favouriteItem)
    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 70 ? setHeader(true) : setHeader(false)
        })
    })

    const { currentUser } = useAuth()
    // console.log(currentUser)
    // LOGOUT
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.success('Đăng xuất thành công !!!')
                navigate('/home')
            }).catch((error) => {
                console.log(error)
                toast.error('Đăng xuất thất bại !!!')
            })
    }

    return (
        <header className={`${header ? 'bg-[#0a1d37] w-full h-[70px] fixed top-0 z-10' : 'bg-[#150e36] h-[70px] fixed w-full top-0 z-10'} shadow-lg transition-all`}>
            <div className='lg:container lg:px-2 px-2 h-full mx-auto flex items-center justify-between'>
                {/* LOGO */}
                <Link to={'/'}>
                    <GiConverseShoe className='text-[50px] text-[#fff] ' />
                </Link>
                {/* TAB MENU */}
                <div className='lg:flex md:flex hidden gap-8 text-[#fff]'>
                    {nav__links.map((item, index) => (
                        <div key={index} >
                            <NavLink
                                to={item.path}
                                className={(navClass) => navClass.isActive ? 'font-[700] text-[#ccc] duration-300' : ''}
                            //isActive là một prop cỉa component NavLink
                            >
                                {item.display}
                            </NavLink>
                        </div>
                    ))}
                </div>
                {/*ICON CART, HEART */}
                <div className='flex items-center'>
                    <div className='flex items-center gap-5'>
                        {/* SEARCH */}
                        <span className='relative cursor-pointer hover-input  '>
                            <AiOutlineSearch
                                className='text-[#fff] text-[20px]' />
                            <div className='flex items-center absolute -left-[110px] top-[50px] z-20 border-2 border-none search-input'>
                                <input
                                    className='h-[30px] w-[250px] pr-6 px-2 rounded-md'
                                    type="text"
                                    placeholder='Tìm kiếm...' />
                                <div className=' absolute top-0 right-0 '>
                                    <AiOutlineSearch
                                        className='text-[20px] h-[30px]' />
                                </div>
                            </div>
                        </span>
                        <Link to={'/favourite'} className='relative cursor-pointer'>
                            <BsHeart className='text-[#fff]' />
                            <div className={favouriteItem.length === 0 ? 'absolute -top-1 left-3 flex items-center justify-center rounded-full w-[8px] h-[8px] bg-[#ff2d2d] text-[#fff] text-[10px]' : 'absolute -top-1 left-3 flex items-center justify-center rounded-full w-[8px] h-[8px] bg-[#2dff42] text-[#fff] text-[10px]'}>
                                {/* {totalFavourite} */}
                            </div>
                        </Link>
                        <Link to={'/cart'} className='relative cursor-pointer'>
                            <BsBag className='text-[#fff]' />
                            <div className='absolute -top-2 left-2 flex items-center justify-center rounded-full w-[14px]
                                h-[14px] bg-[#4f4f4f] text-[#fff] text-[10px] '>
                                {/* Số lượng trong giỏ hàng */}
                                {totalQuantity}
                            </div>
                        </Link>
                        <div className='cursor-pointer flex items-center header-hover'>
                            <p className='text-[#fff] text-[14px] pr-2 '>{currentUser ? currentUser.displayName : null}</p>
                            <img src={currentUser ? currentUser.photoURL : logo}
                                alt="error"
                                className=' h-[35px] w-[35px] object-cover rounded-full' />
                            <div className='absolute top-[65px] bg-[#fff] flex flex-col rounded shadow-xl '>
                                <ul className='header-none'>
                                    {
                                        currentUser ?
                                            <div className='flex items-center flex-col'>
                                                <li className='px-[14px] py-[2px] border-b border-[#ccc]'>
                                                    <button
                                                        onClick={handleLogout}
                                                        className=' text-[14px] hover:text-[#3863ff]'
                                                    >
                                                        Đăng xuất
                                                    </button>
                                                </li>
                                                <li className='py-[2px] border-b border-[#ccc]'>
                                                    <Link to={'/profile'}
                                                        className=' text-[14px] hover:text-[#3863ff]'
                                                    >
                                                        Trang cá nhân
                                                    </Link>
                                                </li>
                                                <li className='px-[14px] py-[2px]'>
                                                    <Link to={'/dashboard'}
                                                        className=' text-[14px] hover:text-[#3863ff]'
                                                    >
                                                        Trang quản trị
                                                    </Link>
                                                </li>
                                            </div>
                                            :
                                            <div className='flex flex-col items-center'>
                                                <li className='px-[5px] py-[2px] border-b border-[#ccc]'>
                                                    <Link to={'/signup'} className='text-[14px] hover:text-[#3863ff]' >
                                                        Đăng ký
                                                    </Link>
                                                </li>
                                                <li className='px-[5px] py-[2px]'>
                                                    <Link to={'/login'} className='text-[14px] hover:text-[#3863ff]  '>
                                                        Đăng nhập
                                                    </Link>
                                                </li>
                                            </div>
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>
                    {/* ICON MENU */}
                    <div className='xl:hidden lg:hidden md:hidden pl-2'>
                        {isOpen ?
                            <AiOutlineClose
                                onClick={handleOpenMenu}
                                className='text-[#fff] text-[20px] duration-300 cursor-pointer' /> :
                            <AiOutlineMenu
                                onClick={handleOpenMenu}
                                className='text-[#fff] text-[20px] duration-300 cursor-pointer' />}

                        {/* MENU MOBILE */}
                        {isOpen ?
                            <div className='absolute right-0 w-[100%] bg-[#fff] top-[70px] z-10 block duration-300'>
                                {nav__links.map((item, index) => (
                                    <div key={index} className='p-[12px] border-b' >
                                        <NavLink                                                                          
                                            to={item.path}
                                            className={(navClass) => navClass.isActive ? 'font-[700] text-[#ccc] duration-300' : ''}
                                        //isActive là một prop cỉa component NavLink
                                        >
                                            {item.display}
                                        </NavLink>
                                    </div>
                                ))}
                            </div> : ''
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
