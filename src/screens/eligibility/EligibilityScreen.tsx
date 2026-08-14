/**
 * Eligibility Wizard Screen — Step-by-step eligibility flow
 */

<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
=======
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
>>>>>>> a899fda (Update Farmer AI UI and home screen)
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { EligibilityScreenProps } from '../../navigation/types';
<<<<<<< HEAD
import { EligibilityResponse, EligibilityResult, Scheme } from '../../types/api.types';
=======
import {
  EligibilityResponse,
  EligibilityResult,
  Scheme,
} from '../../types/api.types';
import { useLanguageContext } from '../../contexts/LanguageContext';
>>>>>>> a899fda (Update Farmer AI UI and home screen)

type AnswerMap = Record<string, string>;

type Option = {
  label: string;
  value: string;
};

type Question = {
  id: string;
  countLabel: string;
  title: string;
  options: Option[];
};

const QUESTIONS: Question[] = [
  {
    id: 'supportAccess',
    countLabel: 'Question 1 of 6',
    title: 'Do you already receive any government support?',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
  {
    id: 'landOwnership',
    countLabel: 'Question 2 of 6',
    title: 'Do you own agricultural land?',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
  {
    id: 'landSize',
    countLabel: 'Question 3 of 6',
    title: 'Approximate land size?',
    options: [
      { label: '<2 acres', value: '<2 acres' },
      { label: '2-5 acres', value: '2-5 acres' },
      { label: '5-10 acres', value: '5-10 acres' },
      { label: '>10 acres', value: '>10 acres' },
    ],
  },
  {
    id: 'socialCategory',
    countLabel: 'Question 4 of 6',
    title: 'Your social category?',
    options: [
      { label: 'General', value: 'General' },
      { label: 'SC', value: 'SC' },
      { label: 'ST', value: 'ST' },
      { label: 'OBC', value: 'OBC' },
    ],
  },
  {
    id: 'womanFarmer',
    countLabel: 'Question 5 of 6',
    title: 'Are you a woman farmer?',
    options: [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ],
  },
  {
    id: 'interestArea',
    countLabel: 'Question 6 of 6',
    title: 'Which areas interest you most?',
    options: [
      { label: 'Irrigation', value: 'Irrigation' },
      { label: 'Machinery', value: 'Machinery' },
      { label: 'Crop Insurance', value: 'Crop Insurance' },
      { label: 'Horticulture', value: 'Horticulture' },
      { label: 'Credit', value: 'Credit' },
    ],
  },
];

const createScheme = (scheme: Scheme): Scheme => scheme;

const buildResults = (answers: AnswerMap): EligibilityResponse => {
  const results: EligibilityResult[] = [];

  const stScheme = createScheme({
    id: 'tribal-sub-plan-farmer-support',
    title: 'Tribal Sub-Plan Farmer Support Scheme',
    description:
      'Enhanced input & mechanization subsidy for tribal farmers.',
    category: 'Tribal Farmer Schemes',
    type: 'Central',
  });

  const creditScheme = createScheme({
    id: 'kisan-credit-card',
    title: 'Kisan Credit Card (KCC)',
    description:
      'Short-term credit at 4% interest (with subvention) for crop needs.',
    category: 'Farmer Welfare & Insurance',
    type: 'Central',
  });

  if (answers.socialCategory === 'ST') {
    results.push({
      scheme: stScheme,
      is_eligible: true,
      match_percentage: 96,
      reasons: ['Special benefits for ST farmers'],
    });
  }

<<<<<<< HEAD
  if (answers.interestArea === 'Credit' || answers.landOwnership === 'Yes') {
    results.push({
      scheme: creditScheme,
      is_eligible: true,
      match_percentage: answers.interestArea === 'Credit' ? 94 : 82,
=======
  if (
    answers.interestArea === 'KCC Credit' ||
    answers.landOwnership === 'Yes'
  ) {
    results.push({
      scheme: creditScheme,
      is_eligible: true,
      match_percentage:
        answers.interestArea === 'KCC Credit' ? 94 : 82,
>>>>>>> a899fda (Update Farmer AI UI and home screen)
      reasons: [
        answers.interestArea === 'Credit'
          ? 'Matches your interest (Credit)'
          : 'Useful for crop input financing',
      ],
    });
  }

  if (answers.womanFarmer === 'Yes') {
    results.push({
      scheme: createScheme({
        id: 'women-farmer-support',
        title: 'Women Farmer Support Program',
        description:
          'Targeted support for women-led farms and collectives.',
        category: 'Women Farmer Support',
        type: 'State',
      }),
      is_eligible: true,
      match_percentage: 88,
      reasons: ['Tailored for woman farmers'],
    });
  }

  if (results.length === 0) {
    results.push({
      scheme: creditScheme,
      is_eligible: true,
      match_percentage: 78,
      reasons: ['Broad support for farm credit and crop needs'],
    });
  }

  return {
    results,
    total_eligible: results.length,
  };
};

<<<<<<< HEAD
export const EligibilityScreen: React.FC<EligibilityScreenProps<'EligibilityForm'>> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setStep(0);
      setAnswers({});
    });

    return unsubscribe;
  }, [navigation]);

  const currentQuestion = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const handleSelect = (value: string) => {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };

    setAnswers(nextAnswers);

    if (step === QUESTIONS.length - 1) {
      navigation.navigate('EligibilityResult', { results: buildResults(nextAnswers) });
      return;
    }

    setStep((current) => current + 1);
=======
export const EligibilityScreen: React.FC<
  EligibilityScreenProps<'EligibilityForm'>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { selectedLanguage } = useLanguageContext();

  const [answers, setAnswers] = useState<AnswerMap>({
    landOwnership: 'Yes',
    landSize: '<2 acres',
    farmingActivity: 'Field Crops',
    annualIncome: '< ₹1.5 Lakh',
    socialCategory: 'General',
    govtSupport: 'Yes',
    womanFarmer: 'No',
    interestArea: 'Crop Insurance',
  });

  const handlePillSelect = (key: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    navigation.navigate('EligibilityResult', {
      results: buildResults(answers),
    });
>>>>>>> a899fda (Update Farmer AI UI and home screen)
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View style={styles.header}>
        <View style={[styles.headerTop, { paddingTop: insets.top + Spacing.lg }]}>
          <TouchableOpacity onPress={() => (step > 0 ? setStep(step - 1) : navigation.goBack())}>
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
=======

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing.xs,
          },
        ]}
      >
        <View style={styles.headerRow}>

          {/* APP LOGO */}
          <View style={styles.avatarCircle}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.avatarLogo}
              resizeMode="contain"
            />
          </View>

          {/* HEADER TEXT */}
          <View style={styles.headerTextCol}>
            <Text style={styles.headerTitle}>
              Check eligibility
            </Text>

            <Text style={styles.headerSubtitle}>
              Share a few farm details and find matches
            </Text>
          </View>

          {/* LANGUAGE */}
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() =>
              navigation.navigate('ProfileTab' as any)
            }
            activeOpacity={0.8}
          >
            <Ionicons
              name="globe-outline"
              size={18}
              color={Colors.text.primary}
            />
          </TouchableOpacity>

          {/* NOTIFICATIONS */}
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() =>
              navigation.navigate('Notifications' as any)
            }
            activeOpacity={0.8}
          >
            <Ionicons
              name="notifications-outline"
              size={18}
              color={Colors.text.primary}
            />
>>>>>>> a899fda (Update Farmer AI UI and home screen)
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Eligibility Wizard</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView
<<<<<<< HEAD
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing['5xl'] }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.stepCount}>{currentQuestion.countLabel}</Text>
        <Text style={styles.stepTitle}>{currentQuestion.title}</Text>

        <View style={styles.optionList}>
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => handleSelect(option.value)}
                activeOpacity={0.85}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option.label}
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={28}
                  color={isSelected ? Colors.primary[600] : Colors.gray[400]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
=======
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 120,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >

        {/* Voice Assistant Banner Card */}
        <TouchableOpacity
          style={styles.voiceBanner}
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('VoiceAssistant' as any)
          }
        >
          <View style={styles.voiceIconBadge}>
            <Ionicons
              name="sparkles"
              size={20}
              color="#1B5E20"
            />
          </View>

          <View style={styles.voiceTextCol}>
            <Text style={styles.voiceTitle}>
              Prefer to talk? Ask Mitra by voice.
            </Text>

            <View style={styles.voiceLinkRow}>
              <Ionicons
                name="mic"
                size={15}
                color="#2E7D32"
              />

              <Text style={styles.voiceLinkText}>
                Talk to Yojna Mitra →
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Question 1 */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Do you own agricultural land?
          </Text>

          <View style={styles.pillRow}>
            {['Yes', 'No'].map((opt) => {
              const isSelected =
                answers.landOwnership === opt;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.pillBtn,
                    styles.pillBtnFlex,
                    isSelected && styles.pillBtnSelected,
                  ]}
                  onPress={() =>
                    handlePillSelect(
                      'landOwnership',
                      opt
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isSelected &&
                        styles.pillTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 2 */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Approximate land holding size?
          </Text>

          <View style={styles.pillGrid}>
            {[
              '<2 acres',
              '2-5 acres',
              '5-10 acres',
              '>10 acres',
            ].map((opt) => {
              const isSelected =
                answers.landSize === opt;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.pillBtn,
                    styles.pillBtnHalf,
                    isSelected &&
                      styles.pillBtnSelected,
                  ]}
                  onPress={() =>
                    handlePillSelect(
                      'landSize',
                      opt
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isSelected &&
                        styles.pillTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 3 */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Primary farming activity?
          </Text>

          <View style={styles.pillGrid}>
            {[
              'Field Crops',
              'Horticulture',
              'Dairy & Livestock',
              'Fisheries',
            ].map((opt) => {
              const isSelected =
                answers.farmingActivity === opt;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.pillBtn,
                    styles.pillBtnHalf,
                    isSelected &&
                      styles.pillBtnSelected,
                  ]}
                  onPress={() =>
                    handlePillSelect(
                      'farmingActivity',
                      opt
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isSelected &&
                        styles.pillTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 4 */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Annual farmer household income?
          </Text>

          <View style={styles.pillGrid}>
            {[
              '< ₹1.5 Lakh',
              '₹1.5L - ₹3 Lakh',
              '₹3L - ₹5 Lakh',
              '> ₹5 Lakh',
            ].map((opt) => {
              const isSelected =
                answers.annualIncome === opt;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.pillBtn,
                    styles.pillBtnHalf,
                    isSelected &&
                      styles.pillBtnSelected,
                  ]}
                  onPress={() =>
                    handlePillSelect(
                      'annualIncome',
                      opt
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isSelected &&
                        styles.pillTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 5 */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Your social category?
          </Text>

          <View style={styles.pillRow}>
            {['General', 'SC', 'ST', 'OBC'].map((opt) => {
              const isSelected =
                answers.socialCategory === opt;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.pillBtn,
                    styles.pillBtnFlex,
                    isSelected &&
                      styles.pillBtnSelected,
                  ]}
                  onPress={() =>
                    handlePillSelect(
                      'socialCategory',
                      opt
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isSelected &&
                        styles.pillTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 6 */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Do you currently receive PM-KISAN support?
          </Text>

          <View style={styles.pillRow}>
            {['Yes', 'No'].map((opt) => {
              const isSelected =
                answers.govtSupport === opt;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.pillBtn,
                    styles.pillBtnFlex,
                    isSelected &&
                      styles.pillBtnSelected,
                  ]}
                  onPress={() =>
                    handlePillSelect(
                      'govtSupport',
                      opt
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isSelected &&
                        styles.pillTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 7 */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Are you a woman farmer?
          </Text>

          <View style={styles.pillRow}>
            {['Yes', 'No'].map((opt) => {
              const isSelected =
                answers.womanFarmer === opt;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.pillBtn,
                    styles.pillBtnFlex,
                    isSelected &&
                      styles.pillBtnSelected,
                  ]}
                  onPress={() =>
                    handlePillSelect(
                      'womanFarmer',
                      opt
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isSelected &&
                        styles.pillTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 8 */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>
            Which support do you need most?
          </Text>

          <View style={styles.pillWrap}>
            {[
              'Irrigation',
              'Machinery',
              'Crop Insurance',
              'KCC Credit',
              'Fertilizers',
            ].map((opt) => {
              const isSelected =
                answers.interestArea === opt;

              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.pillBtn,
                    styles.pillBtnAuto,
                    isSelected &&
                      styles.pillBtnSelected,
                  ]}
                  onPress={() =>
                    handlePillSelect(
                      'interestArea',
                      opt
                    )
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pillText,
                      isSelected &&
                        styles.pillTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Submit Action Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>
            Check Eligible Schemes
          </Text>

          <Ionicons
            name="arrow-forward"
            size={18}
            color="#FFFFFF"
          />
        </TouchableOpacity>

>>>>>>> a899fda (Update Farmer AI UI and home screen)
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  header: {
    backgroundColor: Colors.mint[100],
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
<<<<<<< HEAD
  headerTop: {
=======

  headerRow: {
>>>>>>> a899fda (Update Farmer AI UI and home screen)
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingBottom: Spacing.md,
  },
<<<<<<< HEAD
  headerSpacer: {
    width: 24,
=======

  /*
   * APP LOGO
   * Transparent background so there is no coloured
   * placeholder behind your actual icon.
   */
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  avatarLogo: {
    width: 48,
    height: 48,
  },

  headerTextCol: {
    flex: 1,
>>>>>>> a899fda (Update Farmer AI UI and home screen)
  },

  headerTitle: {
<<<<<<< HEAD
    ...Typography.h3,
    color: Colors.text.primary,
    flex: 1,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.gray[200],
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 999,
  },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['4xl'],
  },
  stepCount: {
    ...Typography.bodyLg,
    color: Colors.gray[500],
    marginBottom: Spacing['3xl'],
  },
  stepTitle: {
    ...Typography.h2,
    color: Colors.text.primary,
    marginBottom: Spacing['4xl'],
  },
  optionList: {
    gap: Spacing.md,
  },
  optionCard: {
    minHeight: 96,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing['2xl'],
    paddingVertical: Spacing.xl,
    flexDirection: 'row',
=======
    fontSize: 20,
    fontWeight: '700',
    color: '#1C3123',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#5A7263',
    marginTop: 1,
  },

  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
    gap: Spacing.sm + 2,
  },

  voiceBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: '#D0E7D7',
    shadowColor: '#0F2A1A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  voiceIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
>>>>>>> a899fda (Update Farmer AI UI and home screen)
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.card,
  },
<<<<<<< HEAD
  optionCardSelected: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.mint[50],
  },
  optionText: {
    ...Typography.h5,
    color: Colors.text.primary,
=======

  voiceTextCol: {
>>>>>>> a899fda (Update Farmer AI UI and home screen)
    flex: 1,
    paddingRight: Spacing.lg,
  },
<<<<<<< HEAD
  optionTextSelected: {
    color: Colors.primary[700],
=======

  voiceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C3123',
    marginBottom: 2,
  },

  voiceLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  voiceLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2E7D32',
  },

  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E1EFE6',
    shadowColor: '#0F2A1A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },

  questionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C3123',
    marginBottom: 10,
  },

  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },

  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  pillBtn: {
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#EAF5EE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pillBtnFlex: {
    flex: 1,
  },

  pillBtnHalf: {
    width: '48.5%',
  },

  pillBtnAuto: {
    paddingHorizontal: 14,
  },

  pillBtnSelected: {
    backgroundColor: '#2E7D32',
  },

  pillText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#1B5E20',
    textAlign: 'center',
  },

  pillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  submitBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    shadowColor: '#1B5E20',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
>>>>>>> a899fda (Update Farmer AI UI and home screen)
  },
});