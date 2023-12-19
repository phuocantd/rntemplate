import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRoutes } from '~configs/constants';

export type RootStackParamList = {
  [AppRoutes.HOME]: undefined;
  [AppRoutes.ABOUT]: undefined;
};

export type AppStackNavigatorScreens = keyof RootStackParamList;

// using ['navigation'] to get navigation props
// using ['route'] to get route props
export type UseAppStackNavigatorScreenProps<T extends AppStackNavigatorScreens> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

// NavigationProp
export type AppStackNavigationProps<T extends AppStackNavigatorScreens> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;
