import React from 'react'
import useAuth from '../custom-hooks/useAuth'

function Profile() {
    const { currentUser } = useAuth('wwww')
    console.log(useAuth())
    console.log(currentUser)
    return (
        <section className='bg-bg-hsl'>
            <div className='mt-[70px] pb-[60px]  '>
                <div className='container mx-auto'>
                    <div className='flex items-center flex-col pt-[50px]'>
                    <h2 className=''>Trang cá nhân</h2>
                        <img src={currentUser.photoURL} 
                        className='w-[120px] h-[120px] object-cover border-4 border-[red] rounded-full  '
                        alt="" />
                        <div className='flex flex-col'>
                            <h1 className='text-center text-[22px]'>
                            {currentUser.displayName}
                            </h1>    
                            <span>Email:
                                {currentUser.email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
