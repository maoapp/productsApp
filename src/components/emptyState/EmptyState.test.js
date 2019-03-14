// @vendors
import React from 'react';
import { shallow } from 'enzyme';

// @Components
import EmptyState from './EmptyState';

describe('Empty state tests', () => {
	const props = {
		state: '404',
		customMessage: 'Data not found'
	};
  
	it('Should render a 404 state', () => {
		const wrapper = shallow(<EmptyState {...props} />);
		const state = wrapper.find('.emptyState__state');

		expect(state.text()).toBe('404');
	});
    
	it('Should render a custom message', () => {
		const wrapper = shallow(<EmptyState {...props} />);
		const state = wrapper.find('.emptyState__message');

		expect(state.text()).toBe('Data not found');
	});
});
