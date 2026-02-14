import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppRoutes } from '~configs/constants';
import { AboutScreen, HomeScreen } from '~containers';
import { AppStackParamList } from '~types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AppRoutes.HOME} component={HomeScreen} />
      <Stack.Screen name={AppRoutes.ABOUT} component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
