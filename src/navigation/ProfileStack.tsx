/**
 * Profile Stack Navigator
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from './types';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { LanguageSelectionScreen } from '../screens/profile/LanguageSelectionScreen';
import { BookmarksScreen } from '../screens/bookmarks/BookmarksScreen';
import { AboutScreen } from '../screens/support/SupportScreens';
import { AdminPanelScreen } from '../screens/admin/AdminPanelScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen
      name="LanguageSelection"
      component={LanguageSelectionScreen}
    />
    <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
  </Stack.Navigator>
);