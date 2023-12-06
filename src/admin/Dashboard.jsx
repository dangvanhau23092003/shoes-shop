import React from 'react'
import Data from '../Data'
import { Link } from 'react-router-dom'

function Dashboard() {
  const productsData = Data()

  return (
    <section className='bg-bg-hsl'>
      <div className='pt-[100px] pl-[200px] container mx-auto'>
        <h1>Dashboard</h1>
        <div className='grid grid-cols-4 mt-[20px]'>
          <div className='bg-[#54fd54] h-[120px] rounded-md p-4'>
            <span className='font-bold text-[20px] text-[#fff]  '>
              Tổng sản phẩm 
              <p>
              {productsData.length}  
              </p> 
            </span>
            <Link to={'/dashboard/all-products'} className='text-[#fff] p-2 bg-[#2d328f] w-full mt-2 rounded'>Xem chi tiết</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
