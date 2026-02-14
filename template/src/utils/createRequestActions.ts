import { createAction } from '@reduxjs/toolkit';

export function createRequestActions<Req = void, Success = void, Fail = string>(
  actionName: string,
) {
  return {
    request: createAction<Req>(`${actionName}/request`),
    success: createAction<Success>(`${actionName}/success`),
    failure: createAction<Fail>(`${actionName}/failure`),
  };
}
