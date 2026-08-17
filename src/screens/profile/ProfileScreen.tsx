/**
 * Profile Screen — User info, Guest Sign-in card, menu options, logout
 * Styled to match user reference layout (Screenshot 2).
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import { Dialog } from '../../components/common/Dialog';
import { useAuthContext } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useLogout } from '../../hooks/useAuth';
import { ProfileScreenProps } from '../../navigation/types';

export const ProfileScreen: React.FC<ProfileScreenProps<'Profile'>> = ({ navigation }) => {
  const { user, logout } = useAuthContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t } = useLanguageContext();
  const logoutMutation = useLogout();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const isGuest = !user || user.id === 'guest_user';

  // Strictly 4 options as requested: Language, Bookmarked Schemes, Conversation History, Admin Panel
  const menuItems = [
    {
      id: 'language',
      icon: 'language-outline' as const,
      label: t('language') || 'Language',
      screen: 'LanguageSelection',
    },
    {
      id: 'bookmarks',
      icon: 'bookmark-outline' as const,
      label: t('bookmarks') || 'Bookmarked Schemes',
      screen: 'Bookmarks',
    },
    {
      id: 'conversationHistory',
      icon: 'chatbubble-outline' as const,
      label: t('conversationHistory') || 'Conversation History',
      screen: 'ConversationHistory',
    },
    {
      id: 'adminPanel',
      icon: 'shield-outline' as const,
      label: t('admin') || 'Admin',
      screen: 'AdminPanel',
    },
  ];

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

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    try { await logoutMutation.mutateAsync(); } catch {}
    await logout();
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('HomeTab' as any);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? themeColors.background : '#F8FAFC' }]}>
      {/* Header matching Screenshot 2 top bar with back button, Profile title, language selector & theme toggle */}
      <Header
        showBack
        onBackPress={handleBack}
        title={t('profileTab') || 'Profile'}
        showLanguageSelector
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Guest Banner or User Card matching Screenshot 2 */}
        {isGuest ? (
          <View
            style={[
              styles.guestCard,
              {
                backgroundColor: isDarkMode ? themeColors.card : '#FFFFFF',
                borderColor: isDarkMode ? themeColors.border : '#E2E8F0',
              },
              Shadows.card,
            ]}
          >
            <View
              style={[
                styles.guestAvatarContainer,
                { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' },
              ]}
            >
              <Ionicons name="person-outline" size={26} color="#15803D" />
            </View>

            <View style={styles.guestTextContainer}>
              <Text style={[styles.guestTitle, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
                {t('guest') || 'Guest'}
              </Text>
              <Text style={[styles.guestSubtitle, { color: isDarkMode ? '#9CA3AF' : '#64748B' }]}>
                {t('signInSaveSchemes') || 'Sign in to save schemes and applications'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.85}
            >
              <Ionicons name="log-in-outline" size={16} color="#FFFFFF" />
              <Text style={styles.signInButtonText}>{t('signIn') || 'Sign in'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              styles.userCard,
              {
                backgroundColor: isDarkMode ? themeColors.card : '#FFFFFF',
                borderColor: isDarkMode ? themeColors.border : '#E2E8F0',
              },
              Shadows.card,
            ]}
          >
            <View style={[styles.avatar, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
              <Ionicons name="person" size={26} color="#15803D" />
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
                {user?.name || t('farmerFriend') || 'Farmer'}
              </Text>
              <Text style={[styles.userEmail, { color: isDarkMode ? '#9CA3AF' : '#64748B' }]}>
                {user?.email || user?.mobile || 'farmer@farmerai.org'}
              </Text>
            </View>
          </View>
        )}

        {/* Menu items container matching Screenshot 2 */}
        <View
          style={[
            styles.menuCard,
            {
              backgroundColor: isDarkMode ? themeColors.card : '#FFFFFF',
              borderColor: isDarkMode ? themeColors.border : '#E2E8F0',
            },
          ]}
        >
          {menuItems.map((item, idx) => {
            const isLast = idx === menuItems.length - 1;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  !isLast && {
                    borderBottomWidth: 1,
                    borderBottomColor: isDarkMode ? '#374151' : '#F1F5F9',
                  },
                ]}
                onPress={() => navigation.navigate(item.screen as any)}
                activeOpacity={0.65}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
                  <Ionicons name={item.icon} size={19} color="#15803D" />
                </View>
                <Text style={[styles.menuLabel, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
                  {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={isDarkMode ? '#6B7280' : '#94A3B8'} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout Button (For Logged In Non-Guest Users) */}
        {!isGuest && (
          <Button
            title={t('logout') || 'Logout'}
            onPress={() => setShowLogoutDialog(true)}
            variant="danger"
            size="md"
            icon="log-out-outline"
            fullWidth
            style={{ marginTop: 20 }}
          />
        )}

        {/* Version text centered */}
        <Text style={[styles.version, { color: isDarkMode ? '#6B7280' : '#94A3B8' }]}>
          Version 1.0.0
        </Text>
      </ScrollView>

      {/* Logout Dialog */}
      <Dialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title={t('logout') || 'Logout'}
        message={t('logoutConfirm') || 'Are you sure you want to logout?'}
        actions={[
          { label: t('cancel') || 'Cancel', onPress: () => setShowLogoutDialog(false) },
          { label: t('logout') || 'Logout', onPress: handleLogout, variant: 'destructive' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 60,
  },

  /* Guest Card matching Screenshot 2 */
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
    gap: 12,
  },
  guestAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestTextContainer: {
    flex: 1,
  },
  guestTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 2,
  },
  guestSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#15803D',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
  signInButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Logged In User Card */
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
  },

  /* Menu Card Container */
  menuCard: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 14,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  version: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 28,
  },
});