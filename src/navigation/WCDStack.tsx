/**
 * WCD Jalgaon Stack Navigator
 * Flow: WCDSchemesList → WCDSchemeDetails
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WCDStackParamList } from './types';
import { WCDSchemesListScreen } from '../screens/schemes/WCDSchemesListScreen';
import { WCDSchemeDetailsScreen } from '../screens/schemes/WCDSchemeDetailsScreen';

const Stack = createNativeStackNavigator<WCDStackParamList>();

export const WCDStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
    <Stack.Screen name="WCDSchemesList" component={WCDSchemesListScreen} />
    <Stack.Screen name="WCDSchemeDetails" component={WCDSchemeDetailsScreen} />
  </Stack.Navigator>
);
