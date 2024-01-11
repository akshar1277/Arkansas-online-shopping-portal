import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { userLogout } from '../features/userLoginSlice';
import { userDetailReset } from '../features/userDetailSlice';
const Header = () => {

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
  const dispatch=useDispatch()
  const logoutHandler=()=>{
    dispatch(userLogout())
    // dispatch(userDetailReset())

  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' data-bs-theme="dark" expand="lg" className="bg-body-tertiary" collapseOnSelect>
      <Container fluid>
        <LinkContainer to="/">
        <Navbar.Brand >ShopPro</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto ml-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           <LinkContainer  to="/cart">
            <Nav.Link><i className='fas fa-shopping-cart'></i>cart</Nav.Link>
           </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>


              </NavDropdown>
            ):(
              <LinkContainer to="/login">
              <Nav.Link ><i className='fas fa-user '></i>login</Nav.Link>
              </LinkContainer>

            )}


            
             
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header