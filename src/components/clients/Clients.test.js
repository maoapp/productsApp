// @vendors
import React from 'react';
import { shallow } from 'enzyme';

// @Components
import Clients from './Clients';

describe('Clients tests suite', () => {
	it('Should render a h1 tag', () => {
		const wrapper = shallow(<Clients />);
		const h1 = wrapper.find('h1');

		expect(h1.text()).toBe('Client');
	});
});
