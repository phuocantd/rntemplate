import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import '~configs';
import { useConfigApp } from '~configs';
import RootNavigation from '~navigation/Root';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18next from '~lang';

const App = () => {
  useConfigApp();

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18next}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default App;
