import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../actions/contact';

import Contact from '../../pages/contact/Contact';

const mapDispatchToProps = dispatch => {
	return bindActionCreators(Actions, dispatch);
};

export default connect(
	null,
	mapDispatchToProps
)(Contact);
