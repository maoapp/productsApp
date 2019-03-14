// @Vendors
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';

// @Container
import Contact from '../../contact/Contact';

// @Mocks
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Contact container test suite', () => {
	it('should has a connect', () => {
		const wrapper = shallow(<Provider store={store}><Contact /></Provider>);

		expect(wrapper.find('Connect(Contact)')).toHaveLength(1);
	});
});
