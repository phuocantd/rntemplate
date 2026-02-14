import { createAction, type ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type RequestActions<Req = void, Success = void, Fail = string> = {
  typePrefix: string;
  request: ActionCreatorWithPayload<Req>;
  success: ActionCreatorWithPayload<Success>;
  failure: ActionCreatorWithPayload<Fail>;
};

export function createRequestActions<Req = void, Success = void, Fail = string>(
  typePrefix: string,
): RequestActions<Req, Success, Fail> {
  return {
    typePrefix,
    request: createAction<Req>(
      `${typePrefix}/request`,
    ) as ActionCreatorWithPayload<Req>,
    success: createAction<Success>(
      `${typePrefix}/success`,
    ) as ActionCreatorWithPayload<Success>,
    failure: createAction<Fail>(
      `${typePrefix}/failure`,
    ) as ActionCreatorWithPayload<Fail>,
  };
}
