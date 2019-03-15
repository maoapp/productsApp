// @vendors
import React from 'react';
import { shallow } from 'enzyme';

// @Components
import Home from './Home';

describe('Home tests suite', () => {
	it('Should render a h1 tag', () => {
		const wrapper = shallow(<Home />);
		const h1 = wrapper.find('h1');

		expect(h1.text()).toBe('Home');
	});
});
