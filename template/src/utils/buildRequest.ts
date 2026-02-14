import type { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import type { Draft } from 'immer';
import type { RequestActions } from './createRequestActions';

type RequestState = {
  loading: boolean;
  error?: string | null;
};

type RequestReducerOptions<
  State extends RequestState,
  ReqPayload,
  SuccessPayload,
  FailPayload,
> = {
  resetErrorOnRequest?: boolean;
  mapFailureToError?: (payload: FailPayload) => State['error'];
  onRequest?: (state: Draft<State>, action: PayloadAction<ReqPayload>) => void;
  onSuccess?: (
    state: Draft<State>,
    action: PayloadAction<SuccessPayload>,
  ) => void;
  onFailure?: (
    state: Draft<State>,
    action: PayloadAction<FailPayload>,
  ) => void;
};

function getDefaultError(payload: unknown): string | null {
  if (typeof payload === 'string') {
    return payload;
  }

  if (payload instanceof Error) {
    return payload.message;
  }

  return null;
}

export function buildRequestReducer<
  State extends RequestState,
  ReqPayload extends unknown = unknown,
  SuccessPayload extends unknown = unknown,
  FailPayload extends unknown = string,
>(
  builder: ActionReducerMapBuilder<State>,
  actions: RequestActions<ReqPayload, SuccessPayload, FailPayload>,
  options: RequestReducerOptions<State, ReqPayload, SuccessPayload, FailPayload> = {},
) {
  const {
    resetErrorOnRequest = true,
    mapFailureToError,
    onRequest,
    onSuccess,
    onFailure,
  } = options;

  builder
    .addCase(actions.request, (state: Draft<State>, action) => {
      state.loading = true;
      if (resetErrorOnRequest) {
        state.error = null;
      }

      onRequest?.(state, action);
    })
    .addCase(
      actions.success,
      (state: Draft<State>, action: PayloadAction<SuccessPayload>) => {
        state.loading = false;
        onSuccess?.(state, action);
      },
    )
    .addCase(
      actions.failure,
      (state: Draft<State>, action: PayloadAction<FailPayload>) => {
        state.loading = false;
        state.error = mapFailureToError
          ? mapFailureToError(action.payload)
          : (getDefaultError(action.payload) as State['error']);
        onFailure?.(state, action);
      },
    );
}
