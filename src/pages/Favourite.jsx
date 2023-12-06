import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { favouriteActions } from '../redux/slices/favouriteSlice'


function Favourite() {
    const favouriteProduct = useSelector((state => state.favourite))

    const dispatch = useDispatch()

    const deleteFavourite = (item) => {
        dispatch(favouriteActions.deleteFavouriteItem(
            item
        ))
    }

    return (
        <section className='bg-bg-hsl'>
            <div className='mt-[70px]'>
                <div className='relative flex items-center justify-center background-image h-[180px] bg-repeat bg-cover bg-center '>
                    <p className=' absolute text-[#9b9b9b] text-[30px] font-bold '>Favourite</p>
                </div>
                <div className='container mx-auto px-2'>
                    <div className='mt-[60px] pb-[60px]'>
                        <h1 className='text-[20px] font-semibold uppercase'>Danh sách yêu thích</h1>
                        <div className='mt-5'>
                            {favouriteProduct.favouriteItem.length === 0 ?
                                <div className='text-center'>
                                    <img src='https://barkit.vn/public/catalog/assets/img/empty-cart.webp' alt=''
                                        className='w-[250px] m-auto ' />
                                    <Link to={'/shop'}>
                                        <button className='border-2 border-[#f6933c] px-8 py-[4px] mt-2 inline-flex items-center'>
                                            <BsArrowLeft />
                                            <p className='px-3 '>Không có sản phẩm yêu thích</p>
                                            <BsArrowRight />
                                        </button>
                                    </Link>
                                </div>
                                :
                                <div className='font-medium'>
                                    <table className='w-full border border-[#f4f4f4]'>
                                        <thead className='h-[40px] bg-[#fff]'>
                                            <tr className='text-[14px]'>
                                                <th className='font-medium'>Tên sản phẩm</th>
                                                <th className='font-medium'>Ảnh</th>
                                                <th className='font-medium'>Giá</th>
                                                <th className='font-medium'>Xóa</th>
                                            </tr>
                                        </thead>
                                        {favouriteProduct.favouriteItem.map((item) => (
                                            <tbody key={item.id} className='border border-[#f4f4f4]'>
                                                <tr className='h-[65px] bg-[#fff] text-[14px]'>
                                                    <th className='font-medium max-w-[200px]'>
                                                        {item.productName}
                                                    </th>
                                                    <th className='font-medium'>
                                                        <div className='flex items-center justify-center'>
                                                            <Link to={`/product/${item.id}`}>
                                                                <img src={item.imgUrl} alt="" className='w-[55px] h-[55px] object-cover' />
                                                            </Link>
                                                        </div>
                                                    </th>
                                                    <th className='font-medium'>{item.price.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' })}</th>
                                                    <th>
                                                        <button onClick={() => deleteFavourite(item)}>
                                                            <AiOutlineDelete />
                                                        </button>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Favourite
