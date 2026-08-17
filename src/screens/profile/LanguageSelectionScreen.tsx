/**
 * Language Selection Screen — Supported languages list (mr, en, hi, ahr, kok)
 * Fully theme-aware & global i18n context integrated.
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Header } from '../../components/layout/Header';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguages } from '../../hooks/useLanguages';
import { useUpdateProfile } from '../../hooks/useProfile';
import { ProfileScreenProps } from '../../navigation/types';
import { Language } from '../../types/api.types';

const DEFAULT_LANGUAGES: Language[] = [
  { code: 'mr', name: 'मराठी' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
];

export const LanguageSelectionScreen: React.FC<ProfileScreenProps<'LanguageSelection'>> = ({ navigation }) => {
  const { selectedLanguage, setLanguage, t } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const languagesQuery = useLanguages();
  const updateProfile = useUpdateProfile();

  const fetchedLangs = languagesQuery.data as Language[] | undefined;
  const languages = fetchedLangs && fetchedLangs.length > 0
    ? DEFAULT_LANGUAGES.map((dl) => fetchedLangs.find((fl) => fl.code === dl.code) || dl)
    : DEFAULT_LANGUAGES;

  const handleSelect = async (lang: Language) => {
    await setLanguage(lang);
    updateProfile.mutate({ preferred_language: lang.code });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('selectLanguageTitle') || 'भाषा निवडा (Select Language)'}
        showLanguageSelector={false}
      />

      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
        {t('selectLanguageSub') || 'एआय सहाय्यकासाठी तुमची प्राधान्य दिलेली भाषा निवडा'}
      </Text>

      <FlatList
        data={languages}
        numColumns={1}
        contentContainerStyle={styles.grid}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => {
          const isSelected = selectedLanguage.code === item.code || selectedLanguage.name === item.name;
          return (
            <TouchableOpacity
              style={[
                styles.langCard,
                {
                  backgroundColor: isSelected
                    ? (isDarkMode ? '#064E3B' : '#E8F5E9')
                    : themeColors.card,
                  borderColor: isSelected
                    ? '#16A34A'
                    : themeColors.border,
                },
                Shadows.sm,
              ]}
              onPress={() => handleSelect(item)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langName,
                  { color: themeColors.textPrimary },
                  isSelected && { color: '#16A34A', fontWeight: '800' },
                ]}
              >
                {item.name}
              </Text>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  subtitle: {
    ...Typography.body,
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  grid: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, gap: Spacing.sm },
  langCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1.5,
    minHeight: 56,
  },
  langName: { ...Typography.label, fontSize: 16 },
});
