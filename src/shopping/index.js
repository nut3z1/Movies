import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Skeleton } from 'antd';
import configStore from './redux/store';

const { store, persistor } = configStore({});

const HomeComponent= lazy(() => import('./pages/home/index'));
const CartComponent= lazy(() => import('./pages/cart/index'));

const ShoppingCart = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Skeleton active />}
        persistor={persistor}
      >
        <Router>
          <Suspense
            fallback={<Skeleton active />}
          >
            <Switch>
              <Route path="/home">
                <HomeComponent/>
              </Route>
              <Route path="/cart">
                <CartComponent/>
              </Route>
              <Route exact path="/">
                <HomeComponent/>
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  )
}
export default ShoppingCart;