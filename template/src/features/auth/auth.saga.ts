import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { authService } from '~services/api';
import { createRequestSaga } from '~utils';
import {
  deleteAccountActions,
  getProfileActions,
  signInActions,
} from './auth.actions';

const signInSaga = createRequestSaga(signInActions, authService.signIn, {
  mapError: error => {
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response &&
      error.response.data &&
      typeof error.response.data === 'object' &&
      'message' in error.response.data &&
      typeof error.response.data.message === 'string'
    ) {
      return error.response.data.message;
    }

    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      return error.message;
    }

    return 'Login failed';
  },
});
const deleteAccountSaga = createRequestSaga(
  deleteAccountActions,
  authService.deleteAccount,
);
const getProfileSaga = createRequestSaga(getProfileActions, authService.getProfile);

export default function* authSaga(): SagaIterator {
  yield takeLatest(signInActions.request, signInSaga);
  yield takeLatest(deleteAccountActions.request, deleteAccountSaga);
  yield takeLatest(getProfileActions.request, getProfileSaga);
}
