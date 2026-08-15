/**
 * Home Screen
 * Greeting, Voice Card, Feature Badges, Quick Actions, Featured Schemes, Recent Updates
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Colors,
  Spacing,
  BorderRadius,
} from '../../theme';

import { Header } from '../../components/layout/Header';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { QuickActionCard } from '../../components/cards/QuickActionCard';
import { NotificationCard } from '../../components/cards/NotificationCard';
import { SkeletonSchemeCard } from '../../components/common/SkeletonLoader';

import { useSchemes } from '../../hooks/useSchemes';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLanguageContext } from '../../contexts/LanguageContext';

import { HomeScreenProps } from '../../navigation/types';
import {
  Scheme,
  Notification as AppNotification,
} from '../../types/api.types';


const TOPICS = [
  {
    label: 'Horticulture',
    icon: 'leaf-outline' as const,
  },
  {
    label: 'Irrigation',
    icon: 'water-outline' as const,
  },
  {
    label: 'Mechanization',
    icon: 'construct-outline' as const,
  },
  {
    label: 'Tribal Development',
    icon: 'people-outline' as const,
  },
  {
    label: 'Crop Development',
    icon: 'flower-outline' as const,
  },
];


const ASK_ITEMS = [
  {
    title: 'Which schemes am I eligible for?',
    icon: 'mic-outline' as const,
  },
  {
    title: 'PM Kisan Status Check',
    icon: 'mic-outline' as const,
  },
  {
    title: 'How to apply for crop insurance?',
    icon: 'mic-outline' as const,
  },
];


export const HomeScreen: React.FC<HomeScreenProps<'Home'>> = ({
  navigation,
}) => {
  const { user } = useAuthContext();
  const { selectedLanguage } = useLanguageContext();

  const { width } = useWindowDimensions();

  /*
   * Responsive layout
   *
   * Mobile:
   * image stays on the right and never crosses
   * through the middle of the content.
   *
   * Desktop:
   * slightly wider image area.
   */
  const isMobile = width < 600;

  const schemesQuery = useSchemes({ limit: 5 });
  const notificationsQuery = useNotifications();


  const greeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return 'Good Morning';
    }

    if (hour < 17) {
      return 'Good Afternoon';
    }

    return 'Good Evening';
  }, []);


  const schemes =
    schemesQuery.data?.pages?.[0]?.data?.items || [];

  const notifications =
    (notificationsQuery.data as any)?.data?.slice?.(0, 3) || [];

  const isRefreshing = schemesQuery.isRefetching;


  const handleRefresh = () => {
    schemesQuery.refetch();
    notificationsQuery.refetch();
  };


  const handleSchemePress = (scheme: Scheme) => {
    navigation.navigate('SchemeDetails', {
      schemeId: scheme.id,
    });
  };


  const handleNotificationPress = (
    notif: AppNotification
  ) => {
    navigation.navigate('Notifications');
  };


  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}

      <Header
        selectedLanguage={selectedLanguage.name}
        onLanguagePress={() =>
          navigation.navigate(
            'ProfileTab',
            {
              screen: 'LanguageSelection',
            } as any
          )
        }
        onNotificationPress={() =>
          navigation.navigate('Notifications')
        }
      />


      {/* ================= MAIN SCROLL ================= */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary[600]}
            colors={[Colors.primary[600]]}
          />
        }
      >


        {/* =====================================================
            HERO CARD
            ===================================================== */}

        <View style={styles.heroCard}>

          {/* -------------------------------------------------
              FARM LANDSCAPE BACKGROUND
              ------------------------------------------------- */}

          <View
            pointerEvents="none"
            style={[
              styles.heroImageContainer,
              isMobile
                ? styles.heroImageMobile
                : styles.heroImageDesktop,
            ]}
          >

            <Image
              source={require('../../../assets/farmer-hero.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />

            {/* 
              IMPORTANT:
              This gradient hides the hard vertical edge
              of the PNG.

              It makes the image smoothly disappear into
              the mint background instead of showing a line.
            */}
            <LinearGradient
              pointerEvents="none"
              colors={[
                Colors.mint[100],
                'rgba(239,250,242,0.90)',
                'rgba(239,250,242,0.25)',
                'rgba(239,250,242,0)',
              ]}
              locations={[0, 0.28, 0.58, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.imageFade}
            />

            {/* Bottom fade to keep image inside hero */}
            <LinearGradient
              pointerEvents="none"
              colors={[
                'rgba(239,250,242,0)',
                'rgba(239,250,242,0.15)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.imageBottomFade}
            />

          </View>


          {/* -------------------------------------------------
              HERO CONTENT
              ------------------------------------------------- */}

          <View style={styles.heroContent}>

            {/* Live Badge */}

            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />

              <Text style={styles.liveText}>
                Live
              </Text>
            </View>


            {/* Greeting */}

            <Text style={styles.greetingTitle}>
              Namaste!
              {'\n'}
              <Text style={styles.greetingBold}>
                {greeting}
              </Text>
            </Text>


            <Text style={styles.greetingSubtitle}>
              Your AI assistant for government schemes & agri guidance.
            </Text>


            {/* -------------------------------------------------
                VOICE SECTION
                ------------------------------------------------- */}

            <TouchableOpacity
              style={styles.voiceSection}
              onPress={() =>
                navigation.navigate('VoiceAssistant')
              }
              activeOpacity={0.85}
            >

              <View style={styles.voiceIconContainer}>
                <Ionicons
                  name="mic-outline"
                  size={36}
                  color={Colors.white}
                />
              </View>


              <View style={styles.voiceRight}>

                <Text style={styles.voiceTitle}>
                  Tap to Speak
                </Text>

                <Text style={styles.voiceSubtitle}>
                  Ask anything in your language. Available in 12 regional languages.
                </Text>


                <View style={styles.voiceBars}>
                  {[12, 18, 26, 20, 14].map(
                    (height, index) => (
                      <View
                        key={index}
                        style={[
                          styles.voiceBar,
                          {
                            height,
                          },
                        ]}
                      />
                    )
                  )}
                </View>

              </View>

            </TouchableOpacity>


            {/* -------------------------------------------------
                FEATURE BADGES
                ------------------------------------------------- */}

            <View style={styles.heroBadges}>

              {[
                {
                  icon: 'document-text-outline' as const,
                  label: '12 Languages',
                },
                {
                  icon: 'flash-outline' as const,
                  label: 'Instant Reply',
                },
                {
                  icon: 'leaf-outline' as const,
                  label: 'Free to Use',
                },
              ].map((badge, index) => (

                <View
                  key={index}
                  style={styles.heroBadge}
                >

                  <Ionicons
                    name={badge.icon}
                    size={15}
                    color={Colors.primary[600]}
                  />

                  <Text style={styles.heroBadgeText}>
                    {badge.label}
                  </Text>

                </View>

              ))}

            </View>

          </View>

        </View>


        {/* =====================================================
            QUICK ASK
            ===================================================== */}

        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <View style={styles.sectionTitleRow}>

              <Ionicons
                name="flash-outline"
                size={20}
                color={Colors.primary[600]}
              />

              <Text style={styles.sectionTitle}>
                Ask
              </Text>

            </View>


            <TouchableOpacity
              onPress={() =>
                navigation.navigate('VoiceAssistant')
              }
            >

              <Text style={styles.seeAll}>
                View all →
              </Text>

            </TouchableOpacity>

          </View>


          <FlatList
            data={ASK_ITEMS}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            keyExtractor={(_, index) =>
              index.toString()
            }
            renderItem={({ item }) => (

              <QuickActionCard
                title={item.title}
                icon={item.icon}
                onPress={() =>
                  navigation.navigate('VoiceAssistant')
                }
              />

            )}
          />

        </View>


        {/* =====================================================
            MORE TOPICS
            ===================================================== */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            More Topics
          </Text>


          <View style={styles.topicsGrid}>

            {TOPICS.map((topic, index) => (

              <TouchableOpacity
                key={index}
                style={styles.topicChip}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate(
                    'SchemesTab',
                    {
                      screen: 'SchemesList',
                      params: {
                        category: topic.label,
                      },
                    } as any
                  )
                }
              >

                <Ionicons
                  name={topic.icon}
                  size={16}
                  color={Colors.primary[600]}
                />

                <Text style={styles.topicText}>
                  {topic.label}
                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>


        {/* =====================================================
            FEATURED SCHEMES
            ===================================================== */}

        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <View style={styles.sectionTitleRow}>

              <Ionicons
                name="star-outline"
                size={20}
                color={Colors.primary[600]}
              />

              <Text style={styles.sectionTitle}>
                Featured Schemes
              </Text>

            </View>


            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'SchemesTab' as any
                )
              }
            >

              <Text style={styles.seeAll}>
                See all →
              </Text>

            </TouchableOpacity>

          </View>


          {schemesQuery.isLoading ? (

            <FlatList
              data={[1, 2, 3]}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              keyExtractor={(_, index) =>
                index.toString()
              }
              renderItem={() => (
                <SkeletonSchemeCard />
              )}
            />

          ) : (

            <FlatList
              data={schemes}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (

                <SchemeCard
                  scheme={item}
                  onPress={handleSchemePress}
                />

              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  No schemes available
                </Text>
              }
            />

          )}

        </View>


        {/* =====================================================
            RECENT UPDATES
            ===================================================== */}

        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <View style={styles.sectionTitleRow}>

              <Ionicons
                name="megaphone-outline"
                size={20}
                color={Colors.primary[600]}
              />

              <Text style={styles.sectionTitle}>
                Recent Updates
              </Text>

            </View>


            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Notifications')
              }
            >

              <Text style={styles.seeAll}>
                View all →
              </Text>

            </TouchableOpacity>

          </View>


          {notifications.map(
            (
              notification: AppNotification,
              index: number
            ) => (

              <NotificationCard
                key={
                  notification.id ||
                  index
                }
                notification={notification}
                onPress={
                  handleNotificationPress
                }
              />

            )
          )}


          {notifications.length === 0 &&
            !notificationsQuery.isLoading && (

              <Text style={styles.emptyText}>
                No recent updates
              </Text>

            )}

        </View>


        <View style={{ height: 110 }} />

      </ScrollView>

    </View>
  );
};


/* ============================================================
   STYLES
   ============================================================ */

const styles = StyleSheet.create({

  /* =========================
     PAGE
     ========================= */

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },


  /* =========================
     HERO CARD
     ========================= */

  heroCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xs,

    backgroundColor: Colors.mint[100],

    borderRadius: 28,

    overflow: 'hidden',

    position: 'relative',

    minHeight: 360,
  },


  /* =========================
     HERO IMAGE
     ========================= */

  heroImageContainer: {
    position: 'absolute',

    top: 0,
    bottom: 0,

    overflow: 'hidden',

    zIndex: 0,
  },

  heroImageMobile: {
    width: '65%',
    right: 0,
  },

  heroImageDesktop: {
    width: '58%',
    right: 0,
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  /*
   * This is the important part.
   *
   * It hides the hard vertical edge of the
   * farmer image and makes it blend into
   * your mint background.
   */

  imageFade: {
    position: 'absolute',

    left: 0,
    top: 0,
    bottom: 0,

    width: '48%',
  },

  imageBottomFade: {
    position: 'absolute',

    left: 0,
    right: 0,

    bottom: 0,

    height: '20%',
  },


  /* =========================
     HERO CONTENT
     ========================= */

  heroContent: {
    position: 'relative',

    zIndex: 2,

    padding: Spacing.xl,

    /*
     * Content remains on the left.
     * Image stays visually on the right.
     */

    width: '100%',
  },


  /* =========================
     LIVE
     ========================= */

  liveBadge: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'flex-start',

    backgroundColor: Colors.white,

    paddingVertical: 4,
    paddingHorizontal: 12,

    borderRadius: BorderRadius.full,

    gap: 6,

    marginBottom: Spacing.md,

    borderWidth: 1,

    borderColor: Colors.border,
  },

  liveDot: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor:
      Colors.primary[600],
  },

  liveText: {
    fontSize: 12,

    color:
      Colors.primary[600],

    fontWeight: '700',
  },


  /* =========================
     GREETING
     ========================= */

  greetingTitle: {
    fontSize: 26,

    fontWeight: '700',

    color:
      Colors.text.primary,

    lineHeight: 34,

    maxWidth: '72%',
  },

  greetingBold: {
    fontWeight: '800',

    color:
      Colors.text.primary,
  },

  greetingSubtitle: {
    fontSize: 14,

    color:
      Colors.text.secondary,

    marginTop: 6,

    marginBottom: Spacing.xl,

    lineHeight: 20,

    /*
     * Prevent the sentence from
     * entering too far into the image.
     */

    maxWidth: '68%',
  },


  /* =========================
     VOICE
     ========================= */

  voiceSection: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: Spacing.lg,

    marginBottom: Spacing.xl,

    maxWidth: '72%',
  },

  voiceIconContainer: {
    width: 80,

    height: 80,

    borderRadius: 40,

    backgroundColor:
      Colors.primary[600],

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor:
      Colors.primary[900],

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.25,

    shadowRadius: 8,

    elevation: 6,
  },

  voiceRight: {
    flex: 1,

    minWidth: 0,
  },

  voiceTitle: {
    fontSize: 18,

    fontWeight: '700',

    color:
      Colors.primary[600],

    marginBottom: 2,
  },

  voiceSubtitle: {
    fontSize: 12,

    color:
      Colors.text.secondary,

    lineHeight: 17,
  },

  voiceBars: {
    flexDirection: 'row',

    alignItems: 'flex-end',

    gap: 3,

    marginTop: 8,
  },

  voiceBar: {
    width: 4,

    borderRadius: 2,

    backgroundColor:
      Colors.primary[600],
  },


  /* =========================
     BADGES
     ========================= */

  heroBadges: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    gap: 8,

    maxWidth: '100%',
  },

  heroBadge: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 6,

    backgroundColor:
      Colors.white,

    paddingVertical: 8,

    paddingHorizontal: 12,

    borderRadius:
      BorderRadius.full,

    borderWidth: 1,

    borderColor:
      Colors.border,
  },

  heroBadgeText: {
    fontSize: 12,

    fontWeight: '600',

    color:
      Colors.text.primary,
  },


  /* =========================
     SECTIONS
     ========================= */

  section: {
    marginTop: Spacing['2xl'],

    paddingHorizontal:
      Spacing.lg,
  },

  sectionHeader: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    marginBottom:
      Spacing.lg,
  },

  sectionTitleRow: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: Spacing.xs,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: '700',

    color:
      Colors.text.primary,
  },

  seeAll: {
    fontSize: 14,

    fontWeight: '700',

    color:
      Colors.primary[600],
  },

  horizontalList: {
    paddingRight:
      Spacing.lg,

    gap: Spacing.md,
  },


  /* =========================
     TOPICS
     ========================= */

  topicsGrid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    gap: 10,
  },

  topicChip: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,

    backgroundColor:
      Colors.white,

    paddingVertical: 10,

    paddingHorizontal: 16,

    borderRadius:
      BorderRadius.full,

    borderWidth: 1,

    borderColor:
      Colors.gray[200],

    shadowColor:
      Colors.black,

    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.02,

    shadowRadius: 2,

    elevation: 1,
  },

  topicText: {
    fontSize: 13,

    fontWeight: '600',

    color:
      Colors.text.primary,
  },


  /* =========================
     EMPTY
     ========================= */

  emptyText: {
    fontSize: 14,

    color:
      Colors.text.tertiary,

    textAlign: 'center',

    padding: Spacing.xl,
  },

});