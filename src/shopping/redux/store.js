import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga';

const configPersistRoot = {
  key: 'config-root',
  storage,
  whitelist: ['product','cart']
}

const rootPersistReducer = persistReducer(configPersistRoot, rootReducer);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const configStore = (loadStore = {}) => {
  const store = createStore(
    rootPersistReducer,
    loadStore,
    applyMiddleware(
      sagaMiddleware,
      logger
    )
  )
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor }
}
export default configStore;