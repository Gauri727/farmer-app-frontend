/**
 * Voice Assistant Screen
 * Clean 3D green sphere mic button matching reference structure with theme colors
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { useVoiceQuery } from '../../hooks/useVoice';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { HomeScreenProps } from '../../navigation/types';

export const VoiceAssistantScreen: React.FC<HomeScreenProps<'VoiceAssistant'>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { selectedLanguage } = useLanguageContext();
  const voiceQuery = useVoiceQuery();

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  // Animated bars for waveform
  const barAnims = useRef(
    Array.from({ length: 7 }, () => new Animated.Value(0.3))
  ).current;

  // Subtle pulse animation for 3D mic ambient glow
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      const animations = barAnims.map((anim, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: Math.random() * 0.7 + 0.3,
              duration: 200 + i * 50,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: 200 + i * 50,
              useNativeDriver: true,
            }),
          ])
        )
      );
      animations.forEach((a) => a.start());
      return () => animations.forEach((a) => a.stop());
    }
  }, [isRecording]);

  useEffect(() => {
    let pulseLoop: Animated.CompositeAnimation | null = null;
    if (isRecording) {
      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();
    } else {
      pulseAnim.setValue(1);
    }
    return () => {
      if (pulseLoop) pulseLoop.stop();
    };
  }, [isRecording]);

  const handleMicPress = async () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTranscript('');
      setResponse('');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background Soft Mint Tint Accent */}
      <LinearGradient
        colors={['#F7FAF8', '#EAF5EE', '#DEEFE5']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Assistant</Text>
        <View style={styles.langBadge}>
          <Text style={styles.langText}>{selectedLanguage.name}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Waveform */}
        {isRecording && (
          <View style={styles.waveform}>
            {barAnims.map((anim, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    transform: [{ scaleY: anim }],
                  },
                ]}
              />
            ))}
          </View>
        )}

        {/* Transcript */}
        {transcript ? (
          <View style={styles.messageCard}>
            <View style={styles.messageHeader}>
              <Ionicons name="person-circle-outline" size={20} color={Colors.primary[600]} />
              <Text style={styles.messageLabel}>You said</Text>
            </View>
            <Text style={styles.messageText}>{transcript}</Text>
          </View>
        ) : null}

        {/* AI Response */}
        {response ? (
          <View style={[styles.messageCard, styles.responseCard]}>
            <View style={styles.messageHeader}>
              <Ionicons name="leaf" size={20} color={Colors.primary[600]} />
              <Text style={styles.messageLabel}>Farmer AI</Text>
            </View>
            <Text style={styles.messageText}>{response}</Text>
          </View>
        ) : null}

        {/* Suggestion chips when idle */}
        {!isRecording && !transcript && (
          <View style={styles.suggestions}>
            <Text style={styles.suggestionsTitle}>Try asking</Text>
            {[
              'Which schemes am I eligible for?',
              'How to apply for PM Kisan?',
              'What is the weather forecast?',
              'Tell me about crop insurance',
            ].map((suggestion, idx) => (
              <TouchableOpacity key={idx} style={styles.suggestionChip}>
                <Ionicons name="mic-outline" size={16} color={Colors.primary[600]} />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* 3D Green Sphere Mic Button */}
      <View style={styles.micContainer}>
        <Animated.View
          style={[
            styles.micOuterGlow,
            isRecording && styles.micOuterGlowRecording,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <TouchableOpacity
            onPress={handleMicPress}
            activeOpacity={0.9}
            style={styles.micTouchArea}
          >
            <LinearGradient
              colors={
                isRecording
                  ? ['#FF4D4D', '#E53935', '#B71C1C']
                  : ['#5CB85C', '#2E7D32', '#144D1E']
              }
              start={{ x: 0.35, y: 0.05 }}
              end={{ x: 0.65, y: 0.95 }}
              style={[
                styles.micSphere,
                isRecording ? styles.micSphereRecording : styles.micSphereIdle,
              ]}
            >
              <Ionicons
                name={isRecording ? 'stop' : 'mic'}
                size={64}
                color="#FFFFFF"
              />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.micHint}>
          {isRecording ? 'Tap to stop' : 'Tap to start speaking'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  backBtn: { padding: Spacing.xs },
  headerTitle: { ...Typography.h5, color: Colors.text.primary, flex: 1 },
  langBadge: {
    backgroundColor: '#E8F5E9',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  langText: { ...Typography.labelSm, color: '#1B5E20' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xs, paddingBottom: 310 },
  waveform: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    height: 60,
    marginBottom: Spacing['3xl'],
  },
  waveBar: {
    width: 6,
    height: 50,
    backgroundColor: Colors.primary[500],
    borderRadius: 3,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  responseCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#A5D6A7',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  messageLabel: { ...Typography.labelSm, color: Colors.text.secondary },
  messageText: { ...Typography.body, color: Colors.text.primary, lineHeight: 22 },
  suggestions: { marginTop: Spacing.xs },
  suggestionsTitle: {
    ...Typography.label,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.lg,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  suggestionText: { ...Typography.body, color: Colors.text.primary },
  micContainer: {
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  micOuterGlow: {
    width: 210,
    height: 210,
    borderRadius: 105,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
  },
  micOuterGlowRecording: {
    backgroundColor: 'rgba(229, 57, 53, 0.12)',
  },
  micTouchArea: {
    width: 176,
    height: 176,
    borderRadius: 88,
  },
  micSphere: {
    width: 176,
    height: 176,
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 18,
  },
  micSphereIdle: {
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
  },
  micSphereRecording: {
    shadowColor: '#B71C1C',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
  },
  micHint: {
    fontSize: 18,
    fontWeight: '500',
    color: '#263238',
    marginTop: 18,
  },
});
