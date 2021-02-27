import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/index';
import * as types from '../actions/types';
import * as api from '../../../services/api';

function* getDataByIdSaga({idProduct}) {
  try {
    yield put(actions.startAddCart(true));
    const data = yield call(api.getDataProductById, idProduct);
    if(data){
      yield put(actions.addCartSuccess(data));
    } else {
      yield put(actions.addCartFailure({
        cod: 404,
        message: 'Not found data'
      }));
    }
    yield put(actions.stopAddCart(false));
  } catch (e) {
    yield put(actions.addCartFailure(e));
  }
}

export default function* watchAddCartSaga() {
  yield takeEvery(types.ADD_CART, getDataByIdSaga);
}