import React, { useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartActions } from '../redux/slices/cartSlice'
import { getTotals } from '../redux/slices/cartSlice'


function Cart() {
    // useSelector lấy trạng thái ban đầu làm đầu vào
    const cartProduct = useSelector((state) => state.cart)
    // const totalAmount = useSelector((state) => state.cart.totalAmount)
    // const cart = useSelector((state) =>  state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTotals())
    }, [cartProduct, dispatch])

    const delCartProduct = (item) => {
        dispatch(cartActions.delItem(
            item
        ))
    }
    //Delete All
    const delCartProductAll = (item) => {
        dispatch(cartActions.delAll(
            item
        ))
    } 
    // tăng số lượng
    const handleIncrease = (item) => {
        dispatch(cartActions.increaseQuantity(
            item
        ))
    }
    // giảm số lượng
    const handleReduce = (item) => {
        dispatch(cartActions.reduceQuantity(
           item
        ))
    }

    // var x = 1000;
    //     x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    //     console.log(x);

    
    // console.log(totalAmount)
    // console.log(cartProduct)
    return (
        <section className='bg-bg-hsl'>
            <div className='mt-[70px]'>
                <div className='relative flex items-center justify-center background-image h-[180px] bg-repeat bg-cover bg-center '>
                    <p className=' absolute text-[#9b9b9b] text-[30px] font-bold '>Shopping Cart</p>
                </div>
                <div className='container mx-auto px-2'>
                    <div className='mt-[60px] pb-[60px]'>
                        <h1 className='text-[20px] font-semibold uppercase'>Giỏ hàng của bạn</h1>
                        <div className='mt-5'>
                            {
                                cartProduct.cartItem.length === 0
                                    ?
                                    <div className='text-center'>
                                        <img src='https://barkit.vn/public/catalog/assets/img/empty-cart.webp' alt=''
                                            className='w-[250px] m-auto ' />
                                        <Link to={'/shop'}>                                        
                                                <button className='border-2 border-[#f6933c] px-8 py-[4px] mt-2 inline-flex items-center'>
                                                    <BsArrowLeft  /> 
                                                        <p className='px-3 '>Tiếp Tục Mua Hàng</p>
                                                    <BsArrowRight />                         
                                                </button>                                           
                                        </Link>
                                    </div>
                                    :

                                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:flex gap-3'>
                                        <div className='mt-[10px] w-full'>
                                            <div className='bg-[#fff] w-full px-2 py-1 lg:flex items-center justify-between hidden md:flex  '>
                                                <div className='flex items-center justify-between'>
                                                    <input                                                            
                                                    type="checkbox" className='mr-2' />
                                                    <span className='text-[14px] '>Hiện có {cartProduct.cartItem.length} sản phẩm</span>
                                                </div>
                                                <div className='flex items-center justify-between gap-4 text-center'>
                                                    <span className='text-[14px] w-[80px] '>Thành tiền</span>
                                                    <span className='text-[14px] w-[80px] '>Số lượng</span>
                                                    <span className='text-[14px] '>Xóa</span>
                                                </div>
                                            </div>
                                            {
                                                cartProduct.cartItem.map((item, index) => (
                                                    <div key={index} className='flex items-center justify-between mt-2 p-2 bg-[#fff]'> 
                                                        <div className='flex items-center justify-between'>
                                                            <input                                                            
                                                            type="checkbox" className='mr-2' />
                                                            <div className=' mr-2'>
                                                                <Link to={`/product/${item.id}`}>
                                                                    {/* IMAGE */}
                                                                    <img src={item.imgUrl} alt="" className='w-[85px] lg:w-[55px] lg:h-[55px] object-cover mr-2' />
                                                                </Link>
                                                            </div>
                                                            <div className='flex-col flex '>
                                                                <span className='flex flex-wrap text-[13px] max-w-[250px] sm:max-w-[300px] md:max-w-[350px] '>{item.productName}</span>
                                                                <span className='text-[13px] text-[red] '> {item.price.toLocaleString('vi-VI', {style : 'currency', currency : 'VND'})} </span>
                                                            </div>                                                           
                                                        </div>
                                                        <div className='flex flex-wrap items-center justify-between gap-4 text-center'>
                                                            <div className='w-[80px] '>
                                                            {(item.price * item.quantity).toLocaleString('vi-VI', {style : 'currency', currency : 'VND'})}
                                                            </div>
                                                            <div className='bg-[#ffffff] flex flex-wrap items-center w-[100px]'>
                                                                <button
                                                                onClick={() => handleIncrease(item)} 
                                                                className='px-2 py-1 border border-[#f2f2f2] cursor-pointer'>
                                                                    +
                                                                </button>
                                                                    <span className='px-2 py-1 w-[40px] text-center'>
                                                                        {item.quantity}
                                                                    </span>
                                                                <button 
                                                                onClick={() => handleReduce(item)} 
                                                                className='px-2 py-1 border border-[#f2f2f2] cursor-pointer'>
                                                                    -
                                                                </button>
                                                            </div>
                                                            <button className='' 
                                                                onClick={() => delCartProduct(item)}>
                                                                <AiOutlineDelete />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <button
                                            onClick={delCartProductAll} 
                                            className='border px-4 py-2 uppercase font-semibold bg-primary text-[#fff] text-[12px] mt-[10px] rounded'>
                                                Xóa tất cả
                                            </button>
                                        </div>
                                        <div className=' sm:w-[35%] w-full'>
                                            <div className='bg-[#fff] mt-[10px] p-2'>
                                                <h2 className='text-[18px] '>Thanh toán</h2>
                                                <div className='flex-col flex'>
                                                    <span>Miễn phí vận chuyển</span>
                                                    <span className='flex items-center justify-between'>Tổng: 
                                                        <p className='font-semibold text-[red]'>
                                                            {cartProduct.totalAmount.toLocaleString('vi-VI', {style : 'currency', currency : 'VND'})}
                                                        </p>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <Link to={'/checkout'}>
                                                    <button 
                                                    className='border w-full px-4 py-2 uppercase font-semibold bg-primary text-[#fff] text-[12px] mt-[10px] rounded'>
                                                        Thanh toán
                                                    </button>
                                                </Link>
                                                <Link to={'/shop'}>
                                                    <button 
                                                    className='border w-full px-4 py-2 uppercase font-semibold bg-[#3863ff] text-[#fff] text-[12px] mt-[10px] rounded'>
                                                        Tiếp tục mua hàng
                                                    </button>    
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart
