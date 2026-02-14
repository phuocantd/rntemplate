import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '~features/auth/auth.selector';
import { AppStackParamList } from '~types';
import {
  AUTH_STACK_INITIAL_ROUTE,
  AUTH_STACK_SCREENS,
  APP_STACK_INITIAL_ROUTE,
  APP_STACK_SCREENS,
  APP_STACK_SCREEN_OPTIONS,
} from './stackConfig';

const Stack = createNativeStackNavigator<AppStackParamList>();

const RootNavigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const stackKey = isAuthenticated ? 'app-stack' : 'auth-stack';
  const initialRouteName = isAuthenticated
    ? APP_STACK_INITIAL_ROUTE
    : AUTH_STACK_INITIAL_ROUTE;
  const screens = isAuthenticated ? APP_STACK_SCREENS : AUTH_STACK_SCREENS;

  return (
    <Stack.Navigator
      key={stackKey}
      initialRouteName={initialRouteName}
      screenOptions={APP_STACK_SCREEN_OPTIONS}
    >
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RootNavigation;
