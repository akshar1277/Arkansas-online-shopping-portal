import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { cartAddItem } from "../features/cartSlice";
export const addToCart = (id,qty) => async () => {

    
    const { data } = await axios.get(`/api/products/${id}`)
    const dispatch = useDispatch()
    dispatch(cartAddItem({ data, qty }));
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

  }