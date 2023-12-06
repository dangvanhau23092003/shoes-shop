import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

// import productsData from '../assets/data/productsData'
import Helmet from '../components/Helmet/Helmet'
import ProductCart from '../components/UI/ProductCart'

const Shop = () => {
    const [productsData, setProductsData] = useState([])
    const [data, setData] = useState([])    
    const [nextItem, setNextItem] = useState(8)
    // const [products, setProducts] = useState([])

    // console.log(data)
    // console.log(productsData)
    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3031/products')
            const data = await response.json()
            setProductsData(data)
            setData(data)
        }
        fetchProducts();
    }, [])
    // Tìm kiếm sản phẩm
    //toLowerCase chuyễn đổi một chuỗi thành chữ thường
    // includes phân biệt chữ hoa chữ thường
    const handleOnChange = (value) => {
        const res = data.filter(item => item.productName.toLowerCase().includes(value))
        setProductsData(res)
    }
    //Xem thêm sản phẩm
    const handleLoading = () => {
        setNextItem(prev => prev + 4)
    }
    // Lọc sản phẩm
    const handleValue = (e) => {
        const filterValue = e.target.value
        const filterProductOnchange = data.filter(item => item.category === filterValue)
        setProductsData(filterProductOnchange)
        console.log(filterValue)
    }
  
    //// Lọc danh sách sản phẩm theo giá trị lọc
    // const danhsachLoc = productsData.filter((product) => {
        //     return product.item === filter
        // })
        // console.log(danhsachLoc)
        
        
        // const handleValue = (e) => {
        //     const filterValue = e.target.value
        //     // Lấy giá trị value khi chọn 
        //     // nếu giá trị value bằng với nike thì sẽ cập nhật lại phần tử hiện tại
        //     if (filterValue.includes('nike') || filterValue.includes('adidas')) {
        //         const filterValueProduct = productsData.filter((item) => {
        //             return item.category === filterValue;
        //         });
        //         setProductsData(filterValueProduct)
        //         // }
        //     }
        // }
            // if (filterValue === 'adidas') {
            //     const filterValueProduct = productsData.filter((item) => item.category === 'adidas')
            //     setProductsData(filterValueProduct)
            // }
        

        // if (filterValue === 'mlb') {
        //     const filterValueProduct = productsData.filter((item) => item.category === 'mlb')
        //     setProductsData(filterValueProduct)
        // }

        // if (filterValue === 'puma') {
        //     const filterValueProduct = productsData.filter((item) => item.category === 'puma')
        //     setProductsData(filterValueProduct)
        // }
    // }

    //1. return a < 0     
    //  a before b        
    //2. return a > 0  
    //  a after b
    //3. return 0
    // a và b đứng vị trí bất kì
    const handlePrice = (e) => {
        const valuePrice = e.target.value
        if (valuePrice === 'tang') {
            const valuePriceProduct = productsData.filter((product) => product.price)
            const increaseValue = valuePriceProduct.sort((a, b) => a.price - b.price)
            // console.log(valuePriceProduct)
            // console.log(tangValue)
            setProductsData(increaseValue)
        }

        if (valuePrice === 'giam') {
            const valuePriceProduct = productsData.filter(product => product.price)
            const reduceValue = valuePriceProduct.sort((a, b) => b.price - a.price)
            setProductsData(reduceValue)
        }
    }


    return <>
        <Helmet title={'Shop'}></Helmet>
        <section className='bg-bg-hsl'>
            <div className='mt-[70px] pb-[70px]'>
                <div className='relative flex items-center justify-center background-image h-[180px] bg-repeat bg-cover bg-center '>
                    <p className=' absolute text-[#9b9b9b] text-[30px] font-bold '>Shop</p>
                </div>
                <div className='container mx-auto w-full mt-[40px]'>
                    <div className='flex flex-wrap items-center justify-between mb-[40px] px-2 '>
                        <div className='py-2 flex items-center gap-3'>
                            <select 
                            onChange={handleValue} 
                            className='h-[35px] bg-primary text-[#fff] rounded-[6px] px-4 cursor-pointer' >
                                <option >Lọc theo danh mục</option>
                                <option value="nike">Nike</option>
                                <option value="adidas">Giày Adidas</option>
                                <option value="mlb">Giày Mlb</option>
                                <option value="puma">Giày Puma</option>
                                <option value="converse">Giày Converse</option>
                            </select>
                            <p className='hidden lg:block'>Hiện có {productsData.length} sản phẩm</p>
                        </div>
                        <div className='py-2'>
                            <select onChange={handlePrice} className='h-[35px] bg-primary text-[#fff] rounded-[6px] px-4' >
                                <option value="">Giá</option>
                                <option value="tang">Tăng dần</option>
                                <option value="giam">Giảm dần</option>
                            </select>
                        </div>
                        <div className='py-2' >
                            <form action="" className='flex relative w-[100%]'>
                                <input
                                    onChange={(e) => handleOnChange(e.target.value)}
                                    type="text"
                                    className='lg:w-[520px] w-[190px] h-[35px] border-2 border-primary pl-2 pr-[40px] rounded-md'
                                    placeholder='Tìm kiếm...' />
                                <span className='absolute right-0 bg-primary h-[35px] w-[35px] flex items-center justify-center cursor-pointer rounded-e-lg'>
                                    <AiOutlineSearch
                                        className=' text-[#fff] text-[20px]  ' />
                                </span>
                            </form>
                        </div>
                    </div>
                    {/* PRODUCTS */}
                    <div className='mb-[40px]'>
                        {/* product.length === 0 : kiểm tra xem mảng có rỗng hay ko */}
                        <div>
                            {/* {
                                products.length === 0 ? <h1 className='text-center'>Không tìm thấy sản phẩm</h1> :
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 w-full gap-4 px-2'>
                                        {products?.slice(0, nextItem)?.map((product, index) => (
                                            <div
                                                key={index}
                                                data-aos="fade-zoom-in"
                                                data-aos-delay="50"
                                                data-aos-duration="1000">
                                                <ProductCart item={product} />
                                            </div>
                                        ))}
                                    </div>
                            } */}
                                {/* {data.map((product) => ( */}
                            <div>
                                {/* {productsData.map((product, index) => ( */}
                                {productsData.length === 0 ? <h1 className='text-center my-[100px]'> Không tìm thấy sản phẩm </h1> :
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 w-full gap-4 px-2'  >
                                        {productsData?.slice(0, nextItem)?.map((product, index) => (
                                            <div key={index}
                                                data-aos="fade-zoom-in"
                                                data-aos-delay="50"
                                                data-aos-duration="1000">
                                                <ProductCart item={product} />
                                            </div>
                                        ))}
                                    </div>
                                } 
                            </div>
                        </div>
                            <div className='text-center mt-12' data-aos="fade-zoom-in">
                                {nextItem < productsData.length && productsData.length > 8 && (
                                <button
                                onClick={handleLoading}
                                className='px-6 py-2 rounded-md font-semibold bg-[#09caff] hover:bg-[#0c72b1] duration-300 text-[#fff]  '>Xem thêm</button>
                                )}
                             </div>
                </div>
                </div>
            </div>
        </section>
    </>
}

export default Shop
