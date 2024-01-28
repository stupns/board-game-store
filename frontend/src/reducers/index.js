import {combineReducers} from 'redux';
import {
    productListReducers,
    productDetailsReducers,
    productDeleteReducers,
    productCreateReducers,
    productUpdateReducers,
    productReviewCreateReducers,
} from './productReducers';
import {cartReducers} from './cartReducers';
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderMyListReducer,
    orderListReducer,
    orderDeliverReducer,
} from './orderReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './userReducers';


const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    productReviewCreate: productReviewCreateReducers,

    cart: cartReducers,

    userLogin: userLoginReducer,
    userList: userListReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})

export default reducer;