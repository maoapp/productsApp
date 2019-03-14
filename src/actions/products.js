// @Vendors
import axios from 'axios';

// @Contants
import { API_URL, ENDPOINTS } from '../constants/constants';
import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAILURE,
} from '../constants/actionTypes';

const getProductsRequest = () => ({
	type: GET_PRODUCTS_REQUEST
});

const getProductsSuccessful = data => ({
	type: GET_PRODUCTS_SUCCESS,
	payload: data.products
});

const getProductsFailure = () => ({
	type: GET_PRODUCTS_FAILURE
});

export const fetchProducts = () => dispatch => {
	const { PRODUCTS } = ENDPOINTS;
	const url = `${API_URL}/${PRODUCTS}`;
  
	dispatch(getProductsRequest());
	axios.get(url)
		.then(res => dispatch(getProductsSuccessful(res.data)))
		.catch(() => dispatch(getProductsFailure()));
};
