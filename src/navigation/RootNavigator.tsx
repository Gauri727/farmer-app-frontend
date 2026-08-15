/**
 * Root Navigator — Splash → Auth check → AuthStack or MainTabs
 */

import React, { useState, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import { useAuthContext } from '../contexts/AuthContext';

import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { SplashScreen } from '../screens/auth/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isLoading } = useAuthContext();

  // Show animated splash screen on first mount
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  // First show the animated splash screen
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Wait until authentication state has been loaded
  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {/* Authentication */}
      <Stack.Screen
        name="Auth"
        component={AuthStack}
      />

      {/* Main Application */}
      <Stack.Screen
        name="Main"
        component={MainTabs}
      />
    </Stack.Navigator>
  );
};