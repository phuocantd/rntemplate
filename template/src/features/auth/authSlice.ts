import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  type AuthProfile,
  type AuthUser,
  type AuthWallet,
  type SignInPayload,
  type SignInResponse,
} from '~services/api';
import { buildRequestReducer } from '~utils/buildRequest';
import { createRequestActions } from '~utils/createRequestActions';

export interface AuthState {
  user?: AuthUser;
  profile?: AuthProfile;
  isLogged: boolean;
  token: string | null;
  wallet?: AuthWallet;
  location: AuthLocation;
  loading: boolean;
  error: string | null;
}

export interface AuthLocation {
  latitude: number;
  longitude: number;
  formatted_address: string;
  place_id: string;
}

const INITIAL_LOCATION: AuthLocation = {
  latitude: 0,
  longitude: 0,
  formatted_address: '',
  place_id: '',
};

export const INITIAL_STATE: AuthState = {
  user: undefined,
  profile: undefined,
  isLogged: false,
  token: null,
  wallet: undefined,
  location: INITIAL_LOCATION,
  loading: false,
  error: null,
};

function resetAuthSession(state: AuthState) {
  state.isLogged = false;
  state.token = null;
  state.user = undefined;
  state.profile = undefined;
  state.wallet = undefined;
}

// --- CREATE ACTION GROUPS ---
export const signInActions = createRequestActions<
  SignInPayload,
  SignInResponse,
  string
>('auth/signIn');
export const deleteAccountActions = createRequestActions('auth/deleteAccount');
export const getProfileActions = createRequestActions<void, AuthProfile, string>(
  'auth/getProfile',
);
export const getWalletActions = createRequestActions<void, AuthWallet, string>(
  'auth/getWallet',
);

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
        state.token = action.payload.token;
        state.user = action.payload.user;
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

    // --- WALLET ---
    buildRequestReducer(builder, getWalletActions, {
      onSuccess: (state, action) => {
        state.wallet = action.payload;
      },
    });
  },
});

export const { updateFields, logout } = authSlice.actions;
export default authSlice.reducer;
