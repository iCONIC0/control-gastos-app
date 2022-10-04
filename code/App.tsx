import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/Login';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete ) {
    return null;
  } else {
		return (
      <SafeAreaProvider>
        <Navigation colorScheme='light'/>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
