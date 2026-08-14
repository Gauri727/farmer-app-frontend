/**
 * Login / Signup Screen — Farmer AI / Krishi Mitra
 * Clean, modern, trustworthy, mobile-first card-based authentication.
 * Fully localized across 5 languages & theme-aware (Light / Dark).
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGoogleLogin } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Language } from '../../types/api.types';
import { AuthScreenProps } from '../../navigation/types';

const LANGUAGES: Language[] = [
  { code: 'mr', name: 'मराठी' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ahr', name: 'अहिराणी' },
  { code: 'kok', name: 'कोंकणी' },
];

export const LoginScreen: React.FC<AuthScreenProps<'Login'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { login } = useAuthContext();
  const { t, selectedLanguage, setLanguage } = useLanguageContext();
  const { isDarkMode, toggleTheme, colors: themeColors } = useThemeContext();
  const googleLoginMutation = useGoogleLogin();

  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Entrance animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  const handleSendOTP = async () => {
    const cleanNum = mobileNumber.replace(/\D/g, '');
    if (cleanNum.length < 10) {
      setErrorMsg(t('mobilePlaceholder') || 'कृपया १० अंकी वैध मोबाईल क्रमांक प्रविष्ट करा');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      // Small feedback delay then navigate to OTP Verification
      setTimeout(() => {
        setIsSubmitting(false);
        navigation.navigate('OTPLogin', { mobile: cleanNum });
      }, 300);
    } catch {
      setIsSubmitting(false);
      setErrorMsg(t('errorOccurred') || 'त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLoginMutation.mutateAsync({
        id_token: 'google_id_token_placeholder',
      });
      if (result.success) {
        await login(result.data.user, result.data.access_token, result.data.refresh_token);
      }
    } catch {
      // Demo fallback for smooth offline/testing flow
      await login(
        {
          id: '1',
          name: 'Shri Farmer',
          email: 'farmer@farmerai.org',
          mobile: mobileNumber || '9876543210',
          preferred_language: selectedLanguage.code,
        },
        'demo_token',
        'demo_refresh'
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F7FAF8', paddingTop: insets.top }]}>
      {/* Background Subtle Ambient Circles */}
      <View style={[styles.bgCircle1, { backgroundColor: isDarkMode ? 'rgba(6, 78, 59, 0.25)' : 'rgba(220, 252, 231, 0.45)' }]} />
      <View style={[styles.bgCircle2, { backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.4)' : 'rgba(240, 253, 244, 0.7)' }]} />

      {/* Top Header Bar with Language Selector & Theme Toggle */}
      <View style={styles.topHeader}>
        {/* Brand Tag */}
        <View style={[styles.brandTag, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
          <Ionicons name="leaf" size={16} color="#15803D" />
          <Text style={[styles.brandTagText, { color: isDarkMode ? '#6EE7B7' : '#15803D' }]}>
            {t('krishiMitra') || 'Farmer AI'}
          </Text>
        </View>

        {/* Action Controls */}
        <View style={styles.rightActionsRow}>
          {/* Language Selector Dropdown */}
          <View style={styles.langWrapper}>
            <TouchableOpacity
              style={[styles.langSelectorBtn, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
              onPress={() => setDropdownOpen(!dropdownOpen)}
              activeOpacity={0.85}
            >
              <Ionicons name="globe-outline" size={15} color="#16A34A" />
              <Text style={[styles.langSelectorText, { color: themeColors.textPrimary }]}>
                {selectedLanguage.name}
              </Text>
              <Ionicons name="chevron-down" size={13} color={themeColors.textSecondary} />
            </TouchableOpacity>

            {/* Popover Language Card */}
            {dropdownOpen && (
              <>
                <TouchableOpacity
                  style={styles.backdropOverlay}
                  activeOpacity={1}
                  onPress={() => setDropdownOpen(false)}
                />
                <View style={[styles.dropdownCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
                  <ScrollView nestedScrollEnabled style={{ maxHeight: 240 }}>
                    {LANGUAGES.map((lang, index) => {
                      const isSelected = selectedLanguage.code === lang.code;
                      return (
                        <TouchableOpacity
                          key={lang.code}
                          style={[
                            styles.dropdownRow,
                            index < LANGUAGES.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDarkMode ? '#374151' : '#F1F5F9' },
                            isSelected && { backgroundColor: isDarkMode ? '#064E3B' : '#F0FDF4' },
                          ]}
                          onPress={() => handleSelectLanguage(lang)}
                        >
                          <Text
                            style={[
                              styles.dropdownRowText,
                              { color: themeColors.textPrimary },
                              isSelected && { fontWeight: '800', color: '#16A34A' },
                            ]}
                          >
                            {lang.name}
                          </Text>
                          {isSelected && <Ionicons name="checkmark" size={16} color="#16A34A" />}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </>
            )}
          </View>

          {/* Theme Toggle Button */}
          <TouchableOpacity
            style={[styles.themeToggleBtn, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
            onPress={toggleTheme}
            activeOpacity={0.8}
            accessibilityLabel="Toggle Theme"
          >
            <Ionicons
              name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
              size={17}
              color={isDarkMode ? '#F59E0B' : '#4B5563'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              styles.centerCardContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Centered Rounded Authentication Card */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                  borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                },
              ]}
            >
              {/* Logo / Emblem Container */}
              <View style={styles.logoWrap}>
                <View
                  style={[
                    styles.logoIconContainer,
                    {
                      backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9',
                      borderColor: isDarkMode ? '#047857' : '#A7F3D0',
                    },
                  ]}
                >
                  <Ionicons name="leaf" size={32} color={isDarkMode ? '#6EE7B7' : '#187A3D'} />
                </View>
              </View>

              {/* Main Welcome Heading */}
              <Text style={[styles.welcomeHeading, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}>
                {t('welcomeFarmer') || 'नमस्कार, शेतकरी 👋'}
              </Text>

              {/* Subheading Description */}
              <Text style={[styles.loginSubtitle, { color: isDarkMode ? '#9CA3AF' : '#64748B' }]}>
                {t('loginSubtitle') || 'तुमच्या आवाजातून सरकारी योजना व शेती माहिती शोधा.'}
              </Text>

              {/* Form Input Section */}
              <View style={styles.formGroup}>
                <Text style={[styles.inputLabel, { color: isDarkMode ? '#E5E7EB' : '#374151' }]}>
                  {t('mobileNumberLabel') || 'मोबाईल क्रमांक'}
                </Text>

                <View
                  style={[
                    styles.inputContainer,
                    {
                      backgroundColor: isDarkMode ? '#111827' : '#F8FAFC',
                      borderColor: isFocused
                        ? (isDarkMode ? '#10B981' : '#187A3D')
                        : errorMsg
                        ? '#EF4444'
                        : (isDarkMode ? '#374151' : '#E2E8F0'),
                    },
                  ]}
                >
                  <Text style={[styles.countryCode, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}>
                    +91
                  </Text>
                  <View style={[styles.verticalDivider, { backgroundColor: isDarkMode ? '#374151' : '#CBD5E1' }]} />
                  <TextInput
                    style={[styles.textInput, { color: isDarkMode ? '#F9FAFB' : '#111827' }]}
                    value={mobileNumber}
                    onChangeText={(text) => {
                      setMobileNumber(text);
                      if (errorMsg) setErrorMsg('');
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={t('mobilePlaceholder') || '१० अंकी मोबाईल क्रमांक टाका'}
                    placeholderTextColor={isDarkMode ? '#6B7280' : '#94A3B8'}
                    keyboardType="phone-pad"
                    maxLength={10}
                    accessibilityLabel="Mobile Number Input"
                  />
                </View>
                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
              </View>

              {/* Primary Send OTP Button */}
              <TouchableOpacity
                style={[
                  styles.sendOtpBtn,
                  isSubmitting && { opacity: 0.8 },
                ]}
                onPress={handleSendOTP}
                disabled={isSubmitting}
                activeOpacity={0.88}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Text style={styles.sendOtpBtnText}>{t('sendOtp') || 'OTP पाठवा'}</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                  </>
                )}
              </TouchableOpacity>

              {/* OR Divider */}
              <View style={styles.dividerRow}>
                <View style={[styles.dividerLine, { backgroundColor: isDarkMode ? '#374151' : '#E2E8F0' }]} />
                <Text style={[styles.dividerText, { color: isDarkMode ? '#9CA3AF' : '#94A3B8' }]}>
                  {t('orDivider') || 'किंवा'}
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: isDarkMode ? '#374151' : '#E2E8F0' }]} />
              </View>

              {/* Google Login Button */}
              <TouchableOpacity
                style={[
                  styles.googleBtn,
                  {
                    backgroundColor: isDarkMode ? '#111827' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                  },
                ]}
                onPress={handleGoogleLogin}
                activeOpacity={0.88}
              >
                <View style={[styles.googleIconCircle, { backgroundColor: isDarkMode ? '#1F2937' : '#F8FAFC' }]}>
                  <Ionicons name="logo-google" size={18} color="#4285F4" />
                </View>
                <Text style={[styles.googleBtnText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
                  {t('continueWithGoogle') || 'Google सह पुढे जा'}
                </Text>
              </TouchableOpacity>

              {/* Bottom Terms & Privacy Disclaimer */}
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsConditions' as any)}
                activeOpacity={0.7}
              >
                <Text style={[styles.termsText, { color: isDarkMode ? '#9CA3AF' : '#94A3B8' }]}>
                  {t('termsPolicyAgreement') || 'पुढे चालू ठेवून तुम्ही आमच्या सेवा अटी व गोपनीयता धोरणास सहमती देता.'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Background Glow Blobs */
  bgCircle1: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
  },

  /* Top Bar Header */
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    zIndex: 100,
  },
  brandTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  brandTagText: {
    fontSize: 13,
    fontWeight: '800',
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langWrapper: {
    position: 'relative',
    zIndex: 1000,
  },
  langSelectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  langSelectorText: {
    fontSize: 13,
    fontWeight: '700',
  },
  themeToggleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },

  /* Popover Dropdown */
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
  dropdownCard: {
    position: 'absolute',
    top: 42,
    right: 0,
    width: 170,
    borderRadius: 16,
    paddingVertical: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
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
    fontSize: 13,
    fontWeight: '600',
  },

  /* Scroll & Card Centering */
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  centerCardContainer: {
    width: '100%',
    maxWidth: 410,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 28,
    paddingHorizontal: 26,
    paddingTop: 28,
    paddingBottom: 24,
    borderWidth: 1.5,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    alignItems: 'center',
  },

  /* Logo Container */
  logoWrap: {
    marginBottom: 18,
  },
  logoIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },

  /* Headings */
  welcomeHeading: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  loginSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 26,
    paddingHorizontal: 8,
  },

  /* Input Form */
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 14,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '800',
    paddingRight: 10,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: 52,
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    marginTop: 6,
  },

  /* Buttons */
  sendOtpBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#187A3D',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#187A3D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  sendOtpBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
  },
  googleBtn: {
    width: '100%',
    height: 50,
    borderRadius: 16,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  googleIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },

  /* Terms Footer */
  termsText: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 10,
  },
});
