import type { AuthState } from '~types';

export function resetAuthSession(state: AuthState) {
  state.isLogged = false;
  state.token = null;
  state.refreshToken = null;
  state.user = undefined;
  state.profile = undefined;
}
