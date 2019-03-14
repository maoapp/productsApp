// @Vendors
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

// @Container
import Products from '../Products';

// @Mocks
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const productsMock = require('../../../test/mockData/products.json');

const mockInitialState = {
	error: false,  
	isFetching: false,
	products: [],
	success: false
};

const mockSuccessState = {
	error: false,  
	isFetching: false,
	products: productsMock,
	success: true
};
  
const mockLoadingState = {
	error: false,
	isFetching: true,
	products: [],
	success: false
};
  
const mockErrorState = {
	error: true,
	isFetching: false,
	products: [],
	success: false
};

const store = mockStore({
	productsReducer : mockInitialState
});

const successStore = mockStore({
	productsReducer: mockSuccessState
});

const loadingStore = mockStore({
	productsReducer: mockLoadingState
});

const errorStore = mockStore({
	productsReducer: mockErrorState
});

describe('Products container test suite', () => {
	it('should has a connect', () => {
		const wrapper = shallow(<Provider store={store}><Products /></Provider>);

		expect(wrapper.find('Connect(Products)')).toHaveLength(1);
	});
    
	it('should has initial store set correctly', () => {
		const wrapper = shallow(<Products store={store}/>);
		const emptyArray = [];

		expect(wrapper.props().error).toBe(false);
		expect(wrapper.props().isFetching).toBe(false);
		expect(wrapper.props().products).toEqual(emptyArray);
	});
    
	it('should has successful store set correctly', () => {
		const wrapper = shallow(<Products store={successStore}/>);
        
		expect(wrapper.props().error).toBe(false);
		expect(wrapper.props().isFetching).toBe(false);
		expect(wrapper.props().products).toEqual(productsMock);
	});
    
	it('should has loading store set correctly', () => {
		const wrapper = shallow(<Products store={loadingStore}/>);
		const emptyArray = [];
        
		expect(wrapper.props().error).toBe(false);
		expect(wrapper.props().isFetching).toBe(true);
		expect(wrapper.props().products).toEqual(emptyArray);
	});
    
	it('should has error store set correctly', () => {
		const wrapper = shallow(<Products store={errorStore}/>);
		const emptyArray = [];
        
		expect(wrapper.props().error).toBe(true);
		expect(wrapper.props().isFetching).toBe(false);
		expect(wrapper.props().products).toEqual(emptyArray);
	});
});
