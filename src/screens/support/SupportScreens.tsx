/**
 * Support Screens — Farmer AI
 *
 * Includes:
 * - About
 * - Privacy Policy
 * - Terms & Conditions
 * - Offline
 * - Loading
 * - Error
 * - Not Found
 *
 * Theme-aware and integrated with global i18n.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from '../../theme';

import { Button } from '../../components/common/Button';
import { Header } from '../../components/layout/Header';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useLanguageContext } from '../../contexts/LanguageContext';

/* =========================================================
   ABOUT SCREEN
========================================================= */

export const AboutScreen: React.FC<any> = ({ navigation }) => {
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t } = useLanguageContext();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('about') || 'माहिती (About)'}
        showLanguageSelector
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* App Header */}
        <View style={styles.aboutHeader}>
          <Image
            source={require('../../../assets/icon.png')}
            style={styles.aboutLogo}
            resizeMode="contain"
          />

          <Text
            style={[
              styles.appName,
              { color: themeColors.textPrimary },
            ]}
          >
            Farmer AI
          </Text>

          <Text
            style={[
              styles.version,
              { color: themeColors.textSecondary },
            ]}
          >
            Version 1.0.0
          </Text>
        </View>

        {/* About */}
        <View
          style={[
            aboutStyles.card,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={aboutStyles.cardTitle}>
            About Farmer AI
          </Text>

          <Text
            style={[
              aboutStyles.cardText,
              { color: themeColors.textSecondary },
            ]}
          >
            Farmer AI is a premium, voice-first agricultural
            assistant designed to bridge the digital gap for
            Indian farmers. By providing multi-language and
            regional voice assistance, it allows farmers to
            easily discover government welfare schemes, check
            eligibility, and get direct farm advice just by
            speaking.
          </Text>
        </View>

        {/* Vision & Mission */}
        <View
          style={[
            aboutStyles.card,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={aboutStyles.cardTitle}>
            Vision & Mission
          </Text>

          <View style={aboutStyles.bulletRow}>
            <Ionicons
              name="eye-outline"
              size={20}
              color={isDarkMode ? '#6EE7B7' : '#15803D'}
              style={aboutStyles.bulletIcon}
            />

            <View style={aboutStyles.bulletTextWrap}>
              <Text
                style={[
                  aboutStyles.bulletLabel,
                  { color: themeColors.textPrimary },
                ]}
              >
                Our Vision
              </Text>

              <Text
                style={[
                  aboutStyles.bulletText,
                  { color: themeColors.textSecondary },
                ]}
              >
                To democratize access to agricultural intelligence
                and government support for every farmer in India,
                regardless of language or literacy barriers.
              </Text>
            </View>
          </View>

          <View style={aboutStyles.bulletRow}>
            <Ionicons
              name="flag-outline"
              size={20}
              color={isDarkMode ? '#6EE7B7' : '#15803D'}
              style={aboutStyles.bulletIcon}
            />

            <View style={aboutStyles.bulletTextWrap}>
              <Text
                style={[
                  aboutStyles.bulletLabel,
                  { color: themeColors.textPrimary },
                ]}
              >
                Our Mission
              </Text>

              <Text
                style={[
                  aboutStyles.bulletText,
                  { color: themeColors.textSecondary },
                ]}
              >
                To build highly localized, voice-enabled AI
                solutions that empower farming communities with
                instant, actionable guidance on crop health,
                soil welfare, market rates, and welfare
                eligibility.
              </Text>
            </View>
          </View>
        </View>

        {/* Core AI Features */}
        <View
          style={[
            aboutStyles.card,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={aboutStyles.cardTitle}>
            Core AI Features
          </Text>

          <View style={aboutStyles.featureItem}>
            <View style={aboutStyles.featureHeader}>
              <Ionicons
                name="document-text"
                size={18}
                color="#FF8A00"
              />

              <Text
                style={[
                  aboutStyles.featureName,
                  { color: themeColors.textPrimary },
                ]}
              >
                Government Scheme Support
              </Text>
            </View>

            <Text
              style={[
                aboutStyles.featureDesc,
                { color: themeColors.textSecondary },
              ]}
            >
              Automatic eligibility mapping and localized
              instructions for central and state schemes.
            </Text>
          </View>

          <View style={aboutStyles.featureItem}>
            <View style={aboutStyles.featureHeader}>
              <Ionicons
                name="flower"
                size={18}
                color="#FF8A00"
              />

              <Text
                style={[
                  aboutStyles.featureName,
                  { color: themeColors.textPrimary },
                ]}
              >
                Crop Recommendation
              </Text>
            </View>

            <Text
              style={[
                aboutStyles.featureDesc,
                { color: themeColors.textSecondary },
              ]}
            >
              Smart soil-to-crop guidance based on geographic
              indicators, land sizes, and regional inputs.
            </Text>
          </View>

          <View style={aboutStyles.featureItem}>
            <View style={aboutStyles.featureHeader}>
              <Ionicons
                name="bug"
                size={18}
                color="#FF8A00"
              />

              <Text
                style={[
                  aboutStyles.featureName,
                  { color: themeColors.textPrimary },
                ]}
              >
                Crop Disease Detection
              </Text>
            </View>

            <Text
              style={[
                aboutStyles.featureDesc,
                { color: themeColors.textSecondary },
              ]}
            >
              Identify crop pests and leaf spots instantly using
              AI-powered diagnostic recommendations.
            </Text>
          </View>

          <View style={aboutStyles.featureItem}>
            <View style={aboutStyles.featureHeader}>
              <Ionicons
                name="thunderstorm"
                size={18}
                color="#FF8A00"
              />

              <Text
                style={[
                  aboutStyles.featureName,
                  { color: themeColors.textPrimary },
                ]}
              >
                Weather Forecast
              </Text>
            </View>

            <Text
              style={[
                aboutStyles.featureDesc,
                { color: themeColors.textSecondary },
              ]}
            >
              Micro-local weather insights with voice alerts to
              protect crops during storm events.
            </Text>
          </View>
        </View>

        {/* Technology Stack */}
        <View
          style={[
            aboutStyles.card,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={aboutStyles.cardTitle}>
            Technology Stack
          </Text>

          <Text
            style={[
              aboutStyles.cardText,
              { color: themeColors.textSecondary },
            ]}
          >
            Built with state-of-the-art technologies for smooth
            multi-platform delivery:
          </Text>

          <View style={aboutStyles.tagContainer}>
            {[
              'React Native',
              'Expo',
              'TypeScript',
              'Axios',
              'React Query',
              'LLM Agents',
              'Whisper Speech API',
            ].map((tag) => (
              <View
                key={tag}
                style={[
                  aboutStyles.tag,
                  {
                    backgroundColor: isDarkMode
                      ? '#064E3B'
                      : '#E8F5E9',
                  },
                ]}
              >
                <Text
                  style={[
                    aboutStyles.tagText,
                    {
                      color: isDarkMode
                        ? '#6EE7B7'
                        : '#15803D',
                    },
                  ]}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact & Support */}
        <View
          style={[
            aboutStyles.card,
            {
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            },
          ]}
        >
          <Text style={aboutStyles.cardTitle}>
            Contact & Support
          </Text>

          <View style={aboutStyles.bulletRow}>
            <Ionicons
              name="mail-outline"
              size={16}
              color={isDarkMode ? '#6EE7B7' : '#15803D'}
            />

            <Text
              style={[
                aboutStyles.contactText,
                { color: themeColors.textSecondary },
              ]}
            >
              Email: support@farmervoice.in
            </Text>
          </View>

          <View style={aboutStyles.bulletRow}>
            <Ionicons
              name="call-outline"
              size={16}
              color={isDarkMode ? '#6EE7B7' : '#15803D'}
            />

            <Text
              style={[
                aboutStyles.contactText,
                { color: themeColors.textSecondary },
              ]}
            >
              Helpline: +91 1800 200 3456
            </Text>
          </View>

          <TouchableOpacity
            style={[
              aboutStyles.privacyButton,
              { borderTopColor: themeColors.border },
            ]}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Text
              style={[
                aboutStyles.privacyText,
                {
                  color: isDarkMode
                    ? '#6EE7B7'
                    : '#15803D',
                },
              ]}
            >
              View Privacy Policy
            </Text>

            <Ionicons
              name="chevron-forward"
              size={14}
              color={isDarkMode ? '#6EE7B7' : '#15803D'}
            />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

/* =========================================================
   PRIVACY POLICY
========================================================= */

export const PrivacyPolicyScreen: React.FC<any> = ({
  navigation,
}) => {
  const { colors: themeColors } = useThemeContext();
  const { t } = useLanguageContext();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('privacyPolicy') || 'गोपनीयता धोरण'}
        showLanguageSelector
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={[
            styles.bodyText,
            { color: themeColors.textSecondary },
          ]}
        >
          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            Effective Date:
          </Text>{' '}
          January 1, 2025
          {'\n\n'}

          We are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and
          safeguard your personal information.
          {'\n\n'}

          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            Information We Collect
          </Text>
          {'\n'}

          • Personal information (name, mobile number, email)
          {'\n'}
          • Location data (state, district)
          {'\n'}
          • Voice recordings (for AI assistance)
          {'\n'}
          • Usage analytics
          {'\n\n'}

          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            How We Use Your Information
          </Text>
          {'\n'}

          • To provide personalized scheme recommendations
          {'\n'}
          • To check eligibility for government schemes
          {'\n'}
          • To improve our AI assistant
          {'\n'}
          • To send relevant notifications
          {'\n\n'}

          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            Data Security
          </Text>
          {'\n'}

          We implement industry-standard security measures to
          protect your data. Your voice recordings are processed
          securely and not shared with third parties.
          {'\n\n'}

          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            Contact
          </Text>
          {'\n'}

          For questions about this policy, contact us at
          privacy@farmervoice.in
        </Text>
      </ScrollView>
    </View>
  );
};

/* =========================================================
   TERMS & CONDITIONS
========================================================= */

export const TermsScreen: React.FC<any> = ({
  navigation,
}) => {
  const { colors: themeColors } = useThemeContext();
  const { t } = useLanguageContext();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
    >
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('termsConditions') || 'अटी व शर्ती'}
        showLanguageSelector
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={[
            styles.bodyText,
            { color: themeColors.textSecondary },
          ]}
        >
          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            Last Updated:
          </Text>{' '}
          January 1, 2025
          {'\n\n'}

          By using Farmer AI Voice Assistant, you agree to these
          terms.
          {'\n\n'}

          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            Use of Service
          </Text>
          {'\n'}

          • The app provides information about government schemes
          and agricultural guidance
          {'\n'}
          • Information is for reference only and may not be
          fully up-to-date
          {'\n'}
          • Always verify scheme details with official
          government sources
          {'\n\n'}

          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            User Responsibilities
          </Text>
          {'\n'}

          • Provide accurate information for eligibility checks
          {'\n'}
          • Do not misuse the voice assistant
          {'\n'}
          • Keep your account credentials secure
          {'\n\n'}

          <Text
            style={[
              styles.bold,
              { color: themeColors.textPrimary },
            ]}
          >
            Disclaimer
          </Text>
          {'\n'}

          We provide information as-is. We are not responsible for
          decisions made based on the information provided by our
          AI assistant. Government scheme details are sourced
          from publicly available data and may change without
          notice.
        </Text>
      </ScrollView>
    </View>
  );
};

/* =========================================================
   OFFLINE SCREEN
========================================================= */

export const OfflineScreen: React.FC<{
  onRetry?: () => void;
}> = ({ onRetry }) => {
  const { colors: themeColors } = useThemeContext();

  return (
    <View
      style={[
        styles.centerContainer,
        { backgroundColor: themeColors.background },
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: Colors.warningBg },
        ]}
      >
        <Ionicons
          name="cloud-offline-outline"
          size={48}
          color={Colors.warning}
        />
      </View>

      <Text
        style={[
          styles.centerTitle,
          { color: themeColors.textPrimary },
        ]}
      >
        No Internet Connection
      </Text>

      <Text
        style={[
          styles.centerSubtitle,
          { color: themeColors.textSecondary },
        ]}
      >
        Please check your connection and try again.
      </Text>

      {onRetry && (
        <Button
          title="Retry"
          onPress={onRetry}
          variant="primary"
          size="md"
          icon="refresh"
          style={{ marginTop: Spacing.xl }}
        />
      )}
    </View>
  );
};

/* =========================================================
   LOADING SCREEN
========================================================= */

export const LoadingScreen: React.FC = () => {
  const { colors: themeColors } = useThemeContext();

  return (
    <View
      style={[
        styles.centerContainer,
        { backgroundColor: themeColors.background },
      ]}
    >
      <View style={styles.logoContainer}>
        <Ionicons
          name="leaf"
          size={32}
          color={Colors.white}
        />
      </View>

      <ActivityIndicator
        size="large"
        color={Colors.primary[500]}
        style={{ marginTop: Spacing.xl }}
      />

      <Text
        style={[
          styles.centerSubtitle,
          {
            color: themeColors.textSecondary,
            marginTop: Spacing.md,
          },
        ]}
      >
        Loading...
      </Text>
    </View>
  );
};

/* =========================================================
   ERROR SCREEN
========================================================= */

export const ErrorScreen: React.FC<{
  onRetry?: () => void;
  message?: string;
}> = ({ onRetry, message }) => {
  const { colors: themeColors } = useThemeContext();

  return (
    <View
      style={[
        styles.centerContainer,
        { backgroundColor: themeColors.background },
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: Colors.errorBg },
        ]}
      >
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color={Colors.error}
        />
      </View>

      <Text
        style={[
          styles.centerTitle,
          { color: themeColors.textPrimary },
        ]}
      >
        Something Went Wrong
      </Text>

      <Text
        style={[
          styles.centerSubtitle,
          { color: themeColors.textSecondary },
        ]}
      >
        {message ||
          'An unexpected error occurred. Please try again.'}
      </Text>

      {onRetry && (
        <Button
          title="Try Again"
          onPress={onRetry}
          variant="primary"
          size="md"
          icon="refresh"
          style={{ marginTop: Spacing.xl }}
        />
      )}
    </View>
  );
};

/* =========================================================
   NOT FOUND SCREEN
========================================================= */

export const NotFoundScreen: React.FC<{
  onGoHome?: () => void;
}> = ({ onGoHome }) => {
  const { colors: themeColors } = useThemeContext();

  return (
    <View
      style={[
        styles.centerContainer,
        { backgroundColor: themeColors.background },
      ]}
    >
      <Text style={styles.notFoundCode}>404</Text>

      <Text
        style={[
          styles.centerTitle,
          { color: themeColors.textPrimary },
        ]}
      >
        Page Not Found
      </Text>

      <Text
        style={[
          styles.centerSubtitle,
          { color: themeColors.textSecondary },
        ]}
      >
        The page you're looking for doesn't exist.
      </Text>

      {onGoHome && (
        <Button
          title="Go Home"
          onPress={onGoHome}
          variant="primary"
          size="md"
          icon="home-outline"
          style={{ marginTop: Spacing.xl }}
        />
      )}
    </View>
  );
};

/* =========================================================
   GENERAL STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: Spacing.xl,
    paddingBottom: 100,
  },

  aboutHeader: {
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },

  aboutLogo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    marginBottom: Spacing.lg,
  },

  appName: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },

  version: {
    ...Typography.bodySm,
    marginBottom: Spacing.xl,
  },

  bodyText: {
    ...Typography.body,
    lineHeight: 24,
  },

  bold: {
    fontWeight: '700',
  },

  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing['3xl'],
  },

  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  centerTitle: {
    ...Typography.h4,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  centerSubtitle: {
    ...Typography.body,
    textAlign: 'center',
    lineHeight: 22,
  },

  notFoundCode: {
    fontSize: 64,
    fontWeight: '800',
    color: Colors.primary[200],
    marginBottom: Spacing.md,
  },
});

/* =========================================================
   ABOUT PAGE STYLES
========================================================= */

const aboutStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1.5,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#16A34A',
    marginBottom: Spacing.md,
  },

  cardText: {
    fontSize: 13,
    lineHeight: 18,
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: Spacing.xs,
    gap: Spacing.sm,
  },

  bulletIcon: {
    marginTop: 2,
  },

  bulletTextWrap: {
    flex: 1,
  },

  bulletLabel: {
    fontSize: 13,
    fontWeight: '800',
  },

  bulletText: {
    fontSize: 12,
    lineHeight: 16,
  },

  featureItem: {
    marginBottom: Spacing.md,
  },

  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 2,
  },

  featureName: {
    fontSize: 13,
    fontWeight: '800',
  },

  featureDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 22,
  },

  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },

  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.1)',
  },

  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },

  contactText: {
    fontSize: 13,
  },

  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },

  privacyText: {
    fontSize: 13,
    fontWeight: '700',
  },
});