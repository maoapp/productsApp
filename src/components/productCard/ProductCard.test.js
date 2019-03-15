// @vendors
import React from 'react';
import { shallow } from 'enzyme';

// @components
import ProductCard from './ProductCard';

describe('Product Card tests', () => {
	const props = {
		name: 'Product A',
		description: 'This product if for test a app',
		price: '5.16',
		brand: 'Larson, Welch and Feeney',
		stock: 98851,
		photo: 'http://lorempixel.com/640/480/fashion',
		categories: ['Tech','Services'],
		displayList: true
	};
  
	it('Should render a Card', () => {
		const wrapper = shallow(<ProductCard {...props} />);
		const card = wrapper.find('Card');

		expect(card.length).toBe(1);
	});

	it('Should render a grid of 1 column when the property displayList is true', () => {
		const wrapper = shallow(<ProductCard {...props} />);
		const card = wrapper.find('Card');
		const gridCellOneColumn = card.props().className.split(' ').includes('md-cell--12');

		expect(gridCellOneColumn).toBe(true);
	});

	it('Should render a grid of 2 column when the property displayList is false', () => {
		const wrapper = shallow(<ProductCard {...props} />);
		wrapper.setProps({displayList: false});
		const card = wrapper.find('Card');
		const gridCellTwoColumns = card.props().className.split(' ').includes('md-cell--6');

		expect(gridCellTwoColumns).toBe(true);
	});
  
	it('Should render a CardTitle', () => {
		const wrapper = shallow(<ProductCard {...props} />);
		const cardTitle = wrapper.find('CardTitle');

		expect(cardTitle.length).toBe(1);
	});
  
	it('Should render the product image correctly', () => {
		const wrapper = shallow(<ProductCard {...props} />);
		const image = wrapper.find('img');

		expect(image.length).toBe(1);
		expect(image.props().src).toBe(props.photo);
  });
  
  it('Should render the name correctly', () => {
    const wrapper = shallow(<ProductCard {...props} />);
    const { name } = props;
    const cardTitle = wrapper.find('CardTitle');
    const cardTitleProps = cardTitle.props();

    expect(cardTitleProps.title).toBe(name);
  });

  it('Should render the subtitle correctly', () => {
    const wrapper = shallow(<ProductCard {...props} />);
    const { brand, categories } = props;
    const cardTitle = wrapper.find('CardTitle');
    const cardTitleProps = cardTitle.props();
    const categoriesSplitted= categories.join(', ');
	  const subtitle = `${categoriesSplitted} - ${brand}`;

    expect(cardTitleProps.subtitle).toBe(subtitle);
  });
});
