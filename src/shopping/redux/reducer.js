import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import productReducer from '../pages/home/reducers/home-reducer';
import { cartReducer } from '../pages/cart/reducers/cart-reducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const configPersistProduct = {
  key: 'products-data',
  storage,
  whitelist: ['products']
}
const configPersistCart = {
  key: 'cart-data',
  storage,
  whitelist: ['dataCart', 'totalMoney', 'countItems']
}

const rootReducer = combineReducers({
  product: persistReducer(configPersistProduct,productReducer),
  cart: persistReducer(configPersistCart, cartReducer),
});
export default rootReducer;