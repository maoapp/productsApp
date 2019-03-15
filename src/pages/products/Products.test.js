// @vendors
import React from 'react';
import { shallow } from 'enzyme';

// @constants
import { ALL_CATEGORIES } from '../../constants/constants';

// @components
import Products from './Products';

const products = require('./../../test/mockData/products.json');
const mockFunctionFecthProducts = jest.fn();

describe('Product page tests', () => {
	const props = {
		error: false,
		isFetching: false,
		products,
		success: false,
		match: { params: {}},
		fetchProducts: mockFunctionFecthProducts
	};
  
	it('Should render categories with all products', () => {
		const wrapper = shallow(<Products {...props} />);
		const categories = wrapper.find('Categories');

		expect(categories.props().active).toBe(ALL_CATEGORIES);
	});
  
	it('Should render  four categories', () => {
		const wrapper = shallow(<Products {...props} />);
		wrapper.setProps({
			products: [
				{
					id: '123',
					name: 'test',
					description: 'description test',
					price: '0.0',
					brand:'Gusikowski - Ebert',
					stock:44903,
					photo:'http://lorempixel.com/640/480/technics',
					categories:['Services, Tech, Office']
				}
			]
		});
    
		const categories = wrapper.find('Categories');
		expect(categories.props().categories.length).toBe(4);
	});
  
	it('Should render categories with office products', () => {
		const wrapper = shallow(<Products {...props} />);
		wrapper.setProps({
			match: {
				params: { category: 'office' }
			}
		});
		const categories = wrapper.find('Categories');

		expect(categories.props().active).toBe('office');
	});
  
	it('Should render the office category active', () => {
		const wrapper = shallow(<Products {...props} />);
		wrapper.setProps({
			match: {
				params: { category: 'office' }
			}
		});
		const categories = wrapper.find('Categories');

		expect(categories.props().active).toBe('office');
	});
  
	it('Should render the productCard correctly', () => {
		const wrapper = shallow(<Products {...props} />);
		const productCard = wrapper.find('.products__mainSection').find('ProductCard').first();
    
		expect(productCard.props().id).toBe(products[0].id);
	});
  
	it('Fetch products should be called and return two products', () => {
		const wrapper = shallow(<Products {...props} />);
		const productCard = wrapper.find('.products__mainSection').find('ProductCard');
    
		expect(productCard.length).toBe(2);
		expect(mockFunctionFecthProducts).toHaveBeenCalled();
	});

	it('should render a spinner when is fetching', () => {
		const wrapper = shallow(<Products {...props} />);
		wrapper.setProps({
			isFetching: true,
      products: [],
      error: false
		});
		const circularProgress = wrapper.find('CircularProgress');
  
		expect(circularProgress.length).toBe(1);
	});

	it('should render a spinner when is fetching', () => {
		const wrapper = shallow(<Products {...props} />);
		wrapper.setProps({
			error: true,
			products: []
		});
		const errorState = wrapper.find('Error');
  
		expect(errorState.length).toBe(1);
	});

	it('should change the displayList property when the icon of grid is clicked', () => {
		const wrapper = shallow(<Products {...props} />);
		const gridBlockControl = wrapper.find('i').first();
		const gridListControl = wrapper.find('i').at(1);
		gridListControl.simulate('click', {target: {value: true}});
		expect(wrapper.state().displayList).toBe(false);
    
		gridBlockControl.simulate('click', {target: {value: true}});
		expect(wrapper.state().displayList).toBe(true);
	});

	it('should change the searchInput value when the input change of value', () => {
		const wrapper = shallow(<Products {...props} />);
		const gridListControl = wrapper.find('input');
		gridListControl.simulate('change', {target: {value: 'Fresh'}});

		expect(wrapper.state().searchValue).toBe('Fresh');
	});
});
