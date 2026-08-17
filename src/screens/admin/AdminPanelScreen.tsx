/**
 * Admin Panel Screen — Restricted Admin Access & Admin Dashboard
 * Displays restricted access view matching Screenshot 1 for non-admin users,
 * and full admin dashboard when logged in with an admin/moderator account.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import { Header } from '../../components/layout/Header';
import { useAuthContext } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { ProfileScreenProps } from '../../navigation/types';

export const AdminPanelScreen: React.FC<ProfileScreenProps<'AdminPanel'>> = ({
  navigation,
}) => {
  const { user } = useAuthContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t } = useLanguageContext();

  // Role check using existing authentication context
  const isAdmin =
    Boolean(user) &&
    (user?.role === 'admin' ||
      user?.role === 'moderator' ||
      (user as any)?.isAdmin === true);

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

  // If user is NOT an admin/moderator, render restricted access screen matching Screenshot 1
  if (!isAdmin) {
    return (
      <View
        style={[
          styles.restrictedContainer,
          { backgroundColor: isDarkMode ? '#111827' : '#F8FAFC' },
        ]}
      >
        <Header
          showBack
          onBackPress={() => navigation.goBack()}
          title={t('admin') || 'Admin'}
          showLanguageSelector
        />

        <View style={styles.restrictedContent}>
          {/* Large Shield Icon */}
          <Ionicons
            name="shield-outline"
            size={72}
            color={isDarkMode ? '#94A3B8' : '#334155'}
            style={styles.shieldIcon}
          />

          {/* Heading */}
          <Text
            style={[
              styles.restrictedTitle,
              { color: isDarkMode ? '#F9FAFB' : '#0F172A' },
            ]}
          >
            {t('adminAccessRequired') || 'Admin access required'}
          </Text>

          {/* Subheading */}
          <Text
            style={[
              styles.restrictedSubtitle,
              { color: isDarkMode ? '#9CA3AF' : '#475569' },
            ]}
          >
            {t('adminAccessSub') || 'Sign in with an admin or moderator account to view this panel.'}
          </Text>

          {/* Sign In Green Gradient Pill Button */}
          <TouchableOpacity
            style={styles.signInTouchable}
            onPress={handleSignIn}
            activeOpacity={0.88}
          >
            <LinearGradient
              colors={['#16A34A', '#15803D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientPillBtn}
            >
              <Text style={styles.signInBtnText}>{t('signIn') || 'Sign in'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Admin Dashboard for authenticated admin/moderator accounts
  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('admin') || 'Admin'}
        showLanguageSelector
      />

      <ScrollView
        contentContainerStyle={styles.dashboardContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Admin Badge */}
        <View style={styles.adminBadgeRow}>
          <View style={styles.adminBadge}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#15803D" />
            <Text style={styles.adminBadgeText}>{t('adminAccessGranted') || 'ADMIN ACCESS GRANTED'}</Text>
          </View>
        </View>

        <Text style={[styles.welcomeTitle, { color: themeColors.textPrimary }]}>
          {t('welcomeAdmin') || 'Welcome, Administrator'}
        </Text>
        <Text style={[styles.welcomeSub, { color: themeColors.textSecondary }]}>
          {t('adminDashboardSub') || 'System overview and management dashboard.'}
        </Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <Ionicons name="people-outline" size={24} color="#16A34A" />
            <Text style={[styles.statVal, { color: themeColors.textPrimary }]}>2,840</Text>
            <Text style={[styles.statLbl, { color: themeColors.textSecondary }]}>{t('registeredFarmers') || 'Registered Farmers'}</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <Ionicons name="document-text-outline" size={24} color="#16A34A" />
            <Text style={[styles.statVal, { color: themeColors.textPrimary }]}>20</Text>
            <Text style={[styles.statLbl, { color: themeColors.textSecondary }]}>{t('activeSchemes') || 'Active Schemes'}</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <Ionicons name="hourglass-outline" size={24} color="#F59E0B" />
            <Text style={[styles.statVal, { color: themeColors.textPrimary }]}>34</Text>
            <Text style={[styles.statLbl, { color: themeColors.textSecondary }]}>{t('pendingApplications') || 'Pending Applications'}</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <Ionicons name="pulse-outline" size={24} color="#10B981" />
            <Text style={[styles.statVal, { color: themeColors.textPrimary }]}>99.9%</Text>
            <Text style={[styles.statLbl, { color: themeColors.textSecondary }]}>{t('systemHealth') || 'System Health'}</Text>
          </View>
        </View>

        {/* Admin Tools */}
        <Text style={[styles.sectionHeading, { color: themeColors.textPrimary }]}>
          {t('managementModules') || 'Management Modules'}
        </Text>

        <TouchableOpacity
          style={[styles.moduleCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
          activeOpacity={0.8}
        >
          <View style={styles.moduleIconWrap}>
            <Ionicons name="layers-outline" size={20} color="#16A34A" />
          </View>
          <View style={styles.moduleTextWrap}>
            <Text style={[styles.moduleTitle, { color: themeColors.textPrimary }]}>Scheme Management</Text>
            <Text style={[styles.moduleSub, { color: themeColors.textSecondary }]}>Edit eligibility criteria and subsidy rates for 20 schemes.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.moduleCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
          activeOpacity={0.8}
        >
          <View style={styles.moduleIconWrap}>
            <Ionicons name="checkmark-done-circle-outline" size={20} color="#16A34A" />
          </View>
          <View style={styles.moduleTextWrap}>
            <Text style={[styles.moduleTitle, { color: themeColors.textPrimary }]}>Application Review Queue</Text>
            <Text style={[styles.moduleSub, { color: themeColors.textSecondary }]}>Review pending scheme verification requests.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.moduleCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
          activeOpacity={0.8}
        >
          <View style={styles.moduleIconWrap}>
            <Ionicons name="stats-chart-outline" size={20} color="#16A34A" />
          </View>
          <View style={styles.moduleTextWrap}>
            <Text style={[styles.moduleTitle, { color: themeColors.textPrimary }]}>System Logs & Voice Analytics</Text>
            <Text style={[styles.moduleSub, { color: themeColors.textSecondary }]}>Monitor regional voice queries and query trends.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restrictedContainer: {
    flex: 1,
  },
  restrictedContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -40,
  },
  shieldIcon: {
    marginBottom: 24,
  },
  restrictedTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  restrictedSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 300,
    marginBottom: 28,
  },
  signInTouchable: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientPillBtn: {
    height: 48,
    paddingHorizontal: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dashboardContent: {
    padding: 20,
    paddingBottom: 40,
  },
  adminBadgeRow: {
    marginBottom: 12,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  adminBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
    letterSpacing: 0.5,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 14,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },
  statVal: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8,
  },
  statLbl: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 14,
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    gap: 14,
  },
  moduleIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleTextWrap: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  moduleSub: {
    fontSize: 12,
    lineHeight: 16,
  },
});
