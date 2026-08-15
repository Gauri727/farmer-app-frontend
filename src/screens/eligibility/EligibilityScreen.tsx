/**
 * Eligibility Screen — Farmer AI
 * Combined version:
 * - Localization
 * - Light / Dark theme
 * - Farmer eligibility questionnaire
 * - 2-column responsive selection
 * - Voice Assistant
 * - Scheme matching
 * - Scheme cards
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { MOCK_SCHEMES } from '../../services/schemeService';
import { getLocalizedScheme } from '../../utils/schemeLocalization';
import { EligibilityScreenProps } from '../../navigation/types';
import { Scheme } from '../../types/api.types';

const PRIMARY_GREEN = '#2E7D32';
const DARK_GREEN = '#155D2C';
const PALE_GREEN_BG = '#EAF5EC';
const PALE_GREEN_BORDER = '#D4EAD8';
const WHITE = '#FFFFFF';

export const EligibilityScreen: React.FC<
  EligibilityScreenProps<'EligibilityForm'>
> = ({ navigation }) => {
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const { t, selectedLanguage } = useLanguageContext();

  // ============================================================
  // ELIGIBILITY FORM STATE
  // ============================================================

  const [ownsLand, setOwnsLand] = useState<'yes' | 'no'>('yes');

  const [landHolding, setLandHolding] =
    useState<string>('1to2');

  const [cropType, setCropType] =
    useState<string>('fieldCrops');

  const [annualIncome, setAnnualIncome] =
    useState<string>('1.5to2.5L');

  const [category, setCategory] =
    useState<string>('general');

  const [pmKisanSupport, setPmKisanSupport] =
    useState<'yes' | 'no'>('yes');

  const [isWomanFarmer, setIsWomanFarmer] =
    useState<'yes' | 'no'>('no');

  const [supportNeeded, setSupportNeeded] =
    useState<string>('irrigation');

  const [showResults, setShowResults] =
    useState(false);

  // ============================================================
  // MATCH SCHEMES
  // ============================================================

  const getMatchingSchemes = (): Scheme[] => {
    const schemes = MOCK_SCHEMES.filter((scheme) => {
      // ST farmers
      if (
        category === 'st' &&
        scheme.category === 'Tribal Development'
      ) {
        return true;
      }

      // SC farmers
      if (
        category === 'sc' &&
        scheme.id.toLowerCase().includes('ambedkar')
      ) {
        return true;
      }

      // Irrigation
      if (
        supportNeeded === 'irrigation' &&
        scheme.category === 'Irrigation'
      ) {
        return true;
      }

      // Machinery
      if (
        supportNeeded === 'machinery' &&
        scheme.category === 'Mechanization'
      ) {
        return true;
      }

      // Woman farmer
      if (
        isWomanFarmer === 'yes' &&
        scheme.type === 'State'
      ) {
        return true;
      }

      // General useful schemes
      return (
        scheme.is_featured ||
        scheme.category === 'Irrigation' ||
        scheme.category === 'Farmer Welfare'
      );
    });

    return schemes.map((scheme) =>
      getLocalizedScheme(
        scheme,
        selectedLanguage.code
      )
    );
  };

  const matchingSchemes = getMatchingSchemes();

  // ============================================================
  // SCHEME CLICK
  // ============================================================

  const handleSchemePress = (scheme: Scheme) => {
    navigation.navigate(
      'HomeTab',
      {
        screen: 'SchemeDetails',
        params: {
          schemeId: scheme.id,
        },
      } as any
    );
  };

  // ============================================================
  // RESET / MODIFY
  // ============================================================

  const handleModifyAnswers = () => {
    setShowResults(false);
  };

  // ============================================================
  // REUSABLE 2-COLUMN OPTION GRID
  // ============================================================

  const renderPillGrid = (
    options: {
      id: string;
      label: string;
    }[],
    selectedValue: string,
    onSelect: (value: string) => void
  ) => {
    return (
      <View style={styles.twoColumnGrid}>
        {options.map((option) => {
          const selected =
            selectedValue === option.id;

          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.82}
              onPress={() =>
                onSelect(option.id)
              }
              style={[
                styles.gridPill,
                {
                  backgroundColor: selected
                    ? PRIMARY_GREEN
                    : isDarkMode
                      ? '#1E293B'
                      : PALE_GREEN_BG,

                  borderColor: selected
                    ? PRIMARY_GREEN
                    : isDarkMode
                      ? '#334155'
                      : PALE_GREEN_BORDER,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.gridPillText,
                  {
                    color: selected
                      ? WHITE
                      : isDarkMode
                        ? '#CBD5E1'
                        : DARK_GREEN,

                    fontWeight: selected
                      ? '800'
                      : '700',
                  },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // ============================================================
  // QUESTION CARD
  // ============================================================

  const renderQuestion = (
    title: string,
    options: {
      id: string;
      label: string;
    }[],
    value: string,
    onChange: (value: string) => void
  ) => {
    return (
      <View
        style={[
          styles.questionCard,
          {
            backgroundColor: isDarkMode
              ? '#1F2937'
              : WHITE,

            borderColor: isDarkMode
              ? '#374151'
              : '#E6EFE8',
          },
        ]}
      >
        <Text
          style={[
            styles.questionTitle,
            {
              color: isDarkMode
                ? '#F9FAFB'
                : '#111827',
            },
          ]}
        >
          {title}
        </Text>

        {renderPillGrid(
          options,
          value,
          onChange
        )}
      </View>
    );
  };

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            isDarkMode
              ? themeColors.background
              : '#F4F7F4',
        },
      ]}
    >
      {/* HEADER */}

      <Header
        title={
          t('checkEligibility') ||
          'Check eligibility'
        }
        subtitle={
          t('eligibilitySubtitle') ||
          'Share a few farm details and find matches'
        }
        onNotificationPress={() =>
          navigation.navigate(
            'HomeTab',
            {
              screen: 'Notifications',
            } as any
          )
        }
        onProfilePress={() =>
          navigation.navigate(
            'ProfileTab',
            {
              screen: 'Profile',
            } as any
          )
        }
      />

      {/* CONTENT */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: 130,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* VOICE ASSISTANT */}

        <TouchableOpacity
          activeOpacity={0.88}
          style={[
            styles.voiceBanner,
            {
              backgroundColor: isDarkMode
                ? '#1E293B'
                : WHITE,

              borderColor: isDarkMode
                ? '#334155'
                : '#E4EDE6',
            },
          ]}
          onPress={() =>
            navigation.navigate(
              'HomeTab',
              {
                screen: 'VoiceAssistant',
              } as any
            )
          }
        >
          <View
            style={[
              styles.voiceIconCircle,
              {
                backgroundColor:
                  isDarkMode
                    ? '#064E3B'
                    : PALE_GREEN_BG,
              },
            ]}
          >
            <Ionicons
              name="sparkles"
              size={18}
              color={PRIMARY_GREEN}
            />
          </View>

          <View style={styles.voiceTextGroup}>
            <Text
              style={[
                styles.voiceMainText,
                {
                  color: isDarkMode
                    ? '#D1D5DB'
                    : '#374151',
                },
              ]}
            >
              {t('introCardText') ||
                'Prefer to talk? Ask Farmer AI by voice.'}
            </Text>

            <Text
              style={[
                styles.voiceLinkText,
                {
                  color: PRIMARY_GREEN,
                },
              ]}
            >
              {t('talkToAgriMitraArrow') ||
                'Talk to Farmer AI →'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* =====================================================
            QUESTIONNAIRE
        ===================================================== */}

        {!showResults ? (
          <View style={styles.formSection}>

            {/* Q1 */}

            {renderQuestion(
              t('qOwnLand') ||
                'Do you own agricultural land?',

              [
                {
                  id: 'yes',
                  label:
                    t('optYes') || 'Yes',
                },
                {
                  id: 'no',
                  label:
                    t('optNo') || 'No',
                },
              ],

              ownsLand,
              setOwnsLand
            )}

            {/* Q2 */}

            {renderQuestion(
              t('qLandSize') ||
                'Approximate land holding size?',

              [
                {
                  id: 'under1',
                  label:
                    t('optUnder1') ||
                    '< 2 acres',
                },
                {
                  id: '1to2',
                  label:
                    t('opt1to2') ||
                    '2 - 5 acres',
                },
                {
                  id: '2to5',
                  label:
                    t('opt2to5') ||
                    '5 - 10 acres',
                },
                {
                  id: 'above5',
                  label:
                    t('optAbove5') ||
                    '> 10 acres',
                },
              ],

              landHolding,
              setLandHolding
            )}

            {/* Q3 */}

            {renderQuestion(
              t('qPrimaryActivity') ||
                'Primary farming activity?',

              [
                {
                  id: 'fieldCrops',
                  label:
                    t('optFieldCrops') ||
                    'Field Crops',
                },
                {
                  id: 'horticulture',
                  label:
                    t('optHorticulture') ||
                    'Horticulture',
                },
                {
                  id: 'dairy',
                  label:
                    t('optDairy') ||
                    'Dairy & Livestock',
                },
                {
                  id: 'fisheries',
                  label:
                    t('optFisheries') ||
                    'Fisheries',
                },
              ],

              cropType,
              setCropType
            )}

            {/* Q4 */}

            {renderQuestion(
              t('qAnnualIncome') ||
                'Annual farmer household income?',

              [
                {
                  id: 'under1.5L',
                  label:
                    t('optIncomeUnder1_5L') ||
                    '< ₹1.5 Lakh',
                },
                {
                  id: '1.5to2.5L',
                  label:
                    t('optIncome1_5to2_5L') ||
                    '₹1.5L - ₹3 Lakh',
                },
                {
                  id: '2.5to5L',
                  label:
                    t('optIncome2_5to5L') ||
                    '₹3L - ₹5 Lakh',
                },
                {
                  id: 'above5L',
                  label:
                    t('optIncomeAbove5L') ||
                    '> ₹5 Lakh',
                },
              ],

              annualIncome,
              setAnnualIncome
            )}

            {/* Q5 */}

            {renderQuestion(
              t('qCategory') ||
                'Your social category?',

              [
                {
                  id: 'general',
                  label:
                    t('optGeneral') ||
                    'General',
                },
                {
                  id: 'sc',
                  label:
                    t('optSC') || 'SC',
                },
                {
                  id: 'st',
                  label:
                    t('optST') || 'ST',
                },
                {
                  id: 'obc',
                  label:
                    t('optOBC') || 'OBC',
                },
              ],

              category,
              setCategory
            )}

            {/* Q6 */}

            {renderQuestion(
              t('qPmKisan') ||
                'Do you currently receive PM-KISAN support?',

              [
                {
                  id: 'yes',
                  label:
                    t('optYes') || 'Yes',
                },
                {
                  id: 'no',
                  label:
                    t('optNo') || 'No',
                },
              ],

              pmKisanSupport,
              setPmKisanSupport
            )}

            {/* Q7 */}

            {renderQuestion(
              t('qWomanFarmer') ||
                'Are you a woman farmer?',

              [
                {
                  id: 'yes',
                  label:
                    t('optYes') || 'Yes',
                },
                {
                  id: 'no',
                  label:
                    t('optNo') || 'No',
                },
              ],

              isWomanFarmer,
              setIsWomanFarmer
            )}

            {/* Q8 */}

            {renderQuestion(
              t('qSupportNeeded') ||
                'Which support do you need most?',

              [
                {
                  id: 'irrigation',
                  label:
                    t('optIrrigation') ||
                    'Irrigation',
                },
                {
                  id: 'machinery',
                  label:
                    t('optMachinery') ||
                    'Machinery',
                },
                {
                  id: 'pond',
                  label:
                    t('optPond') ||
                    'Farm Pond',
                },
                {
                  id: 'cropInputs',
                  label:
                    t('optCropInputs') ||
                    'Seeds & Fertilizer',
                },
              ],

              supportNeeded,
              setSupportNeeded
            )}

            {/* CHECK ELIGIBILITY */}

            <TouchableOpacity
              activeOpacity={0.88}
              style={[
                styles.bigGreenButton,
                {
                  backgroundColor:
                    PRIMARY_GREEN,
                },
              ]}
              onPress={() =>
                setShowResults(true)
              }
            >
              <Text
                style={
                  styles.bigGreenButtonText
                }
              >
                {t('btnCheckEligible') ||
                  'Check Eligible Schemes →'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (

          /* ===================================================
             RESULTS
          =================================================== */

          <View style={styles.resultsContainer}>

            {matchingSchemes.length > 0 ? (
              <>
                <View
                  style={[
                    styles.resultsBadgeHeader,
                    {
                      backgroundColor:
                        isDarkMode
                          ? '#064E3B'
                          : PALE_GREEN_BG,

                      borderColor:
                        isDarkMode
                          ? '#166534'
                          : PALE_GREEN_BORDER,
                    },
                  ]}
                >
                  <Ionicons
                    name="sparkles"
                    size={20}
                    color={PRIMARY_GREEN}
                  />

                  <Text
                    style={[
                      styles.resultsBadgeText,
                      {
                        color: isDarkMode
                          ? '#BBF7D0'
                          : DARK_GREEN,
                      },
                    ]}
                  >
                    Found{' '}
                    {matchingSchemes.length}{' '}
                    Eligible Schemes
                  </Text>
                </View>

                {matchingSchemes.map(
                  (scheme) => (
                    <SchemeCard
                      key={scheme.id}
                      scheme={scheme}
                      onPress={
                        handleSchemePress
                      }
                      compact
                    />
                  )
                )}

                {/* MODIFY */}

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                    styles.modifyBtn,
                    {
                      borderColor:
                        PRIMARY_GREEN,

                      backgroundColor:
                        isDarkMode
                          ? '#1E293B'
                          : WHITE,
                    },
                  ]}
                  onPress={
                    handleModifyAnswers
                  }
                >
                  <Ionicons
                    name="create-outline"
                    size={18}
                    color={PRIMARY_GREEN}
                  />

                  <Text
                    style={[
                      styles.modifyBtnText,
                      {
                        color:
                          PRIMARY_GREEN,
                      },
                    ]}
                  >
                    Modify Questionnaire
                    Answers
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View
                style={[
                  styles.emptyStateCard,
                  {
                    backgroundColor:
                      isDarkMode
                        ? '#1F2937'
                        : WHITE,

                    borderColor:
                      isDarkMode
                        ? '#374151'
                        : '#E5E7EB',
                  },
                ]}
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={48}
                  color="#D97706"
                />

                <Text
                  style={[
                    styles.emptyTitle,
                    {
                      color:
                        isDarkMode
                          ? '#FBBF24'
                          : '#92400E',
                    },
                  ]}
                >
                  No Direct Matches Found
                </Text>

                <Text
                  style={[
                    styles.emptySub,
                    {
                      color:
                        isDarkMode
                          ? '#CBD5E1'
                          : '#6B7280',
                    },
                  ]}
                >
                  Try adjusting your
                  parameters to see more
                  schemes.
                </Text>

                <TouchableOpacity
                  activeOpacity={0.88}
                  style={[
                    styles.bigGreenButton,
                    {
                      backgroundColor:
                        PRIMARY_GREEN,
                      width: '100%',
                      marginTop: 12,
                    },
                  ]}
                  onPress={
                    handleModifyAnswers
                  }
                >
                  <Text
                    style={
                      styles.bigGreenButtonText
                    }
                  >
                    Modify Answers
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
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
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 130,
  },

  /* VOICE */

  voiceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },

  voiceIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  voiceTextGroup: {
    flex: 1,
  },

  voiceMainText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },

  voiceLinkText: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },

  /* FORM */

  formSection: {
    gap: 2,
  },

  questionCard: {
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  questionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    lineHeight: 18,
  },

  /* TWO COLUMN GRID */

  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },

  gridPill: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 8,
    paddingVertical: 11,
    paddingHorizontal: 8,
    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
  },

  gridPillText: {
    fontSize: 13,
    textAlign: 'center',
  },

  /* BUTTON */

  bigGreenButton: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 24,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 8,
    marginBottom: 16,

    shadowColor: PRIMARY_GREEN,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  bigGreenButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  /* RESULTS */

  resultsContainer: {
    gap: 12,
  },

  resultsBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

    paddingHorizontal: 16,
    paddingVertical: 12,

    borderRadius: 18,
    borderWidth: 1,

    marginBottom: 6,
  },

  resultsBadgeText: {
    fontSize: 15,
    fontWeight: '800',
  },

  modifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,

    paddingVertical: 13,

    borderWidth: 1.5,
    borderRadius: 24,

    marginTop: 8,
  },

  modifyBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },

  emptyStateCard: {
    borderRadius: 20,
    padding: 24,

    alignItems: 'center',

    borderWidth: 1,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 12,
    textAlign: 'center',
  },

  emptySub: {
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    marginBottom: 16,
  },
});