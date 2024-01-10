import React, { useState, useEffect } from 'react'
// import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from '../features/productSlice'


const HomeScreen = () => {
  // const [products,setProducts]=useState([])
  const dispatch = useDispatch()
  const { productList, loading, error } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {

    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const { data } = await axios.get('/api/products/')
        dispatch(fetchProductsSuccess(data));
      } catch (err) {

        dispatch(fetchProductsFailure(err.responsse && err.responsse.data.detail ? err.response.data.detail : err.message));
      }
    }






    // async function fetchProducts(){
    //   const {data}= await axios.get('/api/products/')
    //   console.log(data)
    //   dispatch(listProducts(data))
    // }

    fetchProducts()
  }, [dispatch])



  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {productList.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>


      }


    </div>
  )
}

export default HomeScreen