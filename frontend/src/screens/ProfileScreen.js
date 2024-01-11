import React,{useState,useEffect} from 'react'
import {Link, redirect} from 'react-router-dom'
import {Form ,Butoon,Row,Col,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userDetailStart,userDetailSuccess,userDetailFail } from '../features/userDetailSlice'
import {updateProfileStart,updateProfileSuccess,userProfileFail,userProfileReset} from '../features/userUpdateSlice'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userLoginSuccess } from '../features/userLoginSlice'

const ProfileScreen = () => {
    const [name,setName]=useState('')
    const [variant,setVariant]=useState(0);
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

    let location = useLocation();
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const redirect=location.search ? location.search.split('=')[1]:'/'

    const userDetails=useSelector(state=>state.userDetail)
    const {user,loading,error}=userDetails
    const {userInfo}=useSelector(state=>state.userLogin)
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile

   
    const getUserDetail=(id)=>async()=>{
        try{
            dispatch(userDetailStart())
            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }

            }
            const {data} = await axios.get(`/api/users/${id}/`,config)
            dispatch(updateProfileSuccess(data))
           
        }catch(error){
            dispatch(userProfileFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
            setVariant(0);
        }
    }

    const updateUserProfile=(user)=>async()=>{
        try{
            dispatch(updateProfileStart())
            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }

            }
            const {data} = await axios.put(`/api/users/profile/update/`,user,config)
            dispatch(userDetailSuccess(data))
            dispatch(userLoginSuccess(data))
        }catch(error){
            dispatch(userDetailFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
            setVariant(0);
        }
    }

    
    useEffect(()=>{
        if(!userInfo){
           
            navigate('/login')
        }else{
            if(!user || !user.name || success ){
                dispatch(userProfileReset())
                dispatch(getUserDetail('profile'))
                
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,navigate,userInfo,user,success])


    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!=confirmpassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name':name,
                'email':email,
                'password':password
            }))
            setMessage('Your password is updated')
            setVariant(1);

        }
       


    }



  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant={variant ? 'success' :'danger'}>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>

              <Form.Group controlId='name' style={{ margin: '1rem 0' }}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                      type='name'
                      required
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='email' style={{ margin: '1rem 0' }}>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                      type='email'
                      required
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='password' style={{ margin: '1rem 0' }}>
                  <Form.Label> New Password</Form.Label>
                  <Form.Control
                      type='password'
                      
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>

              <Form.Group controlId='passwordConfirm' style={{ margin: '1rem 0' }}>
                  <Form.Label>confirm Password</Form.Label>
                  <Form.Control
                      type='password'
                     
                      placeholder='Confirm Password'
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>

              <Form.Group style={{margin:'1rem 0'}}>
            <Button type='submit' variant='primary'>
                Update
            </Button>
            </Form.Group>

        </Form>
        </Col>
        <Col md={3}>
            <h2>My Orders</h2>

        </Col>
    </Row>
  )
}

export default ProfileScreen