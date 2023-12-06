import React from 'react'
import {AiFillPhone, AiTwotoneMail} from 'react-icons/ai'
import {FaLocationDot} from 'react-icons/fa6'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <section>
      <div className='bg-[#0a1d37] w-full py-[50px]'>
        <div className='grid md:grid-cols-4 mx-2 gap-4 lg:container lg:mx-auto'>
            <div>
              <h1 className='text-[#fff] text-[20px] pb-6 font-semibold uppercase '>Hỗ trợ khách hàng</h1>
              <ul className='text-[#fff]'>
                <li className='py-[2px]'><a href="/">Tài khoản</a></li>
                <li className='py-[2px]'><a href="/">Thanh toán</a></li>
                <li className='py-[2px]'><a href="/">Giỏ hàng</a></li>
                <li className='py-[2px]'><a href="/">Kiểm tra đơn hàng</a></li>
              </ul>
            </div>
            <div>
              <h1 className='text-[#fff] text-[20px] pb-6 font-semibold uppercase '>Danh sách Menu</h1>
              <ul className='text-[#fff]'>
                <li className='py-[2px]'><a href="/">Trang chủ</a></li>
                <li className='py-[2px]'><a href="/">Tin tức</a></li>
                <li className='py-[2px]'><a href="/">Liên hệ</a></li>
                <li className='py-[2px]'><a href="/">Cửa hàng</a></li>
              </ul>
            </div>
            <div>
              <h1 className='text-[#fff] text-[20px] pb-6 font-semibold uppercase '>Hỗ trợ khách hàng</h1>
              <ul className='text-[#fff]'>
                <li className='py-[2px]'><a href="/">Tài khoản</a></li>
                <li className='py-[2px]'><a href="/">Thanh toán</a></li>
                <li className='py-[2px]'><a href="/">Giỏ hàng</a></li>
                <li className='py-[2px]'><a href="/">Kiểm tra đơn hàng</a></li>
              </ul>
            </div> 
            {/* lien he */}
            <div>
              <h1 className='text-[#fff] text-[20px] pb-6 font-semibold uppercase '>Liên hệ</h1>
              <ul className='text-[#fff]'>
                <li className='py-[2px]'>Chúng tôi chuyên cung cấp các sản phẩm chính hãng chất lượng tốt đạt chuẩn quốc tế</li>
                <li className='py-[2px] flex items-center'>
                  <FaLocationDot className='mr-4'/><a href="/">Đà Nẵng</a>
                </li>
                <li className='py-[2px] flex items-center'>
                  <AiFillPhone className='mr-4' /><a href="/">0123456789</a>
                </li>
                <li className='py-[2px] flex items-center'>
                  <AiTwotoneMail className='mr-4'/><a href="/">a@gmail.com</a>
                </li>
              </ul>
            </div>   
        </div>
      </div>
      <div className='bg-black w-full text-center p-2'>
        <span className='text-[#fff] text-[16px] '>© Bản quyền thiết kế {year} </span>
      </div>
    </section>
  )
}

export default Footer
