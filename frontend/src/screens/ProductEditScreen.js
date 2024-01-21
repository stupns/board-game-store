import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';

import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from '../actions/productActions';
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductEditScreen() {
    const {id} = useParams();
    const productId = id

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails


    useEffect(() => {

        if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name)
            setImage(product.image)
            setPrice(product.price)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product, productId, dispatch, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        //Update product
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>

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


                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='countinstock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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

export default ProductEditScreen;