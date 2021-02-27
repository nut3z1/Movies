import * as types from './types';

export const getDataProducts = () => ({
  type: types.GET_DATA_PRODUCTS
});

export const startGetDataProducts = (loading) => ({
  type: types.START_GET_DATA_PRODUCTS,
  loading
});

export const stopGetDataProducts = (loading) => ({
  type: types.STOP_GET_DATA_PRODUCTS,
  loading
});
export const getDataSuccess = (products) => ({
  type: types.GET_DATA_PRODUCT_SUCCESS,
  products
});
export const getDataFailure = (error) => ({
  type: types.GET_DATA_PRODUCT_FAILURE,
  error
});