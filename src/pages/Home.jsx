import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'

//Services
import Services from '../services/Services'
//import Banner
import banner1 from '../assets/banner/banner1.png'
import banner2 from '../assets/banner/banner2.jpg'
import banner3 from '../assets/banner/banner3.jpg'

import ProductsList from '../components/UI/ProductsList'
// import productsData from '../assets/data/productsData'
import NewsList from '../components/UI/NewsList'

import Data from '../Data'

function Home() {
    const productsData = Data()

    // console.log(productsData)

    const [bannerIndex, setBannerIndex] = useState(0)
    const banners = [
        {
            id: 0,
            src: banner1,
            title: `ĐÓN CHỜ NGÀY 10.10 NGÀY SALE THƯƠNG HIỆU`,
        },
        {
            id: 1,
            src: banner2,
        },
        {
            id: 2,
            src: banner3,
        },
    ]
    
    // console.log(banners)
    // console.log(banners.title)
    //useEffect(): Sử dụng để thực thi các tác vụ khi banner được tải hoặc cập nhật.
    useEffect(() => {
        // Khởi tạo timer để chạy hiệu ứng chuyển động
        const interval = setInterval(() => {
            //Chuyển đổi banner
            const nextBanner = ((bannerIndex + 1) % banners.length)
            //dùng toán tử chia lấy dư
            // 0 : 3 %  0 ,
            // 1 : 3 %  1,
            // 2 : 3 %  2
            setBannerIndex(nextBanner)
        }, 3000)
        //Hủy thời gian khi bị xóa để tránh gây rò rỉ bộ nhớ
        return () => {
            clearInterval(interval)
        }
    }, [bannerIndex, banners.length])

    //iconArrowleft
    const iconArrowLeft = () => {
        setBannerIndex(bannerIndex - 1)
    }
    //iconArrowRight
    const iconArrowRight = () => {
        setBannerIndex(bannerIndex + 1)
    }

   
    //sản phẩm
    //mảng rỗng sản phẩm
    const [trendingProducts, setTrendingProducts] = useState([])
    const [bestSales, setBestSales] = useState([])
    const [accessory, setAccessory] = useState([])

    useEffect(() => {
        const filteredtrendingProducts = productsData.filter(item => item.category === 'nike')
        setTrendingProducts(filteredtrendingProducts)

        const filteredBestSales = productsData.filter(item => item.category === 'adidas')
        setBestSales(filteredBestSales)

        const filteredAccessory = productsData.filter(item => item.category === 'mlb')
        setAccessory(filteredAccessory)

    }, [productsData])

    return <>
        <Helmet title={'Home'}></Helmet>
        <section className='bg-bg-hsl'>
            <div className='lg:container mx-auto w-full mt-[70px]'>
                <div className='w-full relative '>
                    <div className='flex items-center img-hover ' >
                        <img
                            src={banners[bannerIndex].src}
                            alt="Banner"
                            className='w-full relative sm:h-[326px] h-[120px] hover:opacity-[0.9] cursor-pointer object-cover' />

                        <div className='hover-icon'>
                            {/* giảm ảnh */}
                            <div className='absolute left-2'>
                                <BsFillArrowLeftCircleFill
                                    onClick={iconArrowLeft}
                                    className='text-[25px] text-[#ccc] cursor-pointer'
                                />
                            </div>
                            {/* tăng ảnh */}
                            <div className='absolute right-2'>
                                <BsFillArrowRightCircleFill
                                    onClick={iconArrowRight}
                                    className='text-[25px] text-[#ccc] cursor-pointer'
                                />
                            </div>
                        </div>

                    </div>
                    {/* <div className='absolute text-center top-[30%] left-[220px] z-20'>
                        <p className='italic p-2 w-[270px] font-bold  text-[22px] text-[red]'>
                            {banners[bannerIndex].title}    
                        </p>       
                    </div> */}
                </div>
                <Services />
                {/* SẢN PHẨM THỊNH THÀNH */}
                <div className='mt-20 mb-[20px]  '>
                    <div className='text-center mb-[20px]'>
                        <h2 className='text-[26px] font-semibold '>NIKE</h2>
                    </div>
                    <ProductsList data={trendingProducts} />
                </div>
                {/* HÀNG TỐT NHẤT */}
                <div className='mt-20 mb-[20px]  '>
                    <div className='text-center  mb-[20px]'>
                        <h2 className='text-[26px] font-semibold '>ADIDAS</h2>
                    </div>
                    <ProductsList data={bestSales} />
                </div>

                <div className='pt-10'>
                    <img src={'https://bizweb.dktcdn.net/100/448/660/themes/852245/assets/large_banner_1.jpg?1697538558651'} alt="anhloi"
                        className='lg:w-full' />
                </div>
                {/* PHỤ KIỆN */}
                <div className='mt-20 mb-[20px]  '>
                    <div className='text-center  mb-[20px]'>
                        <h2 className='text-[26px] font-semibold '>MLB</h2>
                    </div>
                    <ProductsList data={accessory} />
                </div>
                {/* TIN TỨC */}
                <div className='mt-20 p-2  '>
                    <div className='text-center  mb-[20px]'>
                        <h2 className='text-[26px] font-semibold '>Tin tức</h2>
                    </div>
                    <h3 className='text-[18px] font-medium mb-[20px] '>Chúng tôi sẵn sàng cập nhật những tin tức mới nhất dành cho các bạn</h3>
                    <div>
                        <NewsList />
                    </div>
                </div>

            </div>
        </section>
    </>

}

export default Home
