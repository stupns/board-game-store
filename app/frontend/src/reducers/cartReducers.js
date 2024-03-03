import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
    CALCULATE_PRICES,
    UPDATE_ITEMS_PRICE,
} from '../constants/cartConstants';

const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: '0.00',
    shippingPrice: '0.00',
    taxPrice: '0.00',
    totalPrice: '0.00',
};

export const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x
                    )
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            };

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            };

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            };
        case UPDATE_ITEMS_PRICE:
            return {
                ...state,
                itemsPrice: action.payload,
            };

        case CALCULATE_PRICES:
            const calculatedPrices = action.payload;
            return {
                ...state,
                itemsPrice: calculatedPrices.itemsPrice,
                shippingPrice: calculatedPrices.shippingPrice,
                taxPrice: calculatedPrices.taxPrice,
                totalPrice: calculatedPrices.totalPrice,
            };

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            };

        default:
            return state;
    }
};