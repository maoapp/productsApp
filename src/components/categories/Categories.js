import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_CATEGORIES } from '../../constants/constants';

import globalStyles from '../../assets//scss/index.module.scss';
import styles from './Categories.module.scss';

const categoryList = (categories, active) => {
  return (
    categories.map(category => 
      <Link className={styles.Category__list} key={category} to={category.toLowerCase() === ALL_CATEGORIES ? '/products' : `/products/${category.toLowerCase()}`}>
        <li className={active ? styles.Category__list__active : ''}>
          {category}
        </li>
      </Link>
    )
  )
}

const Categories = ({categories, activeCategory}) => (
  <nav className={styles.Category__nav}>
    <h4>Categories</h4>
    <ul className={`${globalStyles['md-list']} ${globalStyles['md-list--drawer']}`}>
      {categoryList(categories, activeCategory)}
    </ul>
  </nav>
)

export default Categories;
