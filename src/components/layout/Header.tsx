/**
 * Header Component — Farmer AI
 * Responsive header with:
 * - Farmer AI app icon
 * - Language dropdown
 * - Theme toggle
 * - Notifications
 * - Profile button
 * - Back button support
 * - Long-language title truncation
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Spacing } from '../../theme';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { Language } from '../../types/api.types';

interface HeaderProps {
  showLanguageSelector?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
  onBackPress?: () => void;
  showBack?: boolean;
  title?: string;
  subtitle?: string;
  notificationCount?: number;
}

const LANGUAGES: Language[] = [
  { code: 'mr', name: 'मराठी' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ahr', name: 'अहिराणी' },
  { code: 'kok', name: 'कोंकणी' },
];

export const Header: React.FC<HeaderProps> = ({
  showLanguageSelector = true,
  onNotificationPress,
  onProfilePress,
  onBackPress,
  showBack = false,
  title,
  subtitle,
  notificationCount = 3,
}) => {
  const insets = useSafeAreaInsets();

  const {
    isDarkMode,
    toggleTheme,
    colors: themeColors,
  } = useThemeContext();

  const {
    selectedLanguage,
    setLanguage,
  } = useLanguageContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + Spacing.xs,
          backgroundColor: themeColors.headerBg,
          borderBottomColor: themeColors.border,
        },
      ]}
    >
      {/* =====================================================
          LEFT SECTION
          Back button OR Farmer AI logo + title
      ===================================================== */}

      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={themeColors.textPrimary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logoIcon}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                color: isDarkMode ? '#F9FAFB' : '#172033',
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title || 'Farmer AI'}
          </Text>

          {!showBack && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: isDarkMode ? '#9CA3AF' : '#8C9BAB',
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subtitle || 'VOICE ASSISTANT'}
            </Text>
          )}
        </View>
      </View>

      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}

      <View style={styles.right}>

        {/* ===================================================
            LANGUAGE SELECTOR
        =================================================== */}

        {showLanguageSelector && (
          <View style={styles.languageWrapper}>
            <TouchableOpacity
              style={[
                styles.languageButton,
                {
                  backgroundColor: themeColors.card,
                  borderColor: themeColors.border,
                },
              ]}
              onPress={() => setDropdownOpen(!dropdownOpen)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Select language"
            >
              <Ionicons
                name="globe-outline"
                size={15}
                color="#16A34A"
              />

              <Text
                style={[
                  styles.languageText,
                  {
                    color: themeColors.textPrimary,
                  },
                ]}
                numberOfLines={1}
              >
                {selectedLanguage.name}
              </Text>

              <Ionicons
                name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={13}
                color={themeColors.textSecondary}
              />
            </TouchableOpacity>

            {/* =================================================
                FLOATING LANGUAGE DROPDOWN
            ================================================= */}

            {dropdownOpen && (
              <>
                <TouchableOpacity
                  style={styles.backdropOverlay}
                  activeOpacity={1}
                  onPress={() => setDropdownOpen(false)}
                />

                <View
                  style={[
                    styles.floatingDropdownCard,
                    {
                      backgroundColor: themeColors.card,
                      borderColor: themeColors.border,
                    },
                  ]}
                >
                  <ScrollView
                    nestedScrollEnabled
                    style={{ maxHeight: 280 }}
                    showsVerticalScrollIndicator
                  >
                    {LANGUAGES.map((lang, index) => {
                      const isSelected =
                        selectedLanguage.code === lang.code ||
                        selectedLanguage.name === lang.name;

                      return (
                        <TouchableOpacity
                          key={lang.code}
                          style={[
                            styles.dropdownRow,

                            index < LANGUAGES.length - 1 && {
                              borderBottomWidth: 1,
                              borderBottomColor: isDarkMode
                                ? '#374151'
                                : '#F3F4F6',
                            },

                            isSelected && {
                              backgroundColor: isDarkMode
                                ? '#064E3B'
                                : '#F0F9F1',
                            },
                          ]}
                          onPress={() => handleSelectLanguage(lang)}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.dropdownRowText,
                              {
                                color: themeColors.textPrimary,
                              },

                              isSelected && {
                                fontWeight: '800',
                                color: '#16A34A',
                              },
                            ]}
                          >
                            {lang.name}
                          </Text>

                          {isSelected && (
                            <Ionicons
                              name="checkmark"
                              size={16}
                              color="#16A34A"
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </>
            )}
          </View>
        )}

        {/* ===================================================
            THEME TOGGLE
        =================================================== */}

        <TouchableOpacity
          style={[
            styles.actionIconButton,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
          onPress={toggleTheme}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Toggle theme"
        >
          <Ionicons
            name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
            size={18}
            color={isDarkMode ? '#F59E0B' : '#4B5563'}
          />
        </TouchableOpacity>

        {/* ===================================================
            NOTIFICATION
        =================================================== */}

        {!showBack && onNotificationPress && (
          <TouchableOpacity
            style={[
              styles.actionIconButton,
              {
                backgroundColor: themeColors.card,
                borderColor: themeColors.border,
              },
            ]}
            onPress={onNotificationPress}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons
              name="notifications-outline"
              size={19}
              color={themeColors.textPrimary}
            />

            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* ===================================================
            PROFILE
        =================================================== */}

        {!showBack && onProfilePress && (
          <TouchableOpacity
            style={[
              styles.actionIconButton,
              styles.profileButtonLightGreen,
              {
                backgroundColor: isDarkMode
                  ? '#064E3B'
                  : '#E8F5E9',
                borderColor: isDarkMode
                  ? '#047857'
                  : '#A7F3D0',
              },
            ]}
            onPress={onProfilePress}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Profile"
          >
            <Ionicons
              name="person-outline"
              size={19}
              color={isDarkMode ? '#6EE7B7' : '#15803D'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,

    borderBottomWidth: 1,

    zIndex: 100,
  },

  /* ================= LEFT ================= */

  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,
    marginRight: 6,

    flexShrink: 1,
  },

  backButton: {
    padding: 6,
    marginRight: 2,
  },

  /* ================= APP LOGO ================= */

  logoContainer: {
    width: 44,
    height: 44,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'transparent',

    overflow: 'visible',
  },

  logoIcon: {
    width: 44,
    height: 44,

    backgroundColor: 'transparent',
  },

  /* ================= TITLE ================= */

  titleContainer: {
    flex: 1,
    justifyContent: 'center',

    flexShrink: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 21,

    flexShrink: 1,
  },

  subtitle: {
    fontSize: 9,
    fontWeight: '700',

    letterSpacing: 0.5,

    marginTop: 1,

    textTransform: 'uppercase',
  },

  /* ================= RIGHT ================= */

  right: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 6,

    flexShrink: 0,

    zIndex: 100,
  },

  /* ================= LANGUAGE ================= */

  languageWrapper: {
    position: 'relative',

    zIndex: 1000,
  },

  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 4,

    paddingVertical: 5,
    paddingHorizontal: 10,

    borderRadius: 20,

    borderWidth: 1,

    maxWidth: 130,
  },

  languageText: {
    fontSize: 13,
    fontWeight: '600',

    maxWidth: 75,
  },

  /* ================= ACTION BUTTONS ================= */

  actionIconButton: {
    position: 'relative',

    borderRadius: 20,

    width: 36,
    height: 36,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
  },

  profileButtonLightGreen: {
    backgroundColor: '#E8F5E9',
    borderColor: '#A7F3D0',
  },

  /* ================= BADGE ================= */

  badge: {
    position: 'absolute',

    top: -3,
    right: -3,

    backgroundColor: '#EF4444',

    borderRadius: 9,

    minWidth: 16,
    height: 16,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 3,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '800',

    color: Colors.white,
  },

  /* ================= DROPDOWN ================= */

  backdropOverlay: {
    position: 'absolute',

    top: -500,
    left: -500,
    right: -500,
    bottom: -1000,

    width: 2000,
    height: 2000,

    zIndex: 999,
  },

  floatingDropdownCard: {
    position: 'absolute',

    top: 40,
    right: 0,

    width: 200,

    borderRadius: 14,

    paddingVertical: 4,

    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 12,

    zIndex: 1000,
  },

  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  dropdownRowText: {
    fontSize: 14,
    fontWeight: '600',
  },
});