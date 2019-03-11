import React from 'react';
import { shallow } from 'enzyme';

import Nav from './Nav';

describe('Nav tests', () => {

  it('The nav should has all navigation pages', () => {
    const wrapper = shallow(<Nav />);
    const links = wrapper.find('Link');

    expect(links.length).toBe(4);
  });
});

