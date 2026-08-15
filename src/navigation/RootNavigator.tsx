/**
 * Root Navigator
 *
 * Main
 *   └── MainTabs
 *        └── ProfileStack
 *             └── Profile
 *
 * Auth
 *   └── AuthStack
 *        ├── Splash
 *        ├── Onboarding
 *        ├── Login
 *        └── OTPLogin
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import { useAuthContext } from '../contexts/AuthContext';

import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { LoadingScreen } from '../screens/support/SupportScreens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isLoading } = useAuthContext();

  /*
   * Wait until authentication state has been loaded.
   */
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {/* =========================================
          MAIN APP
         ========================================= */}

      <Stack.Screen
        name="Main"
        component={MainTabs}
      />

      {/* =========================================
          AUTHENTICATION
         ========================================= */}

      <Stack.Screen
        name="Auth"
        component={AuthStack}
      />
    </Stack.Navigator>
  );
};