import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import type { RequestActions } from './createRequestActions';

type RequestWorker<Req, Success> = (
  payload: Req,
) => Promise<Success> | Success;

type CreateRequestSagaOptions<Fail> = {
  mapError?: (error: unknown) => Fail;
};

function getDefaultError(error: unknown): string {
  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message.trim()
  ) {
    return error.message;
  }

  return 'Request failed';
}

export function createRequestSaga<Req, Success, Fail = string>(
  actions: RequestActions<Req, Success, Fail>,
  worker: RequestWorker<Req, Success>,
  options: CreateRequestSagaOptions<Fail> = {},
) {
  const { mapError } = options;

  return function* requestSaga(action: PayloadAction<Req>): SagaIterator {
    try {
      const response: Success = yield call(worker, action.payload);
      yield put(actions.success(response));
    } catch (error) {
      const failPayload = mapError
        ? mapError(error)
        : (getDefaultError(error) as Fail);
      yield put(actions.failure(failPayload));
    }
  };
}
