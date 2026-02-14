import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { AppRoutes } from '~configs/constants';

export type AppStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.ABOUT]: undefined;
};

export type AppStackNavigatorScreens = keyof AppStackParamList;

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
