// @Vendors
import { combineReducers } from 'redux';

// @reducers
import productsReducer from './productsReducer';

const AppReducer = combineReducers({
	productsReducer
});

export default AppReducer;
