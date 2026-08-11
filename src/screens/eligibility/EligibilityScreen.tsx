/**
 * Eligibility Form Screen — Compact, well-aligned 2-column & pill layout for farmer eligibility
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { EligibilityScreenProps } from '../../navigation/types';
import { EligibilityResponse, EligibilityResult, Scheme } from '../../types/api.types';
import { useLanguageContext } from '../../contexts/LanguageContext';

type AnswerMap = Record<string, string>;

const createScheme = (scheme: Scheme): Scheme => scheme;

const buildResults = (answers: AnswerMap): EligibilityResponse => {
  const results: EligibilityResult[] = [];

  const stScheme = createScheme({
    id: 'tribal-sub-plan-farmer-support',
    title: 'Tribal Sub-Plan Farmer Support Scheme',
    description: 'Enhanced input & mechanization subsidy for tribal farmers.',
    category: 'Tribal Farmer Schemes',
    type: 'Central',
  });

  const creditScheme = createScheme({
    id: 'kisan-credit-card',
    title: 'Kisan Credit Card (KCC)',
    description: 'Short-term credit at 4% interest (with subvention) for crop needs.',
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

  if (answers.interestArea === 'KCC Credit' || answers.landOwnership === 'Yes') {
    results.push({
      scheme: creditScheme,
      is_eligible: true,
      match_percentage: answers.interestArea === 'KCC Credit' ? 94 : 82,
      reasons: [
        answers.interestArea === 'KCC Credit'
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
        description: 'Targeted support for women-led farms and collectives.',
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

export const EligibilityScreen: React.FC<EligibilityScreenProps<'EligibilityForm'>> = ({
  navigation,
}) => {
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
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    navigation.navigate('EligibilityResult', { results: buildResults(answers) });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.xs }]}>
        <View style={styles.headerRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{selectedLanguage?.name?.[0] || 'म'}</Text>
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.headerTitle}>Check eligibility</Text>
            <Text style={styles.headerSubtitle}>Share a few farm details and find matches</Text>
          </View>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('ProfileTab' as any)}
          >
            <Ionicons name="globe-outline" size={18} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Notifications' as any)}
          >
            <Ionicons name="notifications-outline" size={18} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Voice Assistant Banner Card */}
        <TouchableOpacity
          style={styles.voiceBanner}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('VoiceAssistant' as any)}
        >
          <View style={styles.voiceIconBadge}>
            <Ionicons name="sparkles" size={20} color="#1B5E20" />
          </View>
          <View style={styles.voiceTextCol}>
            <Text style={styles.voiceTitle}>Prefer to talk? Ask Mitra by voice.</Text>
            <View style={styles.voiceLinkRow}>
              <Ionicons name="mic" size={15} color="#2E7D32" />
              <Text style={styles.voiceLinkText}>Talk to Yojna Mitra →</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Question 1: Land Ownership */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Do you own agricultural land?</Text>
          <View style={styles.pillRow}>
            {['Yes', 'No'].map((opt) => {
              const isSelected = answers.landOwnership === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pillBtn, styles.pillBtnFlex, isSelected && styles.pillBtnSelected]}
                  onPress={() => handlePillSelect('landOwnership', opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 2: Land Size */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Approximate land holding size?</Text>
          <View style={styles.pillGrid}>
            {['<2 acres', '2-5 acres', '5-10 acres', '>10 acres'].map((opt) => {
              const isSelected = answers.landSize === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pillBtn, styles.pillBtnHalf, isSelected && styles.pillBtnSelected]}
                  onPress={() => handlePillSelect('landSize', opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 3: Primary Farming Activity */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Primary farming activity?</Text>
          <View style={styles.pillGrid}>
            {['Field Crops', 'Horticulture', 'Dairy & Livestock', 'Fisheries'].map((opt) => {
              const isSelected = answers.farmingActivity === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pillBtn, styles.pillBtnHalf, isSelected && styles.pillBtnSelected]}
                  onPress={() => handlePillSelect('farmingActivity', opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 4: Annual Household Income */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Annual farmer household income?</Text>
          <View style={styles.pillGrid}>
            {['< ₹1.5 Lakh', '₹1.5L - ₹3 Lakh', '₹3L - ₹5 Lakh', '> ₹5 Lakh'].map((opt) => {
              const isSelected = answers.annualIncome === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pillBtn, styles.pillBtnHalf, isSelected && styles.pillBtnSelected]}
                  onPress={() => handlePillSelect('annualIncome', opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 5: Social Category */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Your social category?</Text>
          <View style={styles.pillRow}>
            {['General', 'SC', 'ST', 'OBC'].map((opt) => {
              const isSelected = answers.socialCategory === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pillBtn, styles.pillBtnFlex, isSelected && styles.pillBtnSelected]}
                  onPress={() => handlePillSelect('socialCategory', opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 6: PM-KISAN Support */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Do you currently receive PM-KISAN support?</Text>
          <View style={styles.pillRow}>
            {['Yes', 'No'].map((opt) => {
              const isSelected = answers.govtSupport === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pillBtn, styles.pillBtnFlex, isSelected && styles.pillBtnSelected]}
                  onPress={() => handlePillSelect('govtSupport', opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 7: Woman Farmer */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Are you a woman farmer?</Text>
          <View style={styles.pillRow}>
            {['Yes', 'No'].map((opt) => {
              const isSelected = answers.womanFarmer === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pillBtn, styles.pillBtnFlex, isSelected && styles.pillBtnSelected]}
                  onPress={() => handlePillSelect('womanFarmer', opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question 8: Support Needed */}
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Which support do you need most?</Text>
          <View style={styles.pillWrap}>
            {['Irrigation', 'Machinery', 'Crop Insurance', 'KCC Credit', 'Fertilizers'].map((opt) => {
              const isSelected = answers.interestArea === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pillBtn, styles.pillBtnAuto, isSelected && styles.pillBtnSelected]}
                  onPress={() => handlePillSelect('interestArea', opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
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
          <Text style={styles.submitBtnText}>Check Eligible Schemes</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F9F6',
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xs,
    backgroundColor: '#F4F9F6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B5E20',
  },
  headerTextCol: {
    flex: 1,
  },
  headerTitle: {
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
    shadowOffset: { width: 0, height: 2 },
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
    alignItems: 'center',
  },
  voiceTextCol: {
    flex: 1,
  },
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
