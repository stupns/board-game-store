import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {Row, Col, Button, Form} from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails} from '../actions/userActions';
import Loader from "../components/Loader";
import Message from "../components/Message";

function EditUserScreen() {
    const {id} = useParams();
    const userId = id

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    useEffect(() => {
        if(!user.name || user._id !== Number(userId)){
            dispatch(getUserDetails(userId))
        } else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user, userId])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                Go back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='isadmib'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>

                    </Form>
                )}
            </FormContainer>
        </div>

    );
}

export default EditUserScreen;