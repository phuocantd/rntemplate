import { CommonActions, StackActions } from '@react-navigation/native';
import { AppRoutes } from '~configs/constants';
import { navigationRef } from '~configs/globalRefs';
import type {
  AppNavigateArgs,
  AppNavigationRoute,
  AppRouteName,
  AppStackParamList,
} from '~types';

class NavigationService {
  getNavigationRef() {
    return navigationRef;
  }

  isNavigationReady(): boolean {
    return navigationRef.isReady();
  }

  private guardReady(actionName: string): boolean {
    if (this.isNavigationReady()) {
      return true;
    }

    console.warn(`[navigation] ${actionName} ignored because navigator is not ready`);
    return false;
  }

  private navigateInternal(
    name: AppRouteName,
    params?: AppStackParamList[AppRouteName],
  ) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }

  navigate<T extends AppRouteName>(...args: AppNavigateArgs<T>) {
    if (!this.guardReady('navigate')) {
      return;
    }

    const [name, params] = args as [
      AppRouteName,
      AppStackParamList[AppRouteName]?,
    ];
    this.navigateInternal(name, params);
  }

  safeNavigate<T extends AppRouteName>(...args: AppNavigateArgs<T>) {
    const [name, params] = args as [
      AppRouteName,
      AppStackParamList[AppRouteName]?,
    ];
    if (this.getCurrentRouteName() !== name) {
      this.navigateInternal(name, params);
    }
  }

  goBack() {
    if (!this.guardReady('goBack')) {
      return;
    }

    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }

  push<T extends AppRouteName>(...args: AppNavigateArgs<T>) {
    if (!this.guardReady('push')) {
      return;
    }

    const [name, params] = args as [
      AppRouteName,
      AppStackParamList[AppRouteName]?,
    ];
    navigationRef.dispatch(StackActions.push(name, params));
  }

  replace<T extends AppRouteName>(...args: AppNavigateArgs<T>) {
    if (!this.guardReady('replace')) {
      return;
    }

    const [name, params] = args as [
      AppRouteName,
      AppStackParamList[AppRouteName]?,
    ];
    navigationRef.dispatch(StackActions.replace(name, params));
  }

  pop(count = 1) {
    if (!this.guardReady('pop')) {
      return;
    }

    navigationRef.dispatch(StackActions.pop(count));
  }

  popToTop() {
    if (!this.guardReady('popToTop')) {
      return;
    }

    navigationRef.dispatch(StackActions.popToTop());
  }

  reset(routes: AppNavigationRoute[], index = 0) {
    if (!this.guardReady('reset')) {
      return;
    }

    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }

  resetToHome() {
    this.reset([{ name: AppRoutes.HOME }]);
  }

  resetToLogin() {
    this.reset([{ name: AppRoutes.LOGIN }]);
  }

  canGoBack(): boolean {
    return this.isNavigationReady() && navigationRef.canGoBack();
  }

  getNavigationState() {
    if (!this.isNavigationReady()) {
      return undefined;
    }

    return navigationRef.getState();
  }

  getCurrentRouteName(): AppRouteName | undefined {
    if (!this.isNavigationReady()) {
      return undefined;
    }

    return navigationRef.getCurrentRoute()?.name as AppRouteName | undefined;
  }

  getCurrentRouteParams<T extends AppRouteName>(
    routeName?: T,
  ): AppStackParamList[T] | undefined {
    if (!this.isNavigationReady()) {
      return undefined;
    }

    const currentRoute = navigationRef.getCurrentRoute();
    if (!currentRoute) {
      return undefined;
    }

    if (routeName && currentRoute.name !== routeName) {
      return undefined;
    }

    return currentRoute.params as AppStackParamList[T] | undefined;
  }

  whenReady(callback: () => void, intervalMs = 50) {
    if (this.isNavigationReady()) {
      callback();
      return;
    }

    const checkReady = () => {
      if (this.isNavigationReady()) {
        callback();
        return;
      }

      setTimeout(checkReady, intervalMs);
    };

    checkReady();
  }
}

export const navigationService = new NavigationService();
