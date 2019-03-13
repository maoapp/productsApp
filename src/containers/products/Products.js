import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../../actions/products';

import Products from '../../components/pages/products/Products';

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
)(Products)
