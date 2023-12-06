import React from 'react'
import {AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai'
import {FaStarHalfStroke} from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'

const ProductCart = ({item}) => {

    const dispatch = useDispatch()
    //add
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl,
        }))
    }

    return (
        <section >
            <div
             className=' relative duration-700 hover:border-[#e2e2e2] border-2 border-[#fcfcfc] shadow-sm p-2'>
                <div className='' >
                    <Link 
                        to={`/product/${item.id}`} >
                        <img src={item.imgUrl} alt={item.productName} className='w-full h-full object-cover rounded-sm' loading='lazy' />
                    </Link>
                </div>
                <div className='p-2'>
                    <div className=' mb-1 h-[25px] overflow-hidden '>
                        <Link 
                            to={`/product/${item.id}`} 
                            className='font-semibold w-full name-products'>
                               {item.productName}
                        </Link>
                    </div>
                    <p className='absolute top-2 right-2 bg-[red] px-2 py-1 text-[12px] text-[#fff]'> {item.category} </p>
                    <div className='flex flex-wrap items-center justify-between my-2'>
                        <p className=''>{item.price.toLocaleString('vi-VI', {style : 'currency', currency : 'VND'})}</p>
                        
                        <span className='flex items-center cursor-pointer'>
                            <AiFillStar className='text-[#ffc120] text-[18px] ' />
                            <AiFillStar className='text-[#ffc120] text-[18px] ' />
                            <AiFillStar className='text-[#ffc120] text-[18px] ' />
                            <AiFillStar className='text-[#ffc120] text-[18px] ' />
                            <FaStarHalfStroke className='text-[#ffc120] text-[18px]'/>
                        </span>
                    </div>
                    <div className='flex items-center justify-center pt-3'>
                        <span 
                        onClick={addToCart}
                        className='bg-[#2358a2] hover:bg-primary duration-300 flex items-center justify-center px-[5px] py-[5px] rounded text-[#fff] font-semibold cursor-pointer'>
                            Thêm vào giỏ
                            <AiOutlineShoppingCart 
                            className='text-[20px] text-[#fff] ml-[2px]' /> 
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductCart
