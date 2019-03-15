// @vendors
import React from 'react';
import { shallow } from 'enzyme';

// @Components
import Error from './Error';

describe('Error tests suite', () => {
	it('Should render a h1 tag', () => {
		const wrapper = shallow(<Error />);
		const h1 = wrapper.find('h1');

		expect(h1.text()).toBe('ERROR 404');
	});
});
