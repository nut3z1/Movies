import {put, call, takeEvery} from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as api from '../../../services/api';
import * as types from '../actions/types';

function* getDataProductSaga(){
  try {
    yield put(actions.startGetDataProducts(true));
    const data = yield call(api.getListDataProducts);
    if(data){
      yield put(actions.getDataSuccess(data));
    } else {
      yield put(actions.getDataFailure({
        code: 404,
        message: 'Not found data'
      }));
    }
    yield put(actions.stopGetDataProducts(false));
  } catch(err) {
    yield put(actions.getDataFailure(err));
    yield put(actions.stopGetDataProducts(false));
  }
}

export default function* watchGetDataProductSaga() {
  yield takeEvery(types.GET_DATA_PRODUCTS, getDataProductSaga);
}