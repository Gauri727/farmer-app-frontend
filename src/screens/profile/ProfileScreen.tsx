/**
 * Profile Screen — User info, Guest Sign-in banner, menu items, logout
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

  const menuItems = [
    { icon: 'settings-outline' as const, label: t('settings') || 'Settings', screen: 'Settings' },
    { icon: 'language-outline' as const, label: t('language') || 'Language', screen: 'LanguageSelection' },
    { icon: 'bookmark-outline' as const, label: t('bookmarks') || 'Bookmarks', screen: 'Bookmarks' },
    { icon: 'chatbubbles-outline' as const, label: t('conversationHistory') || 'Conversation History', screen: 'ConversationHistory' },
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
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header
        showBack
        onBackPress={handleBack}
        title={t('profileTab') || 'Profile'}
        showLanguageSelector
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Card or Guest Banner */}
        {isGuest ? (
          <View style={[styles.guestCard, { backgroundColor: isDarkMode ? themeColors.card : '#FFFFFF', borderColor: themeColors.border }, Shadows.card]}>
            <View style={[styles.guestAvatarContainer, { backgroundColor: isDarkMode ? '#064E3B' : Colors.primary[50] }]}>
              <Ionicons name="person-outline" size={28} color={Colors.primary[600]} />
            </View>

            <View style={styles.guestTextContainer}>
              <Text style={[styles.guestTitle, { color: themeColors.textPrimary }]}>Guest</Text>
              <Text style={[styles.guestSubtitle, { color: themeColors.textSecondary }]}>
                Sign in to save schemes and applications
              </Text>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.85}
            >
              <Ionicons name="log-in-outline" size={18} color={Colors.white} />
              <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.userCard, { backgroundColor: isDarkMode ? themeColors.card : '#F7FCF8', borderColor: isDarkMode ? themeColors.border : '#C8E6C9' }, Shadows.card]}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color={Colors.primary[500]} />
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: themeColors.textPrimary }]}>{user?.name || t('farmerFriend') || 'Farmer'}</Text>
              <Text style={[styles.userEmail, { color: themeColors.textSecondary }]}>{user?.email || user?.mobile || 'farmer@farmerai.org'}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="create-outline" size={20} color={themeColors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Menu items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, { borderBottomColor: themeColors.border }]}
              onPress={() => navigation.navigate(item.screen as any)}
              activeOpacity={0.6}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={18} color={Colors.primary[600]} />
              </View>
              <Text style={[styles.menuLabel, { color: themeColors.textPrimary }]}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={themeColors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
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

        <Text style={[styles.version, { color: themeColors.textSecondary }]}>Version 1.0.0</Text>
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
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 60 },
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
  },
  guestAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestTextContainer: { flex: 1 },
  guestTitle: { fontSize: 17, fontWeight: '700', marginBottom: 2 },
  guestSubtitle: { fontSize: 12, lineHeight: 16 },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary[600],
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
  signInButtonText: { fontSize: 13, fontWeight: '700', color: Colors.white },
  userCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: BorderRadius.lg, padding: 14, gap: 12,
    borderWidth: 1, marginBottom: 16,
  },
  avatar: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: '#DCFCE7',
    justifyContent: 'center', alignItems: 'center',
  },
  userInfo: { flex: 1 },
  userName: { ...Typography.h5, marginBottom: 2 },
  userEmail: { ...Typography.bodySm },
  menuContainer: { gap: Spacing.xxs },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
    gap: 12, borderBottomWidth: 1,
  },
  menuIconContainer: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: '#DCFCE7',
    justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { ...Typography.label, flex: 1, fontSize: 15 },
  version: {
    ...Typography.caption, textAlign: 'center',
    marginTop: 20,
  },
});