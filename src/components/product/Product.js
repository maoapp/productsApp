import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavigationDrawer } from 'react-md';

import * as Actions from '../../actions/products';
import PropTypes from 'prop-types'

class Product extends React.Component {
  constructor() {
    super();

  }

  componentDidMount() {
    const { fetchProducts } = this.props;

    fetchProducts() 
  }

  renderCard = ({id, name, description, price, brand, photo}) => (
    <div key={id}>
      <div>{name}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>{brand}</div>
      <img src={photo} />
    </div>
  )

  render() {
    const { isFetching, products } = this.props;
    console.log(products, 'productos', typeof products)
    let content = null;

    if(isFetching) {
      content = <div>Loading</div>
    }

    if(products.length) {
      content = (
        products.map(product => this.renderCard(product))
      )
    }

    return (
      <NavigationDrawer
        drawerTitle="react-md with CRA"
        toolbarTitle="Welcome txxxo react-md"
      >
        {content}
      </NavigationDrawer>
    )
  }
}

Product.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  success: PropTypes.bool.isRequired
}

function mapStateToProps({ productsReducer }) {
  return {
    isFetching: productsReducer.isFetching,
    products: productsReducer.products,
    success: productsReducer.success
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
