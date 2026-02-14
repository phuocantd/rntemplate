import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { navigationRef } from '~configs/globalRefs';
import { useAppBootstrap } from '~hooks';
import i18next from '~i18n';
import { RootNavigation } from '~navigation';
import queryClient from '~services/query-client.service';
import { persistor, store } from '~store';

if (__DEV__) {
  require('./ReactotronConfig');
}

const AppContent = () => {
  useAppBootstrap();

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigation />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18next}>
              <AppContent />
            </I18nextProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
