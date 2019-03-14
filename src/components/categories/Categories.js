// @vendors
import React from 'react';
import { Link } from 'react-router-dom';

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
				<Link className={active === categoryLowerCase ? styles['Category__list--active'] : styles['Category__list']} key={category} to={route}>
					<i className={`${styles.navLinkCategories__icon} material-icons`}>
						{categoriesIcon[categoryLowerCase]}
					</i>
					{category}
				</Link>
			);
		}));
};

const Categories = ({categories, active}) => (
	<nav className={styles['Category__nav']}>
		<h4>Categories</h4>
		<section className={styles['Category__section']}>
			{categoryList(categories, active)}
		</section>
	</nav>
);

export default Categories;
