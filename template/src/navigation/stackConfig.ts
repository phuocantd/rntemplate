import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { AppRoutes } from '~configs/constants';
import { AboutScreen, HomeScreen, LoginScreen } from '~containers';
import type { AppRouteName } from '~types';

export type AppStackScreenConfig<T extends AppRouteName = AppRouteName> = {
  name: T;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

const createAppStackScreen = <T extends AppRouteName>(
  config: AppStackScreenConfig<T>,
) => config;

export const APP_STACK_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
};

export const APP_STACK_INITIAL_ROUTE = AppRoutes.HOME;
export const AUTH_STACK_INITIAL_ROUTE = AppRoutes.LOGIN;

export const APP_STACK_SCREENS: AppStackScreenConfig[] = [
  createAppStackScreen({
    name: AppRoutes.HOME,
    component: HomeScreen,
  }),
  createAppStackScreen({
    name: AppRoutes.ABOUT,
    component: AboutScreen,
  }),
];

export const AUTH_STACK_SCREENS: AppStackScreenConfig[] = [
  createAppStackScreen({
    name: AppRoutes.LOGIN,
    component: LoginScreen,
  }),
];
