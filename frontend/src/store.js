import {configureStore} from '@reduxjs/toolkit'

// import productSlice from './features/productSlice'
import productSliceReducer from './features/productSlice'
import productDetailsReducer from './features/productDetailsSlice'
import cartSliceReducer from './features/cartSlice'
import {thunk} from 'redux-thunk'

 

const cartItemsFromStorage=localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []

//console.log('STORAGE',cartItemsFromStorage);
const initialCartState = {
    cartItems: cartItemsFromStorage,
  };


const store=configureStore({
    reducer:{
        productList:productSliceReducer,
        productDetails:productDetailsReducer,
        cart:cartSliceReducer,
    },
    preloadedState:{
        cart:initialCartState,
    },
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(), thunk],

    
})

export default store