import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { Draft } from 'immer';

export function buildRequestReducer<
  State extends { loading: boolean; error?: string | null },
  ReqPayload extends unknown = unknown,
  SuccessPayload extends unknown = unknown,
  FailPayload extends unknown = string,
>(
  builder: any,
  actions: {
    request: ActionCreatorWithPayload<ReqPayload>;
    success: ActionCreatorWithPayload<SuccessPayload>;
    failure: ActionCreatorWithPayload<FailPayload>;
  },
  onSuccess?: (
    state: Draft<State>,
    action: PayloadAction<SuccessPayload>,
  ) => void,
  onFailure?: (state: Draft<State>, action: PayloadAction<FailPayload>) => void,
) {
  builder
    .addCase(actions.request, (state: Draft<State>) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      actions.success,
      (state: Draft<State>, action: PayloadAction<SuccessPayload>) => {
        state.loading = false;
        if (onSuccess) {
          onSuccess(state, action);
        }
      },
    )
    .addCase(
      actions.failure,
      (state: Draft<State>, action: PayloadAction<FailPayload>) => {
        state.loading = false;
        state.error = action.payload as unknown as string;
        if (onFailure) {
          onFailure(state, action);
        }
      },
    );
}
