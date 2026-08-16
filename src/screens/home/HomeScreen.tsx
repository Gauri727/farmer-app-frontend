/**
 * Home Screen — Farmer AI
 * Styled matching Image 2 reference with Farm Landscape background,
 * Voice hero card, Quick Ask 2-column grid, More Topics chips, Featured Schemes & Recent Updates.
 * 100% dynamic multi-language translation support.
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
  Image,
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
const PRIMARY_GREEN = '#15803D';
const DARK_GREEN = '#126B35';
const LIGHT_GREEN_BG = '#F0FDF4';
const PALE_GREEN_TINT = '#E8F5E9';
const BORDER_GREEN = '#DCFCE7';

// Quick Ask Items
const QUICK_ASK_ITEMS = [
  { id: 'q1', key: 'quickQ1', defaultText: 'Which schemes am I eligible for?', category: 'Eligibility' },
  { id: 'q2', key: 'quickQ2', defaultText: 'PM Kisan Status Check', category: 'Farmer Welfare' },
  { id: 'q3', key: 'quickQ3', defaultText: 'How to apply for crop insurance?', category: 'Insurance' },
  { id: 'q4', key: 'quickQ4', defaultText: 'Tractor subsidy eligibility rules?', category: 'Mechanization' },
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
            toValue: 1.15,
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
            toValue: 0.2,
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

  const currentHour = new Date().getHours();
  const timeGreetingKey = currentHour < 12 ? 'goodMorning' : currentHour < 17 ? 'goodAfternoon' : 'goodEvening';

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
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 140 }]}
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
        {/* 1. VOICE HERO CARD MATCHING IMAGE 2 */}
        <View style={styles.heroSectionWrapper}>
          <View
            style={[
              styles.heroCardContainer,
              {
                backgroundColor: isDarkMode ? '#1E293B' : LIGHT_GREEN_BG,
                borderColor: isDarkMode ? '#374151' : BORDER_GREEN,
              },
            ]}
          >
            {/* Background Farm Landscape Image */}
            <Image
              source={require('../../../assets/farm_banner.png')}
              style={[styles.heroBgImageFull, { opacity: isDarkMode ? 0.18 : 0.85 }]}
              resizeMode="cover"
            />
            {/* Top Live Status Badge */}
            <View style={[styles.liveBadgeRow, { backgroundColor: isDarkMode ? '#1E293B' : 'rgba(255, 255, 255, 0.92)', borderColor: isDarkMode ? '#374151' : '#DCFCE7' }]}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>{t('liveBadge') || 'Live'}</Text>
            </View>

            {/* Main Greeting Heading */}
            <Text style={[styles.namasteText, { color: isDarkMode ? '#F9FAFB' : '#0F172A' }]}>
              {t('namasteGreeting') || 'Namaste!'}
            </Text>
            <Text style={[styles.greetingTimeText, { color: isDarkMode ? '#F9FAFB' : '#0F172A' }]}>
              {t(timeGreetingKey) || 'Good Evening'}
            </Text>

            {/* Description */}
            <Text style={[styles.heroSubText, { color: isDarkMode ? '#9CA3AF' : '#475569' }]}>
              {t('heroSubTitle') || 'Your AI assistant for government schemes & agri guidance.'}
            </Text>

            {/* VOICE MIC ROW SECTION (SIDE-BY-SIDE SIDE LAYOUT MATCHING IMAGE 2) */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleMicPress}
              style={[
                styles.micRowSection,
                {
                  backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.92)',
                  borderColor: isDarkMode ? '#374151' : '#DCFCE7',
                },
              ]}
            >
              {/* Left Mic Button Circle with Pulse */}
              <View style={styles.micButtonWrapper}>
                <Animated.View
                  style={[
                    styles.micPulseRing,
                    {
                      transform: [{ scale: pulseAnim }],
                      opacity: pulseOpacity,
                    },
                  ]}
                />
                <View style={[styles.micCircleBtn, isListening && { backgroundColor: DARK_GREEN }]}>
                  <Ionicons name="mic" size={28} color="#FFFFFF" />
                </View>
              </View>

              {/* Right Col: Title, Subtitle, Audio Waveform */}
              <View style={styles.micTextCol}>
                <Text style={styles.tapToSpeakTitle}>
                  {isListening ? (t('listeningStatus') || 'Listening...') : (t('tapToSpeakTitle') || 'Tap to Speak')}
                </Text>

                <Text style={[styles.tapToSpeakSub, { color: isDarkMode ? '#9CA3AF' : '#475569' }]}>
                  {t('tapToSpeakSub') || 'Ask anything in your language. Available in 12 regional languages.'}
                </Text>

                {/* Audio Waveform Bars Visualizer */}
                <View style={styles.waveformContainer}>
                  <View style={[styles.waveBar, { height: 10 }]} />
                  <View style={[styles.waveBar, { height: 20 }]} />
                  <View style={[styles.waveBar, { height: 28 }]} />
                  <View style={[styles.waveBar, { height: 22 }]} />
                  <View style={[styles.waveBar, { height: 14 }]} />
                </View>
              </View>
            </TouchableOpacity>

            {/* Bottom Feature Pills Row */}
            <View style={styles.pillsRowCentered}>
              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#1E293B' : 'rgba(255, 255, 255, 0.92)', borderColor: isDarkMode ? '#374151' : '#DCFCE7' }]}>
                <Ionicons name="document-text-outline" size={14} color={PRIMARY_GREEN} />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
                  {t('pill12Languages') || '12 Languages'}
                </Text>
              </View>

              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#1E293B' : 'rgba(255, 255, 255, 0.92)', borderColor: isDarkMode ? '#374151' : '#DCFCE7' }]}>
                <Ionicons name="flash-outline" size={14} color={PRIMARY_GREEN} />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
                  {t('pillInstantReply') || 'Instant Reply'}
                </Text>
              </View>

              <View style={[styles.featurePill, { backgroundColor: isDarkMode ? '#1E293B' : 'rgba(255, 255, 255, 0.92)', borderColor: isDarkMode ? '#374151' : '#DCFCE7' }]}>
                <Ionicons name="leaf-outline" size={14} color={PRIMARY_GREEN} />
                <Text style={[styles.pillText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
                  {t('pillFreeToUse') || 'Free to Use'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. QUICK ASK SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
              ⚡ {t('quickAskHeader') || 'Ask'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('VoiceAssistant')} activeOpacity={0.7}>
              <Text style={styles.seeAllActionText}>{t('viewAll') || 'View all →'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCarouselPadding}
          >
            {QUICK_ASK_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.quickAskCarouselCard,
                  {
                    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : BORDER_GREEN,
                  },
                ]}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('VoiceAssistant')}
              >
                <View style={[styles.quickAskIconCircle, { backgroundColor: PALE_GREEN_TINT }]}>
                  <Ionicons name="mic" size={16} color={PRIMARY_GREEN} />
                </View>
                <Text style={[styles.quickAskText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]} numberOfLines={3}>
                  {t(item.key) || item.defaultText}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 3. MORE TOPICS SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
              {t('moreTopicsHeader') || 'More Topics'}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topicsChipsPadding}
          >
            {[
              { id: 'horticulture', title: t('topicHorticultureTitle') || 'Horticulture', icon: 'leaf-outline' },
              { id: 'irrigation', title: t('topicIrrigationTitle') || 'Irrigation', icon: 'water-outline' },
              { id: 'mechanization', title: t('topicMechanizationTitle') || 'Mechanization', icon: 'hardware-chip-outline' },
              { id: 'welfare', title: t('topicWelfareTitle') || 'Tribal Development', icon: 'people-outline' },
              { id: 'crop', title: 'Crop Development', icon: 'flower-outline' },
            ].map((topic) => (
              <TouchableOpacity
                key={topic.id}
                style={[
                  styles.topicChip,
                  {
                    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : BORDER_GREEN,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('SchemesTab', { screen: 'SchemesList', params: {} } as any)}
              >
                <Ionicons name={topic.icon as any} size={15} color={PRIMARY_GREEN} />
                <Text style={[styles.topicChipText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
                  {topic.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 4. FEATURED SCHEMES SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
              ★ {t('featuredSchemesHeader') || 'Featured Schemes'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SchemesTab', { screen: 'SchemesList', params: {} } as any)} activeOpacity={0.7}>
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
            <Text style={[styles.sectionTitleText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]}>
              📢 {t('recentUpdatesHeader') || 'Recent Updates'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} activeOpacity={0.7}>
              <Text style={styles.seeAllActionText}>{t('viewAll') || 'View all →'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.updatesListContainer}>
            {fetchedUpdates.map((update) => (
              <TouchableOpacity
                key={update.id}
                style={[
                  styles.updateCardItem,
                  {
                    backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : BORDER_GREEN,
                  },
                ]}
                activeOpacity={0.88}
                onPress={() => navigation.navigate('Notifications')}
              >
                <View style={styles.updateLeftAccentBar} />

                <View style={styles.updateCardContent}>
                  <View style={styles.updateTopRow}>
                    <View style={styles.newBadgeContainer}>
                      <Text style={styles.newBadgeText}>{t('newBadge') || 'NEW'}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={PRIMARY_GREEN} />
                  </View>

                  <Text style={[styles.updateTitleText, { color: isDarkMode ? '#F9FAFB' : '#1E293B' }]} numberOfLines={2}>
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
      </ScrollView>
    </View>
  );
};

/* ============================================================
   STYLES
   ============================================================ */

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

  /* Section 1: Hero Welcome Section (Image 2 Layout) */
  heroSectionWrapper: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: 12,
    marginBottom: 16,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  heroCardContainer: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  heroBgImageFull: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: PRIMARY_GREEN,
  },
  liveBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: PRIMARY_GREEN,
  },
  namasteText: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
  },
  greetingTimeText: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 6,
  },
  heroSubText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    maxWidth: 240,
    marginBottom: 16,
  },

  /* Horizontal Mic Row Section matching Image 2 */
  micRowSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(220, 252, 231, 0.8)',
    marginBottom: 16,
  },
  micButtonWrapper: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  micPulseRing: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(21, 128, 61, 0.2)',
  },
  micCircleBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: PRIMARY_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  micTextCol: {
    flex: 1,
  },
  tapToSpeakTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: PRIMARY_GREEN,
    marginBottom: 2,
  },
  tapToSpeakSub: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 6,
  },

  /* Audio Waveform Bars Visualizer */
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  waveBar: {
    width: 4,
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 2,
  },

  /* Bottom Feature Pills Row */
  pillsRowCentered: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    flex: 1,
    justifyContent: 'center',
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
  },

  /* Section Containers */
  sectionContainer: {
    marginBottom: 20,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.screenPaddingH,
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '800',
  },
  seeAllActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: PRIMARY_GREEN,
  },

  /* Quick Ask Carousel Cards */
  quickAskCarouselCard: {
    width: 170,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'space-between',
    minHeight: 110,
  },
  quickAskIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickAskText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },
  horizontalCarouselPadding: {
    paddingHorizontal: Layout.screenPaddingH,
  },

  /* Topics Chips */
  topicsChipsPadding: {
    paddingHorizontal: Layout.screenPaddingH,
    gap: 8,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  topicChipText: {
    fontSize: 13,
    fontWeight: '700',
  },

  /* Recent Updates Section */
  updatesListContainer: {
    paddingHorizontal: Layout.screenPaddingH,
    gap: 10,
  },
  updateCardItem: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  updateLeftAccentBar: {
    width: 5,
    backgroundColor: PRIMARY_GREEN,
  },
  updateCardContent: {
    flex: 1,
    padding: 14,
  },
  updateTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  newBadgeContainer: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: PRIMARY_GREEN,
  },
  updateTitleText: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
    marginBottom: 4,
  },
  updateBodyText: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  updateMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  updateMetaText: {
    fontSize: 11,
    color: '#5F6B7A',
  },
  updateMetaDot: {
    fontSize: 11,
    color: '#5F6B7A',
  },
  updateMetaCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: PRIMARY_GREEN,
  },
});