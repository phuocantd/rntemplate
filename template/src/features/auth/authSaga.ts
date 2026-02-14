import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { authService } from '~services/api';
import { createRequestSaga } from '~utils';
import {
  deleteAccountActions,
  getProfileActions,
  getWalletActions,
  signInActions,
} from './authSlice';

const signInSaga = createRequestSaga(signInActions, authService.signIn);
const deleteAccountSaga = createRequestSaga(
  deleteAccountActions,
  authService.deleteAccount,
);
const getProfileSaga = createRequestSaga(getProfileActions, authService.getProfile);
const getWalletSaga = createRequestSaga(getWalletActions, authService.getWallet);

export default function* authSaga(): SagaIterator {
  yield takeLatest(signInActions.request, signInSaga);
  yield takeLatest(deleteAccountActions.request, deleteAccountSaga);
  yield takeLatest(getProfileActions.request, getProfileSaga);
  yield takeLatest(getWalletActions.request, getWalletSaga);
}
