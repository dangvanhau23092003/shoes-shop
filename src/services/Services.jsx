import React from 'react'

//import serveicesData
import servicesData from '../assets/data/servicesData'

const Services = () => {
    return (
        <section className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-5 px-2'>
            {servicesData.map((service, index) => (
                <div key={index} className='group transition p-[4px]'>
                    <div
                        
                        className={`${service.bg} flex items-center p-3 rounded-[5px] cursor-pointer group-hover:scale-110 transition duration-700`}>
                        <div className='p-3 rounded-full text-center bg-black '>
                            <p className='text-[30px] text-[#fff] '>
                                {service.icon}
                            </p>
                        </div>
                        <div className='px-4'>
                            <h1 className='font-semibold uppercase text-[16px] '>{service.title}</h1>
                            <p className='mt-[10px] text-[14px] text-[#222] font-normal'> {service.subtitle} </p>
                        </div>
                    </div>
                </div>
            ))}


        </section>
    )
}

export default Services
