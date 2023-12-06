import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import favouriteSlice from './slices/favouriteSlice'
// store:  kho lưu trữ trạng thái
const store = configureStore(
    {
        reducer: {
            cart: cartSlice,
            favourite: favouriteSlice,
        },
    }
)

export default store