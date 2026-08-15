/**
 * Voice Assistant Screen
 * Farmer AI voice assistant with:
 * - Multi-language support
 * - Theme support
 * - Animated microphone
 * - Ripple animation
 * - Quick questions
 * - Mock response flow
 */

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors, Spacing } from '../../theme';
import { Header } from '../../components/layout/Header';

import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';

import { HomeScreenProps } from '../../navigation/types';


/* =========================================================
   SCREEN
========================================================= */

export const VoiceAssistantScreen: React.FC<
  HomeScreenProps<'VoiceAssistant'>
> = ({ navigation }) => {

  const { t } = useLanguageContext();

  const {
    isDarkMode,
    colors: themeColors,
  } = useThemeContext();


  /* =========================================================
     STATE
  ========================================================= */

  const [
    status,
    setStatus,
  ] = useState<
    'idle' | 'listening' | 'processing' | 'success'
  >('idle');

  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');


  /* =========================================================
     QUICK QUESTIONS
  ========================================================= */

  const quickQuestions = [
    {
      question: t('q1'),
      response: t('ansQ1'),
    },
    {
      question: t('q2'),
      response: t('ansQ2'),
    },
    {
      question: t('q3'),
      response: t('ansQ3'),
    },
    {
      question: t('q4'),
      response: t('ansQ4'),
    },
  ];


  /* =========================================================
     ANIMATIONS
  ========================================================= */

  const ripple1Val = useRef(
    new Animated.Value(0)
  ).current;

  const ripple2Val = useRef(
    new Animated.Value(0)
  ).current;

  const ripple3Val = useRef(
    new Animated.Value(0)
  ).current;

  const micScaleVal = useRef(
    new Animated.Value(1)
  ).current;

  const scrollViewRef =
    useRef<ScrollView>(null);


  /* =========================================================
     MIC BREATHING ANIMATION
  ========================================================= */

  useEffect(() => {
    let breathing:
      | Animated.CompositeAnimation
      | undefined;

    if (status === 'idle') {
      breathing = Animated.loop(
        Animated.sequence([
          Animated.timing(micScaleVal, {
            toValue: 1.06,
            duration: 1400,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),

          Animated.timing(micScaleVal, {
            toValue: 1,
            duration: 1400,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      );

      breathing.start();

    } else if (status === 'listening') {
      breathing = Animated.loop(
        Animated.sequence([
          Animated.timing(micScaleVal, {
            toValue: 1.15,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),

          Animated.timing(micScaleVal, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      );

      breathing.start();

    } else {
      Animated.spring(micScaleVal, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (breathing) {
        breathing.stop();
      }
    };
  }, [status]);


  /* =========================================================
     RIPPLE ANIMATION
  ========================================================= */

  useEffect(() => {
    const animateRing = (
      value: Animated.Value,
      delay: number
    ) => {
      value.setValue(0);

      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),

          Animated.timing(value, {
            toValue: 1,
            duration: 2200,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
        ])
      );
    };

    const ripples = Animated.parallel([
      animateRing(ripple1Val, 0),
      animateRing(ripple2Val, 700),
      animateRing(ripple3Val, 1400),
    ]);

    ripples.start();

    return () => {
      ripples.stop();
    };
  }, []);


  /* =========================================================
     MOCK QUESTION
  ========================================================= */

  const triggerMockQuery = (
    questionText: string,
    replyText: string
  ) => {

    setStatus('processing');

    setTranscript(questionText);

    setResponse('');

    setTimeout(() => {

      setStatus('success');

      setResponse(replyText);

      setTimeout(() => {
        setStatus('idle');
      }, 1500);

    }, 1200);
  };


  /* =========================================================
     MIC PRESS
  ========================================================= */

  const handleMicPress = () => {

    if (status === 'idle') {

      setStatus('listening');

      setTranscript('');

      setResponse('');

      setTimeout(() => {

        const randomQuestion =
          quickQuestions[
            Math.floor(
              Math.random() *
              quickQuestions.length
            )
          ];

        triggerMockQuery(
          randomQuestion.question,
          randomQuestion.response
        );

      }, 2000);

    } else if (status === 'listening') {

      setStatus('processing');

      setTimeout(() => {

        const randomQuestion =
          quickQuestions[
            Math.floor(
              Math.random() *
              quickQuestions.length
            )
          ];

        triggerMockQuery(
          randomQuestion.question,
          randomQuestion.response
        );

      }, 700);
    }
  };


  /* =========================================================
     RIPPLE STYLE
  ========================================================= */

  const getRippleStyle = (
    value: Animated.Value
  ) => {

    return {
      transform: [
        {
          scale: value.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2.2],
          }),
        },
      ],

      opacity: value.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0.4, 0.15, 0],
      }),
    };
  };


  /* =========================================================
     UI
  ========================================================= */

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            themeColors.background,
        },
      ]}
    >

      {/* HEADER */}

      <Header
        showBack
        onBackPress={() =>
          navigation.goBack()
        }
        title={
          t('agriMitraTab') ||
          'Agri Mitra'
        }
        showLanguageSelector
      />


      {/* CONTENT */}

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >

        {/* =====================================================
            ASSISTANT BANNER
        ===================================================== */}

        <View style={styles.bannerWrapper}>

          <LinearGradient
            colors={themeColors.bannerBg}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}
            style={[
              styles.assistantBannerCard,
              {
                borderColor:
                  isDarkMode
                    ? '#065F46'
                    : '#DCFCE7',
              },
            ]}
          >

            <View
              style={
                styles.bannerTextWrap
              }
            >

              <View
                style={
                  styles.assistantBadge
                }
              >
                <Ionicons
                  name="add-circle"
                  size={14}
                  color="#15803D"
                />

                <Text
                  style={
                    styles.assistantBadgeText
                  }
                >
                  {t('agriMitraTab')}
                </Text>
              </View>


              <Text
                style={[
                  styles.assistantTitle,
                  {
                    color:
                      isDarkMode
                        ? '#F9FAFB'
                        : '#14532D',
                  },
                ]}
              >
                {t('appName')}
              </Text>


              <Text
                style={[
                  styles.assistantSubtitle,
                  {
                    color:
                      isDarkMode
                        ? '#D1D5DB'
                        : '#475569',
                  },
                ]}
              >
                {t('voiceTapToSpeak')}
              </Text>

            </View>


            <View
              style={styles.leafWrap}
            >
              <Ionicons
                name="leaf-outline"
                size={72}
                color={
                  isDarkMode
                    ? '#059669'
                    : '#A7F3D0'
                }
              />
            </View>

          </LinearGradient>

        </View>


        {/* =====================================================
            MICROPHONE SECTION
        ===================================================== */}

        <View
          style={styles.micSection}
        >

          <Text
            style={[
              styles.micMainInstruction,
              {
                color:
                  themeColors.textPrimary,
              },
            ]}
          >
            {status === 'listening'
              ? t('voiceListening')
              : t('voiceTapToSpeak')}
          </Text>


          {/* MIC */}

          <View
            style={styles.micContainer}
          >

            {/* Ripple 1 */}

            <Animated.View
              style={[
                styles.rippleRing,
                getRippleStyle(
                  ripple1Val
                ),
              ]}
            />


            {/* Ripple 2 */}

            <Animated.View
              style={[
                styles.rippleRing,
                getRippleStyle(
                  ripple2Val
                ),
              ]}
            />


            {/* Ripple 3 */}

            <Animated.View
              style={[
                styles.rippleRing,
                getRippleStyle(
                  ripple3Val
                ),
              ]}
            />


            {/* Animated microphone */}

            <Animated.View
              style={{
                transform: [
                  {
                    scale:
                      micScaleVal,
                  },
                ],
              }}
            >

              <TouchableOpacity
                onPress={
                  handleMicPress
                }
                activeOpacity={0.85}
                style={
                  styles.micButtonTouchable
                }
              >

                <LinearGradient
                  colors={[
                    '#4ADE80',
                    '#16A34A',
                  ]}
                  start={{
                    x: 0,
                    y: 0,
                  }}
                  end={{
                    x: 1,
                    y: 1,
                  }}
                  style={
                    styles.micCircle
                  }
                >

                  <Ionicons
                    name={
                      status ===
                      'listening'
                        ? 'stop'
                        : 'mic'
                    }
                    size={42}
                    color="#FFFFFF"
                  />

                </LinearGradient>

              </TouchableOpacity>

            </Animated.View>

          </View>


          <Text
            style={[
              styles.micTapLabel,
              {
                color:
                  themeColors.textPrimary,
              },
            ]}
          >
            {status === 'listening'
              ? t('voiceListening')
              : t('voiceTapToSpeak')}
          </Text>


          <TouchableOpacity
            onPress={handleMicPress}
          >
            <Text
              style={styles.micSubLabel}
            >
              {t('agriMitraTab')}
            </Text>
          </TouchableOpacity>

        </View>


        {/* =====================================================
            CHAT / RESPONSE SECTION
        ===================================================== */}

        {(
          transcript ||
          response ||
          status === 'processing'
        ) ? (

          <View
            style={styles.chatSection}
          >

            {/* USER QUESTION */}

            {transcript ? (
              <View
                style={[
                  styles.userCard,
                  {
                    backgroundColor:
                      isDarkMode
                        ? '#064E3B'
                        : '#F0F9F1',

                    borderColor:
                      isDarkMode
                        ? '#047857'
                        : '#DCFCE7',
                  },
                ]}
              >

                <Ionicons
                  name="person-circle-outline"
                  size={18}
                  color="#16A34A"
                />

                <Text
                  style={[
                    styles.userCardText,
                    {
                      color:
                        themeColors.textPrimary,
                    },
                  ]}
                >
                  {transcript}
                </Text>

              </View>
            ) : null}


            {/* PROCESSING */}

            {status === 'processing' && (
              <View
                style={[
                  styles.aiCard,
                  {
                    backgroundColor:
                      themeColors.card,

                    borderColor:
                      themeColors.border,
                  },
                ]}
              >

                <Ionicons
                  name="leaf"
                  size={18}
                  color="#16A34A"
                />

                <Text
                  style={[
                    styles.aiCardText,
                    {
                      color:
                        themeColors.textPrimary,
                    },
                  ]}
                >
                  {t('loading')}
                </Text>

              </View>
            )}


            {/* RESPONSE */}

            {response ? (
              <View
                style={[
                  styles.aiCard,
                  {
                    backgroundColor:
                      themeColors.card,

                    borderColor:
                      themeColors.border,
                  },
                ]}
              >

                <Ionicons
                  name="leaf"
                  size={18}
                  color="#16A34A"
                />

                <Text
                  style={[
                    styles.aiCardText,
                    {
                      color:
                        themeColors.textPrimary,
                    },
                  ]}
                >
                  {response}
                </Text>

              </View>
            ) : null}

          </View>

        ) : null}


        {/* =====================================================
            QUICK QUESTIONS
        ===================================================== */}

        <View
          style={
            styles.quickQuestionsSection
          }
        >

          <Text
            style={[
              styles.sectionTitle,
              {
                color:
                  themeColors.textPrimary,
              },
            ]}
          >
            {t('suggestedQuestionsTitle')}
          </Text>


          <View
            style={styles.questionGrid}
          >

            {quickQuestions.map(
              (item, index) => (

                <TouchableOpacity
                  key={index}
                  style={[
                    styles.questionCard,
                    {
                      backgroundColor:
                        themeColors.card,

                      borderColor:
                        themeColors.border,
                    },
                  ]}
                  activeOpacity={0.8}
                  onPress={() =>
                    triggerMockQuery(
                      item.question,
                      item.response
                    )
                  }
                >

                  <View
                    style={styles.micBadge}
                  >

                    <Ionicons
                      name="mic"
                      size={14}
                      color="#16A34A"
                    />

                  </View>


                  <Text
                    style={[
                      styles.questionText,
                      {
                        color:
                          themeColors.textPrimary,
                      },
                    ]}
                  >
                    {item.question}
                  </Text>

                </TouchableOpacity>

              )
            )}

          </View>

        </View>

      </ScrollView>

    </View>
  );
};


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 45,
  },


  /* =====================================================
     BANNER
  ===================================================== */

  bannerWrapper: {
    paddingHorizontal: 14,
    paddingTop: 8,
  },

  assistantBannerCard: {
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },

  bannerTextWrap: {
    flex: 1,
    paddingRight: 10,
  },

  assistantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginBottom: 6,
  },

  assistantBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },

  assistantTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },

  assistantSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },

  leafWrap: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },


  /* =====================================================
     MICROPHONE
  ===================================================== */

  micSection: {
    alignItems: 'center',
    marginTop: 14,
    paddingHorizontal: 14,
  },

  micMainInstruction: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },

  micContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 6,
  },

  rippleRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#86EFAC',
  },

  micButtonTouchable: {
    borderRadius: 48,
    elevation: 8,
    shadowColor: '#16A34A',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },

  micCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  micTapLabel: {
    fontSize: 14,
    fontWeight: '800',
  },

  micSubLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
    marginTop: 2,
  },


  /* =====================================================
     CHAT
  ===================================================== */

  chatSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },

  userCardText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },

  aiCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },

  aiCardText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },


  /* =====================================================
     QUICK QUESTIONS
  ===================================================== */

  quickQuestionsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },

  questionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  questionCard: {
    width: '48%',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    minHeight: 70,
  },

  micBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },

  questionText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    lineHeight: 18,
  },

});