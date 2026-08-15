/**
 * Login Screen
 * Google + OTP login options
 *
 * Functionality preserved:
 * - Mobile number input
 * - 10-digit validation before OTP navigation
 * - Existing Google login mutation
 * - Existing AuthStack navigation
 */

import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Colors,
  Typography,
} from '../../theme';

import { useGoogleLogin } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';
import { AuthScreenProps } from '../../navigation/types';

export const LoginScreen: React.FC<AuthScreenProps<'Login'>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const { login } = useAuthContext();
  const googleLoginMutation = useGoogleLogin();

  const [mobile, setMobile] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  /* =========================================
     MOBILE NUMBER
  ========================================= */

  const handleMobileChange = (text: string) => {
    // Allow numbers only
    const numbersOnly = text.replace(/[^0-9]/g, '');

    // Maximum 10 digits
    setMobile(numbersOnly.slice(0, 10));
  };

  /* =========================================
     SEND OTP
  ========================================= */

  const handleOTPLogin = () => {
    // Do NOT navigate without a mobile number
    if (mobile.length === 0) {
      Alert.alert(
        'Mobile Number Required',
        'Please enter your mobile number first.'
      );
      return;
    }

    // Do NOT navigate with an incomplete number
    if (mobile.length !== 10) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    // Only navigate after valid 10-digit number
    navigation.navigate('OTPLogin', {});
  };

  /* =========================================
     GOOGLE LOGIN
  ========================================= */

  const handleGoogleLogin = async () => {
    if (isGoogleLoading) {
      return;
    }

    try {
      setIsGoogleLoading(true);

      /*
       * Keep your existing Google login API flow.
       *
       * IMPORTANT:
       * Your original project currently uses a placeholder
       * Google ID token. Real Google OAuth requires
       * expo-auth-session / Google OAuth configuration.
       */

      const result = await googleLoginMutation.mutateAsync({
        id_token: 'google_id_token_placeholder',
      });

      if (result.success) {
        await login(
          result.data.user,
          result.data.access_token,
          result.data.refresh_token
        );
      }
    } catch (error) {
      console.log('Google login error:', error);

      Alert.alert(
        'Google Sign In',
        'Unable to sign in with Google right now.'
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.card}>

          {/* =================================
              APP ICON
          ================================= */}

          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.appIcon}
              resizeMode="contain"
            />
          </View>

          {/* =================================
              TITLE
          ================================= */}

          <Text style={styles.title}>
            Welcome, Farmer
          </Text>

          <Text style={styles.subtitle}>
            Discover government schemes with your voice.
          </Text>

          {/* =================================
              MOBILE NUMBER LABEL
          ================================= */}

          <Text style={styles.label}>
            Mobile Number
          </Text>

          {/* =================================
              MOBILE NUMBER INPUT
          ================================= */}

          <View style={styles.mobileInputContainer}>

            <Text style={styles.countryCode}>
              +91
            </Text>

            <View style={styles.inputDivider} />

            <TextInput
              value={mobile}
              onChangeText={handleMobileChange}
              style={styles.mobileInput}
              keyboardType="phone-pad"
              inputMode="numeric"
              maxLength={10}
              placeholder="Enter mobile number"
              placeholderTextColor="#98A2B3"
              returnKeyType="done"
              editable={!isGoogleLoading}
            />

          </View>

          {/* =================================
              SEND OTP
          ================================= */}

          <TouchableOpacity
            style={[
              styles.otpButton,
              mobile.length === 10
                ? styles.otpButtonActive
                : styles.otpButtonInactive,
            ]}
            onPress={handleOTPLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.otpButtonText}>
              Send OTP
            </Text>
          </TouchableOpacity>

          {/* =================================
              OR
          ================================= */}

          <View style={styles.divider}>

            <View style={styles.dividerLine} />

            <Text style={styles.dividerText}>
              OR
            </Text>

            <View style={styles.dividerLine} />

          </View>

          {/* =================================
              GOOGLE
          ================================= */}

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.8}
            disabled={isGoogleLoading}
          >

            <Ionicons
              name="logo-google"
              size={21}
              color="#4285F4"
            />

            <Text style={styles.googleText}>
              {isGoogleLoading
                ? 'Signing in...'
                : 'Continue with Google'}
            </Text>

          </TouchableOpacity>

          {/* =================================
              TERMS
          ================================= */}

          <Text style={styles.terms}>
            By continuing you agree to our Terms & Privacy Policy.
          </Text>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

/* =========================================
   STYLES
========================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EEF3F9',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  /* =========================================
     CARD
  ========================================= */

  card: {
    width: '100%',
    maxWidth: 680,

    backgroundColor: Colors.white,

    borderRadius: 28,

    borderWidth: 1,
    borderColor: Colors.gray[200],

    paddingHorizontal: 46,
    paddingVertical: 42,

    alignItems: 'center',
  },

  /* =========================================
     APP ICON
  ========================================= */

  logoContainer: {
    width: 92,
    height: 92,

    borderRadius: 25,

    backgroundColor: '#D9FBE7',

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 26,
  },

  appIcon: {
    width: 68,
    height: 68,
  },

  /* =========================================
     TITLE
  ========================================= */

  title: {
    ...Typography.h2,

    color: Colors.text.primary,

    fontWeight: '800',

    textAlign: 'center',

    marginBottom: 7,
  },

  subtitle: {
    ...Typography.body,

    color: Colors.text.secondary,

    textAlign: 'center',

    lineHeight: 23,

    marginBottom: 38,

    paddingHorizontal: 5,
  },

  /* =========================================
     LABEL
  ========================================= */

  label: {
    width: '100%',

    fontSize: 17,

    lineHeight: 23,

    color: Colors.text.secondary,

    marginBottom: 9,
  },

  /* =========================================
     MOBILE INPUT
  ========================================= */

  mobileInputContainer: {
    width: '100%',

    height: 62,

    borderWidth: 1.5,

    borderColor: Colors.gray[200],

    borderRadius: 18,

    backgroundColor: Colors.white,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 18,

    marginBottom: 18,
  },

  countryCode: {
    fontSize: 18,

    color: Colors.text.primary,

    fontWeight: '600',
  },

  inputDivider: {
    width: 1,

    height: 27,

    backgroundColor: Colors.gray[200],

    marginHorizontal: 12,
  },

  mobileInput: {
    flex: 1,

    height: '100%',

    fontSize: 18,

    color: Colors.text.primary,

    paddingHorizontal: 0,

    paddingVertical: 0,

    outlineStyle: 'none',
  } as any,

  /* =========================================
     SEND OTP
  ========================================= */

  otpButton: {
    width: '100%',

    height: 62,

    borderRadius: 18,

    alignItems: 'center',

    justifyContent: 'center',
  },

  otpButtonActive: {
    backgroundColor: '#18A94B',
  },

  otpButtonInactive: {
    backgroundColor: '#9AD9AF',
  },

  otpButtonText: {
    color: Colors.white,

    fontSize: 20,

    fontWeight: '700',
  },

  /* =========================================
     DIVIDER
  ========================================= */

  divider: {
    width: '100%',

    flexDirection: 'row',

    alignItems: 'center',

    marginVertical: 25,

    gap: 14,
  },

  dividerLine: {
    flex: 1,

    height: 1,

    backgroundColor: Colors.gray[200],
  },

  dividerText: {
    fontSize: 15,

    color: Colors.text.tertiary,
  },

  /* =========================================
     GOOGLE
  ========================================= */

  googleButton: {
    width: '100%',

    height: 62,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: Colors.gray[200],

    backgroundColor: Colors.white,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 13,
  },

  googleText: {
    color: Colors.text.primary,

    fontSize: 18,

    fontWeight: '600',
  },

  /* =========================================
     TERMS
  ========================================= */

  terms: {
    fontSize: 13,

    lineHeight: 20,

    color: Colors.text.tertiary,

    textAlign: 'center',

    marginTop: 25,

    paddingHorizontal: 10,
  },
});