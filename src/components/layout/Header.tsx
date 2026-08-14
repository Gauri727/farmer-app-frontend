/**
 * Header Component
 * App header with logo, title, language selector, notification bell
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Colors,
  Spacing,
  BorderRadius,
} from '../../theme';

interface HeaderProps {
  showLanguageSelector?: boolean;
  onLanguagePress?: () => void;
  onNotificationPress?: () => void;
  selectedLanguage?: string;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  showLanguageSelector = true,
  onLanguagePress,
  onNotificationPress,
  selectedLanguage = 'English',
  notificationCount = 0,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + Spacing.sm,
        },
      ]}
    >
      {/* ================= LOGO + TITLE ================= */}
      <View style={styles.left}>

        {/* Transparent logo container */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/icon.png')}
            style={styles.logoIcon}
            resizeMode="contain"
          />
        </View>

        {/* App name */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Farmer AI
          </Text>

          <Text style={styles.subtitle}>
            VOICE ASSISTANT
          </Text>
        </View>
      </View>

      {/* ================= RIGHT ACTIONS ================= */}
      <View style={styles.right}>

        {/* Language selector */}
        {showLanguageSelector && (
          <TouchableOpacity
            style={styles.languageButton}
            onPress={onLanguagePress}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Select language"
          >
            <Ionicons
              name="globe-outline"
              size={18}
              color="#0284C7"
            />

            <Text style={styles.languageText}>
              {selectedLanguage}
            </Text>

            <Ionicons
              name="chevron-down"
              size={14}
              color={Colors.gray[500]}
            />
          </TouchableOpacity>
        )}

        {/* Notification */}
        {onNotificationPress && (
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={onNotificationPress}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons
              name="notifications-outline"
              size={23}
              color={Colors.gray[700]}
            />

            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 9
                    ? '9+'
                    : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  /* ================= HEADER ================= */

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,

    backgroundColor: Colors.mint[100],
  },

  /* ================= LEFT ================= */

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,

    flexShrink: 1,
  },

  /* 
   * IMPORTANT:
   * Completely transparent.
   * There is NO green/white placeholder box.
   */
  logoContainer: {
    width: 56,
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'transparent',

    overflow: 'visible',
  },

  /* Actual application logo */
  logoIcon: {
    width: 56,
    height: 56,

    backgroundColor: 'transparent',
  },

  /* ================= TITLE ================= */

  titleContainer: {
    justifyContent: 'center',
    flexShrink: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',

    color: Colors.text.primary,

    lineHeight: 24,
  },

  subtitle: {
    fontSize: 10,
    fontWeight: '600',

    color: Colors.gray[400],

    letterSpacing: 1.2,

    marginTop: 1,
  },

  /* ================= RIGHT ================= */

  right: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: Spacing.sm,

    flexShrink: 0,
  },

  /* ================= LANGUAGE ================= */

  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: Spacing.xs,

    backgroundColor: Colors.white,

    paddingVertical: 8,
    paddingHorizontal: 14,

    borderRadius: BorderRadius.full,

    borderWidth: 1,
    borderColor: Colors.border,

    shadowColor: Colors.black,

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 1,
  },

  languageText: {
    fontSize: 14,
    fontWeight: '600',

    color: Colors.text.primary,
  },

  /* ================= NOTIFICATION ================= */

  notificationButton: {
    padding: Spacing.sm,

    position: 'relative',

    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= BADGE ================= */

  badge: {
    position: 'absolute',

    top: 2,
    right: 2,

    backgroundColor: Colors.error,

    borderRadius: 8,

    minWidth: 16,
    height: 16,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 3,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: '700',

    color: Colors.white,
  },
});