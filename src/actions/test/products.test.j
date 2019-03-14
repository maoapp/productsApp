// @vendors
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// @actions
import { fetchProducts } from '../products';

// @Action types
import { 
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAILURE
} from '../../constants/actionTypes';

import mockFetch from '../../test/mockFunction/fetch';

// @Mocks
const mockState = {
	products: []
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
	productsReducer: mockState
});

const { 
	fetchSuccess, 
	fetchFailure, 
	JSON_PARSE_TIME
} = mockFetch;

describe('Products actions test suite', ()=> {
	beforeEach(() => {
		store.clearActions();
		jest.useRealTimers();
	});
  
	it('Should dispatch fetch and receive data on success', async done => {
		fetchSuccess(JSON.stringify({data: ['mockData'] }));
		await store.dispatch(fetchProducts());
		setTimeout(() => {
			expect(store.getActions()).toEqual([
				{ type: GET_PRODUCTS_REQUEST },
				{ type: GET_PRODUCTS_SUCCESS, payload: { data: ['mockData'] } }
			]);
			done();
		}, JSON_PARSE_TIME);
	});
  
	test('Should dispatch fetch and error on failure', async done => {
		fetchFailure();
		await store.dispatch(fetchProducts());
		setTimeout(() => {
			expect(store.getActions()).toEqual([
				{ type: GET_PRODUCTS_REQUEST },
				{ type: GET_PRODUCTS_FAILURE }
			]);
			done();
		}, JSON_PARSE_TIME);
	});
});
