import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type AuthState } from '~types';
import { buildRequestReducer } from '~utils/buildRequest';
import {
  deleteAccountActions,
  getProfileActions,
  signInActions,
} from './auth.actions';
import { resetAuthSession } from './auth.helpers';

export const INITIAL_STATE: AuthState = {
  user: undefined,
  profile: undefined,
  isLogged: false,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    updateFields(state, action: PayloadAction<Partial<AuthState>>) {
      Object.assign(state, action.payload);
    },
    logout(state) {
      resetAuthSession(state);
    },
  },

  extraReducers: builder => {
    // --- SIGN IN ---
    buildRequestReducer(builder, signInActions, {
      onSuccess: (state, action) => {
        state.token = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          gender: action.payload.gender,
          image: action.payload.image,
        };
        state.isLogged = true;
      },
    });

    // --- DELETE ACCOUNT ---
    buildRequestReducer(builder, deleteAccountActions, {
      onSuccess: state => {
        resetAuthSession(state);
      },
    });

    // --- PROFILE ---
    buildRequestReducer(builder, getProfileActions, {
      onSuccess: (state, action) => {
        state.profile = action.payload;
      },
    });
  },
});

export const { updateFields, logout } = authSlice.actions;
export default authSlice.reducer;
