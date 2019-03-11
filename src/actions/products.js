import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from '../constants/actionTypes';

import axios from 'axios'
import { API_URL } from '../constants/constants';

const getProductsRequest = () => ({
    type: GET_PRODUCTS_REQUEST
  })


const getProductsSuccessful = data => (
  {
    type: GET_PRODUCTS_SUCCESS,
    payload: data.products
  }
)

const getProductsFailure = () => (
  {
    type: GET_PRODUCTS_FAILURE
  }
)

const fetchProducts = () => dispatch => {
  const url = `${API_URL}/products`;
  dispatch(getProductsRequest());
  axios.get(
    url
  ).then(res => dispatch(getProductsSuccessful(res.data))).catch(() => dispatch(getProductsFailure()))
  
}

export {
  fetchProducts
}
