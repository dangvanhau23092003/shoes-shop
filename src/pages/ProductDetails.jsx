import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
    BsCartPlus,
    BsMessenger,
    BsFacebook,
    BsPinterest,
    BsHeart,
    BsHeartFill,
    BsTruck} 
from 'react-icons/bs'
import {BiLoaderCircle} from 'react-icons/bi'
import {AiFillStar, AiFillTwitterCircle } from 'react-icons/ai'
import {FaStarHalfStroke} from 'react-icons/fa6'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'

import Data from '../Data'
import ProductsList from '../components/UI/ProductsList'
import { toast } from 'react-toastify'
import ImageModal from '../components/ImageModal/ImageModal'

import useAuth from '../custom-hooks/useAuth'
import { favouriteActions } from '../redux/slices/favouriteSlice'


const ProductDetails = () => {
    const {id} = useParams();
    const disPatch = useDispatch()
    const [heart, setHeart] = useState(true) 
    const [tab, setTab] = useState('description')
    const [productsData, setProductsData] = useState([])
    const [reviews, setReviews] = useState([])
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [start, setStart] = useState(1)
    const [loading, setLoading] = useState(true)
    const [showImage, setShowImage] = useState(false)

    useEffect(() =>{
        const fetchProducts = async() => {
            const response = await fetch(`http://localhost:3031/products/${id}`)
            const data = await response.json()
            setProductsData(data)
        }
        fetchProducts()
    }, [id])

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    },[])

    
    const { 
        productName ,
        imgUrl,
        category,
        price,
        // shortDesc,
        // description,
        // avgRating,
        // reviews,
    } = productsData
    
    // const reviewsLength = productsData?.reviews?.length
    // console.log(reviewsLength)
    //add cart
    const addToCart = () => {
        disPatch(cartActions.addItem({
            id,
            productName,
            price,
            imgUrl
        }))
    }
    
    //actions favourite
    const addFavourite = () => {
        disPatch(favouriteActions.addFavouriteItem({
            id,
            productName,
            price,
            imgUrl
        }))

    }
    useEffect(() => {
        window.scroll(0, 0)
    },[productsData])
    
    // if (!productsData) {
    //     return(
    //         <section className='bg-[#b1b1b100] h-screen flex items-center z-30 justify-center'>
    //           <BiLoaderCircle 
    //             className='text-[40px] opacity-50 icon-loading'/>
    //         </section>
    //     )
    // }
    // Sản phẩm khác
    const filterOtherProducts = Data()
    // console.log(filterOtherProducts)
    const relatedProducts =  filterOtherProducts.filter(item => item.category === category)
    // console.log(relatedProducts)

    //Yêu thích  
    // const handleFortive = () => {
    //     setHeart(!heart)
    // }

    const handleFormReview = (e) => {
        e.preventDefault()

        const reviewsObj = {
            userName: name,
            evaluate: comment,
            start
        }   
        reviews.push(reviewsObj);
        setName('')
        setComment('')
        setStart(1)
        toast.success('Đánh giá thành công')

        if( name === '') {
            toast.error('Vui lòng nhập tên')
        }
        if( comment === '') {
            toast.error('Vui lòng nhập đánh giá')
        }
    }

    const handleShowImage = () => {
        setShowImage(!showImage)
    }
    //
    const { currentUser } = useAuth()

    return (
        <section className='bg-bg-hsl'> 
            {
                loading ? (<div className='bg-[#b1b1b100] h-screen flex items-center z-30 justify-center'>
                <BiLoaderCircle 
                className='text-[40px] opacity-50 icon-loading'/>
                </div>)  
            :
            <div className='relative mt-[70px] pb-[60px]'>
                <div className='relative flex items-center justify-center background-image h-[180px] bg-repeat bg-cover bg-center '>
                    <p className=' absolute text-[#9b9b9b] text-[30px] font-bold '>Details</p>
                </div>
                <div className='container mx-auto mt-[40px]'>
                    <div className='p-[4px] inline-block text-[14px]'>
                        <h1 className='flex flex-wrap items-center'> 
                            <Link 
                            className='text-[#0055aa] px-2'
                            to={'/'}>Trang chủ</Link> 
                                {'>'}
                                <p className='text-[#0055aa] px-2'>Chi tiết sản phẩm</p> 
                                {'>'} 
                                <p className='text-[#0055aa] px-2'>{productsData.category} </p> 
                                {'>'}
                                <p className='text-primary px-2'> {productsData.productName}</p> 
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2 bg-[#fff] p-4'>
                        <div className='w-full h-auto p-[4px]  '>
                            {/* IMAGE PRODUCT */}
                            <img 
                            onClick={handleShowImage} 
                            src={productsData.imgUrl} alt="" className='w-full h-[500px] object-cover cursor-zoom-in' />
                            <div className='flex flex-wrap items-center justify-around mt-[20px] '>
                                <span className='flex items-center gap-2 my-1 text-[15px] cursor-pointer  '>
                                    Chia sẻ:
                                    <BsMessenger className='text-[#3c63ee] text-[25px]'/>
                                    <BsFacebook className='text-[#2727ff] text-[25px]'/>
                                    <BsPinterest className='text-[#ff3535] text-[25px]'/>
                                    <AiFillTwitterCircle className='text-[#32c5ff] text-[30px]'/>
                                </span>
                                <span className='border-[#ccc] border h-[25px]  '></span>
                                <span className='flex items-center gap-3 my-1 text-[15px]  '>
                                    <p onClick={addFavourite}>
                                        {heart ? <BsHeart className='text-[25px] text-[#ff3535] cursor-pointer duration-300'/> : <BsHeartFill className='text-[25px] text-[#ff3535] cursor-pointer'/>}   
                                    </p>
                                    Yêu thích
                                </span>
                            </div>
                        </div>
                        <div className='p-[4px]'>
                            {/* name product */}
                            <h1 className='text-[20px] font-medium '>{productsData.productName}</h1>
                            <span className='flex items-center cursor-pointer mt-[0.625rem]  '>
                                <AiFillStar className='text-[#ffc120] text-[18px] ' />
                                <AiFillStar className='text-[#ffc120] text-[18px] ' />
                                <AiFillStar className='text-[#ffc120] text-[18px] ' />
                                <AiFillStar className='text-[#ffc120] text-[18px] ' />
                                <FaStarHalfStroke className='text-[#ffc120] text-[18px]'/>
                            </span>
                            {/* <span>({productsData.avgRating} ratings)</span> */}
                            <span className='flex items-center mt-[0.625rem] text-[14px] text-[#555] '>
                                Thương hiệu:
                                <p className='uppercase text-[red] font-semibold  '> {productsData.category}</p>
                            </span>
                            <div className='p-3 bg-bg-hsl mt-[0.625rem] '>
                                <span className='text-[red]  '>{productsData.price}₫</span>

                            </div>
                            <div className='mt-[0.625rem] text-[16px]  '>
                                {productsData.shortDesc}
                            </div>
                            <div className='mt-[0.625rem] flex'>
                                <h3 className='text-[#555] text-[14px]'>Vận chuyển:</h3> 
                                <div className='px-2'>
                                    <span className='flex items-center '>
                                        <p className='flex items-center px-2 text-[16px]'>
                                            <img 
                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/d9e992985b18d96aab90969636ebfd0e.png" 
                                            alt="" 
                                            className='h-6 px-[6px]' /> 
                                        Miễn phí vận chuyển</p> 
                                    </span>
                                    <div className='flex items-center'>
                                        <BsTruck />
                                        <span className='flex items-center justify-center px-2 text-[#555] text-[14px]'>
                                            Vận chuyển tới
                                        </span>
                                        <select className='' name="" id="">
                                            <option value="Đà Nẵng">Đà Nẵng</option>
                                            <option value="Đà Nẵng">Hồ Chí Minh</option>
                                            <option value="Đà Nẵng">Hà Nội</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                                
                            {/* button */}
                            <div className='flex flex-wrap gap-4 items-center mt-[0.625rem]'>
                                {/* add to cart */}
                                <button 
                                    onClick={addToCart}
                                    className='min-w-[250px] flex items-center justify-center rounded-[4px] border bg-primary hover:bg-[#7a90fb] duration-300 text-[#fff]'>
                                    <BsCartPlus className='text-[20px]' />
                                        <p className='my-3 ml-3'>Thêm Vào Giỏ Hàng</p>
                                </button>
                                {/* mua ngay */}
                                <Link to={'/cart'}>
                                    <button 
                                        className='min-w-[250px] flex items-center justify-center rounded-[4px] border-none bg-[#ccc] hover:bg-[#7a90fb] duration-300 text-[#000] hover:text-[#fff]'>
                                        <p className='my-3'>Mua Ngay</p>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* DESCRIPTION */}
                    <div className='mt-[80px] mx-2'>
                        <div className=''>
                            <div className='flex items-center gap-1 '>
                                <h4 
                                onClick={() => setTab('description')}
                                className={`${tab === 'description' ? 
                                    'px-3 py-2 border-t-2 border-b-2 border-[red] bg-[#f5f5f5] text-[14px] text-[#4d4d4d] uppercase font-semibold cursor-pointer duration-100' 
                                        :
                                    'px-3 py-2 border-none bg-[#fff] text-[14px] text-[#5a5a5a] uppercase font-semibold cursor-pointer duration-300'}`
                                }>
                                    Thông Tin Sản Phẩm
                                </h4>
                                {/*  */}
                                <h4 
                                onClick={() => setTab('reviews')}
                                className={`${tab === 'reviews' ?
                                    'px-3 py-2 border-t-2 border-b-2 border-[red] bg-[#f5f5f5] text-[14px] text-[#4d4d4d] uppercase font-semibold cursor-pointer duration-100' 
                                        : 
                                    'px-3 py-2 border-none bg-[#fff] text-[14px] text-[#5a5a5a] uppercase font-semibold cursor-pointer duration-300'}`
                                }>
                                    {/* Đánh giá ({productsData.reviews.length}) */}
                                    Đánh giá ({reviews.length})
                                </h4>
                            </div>     
                        
                            <div className='mt-[10px] border-[#ececec] border'>
                                {tab === 'description' ? 
                                    <p className='text-[#000] text-[16px] px-2'>{productsData.description}</p> 
                                    : 
                                    <>
                                    <div className='px-2'>
                                        {/* {
                                            productsData.reviews.map((review, index) => (          
                                                <div className='my-6' key={index}> 
                                                    <ul>
                                                        <li>
                                                            <div className='flex items-center'>
                                                                <img src={review.avatar} alt=""
                                                                className='h-[25px] w-[25px] rounded-full object-cover' />
                                                                <h6 className='px-2 font-medium'>{review.name}</h6>
                                                            </div>
                                                            <span className='text-[#ff9430] font-semibold'>{review.rating}(rating)</span>
                                                            <p>{review.text}</p>
                                                        </li>
                                                    </ul>
                                                </div>                                              
                                            ))
                                        }   */}
                                        {
                                            reviews.map((reviewsObj, index) => (          
                                                <div className='my-6 p-2 bg-[#fff]' key={index}> 
                                                    <ul>
                                                        <li>
                                                            <div className='flex items-center'>
                                                                
                                                                <img src={currentUser.photoURL} alt=""
                                                                className='h-[25px] w-[25px] rounded-full object-cover' />
                                                                <h6 className='px-2 font-medium'>{reviewsObj.userName}</h6>
                                                            </div>
                                                            <span className='text-[#ff9430] font-semibold flex items-center'>{reviewsObj.start} 
                                                            <AiFillStar className='text-[18px] text-[#d26e4b] cursor-pointer' /> </span>
                                                            <p>{reviewsObj.evaluate}</p>
                                                        </li>
                                                    </ul>
                                                </div>                                              
                                            ))
                                        }    
                                    </div>
                                    {/* <div>
                                        {
                                            reviews.map((reviewsObj)=> (
                                                <>
                                                <h3>{reviewsObj.userName}</h3>
                                                <p>{reviewsObj.evaluate}</p>
                                                </>
                                            ))
                                        }
                                    </div> */}
                                    
                                    </>
                                }
                            </div>
                        </div>
                        {/*  */}
                        <div className='mt-[20px] p-3 bg-[#fff] '>
                            <h2 className='font-semibold text-[18px] uppercase   '>Đánh Giá Sản Phẩm</h2>
                            <span className='font-semibold text-[#4c4c4c]'>Hãy là người đầu tiên nhận xét “{productsData.productName}” </span>
                            <form action="" onSubmit={handleFormReview} className='flex-col mt-[20px]  '>
                                <div className='mt-[20px] '>
                                    <h2 className='text-[16px]'>Đánh giá của bạn</h2>
                                    <div className='flex items-center mt-2 '>
                                        <span onClick={() => setStart(1)} className='border-r border-[#ccc] px-2'>
                                            {start ? <AiFillStar className='text-[18px] text-[#d26e4b] cursor-pointer' />:  <AiFillStar className='text-[#ccc] text-[18px] cursor-pointer' />}
                                        </span>
                                        <span onClick={() => setStart(2)} className='span-start flex items-center border-r border-[#ccc] px-2'>
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            {/* {start ? <p className='flex items-center'>
                                                        <AiFillStar className='text-[18px] text-[#d26e4b] cursor-pointer' /> 
                                                        <AiFillStar className='text-[18px] text-[#d26e4b] cursor-pointer' />              
                                                    </p>
                                                    :  <p className='flex items-center'>
                                                        <AiFillStar className='text-[18px] text-[#ccc] cursor-pointer' /> 
                                                        <AiFillStar className='text-[18px] text-[#ccc] cursor-pointer' />              
                                                        </p>} */}

                                        </span>
                                        <span onClick={() => setStart(3)} className='span-start flex items-center border-r border-[#ccc] px-2'>
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                        </span>
                                        <span onClick={() => setStart(4)} className='span-start flex items-center border-r border-[#ccc] px-2'>
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                        </span>
                                        <span onClick={() => setStart(5)} className='span-start flex items-center border-r border-[#ccc] px-2'>
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                            <AiFillStar className='start text-[#ccc] text-[18px] cursor-pointer' /> 
                                        </span>                           
                                    </div>
                                </div>

                                <div className='mt-[20px] '>
                                    <label className='text-[16px]'>Tên *</label>
                                    <input type="text"
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='border w-full h-[40px] rounded-sm px-2 outline-none border-[#ccc]' />
                                </div>

                                <div className='mt-[20px] '>
                                    <label className='text-[16px]' >Nhận xét của bạn *</label>
                                    <textarea 
                                    placeholder='Nhận xét của bạn'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    name="" id="" cols="30" rows="6"
                                    className='border w-full rounded-sm px-2 outline-none border-[#ccc]'>
                                    </textarea>
                                </div>
                                <div className='mt-[20px]'>
                                    <button type='submit' className='bg-primary text-[#fff] px-[35px] py-[10px] rounded hover:bg-[#090d8c] duration-300'>
                                        Gửi
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* Product */}
                        <div className='mt-[20px] mx-2'>
                            <div className='flex items-center justify-between '>
                                <h2 className='text-[14px] lg:text-[20px] uppercase'>Sản phẩm tương tự của shop</h2>
                                <Link to='/shop' className='flex items-center text-[14px]'>Xem tất cả<MdOutlineKeyboardArrowRight /></Link>
                            </div>
                            {/* PRODUCTS */}
                            <div className='mt-[20px]'>
                                <div className='mb-[40px]'>                                 
                                    <ProductsList                 
                                    data={relatedProducts} />                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SHOW IMAGE */}
                {
                    showImage && <ImageModal setShowImage={setShowImage} productsData={productsData} />
                }
            </div>
            }
        </section>
    )
}

export default ProductDetails


