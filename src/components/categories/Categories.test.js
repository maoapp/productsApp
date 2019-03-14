// @vendors
import React from 'react';
import { shallow } from 'enzyme';

// @Components
import Categories from './Categories';

describe('Categories tests', () => {
	const props = {
		active: 'all',
		categories: ['tech', 'services', 'office', 'all']
	};
  
	it('Should render 4 categories', () => {
		const wrapper = shallow(<Categories {...props} />);
		const link = wrapper.find('Link');

		expect(link.length).toBe(4);
	});
    
	it('Should render tech category active', () => {
		const wrapper = shallow(<Categories {...props} />);
		wrapper.setProps({active: 'tech'});
		const link = wrapper.find('Link').first();

		expect(link.props().className).toBe('Category__list--active');
	});
});
