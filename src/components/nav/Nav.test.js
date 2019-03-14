import React from 'react';
import { shallow } from 'enzyme';

import Nav from './Nav';

describe('Nav tests', () => {

	it('The nav should has all navigation links', () => {
		const wrapper = shallow(<Nav />);
		const links = wrapper.find('NavLink');

		expect(links.length).toBe(4);
	});
});
