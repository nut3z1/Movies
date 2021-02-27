import { createSelector } from 'reselect';

const cartSelector = state => state.cart.dataCart;
const totalMoneySelector = state => state.cart.totalMoney;

export const getDataCarts = createSelector(
  cartSelector,
  item => item
);
export const getTotalMoneyCart = createSelector(
  totalMoneySelector,
  item => item
);