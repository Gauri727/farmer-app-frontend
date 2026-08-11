/**
 * Main Bottom Tab Navigator
 * Custom floating tab dock with center Voice Assistant button
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabParamList } from './types';
import { HomeStack } from './HomeStack';
import { SchemesStack } from './SchemesStack';
import { EligibilityStack } from './EligibilityStack';
import { ProfileStack } from './ProfileStack';
import { Colors } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  const tabs = [
    { routeName: 'HomeTab', label: 'Home', activeIcon: 'home' as const, inactiveIcon: 'home-outline' as const },
    { routeName: 'SchemesTab', label: 'Schemes', activeIcon: 'grid' as const, inactiveIcon: 'grid-outline' as const },
    { isCenter: true },
    { routeName: 'EligibilityTab', label: 'Eligibility', activeIcon: 'checkmark-circle' as const, inactiveIcon: 'checkmark-circle-outline' as const },
    { routeName: 'ProfileTab', label: 'Profile', activeIcon: 'person' as const, inactiveIcon: 'person-outline' as const },
  ];

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {tabs.map((tab, index) => {
        if (tab.isCenter) {
          return (
            <View key="center-fab" style={styles.centerItemContainer}>
              <TouchableOpacity
                style={styles.centerFab}
                activeOpacity={0.85}
                onPress={() => {
                  navigation.navigate('HomeTab', { screen: 'VoiceAssistant' });
                }}
              >
                <Ionicons name="mic" size={28} color={Colors.white} />
              </TouchableOpacity>
              <Text style={styles.centerLabel}>Farmer AI</Text>
            </View>
          );
        }

        const routeIndex = state.routes.findIndex(r => r.name === tab.routeName);
        const isFocused = state.index === routeIndex;
        const route = state.routes[routeIndex];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? Colors.primary[700] : Colors.gray[500];
        const iconName = isFocused ? tab.activeIcon : tab.inactiveIcon;

        return (
          <TouchableOpacity
            key={tab.routeName}
            style={[styles.tabItem, isFocused && styles.tabItemActive]}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.iconPlate, isFocused && styles.iconPlateActive]}>
              <Ionicons name={iconName} size={22} color={color} />
            </View>
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const MainTabs: React.FC = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} />
    <Tab.Screen name="SchemesTab" component={SchemesStack} />
    <Tab.Screen name="EligibilityTab" component={EligibilityStack} />
    <Tab.Screen name="ProfileTab" component={ProfileStack} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F7FAF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingHorizontal: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#E1E9E4',
    borderBottomWidth: 0,
    shadowColor: '#0F2A1A',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 20,
    transform: [{ translateY: 0 }],
  },
  tabItemActive: {
    transform: [{ translateY: -3 }],
  },
  iconPlate: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#0F2A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  iconPlateActive: {
    backgroundColor: '#EAF4EE',
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  centerItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
  centerFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  centerLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary[600],
    marginTop: 4,
  },
});
