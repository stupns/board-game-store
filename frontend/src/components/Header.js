import React from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown} from 'react-bootstrap'

function Header() {
    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                  <Container>
                    <Navbar.Brand href="/">BoardShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav
                        className="mr-auto"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                      >
                        <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        <Nav.Link href="/login"><i className="fas fa-user"></i>Login</Nav.Link>
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