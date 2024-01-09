import { createSlice } from "@reduxjs/toolkit";

const initialState={
    productList:[],
    loading:false,
    error:null,
};

const productSlice=createSlice({
    name:"productList",
    initialState,
    reducers:{
        fetchProductsStart(state){
            state.loading=true;
            state.error=null;
        },
        fetchProductsSuccess(state,action){
            state.loading=false;
            state.productList=action.payload;
        },
        fetchProductsFailure(state,action){
            state.loading=false;
            state.error=action.payload;
        }

    },
});

export default productSlice.reducer;

export const {fetchProductsStart,fetchProductsSuccess,fetchProductsFailure} = productSlice.actions