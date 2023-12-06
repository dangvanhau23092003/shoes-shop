import React, { useState } from 'react'
import { AiOutlineUser, AiOutlineMail, AiOutlineLock , AiOutlinePhone} from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { BiLoaderCircle } from 'react-icons/bi'
import { PiAddressBookLight } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'

// FireBase
// ref()trả về một đối tượng StorageReference
// uploadBytesResumable tải tệp lên Google Cloud Storage
//  getDownloadURL trả về Url
// updateProfile cập nhật thông tin người dùng
// signInWithEmailAndPassword đăng nhập người dùng bằng email và password
// setDoc()thiết lập một tài liệu trong Firestore.
// doc trả về một đối tượng DocumentReference
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { auth } from '../firebaseConfig'
import { db } from '../firebaseConfig'
import { storage } from '../firebaseConfig'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'

function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [rePassword, setRePassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    // const [showRePassword, setShowRePassword] = useState(false)
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handlePassword = () => {
        setShowPassword(!showPassword)
    }

    const validate = () => {
        let result = true
        if (username === '' || username === null) {
            result = false;
            toast.warning('Vui lòng nhập tên người dùng')
        }
        if (email === '' || email === null) {
            result = false
            toast.warning('Vui lòng nhập email')
        }
        if (password === '' || password === null) {
            result = false
            toast.warning('VUi lòng nhập mật khẩu')
        }
        if (address === '' || address === null) {
            result = false
            toast.warning('Vui lòng nhập địa chỉ')
        }
        if (phone === '' || phone === null) {
            result = false
            toast.warning('Vui lòng nhập số điện thoại')
        }
        if (file === '' || file === null) {
            result = false
            toast.warning('Vui lòng chọn ảnh')
        }
        return result
    }

    const handleRegister = async(e) => {
        e.preventDefault();

        if(validate()) {
        setLoading(true)
         
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                console.log(userCredential)
                const user = await userCredential.user
    
                const storageRef = ref(storage, `images/${v4()}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                console.log(uploadTask)
                uploadTask.on( "state_changed",
                    (snapshot) => {},
                    (error) => {
                        console.log(error.message)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                            //Cập nhật profile
                            await updateProfile(user, {
                                displayName: username,
                                photoURL: downloadURL,
                            })
                            console.log("different place");
                            await setDoc(doc(db, "users", user.uid), {
                                uid: user.uid,
                                displayName: username,  
                                email,
                                photoURL: downloadURL,
                                address,
                                phoneNumber: phone       
                            })
                            .then(() => {
                                console.log('users has been created succesfully')
                            })
                            .catch(() => {
                                console.log('happeden an error')
                            })
                        })
                    }
                )
                setLoading(false)
                toast.success('Đăng ký thành công !!!')
                navigate('/login')
            } catch (error) {
                setLoading(false)
                toast.error("Đăng ký thất bại !!! ")
            }
        }
    }



    return (
        <section className='bg-bg-hsl'>
            <div className='pt-[130px] pb-[60px] p-2 '>
                {loading ? (<div className='bg-[#b1b1b100] h-screen flex items-center z-30 justify-center'>
                <BiLoaderCircle 
                className='text-[40px] opacity-50 icon-loading'/>
                </div>) : 
                <form onSubmit={handleRegister} >
                    <div className='max-w-[860px] m-auto flex shadow-2xl rounded-2xl overflow-hidden'>
                        <div className='sm:flex-1'>
                            <img
                                className='brightness-50 h-full object-cover sm:block hidden '
                                src="https://mcdn.coolmate.me/image/July2021/gia-custom-giay-bao-nhieu-1.jpg" alt="" />
                        </div>
                        <div className='flex-1 p-2'>
                            <h2 className='text-[30px] text-center font-semibold '>Register</h2>
                            <div>
                                <div className='mt-[10px] p-[6px] rounded flex items-center border border-[#ccc] w-full bg-[#fff]  '>
                                    <AiOutlineUser className='mr-2' />
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className='w-full outline-none '
                                        type="text" placeholder='Name'
                                         />
                                </div>
                                <div className='mt-[10px] p-[6px] rounded flex items-center border border-[#ccc] w-full bg-[#fff]  '>
                                    <AiOutlineMail className='mr-2' />
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full outline-none '
                                        type="email" placeholder='Email'  />
                                </div>
                                <div className='mt-[10px] p-[6px] rounded flex items-center border border-[#ccc] w-full bg-[#fff]  '>
                                    <AiOutlineLock className='mr-2' />
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full outline-none '
                                        type={`${showPassword ? 'text' : 'password'}`} placeholder='Password' 
                                    />
                                    <i className={`${showPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'} cursor-pointer text-[12px]`}
                                        onClick={handlePassword}></i>
                                </div>
                                <div className='mt-[10px] flex items-center justify-between gap-2 '>
                                    <div className='flex items-center p-[6px] border  border-[#ccc] w-full bg-[#fff] rounded  '>
                                        <PiAddressBookLight className='mr-2' />
                                        <input
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className='w-full outline-none '
                                            type="text" placeholder='Address' required />
                                    </div>
                                    <div className='flex items-center p-[6px] border  border-[#ccc] w-full bg-[#fff] rounded'>
                                        <AiOutlinePhone className='mr-2'/>
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className='w-full outline-none '
                                            type="number" placeholder='Phone' required />
                                    </div>
                                </div>
                                <div className='mt-[10px] p-[6px] rounded flex items-center border border-[#ccc] w-full bg-[#fff]  '>
                                    <RxAvatar className='mr-2' />
                                    <input
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className='w-full outline-none '
                                        type="file" />
                                </div>
                                <div className='mt-[20px] text-center'>
                                    <button type='submit' className='border-[#000] bg-primary hover:bg-[#4c73ff] duration-300 text-[#fff] px-[25px] py-[5px] rounded '>
                                        Register
                                    </button>
                                </div>
                                <div className='text-[14px] mt-[10px] text-center '>
                                    Bạn đã có tài khoản ?
                                    <Link to={'/login'} className='text-[red]'> Đăng nhập</Link>
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

export default Signup
