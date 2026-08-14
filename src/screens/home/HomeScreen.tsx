/**
 * Home Screen — Farmer AI
 * Single Vertically Scrollable Page Layout with Large Vertical Voice Hero Card,
 * Large Centered Microphone with Soft Circular Glow, Audio Waveform Visualizer,
 * Quick Ask 2-Column Grid, More Topics, Featured Schemes Carousel & Recent Updates.
 * Preserves 100% of existing logic, hooks, state, navigation, theme & API integrations.
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Layout } from '../../theme';
import { Header } from '../../components/layout/Header';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { QuickActionCard } from '../../components/cards/QuickActionCard';
import { useSchemes } from '../../hooks/useSchemes';
import { useNotifications } from '../../hooks/useNotifications';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getLocalizedScheme } from '../../utils/schemeLocalization';
import { getLocalizedNotification, getLocalizedTimeAgo } from '../../utils/notificationLocalization';
import { HomeScreenProps } from '../../navigation/types';
import { Scheme, Notification } from '../../types/api.types';

// Green Theme Design Tokens (Farmer AI Palette)
const PRIMARY_GREEN = '#187A3D';
const DARK_GREEN = '#126B35';
const LIGHT_GREEN_BG = '#F3FAF5';
const PALE_GREEN_TINT = '#EAF6EE';
const BORDER_GREEN = '#DDE5E0';

// Topics Data
const TOPICS_DATA = [
  { id: 'horticulture', title: 'Horticulture', subtitle: 'Fruit Orchards & Plantation', icon: 'leaf-outline' as const, category: 'Horticulture' },
  { id: 'irrigation', title: 'Irrigation', subtitle: 'Drip & Sprinkler Subsidies', icon: 'water-outline' as const, category: 'Irrigation' },
  { id: 'mechanization', title: 'Mechanization', subtitle: 'Tractor & Machinery', icon: 'hardware-chip-outline' as const, category: 'Mechanization' },
  { id: 'welfare', title: 'Farmer Welfare', subtitle: 'Income Support & Loans', icon: 'cash-outline' as const, category: 'Farmer Welfare' },
];

// Quick Ask Items
const QUICK_ASK_ITEMS = [
  { id: 'q1', text: 'How to apply for Drip Irrigation?', category: 'Irrigation' },
  { id: 'q2', text: 'Tractor subsidy eligibility rules?', category: 'Mechanization' },
  { id: 'q3', text: 'PM-Kisan installment status?', category: 'Farmer Welfare' },
  { id: 'q4', text: 'Fruit orchard plantation grant?', category: 'Horticulture' },
];

export const HomeScreen: React.FC<HomeScreenProps<'Home'>> = ({ navigation }) => {
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const schemesQuery = useSchemes({ limit: 6 });
  const notificationsQuery = useNotifications();

  const [isListening, setIsListening] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1300,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1300,
            useNativeDriver: true,
            easing: Easing.in(Easing.ease),
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0.25,
            duration: 1300,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 0.6,
            duration: 1300,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const handleMicPress = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      navigation.navigate('VoiceAssistant');
    }, 600);
  };

  const isRefreshing = schemesQuery.isRefetching || notificationsQuery.isRefetching;

  const handleRefresh = () => {
    schemesQuery.refetch();
    notificationsQuery.refetch();
  };

  // Extract schemes from Query data or fallback list
  const rawHomeSchemes: Scheme[] =
    schemesQuery.data?.pages?.[0]?.data?.items || [
      {
        id: 'pmksy-per-drop-more-crop-css',
        name: 'प्रधानमंत्री कृषी सिंचन योजना - प्रती थेंब अधिक पिक',
        title: 'प्रधानमंत्री कृषी सिंचन योजना - प्रती थेंब अधिक पिक',
        englishName: 'PMKSY - Per Drop More Crop (Micro-Irrigation Component)',
        description: 'ठिबक व तुषार सिंचनासाठी लहान व अल्पभूधारक शेतकऱ्यांना ५५% तर इतर शेतकऱ्यांना ४५% अनुदान.',
        category: 'Irrigation',
        type: 'Central',
        amount: '५५% ते ४५% अनुदान',
        benefits: 'ठिबक सिंचन ५५%/४५% अनुदान व तुषार सिंचन संच सहाय्य.',
      },
      {
        id: 'bhausaheb-fundkar-falbag-lagvad-yojana',
        name: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
        title: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
        englishName: 'Bhausaheb Fundkar Fruit Orchard Plantation Scheme',
        description: 'फळबाग लागवडीसाठी पहिल्या वर्षी ५०%, दुसऱ्या वर्षी ३०% आणि तिसऱ्या वर्षी २०% अनुदान.',
        category: 'Horticulture',
        type: 'State',
        amount: '५०% ते १००% अनुदान',
        benefits: 'ठिबक सिंचनासाठी १००% अनुदान व ३ वर्षात टप्प्याटप्प्याने फळबाग लागवड अनुदान.',
      },
      {
        id: 'sub-mission-on-agricultural-mechanization-css',
        name: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
        title: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
        englishName: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        description: 'ट्रॅक्टर, पॉवर टिलर, अवजारे खरेदीसाठी ५०% अनुदान व कस्टम हायरिंग केंद्रांसाठी ८०% सहाय्य.',
        category: 'Mechanization',
        type: 'Central',
        amount: '५०% ते ८०% अनुदान',
        benefits: 'ट्रॅक्टर, पॉवर टिलर, अवजारे खरेदीवर ५०% अनुदान व अवजारे बँक केंद्रांसाठी ८०% सहाय्य.',
      },
      {
        id: 'dr-babasaheb-ambedkar-krushi-swavalamban-yojana',
        name: 'डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन योजना',
        title: 'डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन योजना',
        englishName: 'Dr. Babasaheb Ambedkar Krushi Swavalamban Yojana',
        description: 'अनुसूचित जाती (SC) व नवबौद्ध शेतकऱ्यांसाठी विहीर, विहीर दुरुस्ती, पंप व सूक्ष्म सिंचन अनुदान.',
        category: 'Farmer Welfare',
        type: 'State',
        amount: 'रु. २.५० लाख पर्यंत अनुदान',
        benefits: 'नवीन विहीर रु. २.५ लाख, जुनी विहीर दुरुस्ती रु. ५० हजार, पंप संच रु. २५ हजार.',
      },
    ];

  const fetchedSchemes = rawHomeSchemes.map((s) => getLocalizedScheme(s, selectedLanguage.code));

  // Extract notifications / updates data
  const rawUpdates: Notification[] =
    notificationsQuery.data?.data || [
      {
        id: 'n1',
        title: 'Application window open for Drip Irrigation Scheme',
        body: 'State Agriculture Department is accepting applications for micro-irrigation subsidies on MahaDBT.',
        type: 'update',
        category: 'Irrigation',
        is_read: false,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'n2',
        title: 'Bhausaheb Fundkar Fruit Orchard Scheme Sanctions Released',
        body: 'Approved farmers can submit sapling purchase receipts on the online portal.',
        type: 'update',
        category: 'Horticulture',
        is_read: false,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

  const fetchedUpdates = rawUpdates.map((n) => getLocalizedNotification(n, selectedLanguage.code));

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* HEADER */}
      <Header
        title={t('appName') || 'Farmer AI'}
        subtitle={t('appSubtitle') || 'VOICE ASSISTANT'}
        onNotificationPress={() => navigation.navigate('Notifications')}
        onProfilePress={() => navigation.navigate('ProfileTab', { screen: 'Profile' } as any)}
        notificationCount={notificationsQuery.data?.data?.filter((n) => !n.is_read).length || 2}
      />

      {/* SINGLE VERTICAL SCROLLABLE PAGE */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={PRIMARY_GREEN}
            colors={[PRIMARY_GREEN]}
          />
        }
      >
        {/* 1. LARGE VERTICAL VOICE HERO CARD (Centered Microphone Layout) */}
        <View style={styles.heroSectionWrapper}>
          <View
            style={[
              styles.heroCardContainer,
              {
                backgroundColor: isDarkMode ? '#1E2937' : LIGHT_GREEN_BG,
                borderColor: isDarkMode ? '#374151' : BORDER_GREEN,
              },
            ]}
          >
            {/* Top Live Status Badge */}
            <View style={[styles.liveBadgeRow, { backgroundColor: isDarkMode ? '#111827' : '#FFFFFF' }]}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>{t('liveBadge') || 'Live'}</Text>
            </View>

            {/* Main Greeting Heading */}
            <Text style={[styles.namasteText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              {t('namasteGreeting') || 'नमस्ते!'}
            </Text>
            <Text style={[styles.greetingTimeText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              {t(
                new Date().getHours() < 12
                  ? 'goodMorning'
                  : new Date().getHours() < 17
                    ? 'goodAfternoon'
                    : 'goodEvening'
              ) || 'शुभ संध्याकाळ'}
            </Text>

            {/* Description */}
            <Text style={[styles.heroSubText, { color: isDarkMode ? '#9CA3AF' : '#5F6B7A' }]}>
              {t('heroSubTitle') || 'शासकीय योजना व शेती मार्गदर्शनासाठी तुमचा AI सहाय्यक.'}
            </Text>

            {/* LARGE CENTERED MICROPHONE AREA */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleMicPress}
              style={styles.centeredMicTouchArea}
            >
              <View style={styles.glowOuterCircle}>
                <View style={styles.glowMiddleCircle}>
                  <Animated.View
                    style={[
                      styles.micPulseRing,
                      {
                        transform: [{ scale: pulseAnim }],
                        opacity: pulseOpacity,
                      },
                    ]}
                  />
                  <View style={[styles.largeCenterMicBtn, isListening && { backgroundColor: DARK_GREEN }]}>
                    <Ionicons name="mic" size={54} color="#FFFFFF" />
                  </View>
                </View>
              </View>

              {/* Voice Title & Subtitle below Mic */}
              <Text style={styles.tapToSpeakTitle}>
                {isListening ? (t('listeningStatus') || 'ऐकत आहे...') : (t('tapToSpeakTitle') || 'बोलण्यासाठी टॅप करा')}
              </Text>

              <Text style={[styles.tapToSpeakSub, { color: isDarkMode ? '#9CA3AF' : '#5F6B7A' }]}>
                {t('tapToSpeakSub') || 'तुमच्या भाषेत काहीही विचारा. १२ प्रादेशिक भाषांमध्ये उपलब्ध.'}
              </Text>

              {/* Audio Waveform Bars Visualizer */}
              <View style={styles.waveformContainer}>
                <View style={[styles.waveBar, { height: 12 }]} />
                <View style={[styles.waveBar, { height: 22 }]} />
                <View style={[styles.waveBar, { height: 34 }]} />
                <View style={[styles.waveBar, { height: 42 }]} />
                <View style={[styles.waveBar, { height: 28 }]} />
                <View style={[styles.waveBar, { height: 18 }]} />
                <View style={[styles.waveBar, { height: 10 }]} />
              </View>
            </TouchableOpacity>

            {/* Bottom Feature Pills Row */}
            <View style={styles.pillsRowCentered}>
              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#111827' : '#FFFFFF' }]}>
                <Ionicons name="document-text-outline" size={15} color={PRIMARY_GREEN} />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
                  {t('pill12Languages') || '१२ भाषा'}
                </Text>
              </View>

              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#111827' : '#FFFFFF' }]}>
                <Ionicons name="flash-outline" size={15} color={PRIMARY_GREEN} />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
                  {t('pillInstantReply') || 'झटपट उत्तर'}
                </Text>
              </View>

              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#111827' : '#FFFFFF' }]}>
                <Ionicons name="leaf-outline" size={15} color={PRIMARY_GREEN} />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
                  {t('pillFreeToUse') || 'मोफत वापर'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. QUICK ASK SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              🎙 {t('quickAskHeader') || 'Quick Ask'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('VoiceAssistant')} activeOpacity={0.7}>
              <Text style={styles.seeAllActionText}>{t('viewAll') || 'View all →'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.twoColumnGrid}>
            {QUICK_ASK_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.quickAskCard,
                  {
                    backgroundColor: isDarkMode ? '#1E2937' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : BORDER_GREEN,
                  },
                ]}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('VoiceAssistant')}
              >
                <View style={[styles.quickAskIconCircle, { backgroundColor: PALE_GREEN_TINT }]}>
                  <Ionicons name="mic-outline" size={18} color={PRIMARY_GREEN} />
                </View>
                <Text style={[styles.quickAskText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]} numberOfLines={3}>
                  {t(item.id === 'q1' ? 'quickQ1' : item.id === 'q2' ? 'quickQ2' : item.id === 'q3' ? 'quickQ3' : 'quickQ4') || item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. MORE TOPICS SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              🌱 {t('moreTopicsHeader') || 'More Topics'}
            </Text>
          </View>

          <View style={styles.twoColumnGrid}>
            {[
              { id: 'horticulture', title: t('topicHorticultureTitle') || 'Horticulture', subtitle: t('topicHorticultureSub') || 'Fruit Orchards & Plantation', icon: 'leaf-outline' as const },
              { id: 'irrigation', title: t('topicIrrigationTitle') || 'Irrigation', subtitle: t('topicIrrigationSub') || 'Drip & Sprinkler Subsidies', icon: 'water-outline' as const },
              { id: 'mechanization', title: t('topicMechanizationTitle') || 'Mechanization', subtitle: t('topicMechanizationSub') || 'Tractor & Machinery', icon: 'hardware-chip-outline' as const },
              { id: 'welfare', title: t('topicWelfareTitle') || 'Farmer Welfare', subtitle: t('topicWelfareSub') || 'Income Support & Loans', icon: 'cash-outline' as const },
            ].map((topic) => (
              <QuickActionCard
                key={topic.id}
                title={topic.title}
                subtitle={topic.subtitle}
                icon={topic.icon}
                onPress={() => navigation.navigate('Schemes')}
              />
            ))}
          </View>
        </View>

        {/* 4. FEATURED SCHEMES SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              ★ {t('featuredSchemesHeader') || 'Featured Schemes'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Schemes')} activeOpacity={0.7}>
              <Text style={styles.seeAllActionText}>{t('seeAll') || 'See all →'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCarouselPadding}
            decelerationRate="fast"
            snapToInterval={324}
          >
            {fetchedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onPress={() =>
                  navigation.navigate('SchemesTab', {
                    screen: 'SchemeDetails',
                    params: { schemeId: scheme.id },
                  } as any)
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* 5. RECENT UPDATES SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]}>
              📢 {t('recentUpdatesHeader') || 'Recent Updates'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} activeOpacity={0.7}>
              <Text style={styles.seeAllActionText}>{t('seeAll') || 'View all →'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.updatesListContainer}>
            {fetchedUpdates.map((update) => (
              <TouchableOpacity
                key={update.id}
                style={[
                  styles.updateCardItem,
                  {
                    backgroundColor: isDarkMode ? '#1E2937' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : BORDER_GREEN,
                  },
                ]}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('Notifications')}
              >
                {/* Left Accent Bar */}
                <View style={styles.updateLeftAccentBar} />

                <View style={styles.updateCardContent}>
                  <View style={styles.updateTopRow}>
                    <View style={styles.newBadgeContainer}>
                      <Text style={styles.newBadgeText}>{t('newBadge') || 'NEW'}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={PRIMARY_GREEN} />
                  </View>

                  <Text style={[styles.updateTitleText, { color: isDarkMode ? '#F9FAFB' : '#172033' }]} numberOfLines={2}>
                    {update.title}
                  </Text>

                  <Text style={[styles.updateBodyText, { color: isDarkMode ? '#9CA3AF' : '#5F6B7A' }]} numberOfLines={2}>
                    {update.body}
                  </Text>

                  <View style={styles.updateMetaRow}>
                    <Ionicons name="time-outline" size={13} color="#5F6B7A" />
                    <Text style={styles.updateMetaText}>{getLocalizedTimeAgo(update.created_at, selectedLanguage.code)}</Text>
                    <Text style={styles.updateMetaDot}>•</Text>
                    <Text style={styles.updateMetaCategory}>{update.category || 'General'}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 6. TODAY'S FARMING ADVISORY SECTION */}
        <View style={[styles.sectionContainer, { marginBottom: 20 }]}>
          <View
            style={[
              styles.advisoryCardContainer,
              {
                backgroundColor: isDarkMode ? '#374151' : '#FFFDF0',
                borderColor: isDarkMode ? '#4B5563' : '#FEF08A',
              },
            ]}
          >
            <View style={styles.advisoryIconWrap}>
              <Ionicons name="sunny-outline" size={24} color="#D97706" />
            </View>
            <View style={styles.advisoryTextWrap}>
              <Text style={[styles.advisoryTitle, { color: isDarkMode ? '#F59E0B' : '#92400E' }]}>
                {t('todayTip') || "Today's Farming Advisory"}
              </Text>
              <Text style={[styles.advisoryBody, { color: isDarkMode ? '#E5E7EB' : '#4B5563' }]}>
                {t('tipText') || 'Drip irrigation today can save 40-60% water.'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },

  /* Section 1: Hero Welcome Section (Large Vertical Card Layout) */
  heroSectionWrapper: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: 12,
    marginBottom: 6,
  },
  heroCardContainer: {
    borderRadius: 28,
    padding: 24,
    minHeight: 570,
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER_GREEN,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PRIMARY_GREEN,
  },
  liveBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: PRIMARY_GREEN,
  },
  namasteText: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  greetingTimeText: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
    marginBottom: 8,
  },
  heroSubText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 18,
  },

  /* Large Centered Microphone Area */
  centeredMicTouchArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  glowOuterCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: 'rgba(24, 122, 61, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  glowMiddleCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(24, 122, 61, 0.16)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micPulseRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(24, 122, 61, 0.25)',
  },
  largeCenterMicBtn: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: PRIMARY_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tapToSpeakTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: PRIMARY_GREEN,
    lineHeight: 24,
    marginBottom: 6,
    textAlign: 'center',
  },
  tapToSpeakSub: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 290,
    marginBottom: 10,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
    marginTop: 4,
    marginBottom: 6,
  },
  waveBar: {
    width: 4,
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 2,
  },
  pillsRowCentered: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER_GREEN,
    elevation: 1,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
  },

  /* Global Section Layout */
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: Layout.screenPaddingH,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 24,
  },
  seeAllActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: PRIMARY_GREEN,
  },

  /* 2-Column Responsive Grid for Quick Ask & Topics */
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAskCard: {
    width: '48%',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    minHeight: 100,
    justifyContent: 'space-between',
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  quickAskIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAskText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },

  /* Schemes Carousel */
  horizontalCarouselPadding: {
    paddingRight: Layout.screenPaddingH,
  },

  /* Recent Updates */
  updatesListContainer: {
    gap: 12,
  },
  updateCardItem: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  updateLeftAccentBar: {
    width: 5,
    backgroundColor: PRIMARY_GREEN,
  },
  updateCardContent: {
    flex: 1,
    padding: 16,
  },
  updateTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  newBadgeContainer: {
    backgroundColor: PALE_GREEN_TINT,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: PRIMARY_GREEN,
    letterSpacing: 0.4,
  },
  updateTitleText: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 21,
    marginBottom: 4,
  },
  updateBodyText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  updateMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  updateMetaText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5F6B7A',
  },
  updateMetaDot: {
    fontSize: 12,
    color: '#5F6B7A',
  },
  updateMetaCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: PRIMARY_GREEN,
  },

  /* Today's Advisory Card */
  advisoryCardContainer: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
  },
  advisoryIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  advisoryTextWrap: {
    flex: 1,
  },
  advisoryTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  advisoryBody: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
});
