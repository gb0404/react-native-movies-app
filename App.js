import React from 'react';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppStack from './src/stacks/AppStack';

export default function App() {
  return (

    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <AppStack />
        <StatusBar style='auto' />
      </GluestackUIProvider>
    </SafeAreaProvider>

  );
}