// @Vendors
import axios from 'axios';

// @Contants
import { API_URL, ENDPOINTS } from '../constants/constants';
import {
	POST_CONTACT_REQUEST,
	POST_CONTACT_SUCCESS,
	POST_CONTACT_FAILURE
} from '../constants/actionTypes';

const postContactDataRequest = () => ({
	type: POST_CONTACT_REQUEST
});

const postContactDataSuccess = () => ({
	type: POST_CONTACT_SUCCESS
});

const postContactDataFailure = () => ({
	type: POST_CONTACT_FAILURE
});

export const postContactData = data => dispatch => {
	const { CONTACT } = ENDPOINTS;
	const url = `${API_URL}/${CONTACT}`;

	dispatch(postContactDataRequest());
	axios.post(url, data)
		.then(res => postContactDataSuccess(res.message))
		.catch(() => dispatch(postContactDataFailure()));
};
