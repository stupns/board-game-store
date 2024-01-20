import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listUsers, deleteUser} from '../actions/userActions';


function UserListScreen() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.is_staff) {
            dispatch((listUsers()))
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, successDelete])

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loading
                ? (<Loader/>)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            {users ? (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.isAdmin ? (
                                                <i className="fas fa-check" style={{color: 'green'}}></i>
                                            ) : (
                                                <i className="fas fa-check" style={{color: 'red'}}></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm'
                                                    onClick={() => deleteHandler(user._id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Users not found</td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    )}
        </div>
    );
}

export default UserListScreen;