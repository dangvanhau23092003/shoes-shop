import React from 'react'
import { Link } from 'react-router-dom'

function NewItem({item}) {
    return (
        <section>
            <Link to={'/tintuc'}>
                <div className='shadow-sm overflow-hidden mb-[60px]'> 
                    <div className='mb-2'>
                        <img src={item.image} alt="" className='h-[270px] w-full object-cover ' />
                    </div>
                    <div>
                        <div className='mb-2'>
                            <p className='text-[16px] font-semibold h-[45px] name-news overflow-hidden'>{item.title}</p>
                            <span className='text-[12px] text-[#6d6d6d] '> {item.date} </span>
                        </div>
                        <p className='h-[50px] text-[#6d6d6d] name-news overflow-hidden  '>
                            {item.content}
                        </p>
                    </div>
                </div>

            </Link>
        </section>
    )
}

export default NewItem
