import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
// import productSlice from './features/productSlice'
import productSliceReducer from './features/productSlice'
import productDetailsReducer from './features/productDetailsSlice'
import cartSliceReducer from './features/cartSlice'
import userLoginSliceReducer from './features/userLoginSlice'
import userRegisterSliceReducer from './features/userRegisterSlice'
import userDetailSliceReducer from './features/userDetailSlice'
import userUpdateSliceReducer from './features/userUpdateSlice'
 

const cartItemsFromStorage=localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []
const userInfoFromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null

//console.log('STORAGE',cartItemsFromStorage);
const initialCartState = {
    cartItems: cartItemsFromStorage,
    
  };

const initalUserState={
    userInfo:userInfoFromStorage,
}


const store=configureStore({
    reducer:{
        productList:productSliceReducer,
        productDetails:productDetailsReducer,
        cart:cartSliceReducer,
        userLogin:userLoginSliceReducer,
        userRegister:userRegisterSliceReducer,
        userDetail:userDetailSliceReducer,
        userUpdateProfile:userUpdateSliceReducer
    },
    preloadedState:{
        cart:initialCartState,
        userLogin:initalUserState,

    },
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(), thunk],

    
})

export default store