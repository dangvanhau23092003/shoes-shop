import React, { useState } from 'react'
import {AiOutlineMail, AiOutlineLock} from 'react-icons/ai'
import { BiLoaderCircle} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { toast } from 'react-toastify'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const validate = () => {
        let result = true
        if (email === '' || email === null) {
            result = false
            toast.warning('Vui lòng nhập email')
        }
        if (password === '' || password === null) {
            result = false
            toast.warning('Vui lòng nhập mật khẩu')
        }
        return result
    }

    const handleFormLogin = async(e) => {
        e.preventDefault()

        if (validate()){
            setLoading(true)
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                const user = userCredential.user
                console.log(user)
                toast.success('Đăng nhập thành công')
                navigate('/checkout')
            }catch{
                setLoading(false)
                toast.error('Đăng nhập thất bại !!!')
            }
        }
    }
 
    return (
        <section className='bg-bg-hsl'>
            <div className='pt-[130px] pb-[60px] p-2 '>
                {loading ?  (<div className='bg-[#b1b1b100] h-screen flex items-center z-30 justify-center'>
                <BiLoaderCircle 
                className='text-[40px] opacity-50 icon-loading'/>
                </div>) 
                : 
                <form onSubmit={handleFormLogin}>
                    <div className='max-w-[860px] m-auto flex shadow-2xl rounded-2xl overflow-hidden'>
                        <div className=' sm:flex-1'>
                            <img 
                            className='brightness-50 h-full object-cover sm:block hidden '
                            src="https://mcdn.coolmate.me/image/July2021/gia-custom-giay-bao-nhieu-1.jpg" alt="" />
                        </div>
                        <div className='flex-1 p-2'>
                            <h2 className='text-[30px] text-center font-semibold '>Login</h2>
                            <div>
                                <div className='mt-[10px] p-[6px] rounded flex items-center border border-[#ccc] w-full bg-[#fff]  '>
                                    <AiOutlineMail className='mr-2' />
                                    <input 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full outline-none '
                                    type="email" placeholder='Email' required/>
                                </div>
                                <div className='mt-[10px] p-[6px] rounded flex items-center border border-[#ccc] w-full bg-[#fff]  '>
                                    <AiOutlineLock className='mr-2' />
                                    <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className='w-full outline-none '
                                    type={`${showPassword ? 'text' : 'password'}`} placeholder='Password' required/>
                                    <i className={`${showPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'} cursor-pointer text-[12px] `} 
                                        onClick={handleShowPassword}></i>
                                </div>
                                <div className='text-[14px] mt-[10px] flex flex-col items-center justify-center '>
                                    <span className='text-center'>
                                        Bạn đã chưa có tài khoản ? 
                                        <Link to={'/signup'} className='text-[red]'> Đăng ký</Link>
                                    </span>
                                    <span>
                                        <input type="checkbox" />
                                        <Link to={'/'} className='underline' > Quên mật khẩu ? </Link>
                                    </span>
                                </div>
                                <div className='mt-[10px] text-center'>
                                    <button type='submit' className='border-[#000] bg-primary hover:bg-[#4c73ff] duration-300 text-[#fff] px-[25px] py-[5px] rounded '>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                }
            </div>
    </section>
    )
}

export default Login
