// @vendors
import React from 'react';
import { shallow } from 'enzyme';

// @Components
import Contact from './Contact';

describe('Contact form tests', () => {  
	it('Should render 4 inputs', () => {
		const wrapper = shallow(<Contact />);
		const inputs = wrapper.find('TextField');

		expect(inputs.length).toBe(4);
	});

	it('Should has a empty state with 4 fields', () => {
		const wrapper = shallow(<Contact />);
        
		expect(wrapper.state().firstName).toBe('');
		expect(wrapper.state().lastName).toBe('');
		expect(wrapper.state().email).toBe('');
		expect(wrapper.state().subject).toBe('');
	});
    
	it('Should onchange the name correctly', () => {
		const wrapper = shallow(<Contact />);
		const inputName = wrapper.find('TextField').first();
        
		inputName.simulate('change', 'mauricio');
		expect(wrapper.state().firstName).toBe('mauricio');
	});

	it('Should avoid submit the form when the fields have no data', () => {
		const wrapper = shallow(<Contact />);

		expect(wrapper.state().dataAvailable).toBe(false);
	});
    
	it('Should allow submit the form when the fields have data', () => {
		const wrapper = shallow(<Contact />);
		const inputName = wrapper.find('TextField').first();
		const inputLastName = wrapper.find('TextField').at(1);
		const inputEmail= wrapper.find('TextField').at(2);
		const inputSubject = wrapper.find('TextField').at(3);
        
		inputName.simulate('change', 'mauricio');
		inputLastName.simulate('change', 'arroyave');
		inputEmail.simulate('change', 'maopro16@hotmail.com');
		inputSubject.simulate('change', 'this test is important for me');

		expect(wrapper.state().dataAvailable).toBe(true);
	});
});
