import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Checkout() {
    const cartProduct = useSelector((state) => state.cart)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')

    const handlePay = () => {
        toast.success('Thanh toán thành công')
    }

    return (
        <section className=' bg-bg-hsl'>
            <div className='mt-[70px]  '>
                <div className='relative flex items-center justify-center background-image h-[180px] bg-repeat bg-cover bg-center '>
                    <p className=' absolute text-[#9b9b9b] text-[30px] font-bold '>Check Out</p>
                </div>
                <div className='container mx-auto mt-[60px] pb-[60px]  '>
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:flex gap-3 px-2'>
                        <div className='w-full'>
                            <h2 className='text-[22px]'>Thông tin thanh toán</h2>
                            <form action="">
                                <div className='mt-[12px]'>
                                    <label htmlFor="">Tên</label>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className='border border-[#ccc] w-full p-2 rounded outline-none'
                                        type="text" placeholder='Tên' required />
                                </div>
                                <div className='mt-[12px]'>
                                    <label htmlFor="">Email</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='border border-[#ccc] w-full p-2 rounded outline-none'
                                        type="email" placeholder='Email' required />
                                </div>
                                <div className='mt-[12px]'>
                                    <label htmlFor="">Số điện thoại</label>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className='border border-[#ccc] w-full p-2 rounded outline-none'
                                        type="number" placeholder='Số điện thoại' required />
                                </div>
                                <div className='mt-[12px]'>
                                    <label htmlFor="">Địa chỉ</label>
                                    <div className='flex items-center justify-between gap-2'>
                                        <select name='' className='border border-[#ccc] w-full p-2 rounded outline-none'>
                                            <option >Thành phố</option>
                                            <option value={address}>Đà Nẵng</option>
                                            <option value="">Hà Nội</option>
                                            <option value="">TP Hồ Chí Minh</option>
                                            <option value="">Hải Phòng</option>
                                        </select>
                                        <select name='' className='border border-[#ccc] w-full p-2 rounded outline-none'>
                                            <option >Quận</option>
                                            <option value="">Ngũ Hành Sơn</option>
                                            <option value="">Hoàng Mai</option>
                                            <option value="">Long Biên</option>
                                            <option value="">Hoàn Kiếm</option>
                                            <option value="">Bình Tân</option>
                                        </select>
                                        <select name='' className='border border-[#ccc] w-full p-2 rounded outline-none'>
                                            <option >Huyện</option>
                                            <option value="">Ba Vì</option>
                                            <option value="">Mỹ Đức</option>
                                            <option value="">Hòa Vang</option>
                                            <option value="">Củ Chi</option>
                                            <option value="">Hóc Môn</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-[12px]'>
                                    <label htmlFor="">Ghi chú</label>
                                    <textarea 
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className='border border-[#ccc] w-full p-2 rounded outline-none'
                                    name="" id="" cols="30" rows="4" placeholder='Ghi chú'>
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div className=' sm:w-[35%] '>
                            <div className='bg-[#fff] flex flex-col p-2'>
                                <span className='flex items-center justify-between mt-[10px]'>Tổng số lượng:
                                    <p className='font-semibold'>
                                        {cartProduct.totalQuantity} mặt hàng
                                    </p>
                                </span>
                                <span className='flex items-center justify-between mt-[10px]'>Tổng phụ:
                                    <p className='font-semibold text-[red]'>
                                        {cartProduct.totalAmount.toLocaleString('vi-VI', {style : 'currency', currency : 'VND'})}
                                    </p>
                                </span>
                                <span className='flex items-center justify-between mt-[10px]'>Đang chuyển hàng:
                                    <p>0 đ</p>
                                </span>
                                <span className='flex items-center justify-between mt-[10px]'>Tổng:
                                    <p className='font-semibold text-[red]'>
                                        {cartProduct.totalAmount.toLocaleString('vi-VI', {style : 'currency', currency : 'VND'})}
                                    </p>
                                </span>
                            </div>
                            <button
                                onClick={handlePay}
                                className='border w-full px-4 py-2 uppercase font-semibold bg-[#3863ff] text-[#fff] text-[12px] mt-[10px] rounded'>
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Checkout
