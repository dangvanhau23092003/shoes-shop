import React, { useEffect, useState } from 'react'
import { AiFillEye, AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function AllProducts() {
    const [productData, setProductData] = useState([])

    useEffect(() =>{
        const fetchProducts = async() => {
            const response = await fetch('http://localhost:3031/products')
            const data = await response.json()
            setProductData(data)
        }
        fetchProducts()
    }, [])

    console.log(productData)
    
    const handleDel = async (id) => {
        await fetch(`http://localhost:3031/products/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const newPro = productData.filter(product => product.id !== id); 
                setProductData(newPro)
                toast.success('Xóa sản phẩm thành công')
            })
            .catch((error) => {
                console.log(error)
                toast.error('Xóa sản phẩm thất bại')
            })
    }

    return (
        <section>
            <div className='mt-[70px] ml-[260px]  '>
                <h1 className='py-[20px] text-[22px] uppercase'>Danh sách sản phẩm</h1>
                <span>Hiện tại có {productData.length} sản phẩm</span>
                <div className='mt-5'>
                    <Link to={'/dashboard/add-product'} className='border border-[#ccc] px-3 py-1 bg-[#24baff]'>
                        Add
                    </Link>
                </div>
                <div>
                    <table className='w-full bg-[#fff] mt-3 mb-[100px] border border-[#f2f2f2] text-[14px] '>
                        <thead className='border border-b border-[#717171] h-[40px]'>
                            <tr>
                                <th className='w-[150px] font-medium'>Tên sản phẩm</th>
                                <th className='w-[100px] font-medium'>Loại sản phẩm</th>
                                <th className='w-[80px] font-medium'>Hình ảnh</th>
                                <th className='font-medium'>Giá tiền</th>
                                <th className='w-[600px] font-medium'>Mô tả</th>
                                <th className='font-medium'>Hoạt động</th>
                            </tr>
                        </thead>
                        {
                            productData.map((product) => (
                                <tbody key={product.id} className=' h-[70px] border-b border-[#f2f2f2] hover:bg-[#f6f6f6] duration-300  '>
                                    <tr>
                                        <th className='w-[150px] font-medium'> {product.productName} </th>
                                        <th className='w-[100px] text-[red] font-medium'> {product.category} </th>
                                        <th className='w-[80px] text-center '>
                                            <img src={product.imgUrl} alt=""
                                                className='w-[55px] h-[55px] m-auto ' />
                                        </th>
                                        <th className='font-medium'> {product.price.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' })}</th>
                                        <th className='w-[600px] font-medium'> {product.description}</th>
                                        <th>
                                            <div className='flex items-center justify-center gap-4'>
                                                <Link to={`/dashboard/edit-product/${product.id}`} >
                                                    <AiFillEye className='cursor-pointer text-[18px]' />
                                                </Link>
                                                <button type='submit' onClick={() => handleDel(product.id)}>
                                                    <AiOutlineDelete className='cursor-pointer text-[18px]' />
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>
            </div>
        </section>
    )
}

export default AllProducts
