/**
 * Profile Screen — Farmer AI
 *
 * Includes:
 * - Guest / logged-in user profile
 * - Sign-in navigation
 * - Settings
 * - Language selection
 * - Bookmarks
 * - Conversation History
 * - Applied Schemes
 * - Logout
 * - Theme support
 * - Global i18n support
 */

import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Colors,
  Spacing,
  BorderRadius,
  Typography,
  Shadows,
} from '../../theme';

import { Button } from '../../components/common/Button';
import { Dialog } from '../../components/common/Dialog';

import { useAuthContext } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';

import { useLogout } from '../../hooks/useAuth';
import { ProfileScreenProps } from '../../navigation/types';

/* =========================================
   MENU ITEM TYPE
========================================= */

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  screen: string;
}

/* =========================================
   PROFILE SCREEN
========================================= */

export const ProfileScreen: React.FC<
  ProfileScreenProps<'Profile'>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const { user, logout } = useAuthContext();

  const {
    isDarkMode,
    colors: themeColors,
  } = useThemeContext();

  const { t } = useLanguageContext();

  const logoutMutation = useLogout();

  const [showLogoutDialog, setShowLogoutDialog] =
    useState(false);

  /* =========================================
     GUEST CHECK
  ========================================= */

  const isGuest =
    !user || user.id === 'guest_user';

  /* =========================================
     SIGN IN
  ========================================= */

  const handleSignIn = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Auth',
        params: {
          screen: 'Login',
        },
      })
    );
  };

  /* =========================================
     BACK
  ========================================= */

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('HomeTab' as any);
    }
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = async () => {
    setShowLogoutDialog(false);

    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Ignore logout mutation error.
    }

    await logout();
  };

  /* =========================================
     MENU ITEMS
  ========================================= */

  const menuItems: MenuItem[] = [
    {
      icon: 'paper-plane-outline',
      label: t('appliedSchemes') || 'Applied Schemes',
      screen: 'SchemesTab',
    },
    {
      icon: 'settings-outline',
      label: t('settings') || 'Settings',
      screen: 'Settings',
    },
    {
      icon: 'language-outline',
      label: t('language') || 'Language',
      screen: 'LanguageSelection',
    },
    {
      icon: 'bookmark-outline',
      label: t('bookmarks') || 'Bookmarks',
      screen: 'Bookmarks',
    },
    {
      icon: 'chatbubbles-outline',
      label:
        t('conversationHistory') ||
        'Conversation History',
      screen: 'ConversationHistory',
    },
  ];

  /* =========================================
     UI
  ========================================= */

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.background,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + Spacing.md,
          },
        ]}
      >
        {/* =========================================
            HEADER
        ========================================= */}

        <View style={styles.headerBar}>

          {/* Back + Logo + Title */}

          <View style={styles.headerLeft}>

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}
              accessibilityLabel="Go back"
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={themeColors.textPrimary}
              />
            </TouchableOpacity>

            <Image
              source={require('../../../assets/icon.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />

            <View style={styles.headerTextContainer}>
              <Text
                style={[
                  styles.screenTitle,
                  {
                    color: themeColors.textPrimary,
                  },
                ]}
              >
                {t('profileTab') || 'Profile'}
              </Text>

              <Text
                style={[
                  styles.profileSubtitle,
                  {
                    color: themeColors.textSecondary,
                  },
                ]}
              >
                {t('manageAccount') ||
                  'Manage your account and preferences'}
              </Text>
            </View>
          </View>

          {/* Header actions */}

          <View style={styles.headerRightActions}>

            {/* Language */}

            <TouchableOpacity
              style={[
                styles.actionIconButton,
                {
                  backgroundColor: isDarkMode
                    ? themeColors.card
                    : '#F8FAFC',
                  borderColor: themeColors.border,
                },
              ]}
              onPress={() =>
                navigation.navigate(
                  'LanguageSelection'
                )
              }
              activeOpacity={0.7}
              accessibilityLabel="Language"
            >
              <Ionicons
                name="globe-outline"
                size={20}
                color={themeColors.textPrimary}
              />
            </TouchableOpacity>

            {/* Notifications */}

            <TouchableOpacity
              style={[
                styles.actionIconButton,
                {
                  backgroundColor: isDarkMode
                    ? themeColors.card
                    : '#F8FAFC',
                  borderColor: themeColors.border,
                },
              ]}
              onPress={() => {}}
              activeOpacity={0.7}
              accessibilityLabel="Notifications"
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color={themeColors.textPrimary}
              />
            </TouchableOpacity>

          </View>
        </View>

        {/* =========================================
            USER / GUEST CARD
        ========================================= */}

        {isGuest ? (
          <View
            style={[
              styles.guestCard,
              {
                backgroundColor: isDarkMode
                  ? themeColors.card
                  : Colors.white,

                borderColor: isDarkMode
                  ? themeColors.border
                  : '#F1F5F9',
              },
              Shadows.card,
            ]}
          >

            {/* Avatar */}

            <View
              style={[
                styles.guestAvatarContainer,
                {
                  backgroundColor: isDarkMode
                    ? '#064E3B'
                    : Colors.primary[50],
                },
              ]}
            >
              <Ionicons
                name="person-outline"
                size={28}
                color={Colors.primary[600]}
              />
            </View>

            {/* Text */}

            <View style={styles.guestTextContainer}>
              <Text
                style={[
                  styles.guestTitle,
                  {
                    color: themeColors.textPrimary,
                  },
                ]}
              >
                {t('guest') || 'Guest'}
              </Text>

              <Text
                style={[
                  styles.guestSubtitle,
                  {
                    color: themeColors.textSecondary,
                  },
                ]}
              >
                {t('signInToSave') ||
                  'Sign in to save\nschemes and applications'}
              </Text>
            </View>

            {/* Sign In */}

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.85}
            >
              <Ionicons
                name="log-in-outline"
                size={18}
                color={Colors.white}
              />

              <Text style={styles.signInButtonText}>
                {t('signIn') || 'Sign in'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              styles.userCard,
              {
                backgroundColor: isDarkMode
                  ? themeColors.card
                  : '#F7FCF8',

                borderColor: isDarkMode
                  ? themeColors.border
                  : '#C8E6C9',
              },
              Shadows.card,
            ]}
          >

            {/* Avatar */}

            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: isDarkMode
                    ? '#064E3B'
                    : Colors.primary[50],
                },
              ]}
            >
              <Ionicons
                name="person"
                size={30}
                color={Colors.primary[600]}
              />
            </View>

            {/* User info */}

            <View style={styles.userInfo}>
              <Text
                style={[
                  styles.userName,
                  {
                    color: themeColors.textPrimary,
                  },
                ]}
              >
                {user?.name ||
                  t('farmerFriend') ||
                  'Farmer'}
              </Text>

              <Text
                style={[
                  styles.userEmail,
                  {
                    color: themeColors.textSecondary,
                  },
                ]}
              >
                {user?.email ||
                  user?.mobile ||
                  'farmer@farmerai.org'}
              </Text>
            </View>

            {/* Edit */}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Settings')
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color={themeColors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* =========================================
            PROFILE MENU
        ========================================= */}

        <View style={styles.menuContainer}>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={`${item.screen}-${index}`}
              style={[
                styles.menuItem,
                {
                  borderBottomColor:
                    themeColors.border,
                },
              ]}
              onPress={() =>
                navigation.navigate(
                  item.screen as any
                )
              }
              activeOpacity={0.6}
            >

              {/* Icon */}

              <View
                style={[
                  styles.menuIconContainer,
                  {
                    backgroundColor: isDarkMode
                      ? '#064E3B'
                      : Colors.primary[50],
                  },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={Colors.primary[600]}
                />
              </View>

              {/* Label */}

              <Text
                style={[
                  styles.menuLabel,
                  {
                    color: themeColors.textPrimary,
                  },
                ]}
              >
                {item.label}
              </Text>

              {/* Arrow */}

              <Ionicons
                name="chevron-forward"
                size={18}
                color={themeColors.textSecondary}
              />
            </TouchableOpacity>
          ))}

        </View>

        {/* =========================================
            LOGOUT
        ========================================= */}

        {!isGuest && (
          <Button
            title={t('logout') || 'Logout'}
            onPress={() =>
              setShowLogoutDialog(true)
            }
            variant="danger"
            size="md"
            icon="log-out-outline"
            fullWidth
            style={{
              marginTop: Spacing['2xl'],
            }}
          />
        )}

        {/* =========================================
            VERSION
        ========================================= */}

        <Text
          style={[
            styles.version,
            {
              color: themeColors.textSecondary,
            },
          ]}
        >
          Version 1.0.0
        </Text>

      </ScrollView>

      {/* =========================================
          LOGOUT DIALOG
      ========================================= */}

      <Dialog
        visible={showLogoutDialog}
        onClose={() =>
          setShowLogoutDialog(false)
        }
        title={t('logout') || 'Logout'}
        message={
          t('logoutConfirm') ||
          'Are you sure you want to logout?'
        }
        actions={[
          {
            label: t('cancel') || 'Cancel',
            onPress: () =>
              setShowLogoutDialog(false),
          },
          {
            label: t('logout') || 'Logout',
            onPress: handleLogout,
            variant: 'destructive',
          },
        ]}
      />
    </View>
  );
};

/* =========================================
   STYLES
========================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },

  /* =========================================
     HEADER
  ========================================= */

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },

  headerLogo: {
    width: 48,
    height: 48,
    marginRight: Spacing.md,
  },

  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  screenTitle: {
    ...Typography.h3,
    marginBottom: 2,
  },

  profileSubtitle: {
    ...Typography.bodySm,
  },

  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },

  actionIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  /* =========================================
     GUEST CARD
  ========================================= */

  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: Spacing.lg,
    borderWidth: 1,
    marginBottom: Spacing['2xl'],
    gap: Spacing.md,
  },

  guestAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  guestTextContainer: {
    flex: 1,
  },

  guestTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },

  guestSubtitle: {
    fontSize: 13,
    lineHeight: 17,
  },

  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary[500],
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,

    shadowColor: Colors.primary[500],
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },

  signInButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },

  /* =========================================
     USER CARD
  ========================================= */

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.lg,
    borderWidth: 1,
    marginBottom: Spacing['2xl'],
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    ...Typography.h5,
    marginBottom: 2,
  },

  userEmail: {
    ...Typography.bodySm,
  },

  /* =========================================
     MENU
  ========================================= */

  menuContainer: {
    gap: Spacing.xxs,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    borderBottomWidth: 1,
  },

  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuLabel: {
    ...Typography.label,
    flex: 1,
  },

  /* =========================================
     VERSION
  ========================================= */

  version: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: Spacing['3xl'],
  },
});