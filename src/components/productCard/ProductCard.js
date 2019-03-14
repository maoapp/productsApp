// @vendors
import React from 'react';
import PropTypes from 'prop-types';

// @constants
import { GRID_ONE_COLUMN, GRID_TWO_COLUMNS } from './../../constants/constants';

// @components
import { Card, CardTitle } from 'react-md';

// @styles
import styles from './ProductCard.module.scss';

const ProductCard = ({
	brand,
	categories,
	description,
	displayList,
	id,
	name,
	photo,
	price,
	stock
}) => {

	const categoriesSplitted= categories.join(', ');
	const subtitle = `${categoriesSplitted} - ${brand}`;
	const grid = displayList ? GRID_ONE_COLUMN : GRID_TWO_COLUMNS;
	const gridStyle = displayList ? styles['card__containerList'] : styles['card__containerColumns'];
	
	return (
		<Card key={id} className={`md-cell md-cell--${grid} ${gridStyle}`}>
			<CardTitle title={name} subtitle={subtitle} />
			<div className={styles['card__containerBody']}>
				<div className={styles['card__imageContainer']}>
					<img className={styles['card__image']} src={photo} alt="" />
				</div>
				<div className={styles['card__containerText']}>
					<p>
						{description}
					</p>
					<p className={styles['card__containerTextParagraph']}>
                        Stock:
						<span className={styles['card__containerDescriptionParagraph']}>
							{stock}
						</span>
					</p>
					<p className={styles['card__containerTextParagraph']}>
                        Price:
						<span className={styles['card__containerDescriptionParagraph']}>
							{price}
						</span>
					</p>
				</div>
			</div>
		</Card>
	);
};

ProductCard.defaultProps = {
	id: '',
	name: '',
	description: '',
	price: '',
	brand: '',
	stock: 0,
	photo: '',
	categories: [],
	displayList: true,
};

ProductCard.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	price: PropTypes.string,
	brand: PropTypes.string,
	stock: PropTypes.number,
	photo: PropTypes.string,
	categories: PropTypes.arrayOf(PropTypes.string),
	displayList: PropTypes.bool,
};

export default ProductCard;
