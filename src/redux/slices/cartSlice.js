import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

//Trạng thái ban đầu
const initialState = {
    cartItem: localStorage.getItem('cartItem')
            ?JSON.parse(localStorage.getItem('cartItem'))
            :[],
    totalAmount: 0,
    totalQuantity: 0
}

console.log('Initial state', initialState);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    //state: trạng thái hiện tại
    //actions: hành động thêm sản phẩm vào giỏ hàng
    reducers: {
        addItem: (state, actions) => {
            const newItem = actions.payload;
            // Kiểm tra xem có sản phẩm nào trong giỏ hàng có cùng ID với sản phẩm mới hay không
            const existingitem = state.cartItem.find((item) => item.id === newItem.id)
            //cập nhật trạng thái số lượng
            console.log(existingitem)
            state.totalQuantity ++ 

            if(!existingitem) {
                state.cartItem.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            
            else {
                // Nếu sản phẩm đã có thì tăng số lượng lên
                existingitem.quantity++
                existingitem.totalPrice = Number(existingitem.totalPrice) + Number(newItem.price)
            }
            
            state.totalAmount = state.cartItem.reduce((total, item) => (
                total + Number(item.price) * Number(item.quantity)
                ),0)    
            toast.success('Thêm vào giỏ hàng thành công')
                
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
        },
        //Delete cart
        delItem: (state, actions) => {
            const productId = actions.payload.id
            const nextItem = state.cartItem.find(item => item.id === productId)

            if(nextItem) {
                state.cartItem = state.cartItem.filter(item => item.id !== productId)
                state.totalQuantity = state.totalQuantity - nextItem.quantity
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem))

            state.totalAmount = state.cartItem.reduce((total, item) => (
                total + Number(item.price) * Number(item.quantity)
            ),0)
            toast.success('Xóa sản phẩm thành công')
        },
        //delete all
        delAll: (state, actions) => {
            state.cartItem = []
            localStorage.removeItem("cartItem", JSON.stringify(state.cartItem))
            toast.success('Xóa giỏ hàng thành công')
        },
        //increaseQuantity
        increaseQuantity: (state, actions) => {
            const quantityId = actions.payload
            const itemIndex = state.cartItem.findIndex(item => item.id === quantityId.id)

            if (state.cartItem[itemIndex].quantity >= 0) {
                state.cartItem[itemIndex].quantity += 1
            }
            else {
                const tempProduct = {...actions.payload, quantity: 1}
                state.cartItem.push(tempProduct)
            }

            localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
        },
        // reduceQuantity
        //findIndex tìm kiếm các phần tử trong mảng
        //actions.payload chứa thông tin sản phẩm
        reduceQuantity: (state, actions) => {
            const quantityId = actions.payload
            const itemIndex = state.cartItem.findIndex(item => item.id === quantityId.id)
            // console.log(itemIndex)
            
            if (state.cartItem[itemIndex].quantity > 1) {
                state.cartItem[itemIndex].quantity -= 1;
                
                toast.error(`Giảm ${actions.payload.productName} thành công`)
            }
            else if (state.cartItem[itemIndex].quantity === 1) {
                state.cartItem=state.cartItem.filter((item) => item.id !== quantityId.id)
            }
            // state.totalAmount = state.cartItem.reduce((total, item) => (
            //     total + Number(item.price) * Number(item.quantity)
            // ),0)
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
        },
        getTotals(state, actions) {
            let {total, quantity} = state.cartItem.reduce((cartTotal, cartItem) => {
                const {price, quantity} = cartItem
                const itemTotal = price * quantity
                // console.log(price)
                // console.log(quantity)
                cartTotal.total += itemTotal
                cartTotal.quantity += quantity
                //trả về kq total và kq quality
                return cartTotal        
                },
                {
                    total: 0,
                    quantity: 0,
                }
            )   
            state.totalAmount = total
            state.totalQuantity = quantity
        }
    }
})

export const cartActions = cartSlice.actions

export const {getTotals} = cartSlice.actions

export default cartSlice.reducer