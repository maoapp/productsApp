import React from 'react';
import { Link } from 'react-router-dom';


import styles from './styles.scss';

const Nav = () => (
  <nav style={styles.Header__nav}>
    <Link to="/">HOME</Link>
    <Link to="/clients">CLIENTS</Link>
    <Link to="/products">PRODUCTS</Link>
    <Link to="/contacts">CONTACT</Link>
  </nav>
);

export default Nav;
