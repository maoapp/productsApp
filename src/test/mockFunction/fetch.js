// @Constants
import { API_REQUEST_MAX_TIME } from './../../constants/constants';

const OVER_TIMEOUT = API_REQUEST_MAX_TIME + 100;

global.fetch = jest.fn();

/* eslint-disable prefer-promise-reject-errors */ 

// Helper to mock a success response (only once)
fetch.mockResponseSuccess = (body) => {
	fetch.mockImplementationOnce(
		() => Promise.resolve({status: 200, ok: true, json: () => Promise.resolve(JSON.parse(body))})
	);
};

// Helper to mock a failure response (only once)
fetch.mockResponseFailure = () => {
	fetch.mockImplementationOnce(
		() => Promise.resolve({status: 400, ok: false, json: () => Promise.resolve({errorDesc: ['mockError']})})
	);
};

// Helper to mock a timeout error(only once)
fetch.mockResponseTimeout = () => {
	fetch.mockImplementationOnce(() => (
		new Promise(resolve => {
			setTimeout(() => {
				resolve({status: 400, ok: false, json: () => Promise.resolve({errorDesc: ['mockError']})});
			}, OVER_TIMEOUT);
		}))
	);
};

// Helper to mock a wrong reply (only once)
fetch.mockResponseCrash = () => {
	fetch.mockImplementationOnce(
		() => Promise.resolve({status: 400, ok: false, json: () => Promise.resolve(JSON.parse('{'))})
	);
};

const apiTestHelper = {
	WRONG_CATCH_ERROR: {'error': 'Unexpected end of JSON input'},
	JSON_PARSE_TIME: 100,
  
	fetchSuccess: body => {
		fetch.mockResponseSuccess(body);
	},
  
	fetchFailure: () => {
		fetch.mockResponseFailure();
	},
  
	fetchTimeout: () => {
		fetch.mockResponseTimeout();
	}
};

export default apiTestHelper;
