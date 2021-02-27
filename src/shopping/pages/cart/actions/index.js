import * as types from './types';

export const addProductToCart = (idProduct) => ({
  type: types.ADD_CART,
  idProduct
});

export const changeQtyCart = (id, qty) => ({
  type: types.CHANGE_QTY,
  id,
  qty
});
export const removeItemCart = (id) => ({
  type: types.DELETE_ITEM_CART,
  id
});

export const startAddCart = (loading) => ({
  type: types.START_ADD_CART,
  loading
});
export const stopAddCart = (loading) => ({
  type: types.STOP_ADD_CART,
  loading
});
export const addCartSuccess = (data) => ({
  type: types.ADD_CART_SUCCESS,
  data
});
export const addCartFailure = (error) => ({
  type: types.ADD_CART_FAILURE,
  error
});
