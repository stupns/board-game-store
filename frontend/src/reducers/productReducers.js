import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,

    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,

    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
} from '../constants/productConstants';


export const productListReducers = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}

        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}

        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const productDetailsReducers = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state}

        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}

        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const productDeleteReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}

        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}

        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}

        default:
            return state
    }
}

export const productCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading: true}

        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}

        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}