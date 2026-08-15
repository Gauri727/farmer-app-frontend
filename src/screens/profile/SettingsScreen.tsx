/**
 * Settings Screen — Fully localized & theme-aware settings page
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../theme';
import { Header } from '../../components/layout/Header';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { ProfileScreenProps } from '../../navigation/types';

export const SettingsScreen: React.FC<ProfileScreenProps<'Settings'>> = ({ navigation }) => {
  const { selectedLanguage, t } = useLanguageContext();
  const { isDarkMode, toggleTheme, colors: themeColors } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('settings') || 'सेटिंग्ज (Settings)'}
        showLanguageSelector
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: themeColors.textSecondary }]}>
          {t('preferences') || 'प्राधान्ये (PREFERENCES)'}
        </Text>

        {/* Language Selection Setting */}
        <TouchableOpacity
          style={[styles.settingItem, { borderBottomColor: themeColors.border }]}
          onPress={() => navigation.navigate('LanguageSelection')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
            <Ionicons name="language-outline" size={20} color={isDarkMode ? '#6EE7B7' : '#15803D'} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: themeColors.textPrimary }]}>
              {t('language') || 'भास (Language)'}
            </Text>
            <Text style={[styles.settingValue, { color: themeColors.textSecondary }]}>
              {selectedLanguage.name}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
        </TouchableOpacity>

        {/* Dark Mode Theme Toggle Setting */}
        <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
          <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
            <Ionicons
              name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
              size={20}
              color={isDarkMode ? '#F59E0B' : '#15803D'}
            />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: themeColors.textPrimary }]}>
              {t('themeMode') || 'डार्क मोड (Dark Mode)'}
            </Text>
            <Text style={[styles.settingValue, { color: themeColors.textSecondary }]}>
              {isDarkMode ? 'सुरू (On)' : 'बंद (Off)'}
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: '#D1D5DB', true: '#10B981' }}
            thumbColor={isDarkMode ? '#F9FAFB' : '#FFFFFF'}
          />
        </View>

        {/* Push Notifications */}
        <View style={[styles.settingItem, { borderBottomColor: themeColors.border }]}>
          <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
            <Ionicons name="notifications-outline" size={20} color={isDarkMode ? '#6EE7B7' : '#15803D'} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: themeColors.textPrimary }]}>
              {t('pushNotifications') || 'सूचना (Push Notifications)'}
            </Text>
            <Text style={[styles.settingValue, { color: themeColors.textSecondary }]}>
              {t('enabled') || 'सुरू (Enabled)'}
            </Text>
          </View>
        </View>

        {/* About Section */}
        <Text style={[styles.sectionTitle, { marginTop: Spacing['2xl'], color: themeColors.textSecondary }]}>
          {t('about') || 'माहिती (ABOUT)'}
        </Text>

        <TouchableOpacity
          style={[styles.settingItem, { borderBottomColor: themeColors.border }]}
          onPress={() => navigation.navigate('About')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
            <Ionicons name="information-circle-outline" size={20} color={isDarkMode ? '#6EE7B7' : '#15803D'} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: themeColors.textPrimary }]}>
              {t('aboutFarmerAi') || 'Farmer AI बद्दल माहिती'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, { borderBottomColor: themeColors.border }]}
          onPress={() => navigation.navigate('PrivacyPolicy')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
            <Ionicons name="shield-outline" size={20} color={isDarkMode ? '#6EE7B7' : '#15803D'} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: themeColors.textPrimary }]}>
              {t('privacyPolicy') || 'गोपनीयता धोरण'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.settingItem, { borderBottomColor: themeColors.border }]}
          onPress={() => navigation.navigate('TermsConditions')}
          activeOpacity={0.7}
        >
          <View style={[styles.iconWrap, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
            <Ionicons name="document-text-outline" size={20} color={isDarkMode ? '#6EE7B7' : '#15803D'} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: themeColors.textPrimary }]}>
              {t('termsConditions') || 'अटी व शर्ती'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.xl },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    borderBottomWidth: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '600' },
  settingValue: { fontSize: 13, marginTop: 2 },
});
