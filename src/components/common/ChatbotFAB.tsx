/**
 * ChatbotFAB — Floating Action Button + Chat Modal
 *
 * Globally available chatbot button that floats above every screen.
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { chatService } from '../../services/chatService';

// ─── Language config ──────────────────────────────────────────────────────────

type LangCode = 'en' | 'hi' | 'mr';

interface LangConfig {
  code: LangCode;
  label: string;       // shown in pill button
  nativeLabel: string; // native script label
  placeholder: string;
  welcomeTitle: string;
  welcomeSub: string;
  quickLabel: string;
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: Colors.gray[100],
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  pillActive: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray[500],
  },
  pillTextActive: {
    color: Colors.white,
  },
});

// ─── Message Bubble ───────────────────────────────────────────────────────────

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.bubbleRow, isUser ? styles.bubbleRowUser : styles.bubbleRowBot]}>
      {!isUser && (
        <View style={styles.botAvatar}>
          <Ionicons name="leaf" size={14} color={Colors.white} />
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
          Animated.timing(dot, { toValue: -6, duration: 300, useNativeDriver: true }),
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
        <Ionicons name="leaf" size={14} color={Colors.white} />
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
    // Clear messages so welcome + suggestions refresh in new language
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
              accessibilityLabel="Open AI Chatbot"
              accessibilityRole="button"
            >
              <Ionicons name="chatbubble-ellipses" size={24} color={Colors.white} />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.fabLabel}>Ask AI</Text>
        </View>
      )}

      {/* ── Chat Panel (in-frame overlay) ── */}
      {isOpen && (
        <View style={styles.chatOverlay} pointerEvents="box-none">
          {/* Backdrop */}
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalWrapper}
            keyboardVerticalOffset={0}
          >
            <View style={[styles.chatContainer, { paddingBottom: insets.bottom }]}>

              {/* ── Header ── */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.headerAvatar}>
                    <Ionicons name="leaf" size={18} color={Colors.white} />
                  </View>
                  <View>
                    <Text style={styles.headerTitle}>Kisan AI Assistant</Text>
                    <View style={styles.onlineRow}>
                      <View style={styles.onlineDot} />
                      <Text style={styles.onlineText}>Online · Farming Expert</Text>
                    </View>
                  </View>
                </View>

                {/* Language picker + close */}
                <View style={styles.headerRight}>
                  <LangPicker selected={activeLang} onSelect={handleLangChange} />
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setIsOpen(false)}
                    accessibilityLabel="Close chatbot"
                  >
                    <Ionicons name="close" size={20} color={Colors.gray[600]} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* ── Welcome banner ── */}
              {messages.length === 0 && (
                <View style={styles.welcomeBanner}>
                  <Text style={styles.welcomeEmoji}>🌾</Text>
                  <Text style={styles.welcomeTitle}>{lang.welcomeTitle}</Text>
                  <Text style={styles.welcomeSub}>{lang.welcomeSub}</Text>

                  {/* Active language badge */}
                  <View style={styles.langBadge}>
                    <Ionicons name="language-outline" size={13} color={Colors.primary[600]} />
                    <Text style={styles.langBadgeText}>{lang.nativeLabel}</Text>
                  </View>
                </View>
              )}

              {/* ── Messages ── */}
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

              {/* ── Suggestion chips ── */}
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

              {/* ── Input row ── */}
              <View style={styles.inputRow}>
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
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
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
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[900],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
  },
  fabLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary[600],
    letterSpacing: 0.3,
  },

  // In-frame chat overlay
  chatOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
    minHeight: 440,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 20,
    overflow: 'hidden',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
    backgroundColor: Colors.white,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.primary,
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
    backgroundColor: '#22C55E',
  },
  onlineText: {
    fontSize: 10,
    color: Colors.gray[500],
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Welcome
  welcomeBanner: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 8,
  },
  welcomeEmoji: {
    fontSize: 34,
    marginBottom: 8,
  },
  welcomeTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 12,
  },
  langBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.mint[100],
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  langBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary[700],
  },

  // Messages
  messagesList: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexGrow: 1,
  },
  bubbleRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
    gap: 8,
  },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleRowBot: { justifyContent: 'flex-start' },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleUser: {
    backgroundColor: Colors.primary[600],
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    backgroundColor: Colors.gray[100],
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextUser: { color: Colors.white },
  bubbleTextBot: { color: Colors.text.primary },
  timestamp: { fontSize: 10, marginTop: 4 },
  timestampUser: { color: 'rgba(255,255,255,0.65)', textAlign: 'right' },
  timestampBot: { color: Colors.gray[400] },

  // Typing indicator
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 14,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.gray[400],
  },

  // Suggestions
  suggestionsContainer: {
    paddingLeft: 14,
    paddingBottom: 8,
  },
  suggestionsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray[500],
    marginBottom: 8,
  },
  suggestionsScroll: {
    gap: 8,
    paddingRight: 14,
  },
  chip: {
    backgroundColor: Colors.mint[100],
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  chipText: {
    fontSize: 12,
    color: Colors.primary[700],
    fontWeight: '600',
  },

  // Input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
    gap: 10,
    backgroundColor: Colors.white,
  },
  textInput: {
    flex: 1,
    minHeight: 42,
    maxHeight: 110,
    backgroundColor: Colors.gray[100],
    borderRadius: 21,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary[900],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  sendBtnDisabled: {
    backgroundColor: Colors.gray[300],
    shadowOpacity: 0,
    elevation: 0,
  },
});
