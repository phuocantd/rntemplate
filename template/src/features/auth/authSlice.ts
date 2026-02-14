import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { buildRequestReducer } from '~utils/buildRequest';
import { createRequestActions } from '~utils/createRequestActions';

export interface AuthState {
  user?: any;
  profile?: any;
  isLogged: boolean;
  token: string | null;
  wallet?: any;
  location: {
    latitude: number;
    longitude: number;
    formatted_address: string;
    place_id: string;
  };
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: AuthState = {
  user: undefined,
  profile: undefined,
  isLogged: false,
  token: null,
  wallet: undefined,
  location: {
    latitude: 0,
    longitude: 0,
    formatted_address: '',
    place_id: '',
  },
  loading: false,
  error: null,
};

// --- CREATE ACTION GROUPS ---
export const signInActions = createRequestActions<
  { email: string; password: string },
  { token: string; user: any },
  string
>('auth/signIn');
export const deleteAccountActions = createRequestActions('auth/deleteAccount');
export const getProfileActions = createRequestActions('auth/getProfile');
export const getWalletActions = createRequestActions('auth/getWallet');

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    updateFields(state, action: PayloadAction<Partial<AuthState>>) {
      Object.assign(state, action.payload);
    },
    logout(state) {
      state.isLogged = false;
      state.token = null;
      state.user = undefined;
      state.profile = undefined;
      state.wallet = undefined;
    },
  },
  extraReducers: builder => {
    // --- SIGN IN ---
    buildRequestReducer<
      AuthState,
      { email: string; password: string },
      { token: string; user: any },
      string
    >(builder, signInActions, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLogged = true;
    });

    // --- DELETE ACCOUNT ---
    buildRequestReducer<AuthState, void, void, string>(
      builder,
      deleteAccountActions,
      state => {
        state.isLogged = false;
        state.user = undefined;
        state.token = null;
      },
    );

    // --- PROFILE ---
    buildRequestReducer<AuthState, void, any, string>(
      builder,
      getProfileActions,
      (state, action) => {
        state.profile = action.payload;
      },
    );

    // --- WALLET ---
    buildRequestReducer<AuthState, void, any, string>(
      builder,
      getWalletActions,
      (state, action) => {
        state.wallet = action.payload;
      },
    );
  },
});

export const { updateFields, logout } = authSlice.actions;
export default authSlice.reducer;
