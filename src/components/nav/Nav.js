// @vendors
import React from 'react';
import { NavLink } from 'react-router-dom';

// @styles
import styles from './Nav.module.scss';

const Nav = () => (
	<nav className={styles['Header__nav']}>
		<NavLink activeClassName={styles['Header__nav--activate']} exact to="" >HOME</NavLink>
		<NavLink activeClassName={styles['Header__nav--activate']} to="/products">PRODUCTS</NavLink>
		<NavLink activeClassName={styles['Header__nav--activate']} to="/clients">CLIENT</NavLink>
		<NavLink activeClassName={styles['Header__nav--activate']} to="/contacts">CONTACT</NavLink>
	</nav>
);

export default Nav;
