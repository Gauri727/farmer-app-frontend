/**
 * ChatbotFAB Component — Farmer AI Assistant
 * Fully responsive chatbot overlay with dynamic language detection & theme integration.
 * Replies strictly in the language in which the question was asked (English, Marathi, Hindi).
 */

import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Language } from '../../types/api.types';

interface MessageItem {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const ChatbotFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const isSmallScreen = windowWidth < 360;

  const { t, selectedLanguage, setLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

  const scrollViewRef = useRef<ScrollView>(null);

  // Press & Breathing Animations for Outer FAB
  const pressAnim = useRef(new Animated.Value(1)).current;
  const breathAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let breathing: Animated.CompositeAnimation;
    if (!isOpen) {
      breathing = Animated.loop(
        Animated.sequence([
          Animated.timing(breathAnim, {
            toValue: 1.04,
            duration: 2200,
            useNativeDriver: true,
          }),
          Animated.timing(breathAnim, {
            toValue: 1,
            duration: 2200,
            useNativeDriver: true,
          }),
        ])
      );
      breathing.start();
    } else {
      breathAnim.setValue(1);
    }

    return () => {
      if (breathing) breathing.stop();
    };
  }, [isOpen]);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.94,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Smart Language Detection & Tailored Response Logic
   * Replies strictly in the language of the query asked.
   */
  const detectLanguage = (query: string): 'mr' | 'hi' | 'en' => {
    const isDevanagari = /[\u0900-\u097F]/.test(query);

    if (isDevanagari) {
      // Check Marathi specific keywords
      if (/योजना|कसा|काय|अर्ज|मिळेल|आहे|नाही|शेतकरी|ठिबक|पिक|माहिती|पाहिजे/.test(query)) {
        return 'mr';
      }
      // Check Hindi specific keywords
      if (/कैसे|क्या|आवेदन|मिलेगा|है|नहीं|किसान|ड्रिप|फसल|जानकारी|चाहिए/.test(query)) {
        return 'hi';
      }
      return selectedLanguage.code === 'hi' ? 'hi' : 'mr';
    }

    // Latin Script / English query check
    const qLower = query.toLowerCase();
    if (/kaise|kya|kare|jankari|chahiye|mileyga/.test(qLower)) {
      return 'hi'; // Hinglish
    }
    if (/kay|ahe|kasa|marathi|shetkari/.test(qLower)) {
      return 'mr'; // Manglish
    }

    return 'en';
  };

  const generateBotReply = (query: string): string => {
    const lang = detectLanguage(query);
    const qLower = query.toLowerCase();

    // Steps to Apply / How to Apply Queries
    if (qLower.includes('step') || qLower.includes('apply') || qLower.includes('अर्ज कसा') || qLower.includes('आवेदन कैसे')) {
      if (lang === 'mr') {
        return 'अर्जाच्या पायऱ्या:\n१. महाडीबीटी पोर्टलला (mahadbt.maharashtra.gov.in) भेट द्या\n२. आधार व मोबाईल नंबरने नोंदणी करा\n३. योजना निवडून शेतीची माहिती भरा\n४. ७/१२ उतारा व बँक तपशील अपलोड करा\n५. अर्ज सबमिट करा';
      }
      if (lang === 'hi') {
        return 'आवेदन के चरण:\n1. महाडीबीटी पोर्टल (mahadbt.maharashtra.gov.in) पर जाएं\n2. आधार और मोबाइल नंबर से पंजीकरण करें\n3. योजना चुनें और खेत की जानकारी भरें\n4. 7/12 खसरा और बैंक विवरण अपलोड करें\n5. आवेदन जमा करें';
      }
      return 'Steps to apply:\n1. Visit MahaDBT portal (mahadbt.maharashtra.gov.in)\n2. Register using your Aadhaar & mobile number\n3. Select your scheme & fill land/crop details\n4. Upload 7/12 land extract & bank details\n5. Submit your application';
    }

    // Drip / Micro Irrigation Queries
    if (qLower.includes('drip') || qLower.includes('irrigation') || qLower.includes('सिंचन') || qLower.includes('सिंचाई')) {
      if (lang === 'mr') {
        return 'ठिबक सिंचनासाठी महाडीबीटी पोर्टलवर ऑनलाईन अर्ज करा. लहान व अल्पभूधारक शेतकऱ्यांना ५५% तर इतर शेतकऱ्यांना ४५% अनुदान दिले जाते.';
      }
      if (lang === 'hi') {
        return 'ड्रिप सिंचाई के लिए महाडीबीटी पोर्टल पर ऑनलाइन आवेदन करें। छोटे और सीमांत किसानों को 55% तथा अन्य किसानों को 45% सब्सिडी दी जाती है।';
      }
      return 'To apply for drip irrigation, register on the MahaDBT portal. Small & marginal farmers receive a 55% subsidy, while other farmers receive a 45% subsidy.';
    }

    // Schemes Queries
    if (qLower.includes('scheme') || qLower.includes('available') || qLower.includes('योजना') || qLower.includes('योजनाएं')) {
      if (lang === 'mr') {
        return 'भाऊसाहेब फुंडकर फळबाग योजना, नमो शेतकरी योजना, विहीर पुनर्भरण आणि महाडीबीटीवर अनेक योजना उपलब्ध आहेत.';
      }
      if (lang === 'hi') {
        return 'भाऊसाहेब फुंडकर फलबाग योजना, नमो शेतकरी योजना, कुआं पुनर्भरण और महाडीबीटी पर कई योजनाएं उपलब्ध हैं।';
      }
      return 'Bhausaheb Fundkar Fruit Orchard Scheme, Namo Shetkari Scheme, Well Recharge, and several micro-irrigation subsidies are available on the MahaDBT portal.';
    }

    // PM Kisan Queries
    if (qLower.includes('kisan') || qLower.includes('status') || qLower.includes('हप्ता') || qLower.includes('किस्त')) {
      if (lang === 'mr') {
        return 'तुमचा पीएम-किसान हप्ता स्टेटस pmkisan.gov.in वर नोंदणीकृत मोबाईल नंबर किंवा आधार नंबर टाकून तपासू शकता.';
      }
      if (lang === 'hi') {
        return 'आप अपना पीएम-किसान किस्त का स्टेटस pmkisan.gov.in पर अपने पंजीकृत मोबाइल नंबर या आधार नंबर से जांच सकते हैं।';
      }
      return 'You can check your PM-Kisan installment status on pmkisan.gov.in using your registered mobile number or Aadhaar number.';
    }

    // Default / Greeting Queries
    if (lang === 'mr') {
      return 'मी तुमचा Farmer AI सहाय्यक आहे! मी तुम्हाला शासकीय योजना, अनुदान, पीक व्यवस्थापन आणि पात्रतेबाबत मार्गदर्शन करू शकतो. मी तुम्हाला कशी मदत करू?';
    }
    if (lang === 'hi') {
      return 'मैं आपका Farmer AI सहायक हूं! मैं आपको सरकारी योजनाओं, सब्सिडी, फसल प्रबंधन और पात्रता के बारे में जानकारी दे सकता हूं। मैं आपकी कैसे मदद कर सकता हूं?';
    }
    return 'I am your Farmer AI Assistant! I can guide you on government schemes, subsidies, crop management, and eligibility requirements. How can I help you today?';
  };

  const handleSend = (customText?: string) => {
    const query = (customText || messageText).trim();
    if (!query) return;

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessageText('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Generate response strictly in the language asked
    setTimeout(() => {
      const botReply = generateBotReply(query);
      const botMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 700);
  };

  const handleSelectLanguage = (code: string) => {
    const langMap: Record<string, Language> = {
      en: { code: 'en', name: 'English' },
      hi: { code: 'hi', name: 'हिंदी' },
      mr: { code: 'mr', name: 'मराठी' },
    };
    if (langMap[code]) {
      setLanguage(langMap[code]);
    }
  };

  /* =====================================================
     OPEN CHATBOT FULL-SCREEN OVERLAY
     ===================================================== */
  if (isOpen) {
    return (
      <View style={[styles.fullScreenOverlay, { backgroundColor: isDarkMode ? themeColors.background : Colors.white }]}>
        <KeyboardAvoidingView
          style={styles.fullScreen}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <View style={[styles.chatbotContainer, { backgroundColor: isDarkMode ? themeColors.background : Colors.white }]}>
            {/* Header matching App Theme */}
            <View
              style={[
                styles.header,
                {
                  backgroundColor: isDarkMode ? '#1E293B' : '#15803D',
                  paddingTop: Math.max(insets.top, 12),
                  paddingHorizontal: isSmallScreen ? 8 : 12,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.backButton,
                  isSmallScreen && { width: 36, height: 36, borderRadius: 18 },
                ]}
                onPress={() => setIsOpen(false)}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={isSmallScreen ? 20 : 24} color={Colors.white} />
              </TouchableOpacity>

              <Image
                source={require('../../../assets/icon.png')}
                style={[
                  styles.headerLogo,
                  isSmallScreen && { width: 34, height: 34, borderRadius: 17 },
                ]}
                resizeMode="contain"
              />

              <View style={styles.headerText}>
                <Text
                  style={[
                    styles.headerTitle,
                    isSmallScreen && { fontSize: 14 },
                  ]}
                  numberOfLines={1}
                >
                  Farmer AI Assistant
                </Text>
                <View style={styles.onlineRow}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText} numberOfLines={1}>
                    Online · Farming Expert
                  </Text>
                </View>
              </View>

              {/* Language Selection Buttons (EN, हि, मरा) */}
              <View style={styles.languageButtons}>
                <TouchableOpacity
                  style={[
                    styles.langBtn,
                    selectedLanguage.code === 'en' ? styles.langBtnActive : styles.langBtnInactive,
                    isSmallScreen && { paddingHorizontal: 7, paddingVertical: 4 },
                  ]}
                  onPress={() => handleSelectLanguage('en')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      selectedLanguage.code === 'en' ? styles.langTextActive : styles.langTextInactive,
                      isSmallScreen && { fontSize: 10 },
                    ]}
                  >
                    EN
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.langBtn,
                    selectedLanguage.code === 'hi' ? styles.langBtnActive : styles.langBtnInactive,
                    isSmallScreen && { paddingHorizontal: 7, paddingVertical: 4 },
                  ]}
                  onPress={() => handleSelectLanguage('hi')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      selectedLanguage.code === 'hi' ? styles.langTextActive : styles.langTextInactive,
                      isSmallScreen && { fontSize: 10 },
                    ]}
                  >
                    हि
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.langBtn,
                    selectedLanguage.code === 'mr' ? styles.langBtnActive : styles.langBtnInactive,
                    isSmallScreen && { paddingHorizontal: 7, paddingVertical: 4 },
                  ]}
                  onPress={() => handleSelectLanguage('mr')}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      selectedLanguage.code === 'mr' ? styles.langTextActive : styles.langTextInactive,
                      isSmallScreen && { fontSize: 10 },
                    ]}
                  >
                    मरा
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Content Area */}
            <View style={[styles.content, { backgroundColor: isDarkMode ? themeColors.background : Colors.white }]}>
              <ScrollView
                ref={scrollViewRef}
                style={styles.messagesScrollView}
                contentContainerStyle={[
                  styles.messagesContent,
                  { paddingHorizontal: isSmallScreen ? 14 : 20 },
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Welcome Card when no messages */}
                {messages.length === 0 ? (
                  <View style={styles.welcomeContainer}>
                    <Image
                      source={require('../../../assets/icon.png')}
                      style={[
                        styles.welcomeLogo,
                        isSmallScreen && { width: 52, height: 52 },
                      ]}
                      resizeMode="contain"
                    />

                    <Text
                      style={[
                        styles.welcomeTitle,
                        { color: isDarkMode ? '#F9FAFB' : Colors.text.primary },
                        isSmallScreen && { fontSize: 18 },
                      ]}
                    >
                      {t('namasteGreeting') || 'Namaste! How can I help?'}
                    </Text>

                    <Text
                      style={[
                        styles.welcomeSubtitle,
                        { color: isDarkMode ? '#9CA3AF' : Colors.text.secondary },
                        isSmallScreen && { fontSize: 12, lineHeight: 17 },
                      ]}
                    >
                      {t('heroSubTitle') || 'Ask me about government schemes, subsidies, or any farming-related questions.'}
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.languagePill,
                        {
                          backgroundColor: isDarkMode ? '#1E293B' : Colors.primary[50],
                          borderColor: isDarkMode ? '#374151' : Colors.primary[100],
                        },
                      ]}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name="language-outline"
                        size={14}
                        color={isDarkMode ? '#34D399' : Colors.primary[600]}
                      />
                      <Text style={[styles.languagePillText, { color: isDarkMode ? '#34D399' : Colors.primary[600] }]}>
                        {selectedLanguage.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  /* Active Message Bubbles */
                  <View style={styles.messagesList}>
                    {messages.map((msg) => (
                      <View
                        key={msg.id}
                        style={[
                          styles.messageBubble,
                          msg.sender === 'user'
                            ? styles.userBubble
                            : [styles.botBubble, { backgroundColor: isDarkMode ? '#1E293B' : '#F1F5F9' }],
                        ]}
                      >
                        <Text
                          style={[
                            styles.messageText,
                            msg.sender === 'user'
                              ? styles.userMessageText
                              : [styles.botMessageText, { color: isDarkMode ? '#F9FAFB' : '#0F172A' }],
                          ]}
                        >
                          {msg.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>

              {/* Quick Ask Questions — Horizontally Scrollable Row */}
              <View style={[styles.quickSection, { borderTopColor: isDarkMode ? '#374151' : Colors.gray[100] }]}>
                <Text style={[styles.quickTitle, { color: isDarkMode ? '#9CA3AF' : Colors.text.secondary }]}>
                  {t('quickAskHeader') || 'Quick Ask'}
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.quickQuestionsScroll}
                  keyboardShouldPersistTaps="handled"
                >
                  <TouchableOpacity
                    style={[
                      styles.quickQuestionPill,
                      {
                        backgroundColor: isDarkMode ? '#1E293B' : Colors.white,
                        borderColor: isDarkMode ? '#374151' : '#DCFCE7',
                      },
                    ]}
                    onPress={() => handleSend('What schemes are available for farmers?')}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="mic-outline"
                      size={15}
                      color="#15803D"
                    />
                    <Text style={[styles.quickQuestionText, { color: isDarkMode ? '#F9FAFB' : '#15803D' }]} numberOfLines={2}>
                      What schemes are available for farmers?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.quickQuestionPill,
                      {
                        backgroundColor: isDarkMode ? '#1E293B' : Colors.white,
                        borderColor: isDarkMode ? '#374151' : '#DCFCE7',
                      },
                    ]}
                    onPress={() => handleSend('How to apply for drip irrigation scheme?')}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="mic-outline"
                      size={15}
                      color="#15803D"
                    />
                    <Text style={[styles.quickQuestionText, { color: isDarkMode ? '#F9FAFB' : '#15803D' }]} numberOfLines={2}>
                      How to apply for drip irrigation scheme?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.quickQuestionPill,
                      {
                        backgroundColor: isDarkMode ? '#1E293B' : Colors.white,
                        borderColor: isDarkMode ? '#374151' : '#DCFCE7',
                      },
                    ]}
                    onPress={() => handleSend('PM Kisan installment status check')}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="mic-outline"
                      size={15}
                      color="#15803D"
                    />
                    <Text style={[styles.quickQuestionText, { color: isDarkMode ? '#F9FAFB' : '#15803D' }]} numberOfLines={2}>
                      PM Kisan status check
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {/* Input Bar — Matching App Theme with Solid Green Send Button */}
              <View
                style={[
                  styles.inputArea,
                  {
                    backgroundColor: isDarkMode ? '#111827' : Colors.white,
                    borderTopColor: isDarkMode ? '#374151' : Colors.gray[100],
                    paddingBottom: Math.max(insets.bottom, 10),
                  },
                ]}
              >
                <TextInput
                  value={messageText}
                  onChangeText={setMessageText}
                  placeholder={t('askSearchPlaceholder') || 'e.g. Drip irrigation, PM-Kisan subsidy...'}
                  placeholderTextColor={isDarkMode ? '#64748B' : Colors.text.tertiary}
                  style={[
                    styles.input,
                    {
                      backgroundColor: isDarkMode ? '#1E293B' : Colors.gray[50],
                      borderColor: isDarkMode ? '#374151' : Colors.gray[200],
                      color: isDarkMode ? '#F9FAFB' : Colors.text.primary,
                    },
                  ]}
                  returnKeyType="send"
                  blurOnSubmit={false}
                  onSubmitEditing={() => handleSend()}
                  onKeyPress={(e: any) => {
                    if (e.nativeEvent?.key === 'Enter' && !e.nativeEvent?.shiftKey) {
                      if (Platform.OS === 'web' && e.preventDefault) {
                        e.preventDefault();
                      }
                      handleSend();
                    }
                  }}
                />

                <TouchableOpacity
                  style={styles.sendButtonTouchable}
                  onPress={() => handleSend()}
                  disabled={!messageText.trim()}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={messageText.trim() ? ['#16A34A', '#15803D'] : ['#A7F3D0', '#86EFAC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.sendButtonGradient}
                  >
                    <Ionicons name="send" size={17} color={Colors.white} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  /* =====================================================
     OUTER FLOATING CHATBOT BUTTON (EXACT MATCH REFERENCE DESIGN)
     Green Gradient + Thin White Inner Ring + White Speech Bubble with 3 Dots + Floating Shadow
     ===================================================== */
  return (
    <Animated.View
      style={[
        styles.fabContainer,
        {
          transform: [
            { scale: Animated.multiply(pressAnim, breathAnim) },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.fabTouchable}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.9}
        accessibilityRole="button"
        accessibilityLabel="Open Farmer AI Chatbot Assistant"
      >
        <LinearGradient
          colors={['#22C55E', '#16A34A', '#116B31']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.greenGradientContainer}
        >
          <View style={styles.whiteInnerRing}>
            <Ionicons
              name="chatbubble-ellipses"
              size={34}
              color="#FFFFFF"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
    overflow: 'hidden',
  },

  /* Header */
  header: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  headerLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 4,
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
  langBtn: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 16,
  },
  langBtnActive: {
    backgroundColor: Colors.white,
  },
  langBtnInactive: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
  },
  langTextActive: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '700',
  },
  langTextInactive: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
  },

  /* Content & Messages Area */
  content: {
    flex: 1,
  },
  messagesScrollView: {
    flex: 1,
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  welcomeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeLogo: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: '90%',
  },
  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 14,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    alignSelf: 'center',
  },
  languagePillText: {
    fontSize: 12,
    fontWeight: '600',
  },

  /* Active Messages List */
  messagesList: {
    width: '100%',
    gap: 8,
  },
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '82%',
    marginVertical: 2,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#15803D',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.white,
  },
  botMessageText: {
    color: '#0F172A',
  },

  /* Quick Questions — Horizontal Scrollable Row */
  quickSection: {
    paddingBottom: 8,
    paddingTop: 4,
    borderTopWidth: 1,
  },
  quickTitle: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  quickQuestionsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  quickQuestionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    maxWidth: 290,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
  },
  quickQuestionText: {
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },

  /* Input Bar */
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
  },
  sendButtonTouchable: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Floating Outer FAB Button */
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 68,
    height: 68,
    borderRadius: 34,
    zIndex: 999,
    elevation: 10,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  fabTouchable: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  greenGradientContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteInnerRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});