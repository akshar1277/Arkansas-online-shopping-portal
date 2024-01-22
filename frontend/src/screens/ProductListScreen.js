import React,{useState,useEffect} from 'react'
import {Link, redirect} from 'react-router-dom'
import {Form ,Butoon,Row,Col,Button,Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userListRequest,userListSuccess, userListFail, userListReset} from '../features/userListSlice'
import {productDeleteStart,productDeleteSuccess,productDeleteFailure} from '../features/productDeleteSlice'

import { LinkContainer } from 'react-router-bootstrap'
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from '../features/productSlice'



const ProductListScreen = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {productList,loading,error}=useSelector(state=>state.productList)
 
  const {loading:loadingDelete,success:successDelete,error:errorDelete}=useSelector(state=>state.productDelete)
 

  const { userInfo } = useSelector(state => state.userLogin)


  const fetchProducts =()=> async () => {
    dispatch(fetchProductsStart());
    try {
      const { data } = await axios.get('/api/products/')
      dispatch(fetchProductsSuccess(data));
    } catch (err) {

      dispatch(fetchProductsFailure(err.responsse && err.responsse.data.detail ? err.response.data.detail : err.message));
    }
  }

  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
      dispatch(fetchProducts())
    }else{
      navigate('/login')
    }
    
  },[dispatch,navigate,userInfo,successDelete])

  
const deleteProduct = (id) => async (dispatch, getState) => {
  try {
      dispatch(productDeleteStart())
      // const userInfo = getState().userLogin;
      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }

      }
      const { data } = await axios.delete(`/api/products/delete/${id}`,config)
      
       dispatch(productDeleteSuccess(data));
    

  } catch (error) {
      dispatch(productDeleteFailure(
          error.response && error.response.data.detail ? error.response.data.detail : error.message,
      ))
    
  }
}
  

 

  const deleteHandler=(id)=>{
    if(window.confirm('Are you sure you want to delete this product?')){
     
      dispatch(deleteProduct(id))
    }
    
  
  }

  const createProductHandler=(product)=>{
    //create product
  }





  return (
    <div>
      <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={()=>createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>

        </Col>

      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loading 
        ?( <Loader/>)
        :error
          ?(<Message variant='danger'>{error}</Message>)
          :(
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                </tr>
                
                
                
              </thead>
              <tbody>
                { productList.map(product=>(
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light'className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                       <Button variant='danger'className='btn-sm' onClick={()=>deleteHandler(product._id)} >
                          <i className='fas fa-trash'></i>
                        </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          )

    }
    </div>
  )
}

export default ProductListScreen