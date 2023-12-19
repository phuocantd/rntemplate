import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRoutes } from '~configs/constants/routes';
import { AboutScreen, HomeScreen } from '~containers';
import { RootStackParamList } from '~types';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
