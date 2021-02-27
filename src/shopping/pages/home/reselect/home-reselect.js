import { createSelector } from 'reselect';

const productSelector = state => state.product;

export const loadingProductSelector = createSelector(
  productSelector,
  item => item.loadingProduct
);

export const featuredSelector = createSelector(
  productSelector,
  item => {
    if(item.products.hasOwnProperty('featured')){
      return item.products.featured;
    }
    return [];
  }
);

export const latestSelector = createSelector(
  productSelector,
  item => {
    if(item.products.hasOwnProperty('latest')){
      return item.products.latest;
    }
    return [];
  }
);

export const topSellingSelector = createSelector(
  productSelector,
  item => {
    if(item.products.hasOwnProperty('top_selling')){
      return item.products.top_selling;
    }
    return [];
  }
)