// @vendors
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// @constants
import { ALL_CATEGORIES } from '../../constants/constants';

// @styles
import styles from './Categories.module.scss';

const categoriesIcon = {
	tech: 'computer',
	services: 'build',
	office: 'folder',
	all: 'list'
};

const categoryList = (categories, active) => {
	return (
		categories.map(category => {
			const categoryLowerCase = category.toLowerCase();
			const route = category.toLowerCase() === ALL_CATEGORIES ? '/products' : `/products/${categoryLowerCase}`;

			return(
				<Link className={active === categoryLowerCase ? styles['category__list--active'] : styles['category__list']} key={category} to={route}>
					<i className={`${styles.navLinkCategories__icon} material-icons`}>
						{categoriesIcon[categoryLowerCase]}
					</i>
					{category}
				</Link>
			);
		}));
};

const Categories = ({categories, active}) => (
	<nav className={styles['category__nav']}>
		<h4>Categories</h4>
		<section className={styles['category__firstSection']}>
			{categoryList(categories.slice(0, 1), active)}
		</section>
		<section>
			{categoryList(categories.slice(1, categories.length), active)}
		</section>
	</nav>
);

Categories.propTypes = {
	active: PropTypes.string.isRequired,
	categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Categories;
