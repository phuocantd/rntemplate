import { all } from 'redux-saga/effects';
import authSaga from '~features/auth/auth.saga';

export function* rootSaga() {
  yield all([authSaga()]);
}
