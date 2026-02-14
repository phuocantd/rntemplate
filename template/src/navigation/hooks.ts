import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {
  AppRouteName,
  AppStackNavigationProps,
  AppStackParamList,
} from '~types';

export const useAppNavigation = <T extends AppRouteName>() =>
  useNavigation<AppStackNavigationProps<T>>();

export const useAppRoute = <T extends AppRouteName>() =>
  useRoute<RouteProp<AppStackParamList, T>>();
