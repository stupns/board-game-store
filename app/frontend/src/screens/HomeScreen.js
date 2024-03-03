import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
import {useLocation} from 'react-router-dom';


function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList;

    const location = useLocation();
    let keyword = location.search

    useEffect(() => {
        dispatch(listProducts(keyword))

    }, [dispatch, keyword])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        {products ? (
                            <Row>
                                {products.map(product => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product}/>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Message variant='info'>No products found.</Message>
                        )}
                        <Paginate page={page} pages={pages}/>
                    </div>
            }
        </div>
    );
}

export default HomeScreen;