// @action types
import {
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAILURE
} from '../../constants/actionTypes';

// @Reducer
import productsReducer from '../productsReducer';

const INITIAL_STATE = {
	error: false,
	success: false,
	isFetching: false,
	products: []
};

const productsMock = require('./../../test/mockData/products.json');

describe('Products reducer test suite', ()=>{
	it('should return the initial state', () => {
		const expected = INITIAL_STATE;
		expect(productsReducer(undefined, {})).toEqual(expected);
	});

	it('should return a new state with repos fetched', () => {
		const expected = { ...INITIAL_STATE, products: productsMock, isFetching: false, success: true };
		expect(productsReducer(undefined, { type: GET_PRODUCTS_SUCCESS, payload: productsMock})).toEqual(expected);
	});

	it('should return a new state with fetching in true', () => {
		const expected = { ...INITIAL_STATE, isFetching: true};
		expect(productsReducer(undefined, { type: GET_PRODUCTS_REQUEST})).toEqual(expected);
	});

	it('should return a new state with error of fetch', () => {
		const expected = { ...INITIAL_STATE, isFetching: false, error: true};
		expect(productsReducer(undefined, { type: GET_PRODUCTS_FAILURE})).toEqual(expected);
	});
});
