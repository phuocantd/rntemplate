import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18next from '~i18n';
import { RootNavigation } from '~navigation';
import queryClient from '~services/query-client.service';

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18next}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </I18nextProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
