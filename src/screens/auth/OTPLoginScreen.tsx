/**
 * OTP Login Screen
 * Phone input → OTP verification
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Colors,
  Spacing,
  BorderRadius,
  Typography,
} from '../../theme';

import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

import {
  useSendOTP,
  useVerifyOTP,
} from '../../hooks/useAuth';

import { useAuthContext } from '../../contexts/AuthContext';
import { AuthScreenProps } from '../../navigation/types';

// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────

const phoneSchema = z.object({
  mobile: z
    .string()
    .min(10, 'Enter a valid 10-digit mobile number')
    .max(10, 'Enter a valid 10-digit mobile number')
    .regex(/^\d{10}$/, 'Only digits allowed'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────

export const OTPLoginScreen: React.FC<
  AuthScreenProps<'OTPLogin'>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const { login } = useAuthContext();

  const sendOTPMutation = useSendOTP();
  const verifyOTPMutation = useVerifyOTP();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const [phoneNumber, setPhoneNumber] = useState(
    route.params?.mobile || ''
  );

  const [otpDigits, setOtpDigits] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const otpInputs = useRef<(TextInput | null)[]>([]);

  // ─────────────────────────────────────────
  // Phone form
  // ─────────────────────────────────────────

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      mobile: route.params?.mobile || '',
    },
  });

  // ─────────────────────────────────────────
  // Send OTP
  // ─────────────────────────────────────────

  const handleSendOTP = async (data: PhoneFormData) => {
    try {
      await sendOTPMutation.mutateAsync({
        mobile: data.mobile,
      });

      setPhoneNumber(data.mobile);
      setOtpDigits(['', '', '', '', '', '']);
      setStep('otp');

      setTimeout(() => {
        otpInputs.current[0]?.focus();
      }, 100);
    } catch {
      // Existing mutation handles the error.
    }
  };

  // ─────────────────────────────────────────
  // OTP change
  // ─────────────────────────────────────────

  const handleOTPChange = (
    text: string,
    index: number
  ) => {
    // Allow only numbers
    const digit = text.replace(/\D/g, '').slice(0, 1);

    const newDigits = [...otpDigits];

    newDigits[index] = digit;

    setOtpDigits(newDigits);

    // Move to next box
    if (digit && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  // ─────────────────────────────────────────
  // Backspace
  // ─────────────────────────────────────────

  const handleOTPKeyPress = (
    key: string,
    index: number
  ) => {
    if (
      key === 'Backspace' &&
      !otpDigits[index] &&
      index > 0
    ) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  // ─────────────────────────────────────────
  // Verify OTP
  // ─────────────────────────────────────────

  const handleVerifyOTP = async () => {
    const otp = otpDigits.join('');

    if (otp.length !== 6) {
      return;
    }

    try {
      const result = await verifyOTPMutation.mutateAsync({
        mobile: phoneNumber,
        otp,
      });

      if (result.success) {
        await login(
          result.data.user,
          result.data.access_token,
          result.data.refresh_token
        );
      }
    } catch {
      setOtpDigits([
        '',
        '',
        '',
        '',
        '',
        '',
      ]);

      setTimeout(() => {
        otpInputs.current[0]?.focus();
      }, 100);
    }
  };

  // ─────────────────────────────────────────
  // Change mobile number
  // ─────────────────────────────────────────

  const handleChangeNumber = () => {
    setOtpDigits([
      '',
      '',
      '',
      '',
      '',
      '',
    ]);

    setStep('phone');
  };

  // ─────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop:
              insets.top + Spacing.md,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            step === 'otp'
              ? setStep('phone')
              : navigation.goBack()
          }
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.text.primary}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          {step === 'phone' ? (
            <>
              {/* Phone icon */}
              <View style={styles.iconHeader}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={32}
                  color={Colors.primary[500]}
                />
              </View>

              <Text style={styles.title}>
                Enter Mobile Number
              </Text>

              <Text style={styles.subtitle}>
                We'll send you a 6-digit verification
                code
              </Text>

              {/* Mobile number */}
              <Controller
                control={phoneForm.control}
                name="mobile"
                render={({
                  field: {
                    onChange,
                    value,
                  },
                  fieldState: {
                    error,
                  },
                }) => (
                  <Input
                    label="Mobile Number"
                    value={value}
                    onChangeText={(text) =>
                      onChange(
                        text.replace(/\D/g, '')
                      )
                    }
                    error={error?.message}
                    placeholder="Enter 10-digit number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    leftIcon="call-outline"
                    required
                  />
                )}
              />

              {/* Send OTP */}
              <Button
                title="Send OTP"
                onPress={phoneForm.handleSubmit(
                  handleSendOTP
                )}
                variant="primary"
                size="lg"
                fullWidth
                loading={
                  sendOTPMutation.isPending
                }
                icon="arrow-forward"
                iconPosition="right"
              />
            </>
          ) : (
            <>
              {/* OTP icon */}
              <View style={styles.iconHeader}>
                <Ionicons
                  name="lock-closed-outline"
                  size={32}
                  color={Colors.primary[500]}
                />
              </View>

              <Text style={styles.title}>
                Verify OTP
              </Text>

              <Text style={styles.subtitle}>
                Enter the 6-digit code sent to{'\n'}
                +91 {phoneNumber}
              </Text>

              {/* 6 OTP boxes */}
              <View style={styles.otpContainer}>
                {otpDigits.map(
                  (digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        otpInputs.current[index] =
                          ref;
                      }}
                      style={[
                        styles.otpInput,
                        digit &&
                          styles.otpInputFilled,
                      ]}
                      value={digit}
                      onChangeText={(text) =>
                        handleOTPChange(
                          text,
                          index
                        )
                      }
                      onKeyPress={({ nativeEvent }) =>
                        handleOTPKeyPress(
                          nativeEvent.key,
                          index
                        )
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      selectTextOnFocus
                      accessibilityLabel={`OTP digit ${
                        index + 1
                      }`}
                    />
                  )
                )}
              </View>

              {/* Verify */}
              <Button
                title="Verify OTP"
                onPress={handleVerifyOTP}
                variant="primary"
                size="lg"
                fullWidth
                loading={
                  verifyOTPMutation.isPending
                }
                disabled={otpDigits.some(
                  (digit) => !digit
                )}
              />

              {/* Resend */}
              <TouchableOpacity
                style={styles.resendButton}
                onPress={() =>
                  sendOTPMutation.mutate({
                    mobile: phoneNumber,
                  })
                }
                disabled={
                  sendOTPMutation.isPending
                }
              >
                <Text style={styles.resendText}>
                  Didn't receive code? Resend OTP
                </Text>
              </TouchableOpacity>

              {/* Change number */}
              <TouchableOpacity
                style={styles.changePhoneBtn}
                onPress={handleChangeNumber}
                activeOpacity={0.7}
              >
                <Text
                  style={styles.changePhoneText}
                >
                  Change mobile number
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing['3xl'],
  },

  backButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  content: {
    flex: 1,
    paddingHorizontal: Spacing['2xl'],
    paddingTop: Spacing.xl,
  },

  iconHeader: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  title: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },

  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing['3xl'],
    lineHeight: 22,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing['3xl'],
    gap: Spacing.sm,
  },

  otpInput: {
    flex: 1,
    maxWidth: 52,
    height: 56,
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
    borderRadius: BorderRadius.md,
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text.primary,
    backgroundColor: Colors.gray[50],
  },

  otpInputFilled: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },

  resendButton: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    padding: Spacing.md,
  },

  resendText: {
    ...Typography.bodySm,
    color: Colors.primary[600],
    fontWeight: '500',
  },

  changePhoneBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },

  changePhoneText: {
    ...Typography.bodySm,
    color: Colors.primary[600],
    fontWeight: '600',
  },
});