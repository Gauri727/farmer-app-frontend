/**
 * Profile Screen — User info, Guest Sign-in banner (Image 1 design), menu items, logout
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Button } from '../../components/common/Button';
import { Dialog } from '../../components/common/Dialog';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLogout } from '../../hooks/useAuth';
import { ProfileScreenProps } from '../../navigation/types';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  screen: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { icon: 'paper-plane-outline', label: 'Applied Schemes', screen: 'SchemesTab' },
  { icon: 'settings-outline', label: 'Settings', screen: 'Settings' },
  { icon: 'language-outline', label: 'Language', screen: 'LanguageSelection' },
  { icon: 'bookmark-outline', label: 'Bookmarks', screen: 'Bookmarks' },
  { icon: 'information-circle-outline', label: 'About', screen: 'About' },
];

export const ProfileScreen: React.FC<ProfileScreenProps<'Profile'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthContext();
  const logoutMutation = useLogout();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Check if current session is Guest mode or Logged-in user
  const isGuest = !user || user.id === 'guest_user';

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    try {
      await logoutMutation.mutateAsync();
    } catch {}
    await logout();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.md }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Bar matching Image 1 */}
        <View style={styles.headerBar}>
          <View style={styles.headerLeft}>
            <View style={styles.headerAvatarBadge}>
              <Text style={styles.headerAvatarText}>म</Text>
            </View>
            <Text style={styles.screenTitle}>Profile</Text>
          </View>

          <View style={styles.headerRightActions}>
            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={() => navigation.navigate('LanguageSelection')}
              activeOpacity={0.7}
            >
              <Ionicons name="globe-outline" size={20} color={Colors.text.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionIconButton}
              onPress={() => {}}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={20} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Guest Sign-In Banner matching Image 1 (Green theme) */}
        {isGuest ? (
          <View style={[styles.guestCard, Shadows.card]}>
            {/* Left Circular Avatar Icon Container */}
            <View style={styles.guestAvatarContainer}>
              <Ionicons name="person-outline" size={28} color={Colors.primary[600]} />
            </View>

            {/* Text details */}
            <View style={styles.guestTextContainer}>
              <Text style={styles.guestTitle}>Guest</Text>
              <Text style={styles.guestSubtitle}>
                Sign in to save{'\n'}schemes and applications
              </Text>
            </View>

            {/* Green Sign In Button */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate('SignIn')}
              activeOpacity={0.85}
            >
              <Ionicons name="log-in-outline" size={18} color={Colors.white} />
              <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Authenticated User Card */
          <View style={[styles.userCard, Shadows.card]}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={Colors.primary[600]} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || 'Farmer'}</Text>
              <Text style={styles.userEmail}>{user?.email || user?.mobile || 'Logged in'}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="create-outline" size={20} color={Colors.gray[500]} />
            </TouchableOpacity>
          </View>
        )}

        {/* Menu items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen as any)}
              activeOpacity={0.6}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={20} color={Colors.primary[600]} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.badge && (
                <View style={styles.menuBadge}>
                  <Text style={styles.menuBadgeText}>{item.badge}</Text>
                </View>
              )}
              <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout (if authenticated) */}
        {!isGuest && (
          <Button
            title="Logout"
            onPress={() => setShowLogoutDialog(true)}
            variant="danger"
            size="md"
            icon="log-out-outline"
            fullWidth
            style={{ marginTop: Spacing['2xl'] }}
          />
        )}

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>

      <Dialog
        visible={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        title="Logout"
        message="Are you sure you want to logout?"
        actions={[
          { label: 'Cancel', onPress: () => setShowLogoutDialog(false) },
          { label: 'Logout', onPress: handleLogout, variant: 'destructive' },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: 100,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerAvatarBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.primary,
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
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  /* Top Guest Sign-In Card matching Image 1 */
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: Spacing['2xl'],
    gap: Spacing.md,
  },
  guestAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[50], // Soft green container (keeping green color only)
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestTextContainer: {
    flex: 1,
  },
  guestTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 2,
  },
  guestSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 17,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary[500], // Keeping green color only
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: Colors.primary[500],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  signInButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  /* Authenticated User Card */
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray[100],
    marginBottom: Spacing['2xl'],
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: { flex: 1 },
  userName: { ...Typography.h5, color: Colors.text.primary, marginBottom: 2 },
  userEmail: { ...Typography.bodySm, color: Colors.text.secondary },
  menuContainer: { gap: Spacing.xxs },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: { ...Typography.label, color: Colors.text.primary, flex: 1 },
  menuBadge: {
    backgroundColor: Colors.primary[500],
    borderRadius: 10,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  menuBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.white },
  version: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: Spacing['3xl'],
  },
});
