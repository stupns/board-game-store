import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

<<<<<<< HEAD
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
=======
import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap'
>>>>>>> 9b6d810 (Merging frontend with backend.)
import {LinkContainer} from 'react-router-bootstrap';
import SearchBox from './SearchBox';

import {logout} from '../actions/userActions';


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (

        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>BoardShop</Navbar.Brand>
                    </LinkContainer>
<<<<<<< HEAD
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox/>
                        <Nav className="mx-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>
=======
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            className="mr-auto"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>

>>>>>>> 9b6d810 (Merging frontend with backend.)
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.is_staff && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}
<<<<<<< HEAD
=======
                            <SearchBox/>

>>>>>>> 9b6d810 (Merging frontend with backend.)
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>

    );
}

export default Header;