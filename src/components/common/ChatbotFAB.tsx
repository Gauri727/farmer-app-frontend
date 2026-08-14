/**
 * ChatbotFAB — Floating Action Button + Full-Screen Farmer AI Chat
 *
 * Globally available chatbot button that floats above every screen.
 * Opens as a full-screen modal covering the entire app.
 * Supports 3 languages: English · हिंदी · मराठी
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  ScrollView,
  Modal,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { chatService } from '../../services/chatService';

const SCREEN = Dimensions.get('window');
const MOBILE_WIDTH = Math.min(SCREEN.width, 420);

// ─── Language config ──────────────────────────────────────────────────────────

type LangCode = 'en' | 'hi' | 'mr';

interface LangConfig {
  code: LangCode;
  label: string;
  nativeLabel: string;
  placeholder: string;
  welcomeTitle: string;
  welcomeSub: string;
  quickLabel: string;
  headerSubtitle: string;
  suggestions: string[];
}

const LANGUAGES: LangConfig[] = [
  {
    code: 'en',
    label: 'EN',
    nativeLabel: 'English',
    placeholder: 'Type your question…',
    welcomeTitle: 'Namaste! How can I help?',
    welcomeSub: 'Ask me about government schemes, subsidies, or any farming-related questions.',
    quickLabel: 'Quick questions:',
    headerSubtitle: 'Online · Farming Expert',
    suggestions: [
      'What schemes are available for farmers?',
      'How to apply for PM-KISAN?',
      'Crop insurance details',
      'Subsidy on fertilizers',
    ],
  },
  {
    code: 'hi',
    label: 'हिं',
    nativeLabel: 'हिंदी',
    placeholder: 'अपना सवाल लिखें…',
    welcomeTitle: 'नमस्ते! मैं कैसे मदद कर सकता हूँ?',
    welcomeSub: 'सरकारी योजनाओं, सब्सिडी या खेती से जुड़े किसी भी सवाल के बारे में पूछें।',
    quickLabel: 'त्वरित प्रश्न:',
    headerSubtitle: 'ऑनलाइन · कृषि विशेषज्ञ',
    suggestions: [
      'किसानों के लिए कौन सी योजनाएं हैं?',
      'PM-KISAN के लिए आवेदन कैसे करें?',
      'फसल बीमा की जानकारी',
      'उर्वरकों पर सब्सिडी',
    ],
  },
  {
    code: 'mr',
    label: 'मरा',
    nativeLabel: 'मराठी',
    placeholder: 'तुमचा प्रश्न टाइप करा…',
    welcomeTitle: 'नमस्कार! मी कशी मदत करू?',
    welcomeSub: 'सरकारी योजना, अनुदान किंवा शेतीशी संबंधित कोणत्याही प्रश्नाबद्दल विचारा.',
    quickLabel: 'त्वरित प्रश्न:',
    headerSubtitle: 'ऑनलाइन · शेती तज्ञ',
    suggestions: [
      'शेतकऱ्यांसाठी कोणत्या योजना आहेत?',
      'PM-KISAN साठी अर्ज कसा करावा?',
      'पीक विमा माहिती',
      'खतांवर अनुदान',
    ],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

// ─── Language Picker ──────────────────────────────────────────────────────────

interface LangPickerProps {
  selected: LangCode;
  onSelect: (code: LangCode) => void;
}

const LangPicker: React.FC<LangPickerProps> = ({ selected, onSelect }) => (
  <View style={langStyles.row}>
    {LANGUAGES.map(lang => {
      const active = lang.code === selected;
      return (
        <TouchableOpacity
          key={lang.code}
          style={[langStyles.pill, active && langStyles.pillActive]}
          onPress={() => onSelect(lang.code)}
          activeOpacity={0.75}
          accessibilityLabel={`Switch to ${lang.nativeLabel}`}
        >
          <Text style={[langStyles.pillText, active && langStyles.pillTextActive]}>
            {lang.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const langStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  pillActive: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
  },
  pillTextActive: {
    color: Colors.primary[700],
  },
});

// ─── Message Bubble ───────────────────────────────────────────────────────────

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.bubbleRow, isUser ? styles.bubbleRowUser : styles.bubbleRowBot]}>
      {!isUser && (
        <View style={styles.botAvatar}>
          <Ionicons name="leaf" size={16} color={Colors.white} />
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
        <Text style={[styles.bubbleText, isUser ? styles.bubbleTextUser : styles.bubbleTextBot]}>
          {message.text}
        </Text>
        <Text style={[styles.timestamp, isUser ? styles.timestampUser : styles.timestampBot]}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
};

// ─── Typing Indicator ─────────────────────────────────────────────────────────

const TypingIndicator: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -7, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.delay(600),
        ])
      ).start();
    animate(dot1, 0);
    animate(dot2, 150);
    animate(dot3, 300);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.typingContainer}>
      <View style={styles.botAvatar}>
        <Ionicons name="leaf" size={16} color={Colors.white} />
      </View>
      <View style={styles.typingBubble}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { transform: [{ translateY: dot }] }]} />
        ))}
      </View>
    </View>
  );
};

// ─── Main ChatbotFAB ──────────────────────────────────────────────────────────

export const ChatbotFAB: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeLang, setActiveLang] = useState<LangCode>('en');

  const lang = LANGUAGES.find(l => l.code === activeLang) ?? LANGUAGES[0];

  // FAB pulse animation
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef<FlatList>(null);

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        text: trimmed,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMsg]);
      setInputText('');
      setIsLoading(true);
      scrollToBottom();

      try {
        const response = await chatService.sendMessage({
          message: trimmed,
          language: activeLang,
        });

        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: response?.data?.answer ?? 'Sorry, I could not get a response. Please try again.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMsg]);
      } catch {
        const errorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text:
            activeLang === 'hi'
              ? 'अभी कनेक्ट करने में समस्या हो रही है। कृपया दोबारा कोशिश करें।'
              : activeLang === 'mr'
              ? 'आत्ता कनेक्ट होण्यात समस्या आहे. कृपया पुन्हा प्रयत्न करा.'
              : 'Having trouble connecting right now. Please check your internet and try again.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
        scrollToBottom();
      }
    },
    [isLoading, activeLang, scrollToBottom]
  );

  const handleLangChange = useCallback((code: LangCode) => {
    setActiveLang(code);
    setMessages([]);
    setInputText('');
  }, []);

  const showSuggestions = messages.length === 0 && !isLoading;

  return (
    <>
      {/* ── Floating Action Button ── */}
      {!isOpen && (
        <View
          style={[styles.fabWrapper, { bottom: insets.bottom + 90 }]}
          pointerEvents="box-none"
        >
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={styles.fab}
              onPress={() => setIsOpen(true)}
              activeOpacity={0.85}
              accessibilityLabel="Open Farmer AI Assistant"
              accessibilityRole="button"
            >
              <Ionicons name="chatbubble-ellipses" size={26} color={Colors.white} />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.fabLabel}>Farmer AI</Text>
        </View>
      )}

      {/* ── Full-Screen Chat Modal ── */}
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsOpen(false)}
        statusBarTranslucent
      >
        <StatusBar backgroundColor={Colors.primary[700]} barStyle="light-content" />
        <View style={styles.modalBackdrop}>
          <View style={[styles.mobileContainer, { paddingTop: insets.top }]}>

          {/* ── Gradient-style Header ── */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setIsOpen(false)}
              accessibilityLabel="Close Farmer AI Assistant"
            >
              <Ionicons name="arrow-back" size={22} color={Colors.white} />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <View style={styles.headerAvatar}>
                <Ionicons name="leaf" size={20} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.headerTitle}>Farmer AI Assistant</Text>
                <View style={styles.onlineRow}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>{lang.headerSubtitle}</Text>
                </View>
              </View>
            </View>

            <LangPicker selected={activeLang} onSelect={handleLangChange} />
          </View>

          {/* ── Chat Body ── */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.chatBody}
            keyboardVerticalOffset={0}
          >
            {/* Welcome banner */}
            {messages.length === 0 && (
              <View style={styles.welcomeBanner}>
                <Text style={styles.welcomeEmoji}>🌾</Text>
                <Text style={styles.welcomeTitle}>{lang.welcomeTitle}</Text>
                <Text style={styles.welcomeSub}>{lang.welcomeSub}</Text>
                <View style={styles.langBadge}>
                  <Ionicons name="language-outline" size={13} color={Colors.primary[600]} />
                  <Text style={styles.langBadgeText}>{lang.nativeLabel}</Text>
                </View>
              </View>
            )}

            {/* Messages list */}
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <MessageBubble message={item} />}
              contentContainerStyle={styles.messagesList}
              onContentSizeChange={scrollToBottom}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={isLoading ? <TypingIndicator /> : null}
            />

            {/* Suggestion chips */}
            {showSuggestions && (
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsLabel}>{lang.quickLabel}</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.suggestionsScroll}
                >
                  {lang.suggestions.map(s => (
                    <TouchableOpacity
                      key={s}
                      style={styles.chip}
                      onPress={() => sendMessage(s)}
                      activeOpacity={0.75}
                    >
                      <Text style={styles.chipText}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Input row */}
            <View style={[styles.inputRow, { paddingBottom: Math.max(insets.bottom, 12) }]}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder={lang.placeholder}
                placeholderTextColor={Colors.gray[400]}
                multiline
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={() => sendMessage(inputText)}
                blurOnSubmit={false}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  (!inputText.trim() || isLoading) && styles.sendBtnDisabled,
                ]}
                onPress={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isLoading}
                activeOpacity={0.8}
                accessibilityLabel="Send message"
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Ionicons name="send" size={18} color={Colors.white} />
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // FAB
  fabWrapper: {
    position: 'absolute',
    right: 18,
    alignItems: 'center',
    zIndex: 999,
    elevation: 999,
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[900],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 12,
  },
  fabLabel: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary[600],
    letterSpacing: 0.3,
  },

  // Modal backdrop + mobile container
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileContainer: {
    width: MOBILE_WIDTH,
    flex: 1,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 30,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: Colors.primary[600],
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
  },
  onlineText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },

  // Chat body
  chatBody: {
    flex: 1,
    backgroundColor: '#F8FAF8',
  },

  // Welcome
  welcomeBanner: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 16,
  },
  welcomeEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 16,
  },
  langBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primary[50],
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  langBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary[700],
  },

  // Messages
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexGrow: 1,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-end',
    gap: 10,
  },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleRowBot: { justifyContent: 'flex-start' },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  bubbleUser: {
    backgroundColor: Colors.primary[600],
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  bubbleText: { fontSize: 15, lineHeight: 22 },
  bubbleTextUser: { color: Colors.white },
  bubbleTextBot: { color: Colors.text.primary },
  timestamp: { fontSize: 10, marginTop: 5 },
  timestampUser: { color: 'rgba(255,255,255,0.65)', textAlign: 'right' },
  timestampBot: { color: Colors.gray[400] },

  // Typing indicator
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[400],
  },

  // Suggestions
  suggestionsContainer: {
    paddingLeft: 16,
    paddingBottom: 10,
    paddingTop: 4,
  },
  suggestionsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray[500],
    marginBottom: 9,
  },
  suggestionsScroll: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: Colors.primary[300],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    fontSize: 13,
    color: Colors.primary[700],
    fontWeight: '600',
  },

  // Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
    gap: 10,
    backgroundColor: Colors.white,
  },
  textInput: {
    flex: 1,
    minHeight: 46,
    maxHeight: 120,
    backgroundColor: '#F0F4F0',
    borderRadius: 23,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text.primary,
    borderWidth: 1.5,
    borderColor: Colors.gray[200],
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[900],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 5,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.gray[300],
    shadowOpacity: 0,
    elevation: 0,
  },
});
