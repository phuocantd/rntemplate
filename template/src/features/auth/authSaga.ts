import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authService } from '~services/api';
import {
  deleteAccountActions,
  getProfileActions,
  getWalletActions,
  signInActions,
} from './authSlice';

function* signInSaga(
  action: ReturnType<typeof signInActions.request>,
): SagaIterator {
  try {
    const res = yield call(authService.signIn, action.payload);
    yield put(signInActions.success(res));
  } catch (e: any) {
    yield put(signInActions.failure(e.message));
  }
}

function* deleteAccountSaga(): SagaIterator {
  try {
    yield call(authService.deleteAccount);
    yield put(deleteAccountActions.success());
  } catch (e: any) {
    yield put(deleteAccountActions.failure(e.message));
  }
}

function* getProfileSaga(): SagaIterator {
  try {
    const res = yield call(authService.getProfile);
    yield put(getProfileActions.success(res));
  } catch (e: any) {
    yield put(getProfileActions.failure(e.message));
  }
}

function* getWalletSaga(): SagaIterator {
  try {
    const res = yield call(authService.getWallet);
    yield put(getWalletActions.success(res));
  } catch (e: any) {
    yield put(getWalletActions.failure(e.message));
  }
}

export default function* authSaga(): SagaIterator {
  yield takeLatest(signInActions.request, signInSaga);
  yield takeLatest(deleteAccountActions.request, deleteAccountSaga);
  yield takeLatest(getProfileActions.request, getProfileSaga);
  yield takeLatest(getWalletActions.request, getWalletSaga);
}
