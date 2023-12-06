import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'

function EditProduct() {
    const { id } = useParams()
    const [productName, setProductName] = useState('')
    const [number, setNumber] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [shortDesc, setShortDesc] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    const price = Number(number)

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3031/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setProductName(data.productName)
            setNumber(data.price)
            setCategory(data.category)
            setDescription(data.description)
            setShortDesc(data.shortDesc)
            setImgUrl(data.imgUrl)
        })
    }, [])

    const formEditProduct = (e) => {
        e.preventDefault()
        //tạo đối tượng
        const product = {
            id: v4,
            productName,
            price,
            category,
            shortDesc,
            description,
            imgUrl
        }
        console.log(product)

        fetch(`http://localhost:3031/products/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then((res) => res.json())
            .then(() => {
                navigate('/dashboard/all-products')
                toast.success('Cập nhật thành công')
            })
            .catch((error) => {
                console.log(error)
                toast.error('Cập nhật thất bại')
            })
    }



    return (
        <section>
            <div className='mt-[100px] mb-[100px] ml-[280px]'>
                <h1>EDIT PRODUCT</h1>
                <form action="" onSubmit={formEditProduct}>
                    <div className='mt-[15px]  '>
                        <input type="text" placeholder='Tên sản phẩm' required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className='min-w-[650px] h-[30px] border border-[#ccc] outline-none p-2 ' />
                    </div>

                    <div className='mt-[15px]'>
                        <input type="number" placeholder='Giá ' required
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className='min-w-[650px] h-[30px] border border-[#ccc] outline-none p-2 ' />
                    </div>

                    <div className='mt-[15px]'>
                        <input type="text" placeholder='Loại sản phẩm ' required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='min-w-[650px] h-[30px] border border-[#ccc] outline-none p-2 ' />
                    </div>

                    <div className='mt-[15px]'>
                        <textarea name="" id="" cols="30" rows="5" placeholder='Mô tả' required
                            value={shortDesc}
                            onChange={(e) => setShortDesc(e.target.value)}
                            className='min-w-[650px] border border-[#ccc] outline-none p-2 ' >
                        </textarea>
                    </div>

                    <div className='mt-[15px]'>
                        <textarea name="" id="" cols="30" rows="5" placeholder='Chi tiết sản phẩm' required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='min-w-[650px] border border-[#ccc] outline-none p-2 ' >
                        </textarea>
                    </div>

                    <div className='mt-[15px]'>
                        <input
                            type="text"
                            placeholder='Nhập url ảnh'
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            required
                            className='min-w-[650px] h-[30px] border border-[#ccc] outline-none p-2 ' />
                    </div>

                    <div className='mt-[15px]'>
                        {
                            imgUrl ? <img src={imgUrl} alt=""
                                className='w-[100px] h-[100px] object-cover ' /> : ''
                        }

                    </div>

                    <div className='mt-[15px]'>
                        <button type='submit' className='bg-[#29c2ff] hover:bg-[#2752ff] duration-300 text-[#fff] px-4 py-1 rounded'>
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EditProduct
