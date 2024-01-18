import React, { useState, useEffect } from 'react'
import { Form, Butoon, Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { orderdetailsrequest,orderdetailssuccess,orderdetailsfail} from '../features/orderDetailSlice'



const OrderScreena = ({match}) => {

    const {id}=useParams()
    const orderId=id
    console.log(orderId)
    const dispatch = useDispatch()
   
    const { userInfo } = useSelector(state => state.userLogin)
    // console.log(userInfo)
    const navigate=useNavigate()


    const orderDetails=useSelector(state=>state.orderDetails)
    const {orderd,loading,error} = orderDetails
    // console.log(order)
    const neworderd= {...orderd,"itemPrice":'' }
    if(!loading && !error){
     

        neworderd.itemPrice=orderd.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
        
    }
    
    
    const getOrderDetails = (id) => async (dispatch, getState) => {
        try {
            dispatch(orderdetailsrequest())
            // const userInfo = getState().userLogin;
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }

            }
            const { data } = await axios.get(`/api/orders/${id}/`,config)
            console.log("ordreitems",data)
             dispatch(updateOrderDetails(data));
          

        } catch (error) {
            dispatch(orderdetailsfail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
          
        }
    }

    const updateOrderDetails = (orderDetails) => (dispatch) => {
        dispatch(orderdetailssuccess(orderDetails));
    };





    useEffect(()=>{
        if(!orderd || orderd._id !==  Number(id)){
            dispatch(getOrderDetails(id))
            console.log("helloooo")
        }

    },[])

  

  
   



    return loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ): (
        <div>
            <h1>Order: {orderd._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {orderd.shippingAddress.address},{orderd.shippingAddress.city}
                                {' '}
                                {orderd.shippingAddress.postalCode}
                                {' '}
                                {orderd.shippingAddress.country}


                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {orderd.paymentMethod}


                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {orderd.orderItems.length === 0 ? <Message variant='info'>
                                Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {orderd.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1} sm={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}



                        </ListGroup.Item>




                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summery</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${neworderd.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${orderd.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${orderd.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${orderd.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                        
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default OrderScreena