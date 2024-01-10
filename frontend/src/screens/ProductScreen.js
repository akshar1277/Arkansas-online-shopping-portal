import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button,Card, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchProductDetailsStart,fetchProductDetailsSuccess,fetchProductDetailsFailure } from '../features/productDetailsSlice'
import { useNavigate } from "react-router-dom";
const ProductScreen = ({match}) => {

    const[qty,setQty]=useState(1)

    const {id}=useParams()
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
      );
    // const [product,setProduct]=useState([])
  
  useEffect(()=>{

    const fetchDetails = async () => {
        dispatch(fetchProductDetailsStart());
        try {
          const { data } = await axios.get(`/api/products/${id}`)
          dispatch(fetchProductDetailsSuccess(data));
        } catch (err) {
  
          dispatch(fetchProductDetailsFailure(err.responsse && err.responsse.data.detail ? err.response.data.detail : err.message));
        }
    }

    // async function fetchProduct(){
    //   const {data}= await axios.get(`/api/products/${id}`)
    //   setProduct(data)
    // }
      
    fetchDetails()
  },[dispatch,id])

  const navigate=useNavigate();
  const addToCartHandler = () =>{
    navigate(`/cart/${id}?qty=${qty}`)
    console.log('Add to cart:',id)
  }


    // const product=products.find((p)=>p._id==id)
  return (
    <div>
        <Link to='/' className='btn btn-light my-3 '>Go Back</Link>
        {loading ?
            <Loader/>
            : error
                ? <Message variant='danger'>{error}</Message>
                :(
                    <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
        
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                 <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price:{product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description:{product.description}
                            </ListGroup.Item>
                            
                        </ListGroup>
                        
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                      <Row>
                                        <Col>Qty</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Select
                                            as='select'
                                            value={qty}
                                            onChange={(e)=> setQty(e.target.value)}
                                            >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x)=>(
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Select>
                                        </Col> 
                                      </Row>  
                                    </ListGroupItem>
                                )}


                                <ListGroup.Item>
                                    <Row>
                                    <Button bsSize="large" onClick={addToCartHandler} disabled={product.countInStock==0} block >Add to Cart</Button>
                                    </Row>
                                   
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                )
        }
        
      

    </div>
  )
}

export default ProductScreen