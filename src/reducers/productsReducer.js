//@actiontypes
import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAILURE,
} from '../constants/actionTypes';

const initialState = {
	error: false,
	success: false,
	isFetching: false,
	products: [],
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_PRODUCTS_REQUEST:
		return {...state, isFetching: true};
	case GET_PRODUCTS_SUCCESS:
		return {
			...state,
			success: true,
			isFetching: false,
			products: action.payload
		};
	case GET_PRODUCTS_FAILURE:
		return {
			...state,
			isFetching: false,
			success: false,
			error: true
		};
	default:
		return state;
	}
};

export default productsReducer;
