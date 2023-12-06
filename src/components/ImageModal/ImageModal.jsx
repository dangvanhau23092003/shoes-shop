import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function ImageModal({ setShowImage, productsData }) {
    return (
        <div>
            {
                <div className='fixed left-0 top-0 w-full h-full bg-opacity-80 bg-[#0d0d0d] z-50 duration-700'>
                    <AiOutlineClose onClick={() => setShowImage(false)}
                        className='fixed right-0 top-0 z-50 bg-[#fff] hover:bg-[red] text-[38px] hover:text-[#fff] duration-300 cursor-pointer' />
                    <div className='bg-[#fff] lg:w-[550px] lg:h-[550px] w-[300px] h-[300px] m-auto mt-[100px] p-3 rounded duration-700' >
                        <img
                            src={productsData.imgUrl} alt={productsData.productName}
                            className='mr-auto w-full h-full flex items-center justify-center ' />
                    </div>
                </div>
            }
        </div>
    )
}

export default ImageModal
