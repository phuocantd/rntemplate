import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { AppRoutes } from '~configs/constants';

export type AppStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.ABOUT]: undefined;
  [AppRoutes.LOGIN]: undefined;
};

export type AppStackNavigatorScreens = keyof AppStackParamList;
export type AppRouteName = AppStackNavigatorScreens;
export type AppRouteParams<T extends AppRouteName> = AppStackParamList[T];

export type AppNavigateArgs<T extends AppRouteName> =
  undefined extends AppStackParamList[T]
    ? [name: T, params?: AppStackParamList[T]]
    : [name: T, params: AppStackParamList[T]];

export type AppNavigationRoute = {
  [T in AppRouteName]: undefined extends AppStackParamList[T]
    ? { name: T; params?: AppStackParamList[T] }
    : { name: T; params: AppStackParamList[T] };
}[AppRouteName];

// using ['navigation'] to get navigation props
// using ['route'] to get route props
export type UseAppStackNavigatorScreenProps<
  T extends AppStackNavigatorScreens,
> = NativeStackScreenProps<AppStackParamList, T>;

// NavigationProp
export type AppStackNavigationProps<T extends AppStackNavigatorScreens> =
  NativeStackNavigationProp<AppStackParamList, T>;

// Define navigation props for each screen
export type HomeScreenNavigationProps = AppStackNavigationProps<AppRoutes.HOME>;
export type HomeScreenRouteProps =
  UseAppStackNavigatorScreenProps<AppRoutes.HOME>['route'];
