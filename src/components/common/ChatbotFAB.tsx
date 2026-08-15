/**
 * ChatbotFAB
 * Full-screen chatbot overlay.
 *
 * IMPORTANT:
 * - Outer FAB functionality stays the same.
 * - Inner chatbot logo uses assets/icon.png.
 * - Chatbot fills the complete screen.
 * - No chatbot functionality is removed.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../../theme';

export const ChatbotFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const text = message.trim();

    if (!text) {
      return;
    }

    // KEEP YOUR EXISTING CHAT/SEND API FUNCTIONALITY HERE.
    // Do not remove your existing API call if you already have one.

    setMessage('');
  };

  /* =====================================================
     OPEN CHATBOT
     ===================================================== */

  if (isOpen) {
    return (
      <View style={styles.fullScreenOverlay}>
        <KeyboardAvoidingView
          style={styles.fullScreen}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.chatbotContainer}>

            {/* ================= HEADER ================= */}

            <View style={styles.header}>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setIsOpen(false)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={Colors.white}
                />
              </TouchableOpacity>

              {/* INNER APP ICON */}
              <Image
                source={require('../../../assets/icon.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />

              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>
                  Farmer AI Assistant
                </Text>

                <View style={styles.onlineRow}>
                  <View style={styles.onlineDot} />

                  <Text style={styles.onlineText}>
                    Online · Farming Expert
                  </Text>
                </View>
              </View>

              <View style={styles.languageButtons}>

                <TouchableOpacity style={styles.languageActive}>
                  <Text style={styles.languageActiveText}>
                    EN
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.languageButton}>
                  <Text style={styles.languageText}>
                    हि
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.languageButton}>
                  <Text style={styles.languageText}>
                    मरा
                  </Text>
                </TouchableOpacity>

              </View>
            </View>

            {/* ================= CONTENT ================= */}

            <View style={styles.content}>

              <ScrollView
                style={styles.messages}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >

                {/* INNER APP ICON */}

                <View style={styles.welcomeContainer}>

                  <Image
                    source={require('../../../assets/icon.png')}
                    style={styles.welcomeLogo}
                    resizeMode="contain"
                  />

                  <Text style={styles.welcomeTitle}>
                    Namaste! How can I help?
                  </Text>

                  <Text style={styles.welcomeSubtitle}>
                    Ask me about government schemes, subsidies, or any
                    farming-related questions.
                  </Text>

                  <TouchableOpacity
                    style={styles.languagePill}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="language-outline"
                      size={14}
                      color={Colors.primary[600]}
                    />

                    <Text style={styles.languagePillText}>
                      English
                    </Text>
                  </TouchableOpacity>

                </View>

              </ScrollView>

              {/* ================= QUICK QUESTIONS ================= */}

              <View style={styles.quickSection}>

                <Text style={styles.quickTitle}>
                  Quick questions:
                </Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.quickQuestions}
                  keyboardShouldPersistTaps="handled"
                >

                  <TouchableOpacity
                    style={styles.quickQuestion}
                    onPress={() =>
                      setMessage(
                        'What schemes are available for farmers?'
                      )
                    }
                  >
                    <Ionicons
                      name="mic-outline"
                      size={16}
                      color={Colors.primary[600]}
                    />

                    <Text style={styles.quickQuestionText}>
                      What schemes are available for farmers?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.quickQuestion}
                    onPress={() =>
                      setMessage(
                        'How to apply for a scheme?'
                      )
                    }
                  >
                    <Ionicons
                      name="mic-outline"
                      size={16}
                      color={Colors.primary[600]}
                    />

                    <Text style={styles.quickQuestionText}>
                      How to apply for a scheme?
                    </Text>
                  </TouchableOpacity>

                </ScrollView>
              </View>

              {/* ================= INPUT ================= */}

              <View style={styles.inputArea}>

                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Type your question..."
                  placeholderTextColor={Colors.text.tertiary}
                  style={styles.input}
                  multiline
                  textAlignVertical="center"
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
                />

                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    !message.trim() &&
                      styles.sendButtonDisabled,
                  ]}
                  onPress={handleSend}
                  disabled={!message.trim()}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color={Colors.white}
                  />
                </TouchableOpacity>

              </View>

            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  /* =====================================================
     OUTER FLOATING CHATBOT BUTTON
     
     KEEP THIS AS YOUR EXISTING OUTER CHATBOT.
     DO NOT REPLACE IT WITH icon.png.
     ===================================================== */

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => setIsOpen(true)}
      activeOpacity={0.85}
    >
      {/* YOUR EXISTING OUTER CHATBOT IMAGE / DESIGN */}
      <View style={styles.fabInner}>
        <Ionicons
          name="chatbubble-ellipses"
          size={28}
          color={Colors.white}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  /* =====================================================
     FULL SCREEN
     ===================================================== */

  fullScreenOverlay: {
    position: 'absolute',

    /*
     * IMPORTANT:
     * Fill the entire parent instead of creating
     * a small centered modal.
     */
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    width: '100%',
    height: '100%',

    backgroundColor: Colors.white,

    zIndex: 99999,

    elevation: 999,
  },

  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  chatbotContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },

  /* =====================================================
     HEADER
     ===================================================== */

  header: {
    minHeight: 72,

    backgroundColor: Colors.primary[600],

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: 'rgba(255,255,255,0.18)',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 8,
  },

  /* INNER APP ICON */

  headerLogo: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: Colors.white,

    marginRight: 8,
  },

  headerText: {
    flex: 1,
    justifyContent: 'center',
  },

  headerTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  onlineDot: {
    width: 6,
    height: 6,

    borderRadius: 3,

    backgroundColor: '#55D88A',

    marginRight: 4,
  },

  onlineText: {
    color: Colors.white,
    opacity: 0.9,
    fontSize: 10,
  },

  languageButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  languageActive: {
    paddingHorizontal: 11,
    paddingVertical: 8,

    borderRadius: 18,

    backgroundColor: Colors.white,
  },

  languageActiveText: {
    color: Colors.primary[600],
    fontSize: 11,
    fontWeight: '700',
  },

  languageButton: {
    paddingHorizontal: 9,
    paddingVertical: 8,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  languageText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
  },

  /* =====================================================
     CONTENT
     ===================================================== */

  content: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  messages: {
    flex: 1,
  },

  messagesContent: {
    flexGrow: 1,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  welcomeContainer: {
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },

  /* INNER APP ICON */

  welcomeLogo: {
    width: 64,
    height: 64,

    marginBottom: 18,
  },

  welcomeTitle: {
    ...Typography.h4,

    color: Colors.text.primary,

    textAlign: 'center',

    marginBottom: 8,
  },

  welcomeSubtitle: {
    ...Typography.bodySm,

    color: Colors.text.secondary,

    textAlign: 'center',

    lineHeight: 21,

    maxWidth: 360,
  },

  languagePill: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 5,

    marginTop: 16,

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 20,

    backgroundColor: Colors.primary[50],

    borderWidth: 1,
    borderColor: Colors.primary[100],
  },

  languagePillText: {
    color: Colors.primary[600],

    fontSize: 12,

    fontWeight: '600',
  },

  /* =====================================================
     QUICK QUESTIONS
     ===================================================== */

  quickSection: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  quickTitle: {
    ...Typography.caption,

    color: Colors.text.secondary,

    marginBottom: 8,
  },

  quickQuestions: {
    gap: 8,
  },

  quickQuestion: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 7,

    maxWidth: 310,

    paddingHorizontal: 16,
    paddingVertical: 11,

    borderRadius: 22,

    borderWidth: 1,
    borderColor: Colors.primary[200],

    backgroundColor: Colors.white,
  },

  quickQuestionText: {
    color: Colors.primary[700],

    fontSize: 12,

    fontWeight: '500',

    flexShrink: 1,
  },

  /* =====================================================
     INPUT
     ===================================================== */

  inputArea: {
    flexDirection: 'row',

    alignItems: 'flex-end',

    paddingHorizontal: 16,
    paddingVertical: 12,

    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],

    backgroundColor: Colors.white,

    gap: 10,
  },

  input: {
    flex: 1,

    minHeight: 52,
    maxHeight: 110,

    backgroundColor: Colors.gray[50],

    borderRadius: 20,

    paddingHorizontal: 16,
    paddingVertical: 13,

    color: Colors.text.primary,

    fontSize: 14,

    borderWidth: 1,
    borderColor: Colors.gray[100],
  },

  sendButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: Colors.primary[600],

    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButtonDisabled: {
    opacity: 0.45,
  },

  /* =====================================================
     OUTER FAB
     ===================================================== */

  fab: {
    position: 'absolute',

    right: 20,
    bottom: 90,

    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor: Colors.primary[600],

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 999,

    elevation: 8,
  },

  fabInner: {
    width: '100%',
    height: '100%',

    borderRadius: 31,

    justifyContent: 'center',
    alignItems: 'center',
  },
});