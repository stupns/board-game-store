import React, {useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../actions/cartActions';
// import Message from '../components/Message';
// import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
// import {Link} from 'react-bootstrap';

function CartScreen() {

    const location = useLocation()
    const {id} = useParams()
    const productId = id
    const qty = parseInt(new URLSearchParams(location.search).get('qty'))

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    const dispatch = useDispatch()

    console.log('cartItems', cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>
            Cart
        </div>
    );
}

export default CartScreen;