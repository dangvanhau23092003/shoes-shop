import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'


//onAuthStateChanged lắng nghe thay đổi trạng thái xác thực người dùng
// lấy hàm gọi lại làm đối số
function useAuth() {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        })
    })

    return {
        currentUser
    }
}

export default useAuth
