import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
    favouriteItem: localStorage.getItem('favouriteProduct')
                ? JSON.parse(localStorage.getItem('favouriteProduct')):[],
}

console.log(initialState)
//createSlice nhận trạng thái ban đầu
const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,

    reducers: {
        addFavouriteItem: (state, actions) => {
            // payload dữ liệu đc gửi đi
            const newFavourite = actions.payload
            console.log(newFavourite)
            const checkFavourite = state.favouriteItem.find((item) => item.id === newFavourite.id) 
            console.log(checkFavourite)
        
            if (!checkFavourite) {
                state.favouriteItem.push({
                    id: newFavourite.id,
                    productName: newFavourite.productName,
                    price: newFavourite.price,
                    imgUrl: newFavourite.imgUrl,
                })
            toast.success('Đã thêm vào danh sách yêu thích')
            } else {
                state.favouriteItem.find((item) => item.id === newFavourite.id)
                toast.success('Đã có trong danh sách yêu thích')
            }
            localStorage.setItem('favouriteProduct', JSON.stringify(state.favouriteItem))
            
        },
        deleteFavouriteItem: (state, actions) => {
            const delItem = actions.payload
            const checkDelFavourite = state.favouriteItem.find((item) => item.id === delItem.id)
            console.log(checkDelFavourite)
            if (checkDelFavourite) {
                state.favouriteItem = state.favouriteItem.filter((item) => item.id !== delItem.id)
            }
            localStorage.setItem('favouriteProduct', JSON.stringify(state.favouriteItem))
            toast.success('Xóa sản phẩm yêu thích thành công')
        },
    }
})

export const favouriteActions = favouriteSlice.actions

export default favouriteSlice.reducer
