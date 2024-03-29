import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Row, Col, Button, Form} from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from "react-redux";
import {register} from '../actions/userActions';
import Loader from "../components/Loader";
import Message from "../components/Message";

function RegisterScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
            if (userInfo) {
                navigate(redirect)
            }
        }, [navigate, userInfo, redirect]
    )

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Password do not match.')
        } else {
            dispatch(register(name, email, password, navigate))
        }

    };
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='passwordConform'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>

                <Row className='py-3'>
                    <Col>
                        Have an Account?
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Sign In
                        </Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
    );
}

export default RegisterScreen;