// @vendors
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//@actions
import * as Actions from '../../actions/products';

//@components
import Products from '../../pages/products/Products';

const mapStateToProps = ({ productsReducer }) => {
	return {
		error: productsReducer.error,
		isFetching: productsReducer.isFetching,
		products: productsReducer.products,
		success: productsReducer.success
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(Actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Products);
