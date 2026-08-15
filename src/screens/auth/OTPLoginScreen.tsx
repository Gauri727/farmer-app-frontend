/**
 * OTP Login Screen
 * 6-digit OTP verification
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Colors,
  Spacing,
  Typography,
} from '../../theme';

import { useAuthContext } from '../../contexts/AuthContext';
import { AuthScreenProps } from '../../navigation/types';

export const OTPLoginScreen: React.FC<AuthScreenProps<'OTPLogin'>> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { login } = useAuthContext();

  const mobileNumber =
    route.params?.mobileNumber ||
    route.params?.phone ||
    '';

  const [otp, setOtp] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const [timer, setTimer] = useState(25);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  /* -----------------------------------------
     RESEND TIMER
  ----------------------------------------- */

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* -----------------------------------------
     OTP CHANGE
  ----------------------------------------- */

  const handleOtpChange = (
    value: string,
    index: number
  ) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    const updatedOtp = [...otp];

    // Handle pasted OTP
    if (numericValue.length > 1) {
      const digits = numericValue.slice(0, 6).split('');

      digits.forEach((digit, i) => {
        if (index + i < 6) {
          updatedOtp[index + i] = digit;
        }
      });

      setOtp(updatedOtp);

      const nextIndex = Math.min(
        index + digits.length,
        5
      );

      inputRefs.current[nextIndex]?.focus();

      return;
    }

    updatedOtp[index] = numericValue;
    setOtp(updatedOtp);

    // Move to next box automatically
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* -----------------------------------------
     BACKSPACE
  ----------------------------------------- */

  const handleKeyPress = (
    event: any,
    index: number
  ) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* -----------------------------------------
     RESEND OTP
  ----------------------------------------- */

  const handleResendOTP = () => {
    if (timer > 0) {
      return;
    }

    // Reset OTP
    setOtp(['', '', '', '', '', '']);

    // Restart timer
    setTimer(25);

    // Focus first box
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);

    /*
     * Connect your resend OTP API here.
     */
  };

  /* -----------------------------------------
     VERIFY OTP
  ----------------------------------------- */

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join('');

    if (enteredOTP.length !== 6) {
      return;
    }

    try {
      setIsVerifying(true);

      /*
       * IMPORTANT:
       * Connect your existing OTP verification API here.
       *
       * Example:
       *
       * const result = await otpLoginMutation.mutateAsync({
       *   mobile: mobileNumber,
       *   otp: enteredOTP,
       * });
       *
       * if (result.success) {
       *   await login(
       *     result.data.user,
       *     result.data.access_token,
       *     result.data.refresh_token
       *   );
       * }
       */

      console.log(
        'OTP:',
        enteredOTP,
        'Mobile:',
        mobileNumber
      );

    } catch (error) {
      console.log(
        'OTP verification failed:',
        error
      );
    } finally {
      setIsVerifying(false);
    }
  };

  /* -----------------------------------------
     BACK TO LOGIN
  ----------------------------------------- */

  const handleChangeNumber = () => {
    navigation.navigate('Login');
  };

  const isOtpComplete = otp.every(
    (digit) => digit.length === 1
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 30,
            paddingBottom: insets.bottom + 30,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.outerCard}>

          {/* INNER CARD */}

          <View style={styles.card}>

            {/* BACK BUTTON */}

            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                navigation.navigate('Login')
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name="arrow-back"
                size={25}
                color={Colors.text.primary}
              />
            </TouchableOpacity>

            {/* APP ICON */}

            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/icon.png')}
                style={styles.appIcon}
                resizeMode="contain"
              />
            </View>

            {/* TITLE */}

            <Text style={styles.title}>
              Verify your number
            </Text>

            <Text style={styles.subtitle}>
              Enter the 6-digit OTP sent to your
              {'\n'}
              mobile number.
            </Text>

            {/* OTP BOXES */}

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpBox,
                    digit
                      ? styles.otpBoxFilled
                      : null,
                  ]}
                  value={digit}
                  onChangeText={(value) =>
                    handleOtpChange(
                      value,
                      index
                    )
                  }
                  onKeyPress={(event) =>
                    handleKeyPress(
                      event,
                      index
                    )
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              ))}
            </View>

            {/* RESEND */}

            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={timer > 0}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.resendText,
                  timer === 0
                    ? styles.resendActive
                    : null,
                ]}
              >
                {timer > 0
                  ? `Resend OTP in ${timer}s`
                  : 'Resend OTP'}
              </Text>
            </TouchableOpacity>

            {/* VERIFY BUTTON */}

            <TouchableOpacity
              style={[
                styles.verifyButton,
                !isOtpComplete ||
                isVerifying
                  ? styles.verifyDisabled
                  : null,
              ]}
              onPress={handleVerifyOTP}
              disabled={
                !isOtpComplete ||
                isVerifying
              }
              activeOpacity={0.8}
            >
              <Text style={styles.verifyText}>
                {isVerifying
                  ? 'Verifying...'
                  : 'Verify OTP'}
              </Text>
            </TouchableOpacity>

            {/* CHANGE NUMBER */}

            <TouchableOpacity
              onPress={handleChangeNumber}
              activeOpacity={0.7}
            >
              <Text style={styles.changeNumber}>
                Change mobile number
              </Text>
            </TouchableOpacity>

          </View>
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
  },

  outerCard: {
    width: '100%',
    maxWidth: 620,
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: 20,
  },

  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 24,
    paddingHorizontal: 36,
    paddingVertical: 36,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  /* BACK */

  backButton: {
    alignSelf: 'flex-start',
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  /* APP ICON */

  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: '#D9FBE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },

  appIcon: {
    width: 66,
    height: 66,
  },

  /* TITLE */

  title: {
    ...Typography.h2,
    color: Colors.text.primary,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  /* OTP */

  otpContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
    marginBottom: 28,
  },

  otpBox: {
    width: 48,
    height: 58,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 14,
    backgroundColor: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
  },

  otpBoxFilled: {
    borderColor: '#18A94B',
    borderWidth: 2,
  },

  /* RESEND */

  resendText: {
    color: Colors.text.secondary,
    fontSize: 14,
    marginBottom: 28,
  },

  resendActive: {
    color: '#18A94B',
    fontWeight: '600',
  },

  /* VERIFY */

  verifyButton: {
    width: '100%',
    height: 60,
    borderRadius: 18,
    backgroundColor: '#18A94B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },

  verifyDisabled: {
    opacity: 0.5,
  },

  verifyText: {
    color: Colors.white,
    fontSize: 19,
    fontWeight: '700',
  },

  /* CHANGE NUMBER */

  changeNumber: {
    color: '#18A94B',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
  },
});