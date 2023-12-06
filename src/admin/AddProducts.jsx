import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'

function AddProducts() {
  const [productName, setProductName] = useState('')
  const [number, setNumber] = useState(0)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  console.log(imgUrl)
  const price = Number(number)
  console.log(typeof price)
  const products = []

  const navigate = useNavigate()

  // console.log(enterName)

  const formAddProduct = (e) => {
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

    fetch('http://localhost:3031/products', {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(product),
    })
     .then((response) => response.json())
     .then((data) => {
        products.push(data);

        navigate('/dashboard/all-products')      

        toast.success('Thêm mới thành công')

        setProductName('')
        setNumber('')
        setCategory('')
        setShortDesc('')
        setDescription('')
        setImgUrl('')
     })
     .catch ((error) => {
        console.log(error)
        toast.error('Thêm mới thất bại')
     })
  }

  // useEffect(() => {
  //   return () => {
  //     imgUrl && URL.revokeObjectURL(imgUrl.preview)
  //   }
  // }, [imgUrl])

  // const handleImageProduct = (e) => {
  //   const file = e.target.files[0];
  //   file.preview = URL.createObjectURL(file)
  //   setImgUrl(file)
  // }

  return (
    <section>
      <div className='mt-[100px] mb-[100px] ml-[280px]'>
        <h1>ADD PRODUCT</h1>
        <form action="" onSubmit={formAddProduct}>
          <div className='mt-[15px]  '>
            <input type="text" placeholder='Tên sản phẩm' required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className='min-w-[550px] h-[30px] border border-[#ccc] outline-none p-2 ' />
          </div>

          <div className='mt-[15px]'>
            <input type="number" placeholder='Giá ' required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className='min-w-[550px] h-[30px] border border-[#ccc] outline-none p-2 ' />
          </div>

          <div className='mt-[15px]'>
            <input type="text" placeholder='Loại sản phẩm ' required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='min-w-[550px] h-[30px] border border-[#ccc] outline-none p-2 ' />
          </div>

          <div className='mt-[15px]'>
            <textarea name="" id="" cols="30" rows="4" placeholder='Mô tả' required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className='min-w-[550px] border border-[#ccc] outline-none p-2 ' >
            </textarea>
          </div>

          <div className='mt-[15px]'>
            <textarea name="" id="" cols="30" rows="4" placeholder='Chi tiết sản phẩm' required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='min-w-[550px] border border-[#ccc] outline-none p-2 ' >
            </textarea>
          </div>

          <div className='mt-[15px]'>
            <input 
            type="text"
            placeholder='Nhập url ảnh'
            onChange={(e) => setImgUrl(e.target.value)}
            required
            className='min-w-[550px] h-[30px] border border-[#ccc] outline-none p-2 ' />
          </div>
          
          <div className='mt-[15px]'>
            {
              imgUrl ? <img src={imgUrl} alt=""
              className='w-[100px] h-[100px]  ' /> : '' 
            }
            
          </div>

          <div className='mt-[15px]'>
            <button type='submit' className='bg-[#29c2ff] hover:bg-[#2752ff] duration-300 text-[#fff] px-4 py-1 rounded'>
              Add
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddProducts
