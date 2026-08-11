/**
 * Scheme Details Screen — reference-style hero and action layout
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Share, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';
import { getCategoryIcon } from '../../utils/category';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { ErrorState } from '../../components/common/ErrorState';
import { useScheme } from '../../hooks/useSchemes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'SchemeDetails'>;

const ACCENT = Colors.primary[600];
const ACCENT_LIGHT = Colors.mint[100];
const PAGE_BG = Colors.mint[50];

const ELIGIBILITY_POINTS = [
  'You must be a resident of Maharashtra.',
  'Your age must be between 21 and 65 years.',
  'Your annual family income must be less than ₹2.5 lakh.',
  'You must have an Aadhaar-linked bank account.',
];

const DOCUMENT_ITEMS = [
  'Aadhaar Card',
  'Ration Card',
  'Residence Certificate',
  'Bank Passbook',
  'Income Certificate',
  'Passport Photo',
];

const APPLY_STEPS = [
  'Visit the official scheme portal or contact the local Gram Panchayat/Municipal Corporation office.',
  'Fill out the online application form and upload the required documents.',
];

const FAQ_ITEMS = [
  {
    question: 'Who can apply?',
    answer: 'Eligible residents of Maharashtra who satisfy the age, income, and account requirements can apply.',
  },
  {
    question: 'Where can I get help?',
    answer: 'You can contact the local office or use the scheme portal support option for assistance.',
  },
];

const CONTACT_ITEMS = [
  'Local Gram Panchayat / Municipal Corporation Office',
  'Official Scheme Portal Support',
];

export const SchemeDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const schemeId = route.params?.schemeId || '';
  const schemeQuery = useScheme(schemeId);

  const scheme = (schemeQuery.data as any)?.data;

  if (schemeQuery.isLoading) return <SkeletonList count={4} />;
  if (schemeQuery.isError) {
    return <ErrorState onRetry={() => schemeQuery.refetch()} />;
  }
  if (!scheme) return <ErrorState title="Scheme not found" />;

  const openUrl = async () => {
    const targetUrl = scheme.application_url || 'https://mahadbt.maharashtra.gov.in';
    await Linking.openURL(targetUrl);
  };

  const shareScheme = async () => {
    await Share.share({ message: `${scheme.title}\n${scheme.description}` });
  };

  const openEligibility = () => {
    const parentNavigation = navigation.getParent() as any;
    parentNavigation?.navigate('EligibilityTab', { screen: 'EligibilityForm' });
  };

  const openVoiceAssistant = () => {
    const parentNavigation = navigation.getParent() as any;
    parentNavigation?.navigate('HomeTab', { screen: 'VoiceAssistant' });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: PAGE_BG }]}> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.navBar}>
          <View style={styles.navBarLeft}>
            <View style={styles.navLogo}>
              <Ionicons name="leaf-outline" size={20} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.navTitle}>Farmer AI</Text>
              <Text style={styles.navSubtitle}>VOICE ASSISTANT</Text>
            </View>
          </View>

          <View style={styles.navBarActions}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navIconButton}>
              <Ionicons name="arrow-back" size={20} color={Colors.gray[700]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={shareScheme} style={styles.navIconButton}>
              <Ionicons name="share-social-outline" size={20} color={Colors.gray[700]} />
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient
          colors={[Colors.primary[700], Colors.primary[500]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroContent}>
            <View style={[styles.heroIcon, { backgroundColor: Colors.white }]}> 
              <Ionicons name={getCategoryIcon(scheme.category) as any} size={36} color={ACCENT} />
            </View>

            <View style={styles.heroTextWrap}>
              <Text style={styles.heroTitle}>{scheme.title}</Text>
              <Text style={styles.heroSubtitle}>{scheme.description}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.detailsCard}>
          {scheme.amount && (
            <View style={styles.amountBlock}>
              <Text style={styles.amountLabel}>BENEFIT</Text>
              <Text style={styles.amountText}>{scheme.amount}</Text>
            </View>
          )}

          <TouchableOpacity onPress={openVoiceAssistant} activeOpacity={0.86} style={styles.primaryActionWrapper}>
            <LinearGradient
              colors={[Colors.primary[700], Colors.primary[500]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryAction}
            >
              <Ionicons name="mic-outline" size={20} color={Colors.white} />
              <Text style={styles.primaryActionText}>Ask Yojna Mitra</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.filledAction} onPress={openUrl} activeOpacity={0.86}>
              <View>
                <Text style={styles.filledActionText}>Apply Online</Text>
              </View>
              <Ionicons name="open-outline" size={20} color={Colors.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.outlineAction} onPress={openEligibility} activeOpacity={0.86}>
              <Ionicons name="checkbox-outline" size={20} color={ACCENT} />
              <Text style={styles.outlineActionText}>Eligibility</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.viewAction} onPress={openUrl} activeOpacity={0.86}>
            <Ionicons name="document-text-outline" size={20} color={ACCENT} />
            <Text style={styles.viewActionText}>View GR</Text>
            <Ionicons name="open-outline" size={18} color={Colors.text.secondary} />
          </TouchableOpacity>

          <View style={styles.guideSection}>
            <Text style={styles.guideTitle}>Scheme Details</Text>
            <Text style={styles.guideSubtitle}>All the important information listed below, one section after another.</Text>

            <View style={styles.guideSectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.guideIconWrap}>
                  <Ionicons name="checkmark-circle-outline" size={18} color={ACCENT} />
                </View>
                <Text style={styles.sectionHeading}>Eligibility Criteria</Text>
              </View>
              <View style={styles.pointList}>
                {ELIGIBILITY_POINTS.map((point, index) => (
                  <View key={index} style={styles.pointRow}>
                    <View style={styles.pointBullet}>
                      <Ionicons name="checkmark" size={14} color={Colors.primary[700]} />
                    </View>
                    <Text style={styles.pointText}>{point}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.guideSectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.guideIconWrap}>
                  <Ionicons name="document-text-outline" size={18} color={ACCENT} />
                </View>
                <Text style={styles.sectionHeading}>Documents</Text>
              </View>
              <View style={styles.chipGrid}>
                {DOCUMENT_ITEMS.map((item) => (
                  <View key={item} style={styles.docChip}>
                    <Text style={styles.docChipText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.guideSectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.guideIconWrap}>
                  <Ionicons name="create-outline" size={18} color={ACCENT} />
                </View>
                <Text style={styles.sectionHeading}>How to Apply</Text>
              </View>
              <View style={styles.stepList}>
                {APPLY_STEPS.map((step, index) => (
                  <View key={index} style={styles.stepRow}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.guideSectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.guideIconWrap}>
                  <Ionicons name="help-circle-outline" size={18} color={ACCENT} />
                </View>
                <Text style={styles.sectionHeading}>FAQs</Text>
              </View>
              <View style={styles.faqList}>
                {FAQ_ITEMS.map((faq) => (
                  <View key={faq.question} style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.guideSectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.guideIconWrap}>
                  <Ionicons name="download-outline" size={18} color={ACCENT} />
                </View>
                <Text style={styles.sectionHeading}>GR (View/Download)</Text>
              </View>
              <TouchableOpacity style={styles.grRow} onPress={openUrl} activeOpacity={0.86}>
                <Ionicons name="document-text-outline" size={18} color={ACCENT} />
                <Text style={styles.grText}>View the GR or download it from the official source</Text>
                <Ionicons name="open-outline" size={18} color={Colors.gray[400]} />
              </TouchableOpacity>
            </View>

            <View style={styles.guideSectionBlock}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.guideIconWrap}>
                  <Ionicons name="call-outline" size={18} color={ACCENT} />
                </View>
                <Text style={styles.sectionHeading}>Contact</Text>
              </View>
              <View style={styles.contactList}>
                {CONTACT_ITEMS.map((item) => (
                  <View key={item} style={styles.contactRow}>
                    <View style={styles.contactDot} />
                    <Text style={styles.contactText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>



          {scheme.documents_required && scheme.documents_required.length > 0 && (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Documents Required</Text>
              {scheme.documents_required.map((doc: string, idx: number) => (
                <View key={idx} style={styles.docItem}>
                  <Ionicons name="document-outline" size={16} color={ACCENT} />
                  <Text style={styles.docText}>{doc}</Text>
                </View>
              ))}
            </View>
          )}

          {scheme.deadline && (
            <View style={styles.infoSection}>
              <Text style={styles.infoTitle}>Deadline</Text>
              <View style={styles.deadlineRow}>
                <Ionicons name="calendar-outline" size={16} color={Colors.warning} />
                <Text style={styles.deadlineText}>{scheme.deadline}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing.md }]}>
        <TouchableOpacity style={styles.bottomOutline} onPress={openVoiceAssistant} activeOpacity={0.86}>
          <Ionicons name="mic-outline" size={20} color={ACCENT} />
          <Text style={styles.bottomOutlineText}>Ask Yojna Mitra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomFilled} onPress={openUrl} activeOpacity={0.86}>
          <Text style={styles.bottomFilledText}>Apply Online</Text>
          <Ionicons name="open-outline" size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.mint[100],
  },
  navBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  navLogo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 24,
  },
  navSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.gray[400],
    letterSpacing: 1.2,
    marginTop: 1,
  },
  navBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  navIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  hero: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing['5xl'],
    minHeight: 220,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
    marginTop: Spacing.sm,
  },
  heroIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextWrap: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    color: Colors.white,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
  heroSubtitle: {
    marginTop: Spacing.md,
    fontSize: 11,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  detailsCard: {
    backgroundColor: Colors.white,
    marginTop: -24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.lg,
  },
  amountBlock: {
    marginBottom: Spacing.lg,
  },
  amountLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray[500],
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  amountText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
    color: Colors.primary[700],
  },
  primaryActionWrapper: {
    marginBottom: Spacing.md,
  },
  primaryAction: {
    height: 54,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
  },
  buttonGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  filledAction: {
    flex: 1,
    minHeight: 62,
    borderRadius: 24,
    backgroundColor: Colors.primary[200],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filledActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary[800],
  },
  outlineAction: {
    flex: 1,
    minHeight: 62,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary[400],
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  outlineActionText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary[700],
  },
  viewAction: {
    minHeight: 52,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
  },
  viewActionText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  guideSection: {
    marginBottom: Spacing.lg,
  },
  guideTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  guideSubtitle: {
    ...Typography.bodySm,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
  guideSectionBlock: {
    marginBottom: Spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text.primary,
    letterSpacing: 0.5,
  },
  guideIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: ACCENT_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  pointList: {
    gap: Spacing.md,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  pointBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.primary[700],
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    backgroundColor: Colors.white,
  },
  pointText: {
    flex: 1,
    ...Typography.body,
    color: Colors.text.primary,
    lineHeight: 26,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  docChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  docChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  stepList: {
    gap: Spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  stepNumber: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F7A54A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
  },
  stepText: {
    flex: 1,
    ...Typography.body,
    color: Colors.text.primary,
    lineHeight: 26,
  },
  faqList: {
    gap: Spacing.md,
  },
  faqItem: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    padding: Spacing.md,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text.primary,
    marginBottom: 6,
  },
  faqAnswer: {
    ...Typography.bodySm,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  grRow: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  grText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  contactList: {
    gap: Spacing.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  contactDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ACCENT,
  },
  contactText: {
    flex: 1,
    ...Typography.body,
    color: Colors.text.primary,
  },
  infoSection: {
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    marginBottom: Spacing.lg,
  },
  infoTitle: {
    ...Typography.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  infoText: {
    ...Typography.body,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  docText: {
    ...Typography.body,
    color: Colors.text.secondary,
    flex: 1,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  deadlineText: {
    ...Typography.label,
    color: Colors.warning,
  },
  bottomBar: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
    bottom: 0,
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: PAGE_BG,
    paddingTop: Spacing.md,
  },
  bottomOutline: {
    flex: 1,
    minHeight: 72,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary[300],
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  bottomOutlineText: {
    fontSize: 16,
    fontWeight: '800',
    color: ACCENT,
  },
  bottomFilled: {
    flex: 1,
    minHeight: 72,
    borderRadius: 24,
    backgroundColor: Colors.primary[700],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  bottomFilledText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
  },
});
