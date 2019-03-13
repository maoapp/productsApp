import React from 'react';
import PropTypes from 'prop-types';

import styles from './Product.module.scss';

const Product = ({
  id,
  name,
  description,
  price,
  brand,
  stock,
  photo,
  categories,
  full,
}) => {
  const elipsis = description.length >= 100 ?
    `${description.substring(0, 100)}...` : description;
  const renderCategories = categories.map((elem, idx) => (
    <span
      key={elem}
    >
      {elem} {categories.length - 1 !== idx && <span> , </span>}
    </span>
  ));
  return (
    <div
      key={id}
      className={`
        ${styles.Product} ${full ? styles.Product_full : styles.Product_half}
      `}
    >
      <h3>
        {name}
      </h3>
      <p>
        {renderCategories} - {brand}
      </p>
      <div className={styles.Product_description}>
        <figure>
          <img src={photo} alt={name} />
        </figure>
        <div>
          <p>{elipsis}</p>
          <strong>Stock</strong>: <span>{stock}</span> <br />
          <strong>Price</strong>: <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

Product.defaultProps = {
  id: '',
  name: '',
  description: '',
  price: '',
  brand: '',
  stock: 0,
  photo: '',
  categories: [],
  full: true,
};

Product.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  brand: PropTypes.string,
  stock: PropTypes.number,
  photo: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  full: PropTypes.bool,
};

export default Product;
