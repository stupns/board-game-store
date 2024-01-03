import React from 'react';
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';


function Header() {
    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                  <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >BoardShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav
                        className="mr-auto"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                      >
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                        </LinkContainer>
                      </Nav>
                      <Form className="d-flex">
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                      </Form>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
            </header>
        </div>
    );
}

export default Header;