/**
 * WCD Jalgaon — Scheme Details Screen
 * Mirrors wcdjalgaon.com flow:
 * Hero → Tabs: Overview | Eligibility | How to Apply | Documents | FAQs | GR | Contact
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
  Platform,
  Animated,
  LayoutAnimation,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, Spacing, BorderRadius } from '../../theme';
import { getWCDSchemeById, WCDScheme } from '../../services/wcdSchemeService';

type Props = NativeStackScreenProps<any, 'WCDSchemeDetails'>;

type TabKey = 'overview' | 'eligibility' | 'how-to-apply' | 'documents' | 'faqs' | 'gr' | 'contact';

const TABS: { key: TabKey; label: string; labelMr: string; icon: string }[] = [
  { key: 'overview',      label: 'Overview',      labelMr: 'आढावा',       icon: 'information-circle-outline' },
  { key: 'eligibility',   label: 'Eligibility',   labelMr: 'पात्रता',      icon: 'checkmark-circle-outline' },
  { key: 'how-to-apply',  label: 'How to Apply',  labelMr: 'अर्ज कसा करावा', icon: 'clipboard-outline' },
  { key: 'documents',     label: 'Documents',     labelMr: 'कागदपत्रे',    icon: 'document-text-outline' },
  { key: 'faqs',          label: 'FAQs',          labelMr: 'प्रश्नोत्तरे',   icon: 'help-circle-outline' },
  { key: 'gr',            label: 'GR',            labelMr: 'शासन निर्णय',   icon: 'newspaper-outline' },
  { key: 'contact',       label: 'Contact',       labelMr: 'संपर्क',        icon: 'call-outline' },
];

const HERO_GRADIENT: [string, string] = ['#1E5CA5', '#0D3B7A'];
const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Popular: { bg: '#FFF3E0', text: '#E65100' },
  New:     { bg: '#E8F5E9', text: '#1B5E20' },
  Central: { bg: '#E3F2FD', text: '#1565C0' },
  State:   { bg: '#F3E5F5', text: '#6A1B9A' },
};

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({
  question,
  answer,
  index,
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => !prev);
  };

  return (
    <TouchableOpacity style={styles.faqItem} onPress={toggle} activeOpacity={0.85}>
      <View style={styles.faqHeader}>
        <View style={styles.faqNum}>
          <Text style={styles.faqNumText}>{index + 1}</Text>
        </View>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Ionicons
          name={open ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={Colors.gray[400]}
        />
      </View>
      {open && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// ─── Step Item ────────────────────────────────────────────────────────────────
const StepItem: React.FC<{ text: string; index: number; total: number }> = ({ text, index, total }) => (
  <View style={styles.stepRow}>
    <View style={styles.stepLeft}>
      <View style={styles.stepCircle}>
        <Text style={styles.stepNum}>{index + 1}</Text>
      </View>
      {index < total - 1 && <View style={styles.stepLine} />}
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  </View>
);

// ─── GR Item ─────────────────────────────────────────────────────────────────
const GRItem: React.FC<{ title: string; date: string; grNumber: string; url: string }> = ({
  title, date, grNumber, url,
}) => (
  <View style={styles.grItem}>
    <View style={styles.grIconWrap}>
      <Ionicons name="newspaper-outline" size={22} color="#1E5CA5" />
    </View>
    <View style={styles.grBody}>
      <Text style={styles.grTitle}>{title}</Text>
      <Text style={styles.grMeta}>GR No: {grNumber}</Text>
      <Text style={styles.grDate}>Dated: {date}</Text>
      <View style={styles.grActions}>
        <TouchableOpacity
          style={[styles.grBtn, styles.grBtnView]}
          onPress={() => Linking.openURL(url)}
          activeOpacity={0.85}
        >
          <Ionicons name="eye-outline" size={14} color="#1E5CA5" />
          <Text style={[styles.grBtnText, { color: '#1E5CA5' }]}>View GR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.grBtn, styles.grBtnDownload]}
          onPress={() => Linking.openURL(url)}
          activeOpacity={0.85}
        >
          <Ionicons name="download-outline" size={14} color={Colors.white} />
          <Text style={[styles.grBtnText, { color: Colors.white }]}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const WCDSchemeDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const schemeId = route.params?.schemeId || '';
  const scheme = getWCDSchemeById(schemeId);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  if (!scheme) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, alignItems: 'center', justifyContent: 'center' }]}>
        <Ionicons name="alert-circle-outline" size={48} color={Colors.gray[300]} />
        <Text style={{ color: Colors.text.secondary, marginTop: 12, fontSize: 16 }}>Scheme not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#1E5CA5', fontWeight: '700' }}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const badge = scheme.badge ? BADGE_COLORS[scheme.badge] : null;

  const handleApply = () => Linking.openURL(scheme.application_url || 'https://mahadbt.maharashtra.gov.in');
  const handleShare = () =>
    Share.share({ message: `${scheme.title}\n${scheme.description}\n\nWCD जळगाव — wcdjalgaon.com` });
  const handleHelpline = () => Linking.openURL('tel:181');

  const renderTabContent = () => {
    switch (activeTab) {
      // ── Overview ─────────────────────────────────────────────────────────
      case 'overview':
        return (
          <View style={styles.tabContent}>
            <View style={styles.overviewCard}>
              <View style={styles.sectionLabelRow}>
                <View style={styles.sectionDot} />
                <Text style={styles.sectionLabel}>योजनेचा आढावा / Scheme Overview</Text>
              </View>
              <Text style={styles.overviewText}>{scheme.overview}</Text>
            </View>

            {scheme.amount && (
              <View style={styles.benefitCard}>
                <Ionicons name="cash-outline" size={20} color="#1E5CA5" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.benefitLabel}>Financial Benefit / आर्थिक लाभ</Text>
                  <Text style={styles.benefitAmount}>{scheme.amount}</Text>
                </View>
              </View>
            )}

            <View style={styles.quickInfoGrid}>
              <View style={styles.quickInfoItem}>
                <Ionicons name="business-outline" size={18} color="#1E5CA5" />
                <Text style={styles.quickInfoLabel}>Type</Text>
                <Text style={styles.quickInfoValue}>
                  {scheme.badge === 'Central' ? 'Central Scheme' : 'State Scheme'}
                </Text>
              </View>
              <View style={styles.quickInfoItem}>
                <Ionicons name="grid-outline" size={18} color="#1E5CA5" />
                <Text style={styles.quickInfoLabel}>Category</Text>
                <Text style={styles.quickInfoValue}>{scheme.category}</Text>
              </View>
              {scheme.deadline && (
                <View style={styles.quickInfoItem}>
                  <Ionicons name="calendar-outline" size={18} color={Colors.warning} />
                  <Text style={styles.quickInfoLabel}>Deadline</Text>
                  <Text style={[styles.quickInfoValue, { color: Colors.warning }]}>{scheme.deadline}</Text>
                </View>
              )}
            </View>
          </View>
        );

      // ── Eligibility ───────────────────────────────────────────────────────
      case 'eligibility':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionLabelRow}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionLabel}>पात्रता निकष / Eligibility Criteria</Text>
            </View>
            {scheme.eligibility.map((item, idx) => (
              <View key={idx} style={styles.eligibilityItem}>
                <View style={styles.eligibilityIcon}>
                  <Ionicons name="checkmark" size={14} color={Colors.white} />
                </View>
                <Text style={styles.eligibilityText}>{item}</Text>
              </View>
            ))}
            <View style={styles.noteCard}>
              <Ionicons name="information-circle-outline" size={18} color="#1E5CA5" />
              <Text style={styles.noteText}>
                For eligibility verification, visit your nearest Anganwadi Center or CDPO office, Jalgaon.
              </Text>
            </View>
          </View>
        );

      // ── How to Apply ──────────────────────────────────────────────────────
      case 'how-to-apply':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionLabelRow}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionLabel}>अर्ज प्रक्रिया / Application Process</Text>
            </View>
            {scheme.howToApply.map((step, idx) => (
              <StepItem key={idx} text={step} index={idx} total={scheme.howToApply.length} />
            ))}
            {scheme.application_url && (
              <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.88}>
                <LinearGradient
                  colors={['#1E5CA5', '#0D3B7A']}
                  style={styles.applyBtnGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="open-outline" size={18} color={Colors.white} />
                  <Text style={styles.applyBtnText}>Apply Online / ऑनलाईन अर्ज करा</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        );

      // ── Documents ─────────────────────────────────────────────────────────
      case 'documents':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionLabelRow}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionLabel}>आवश्यक कागदपत्रे / Required Documents</Text>
            </View>
            {scheme.documents.map((doc, idx) => (
              <View key={idx} style={styles.docItem}>
                <View style={styles.docIcon}>
                  <Ionicons name="document-outline" size={16} color="#1E5CA5" />
                </View>
                <Text style={styles.docText}>{doc}</Text>
              </View>
            ))}
            <View style={styles.noteCard}>
              <Ionicons name="alert-circle-outline" size={18} color={Colors.warning} />
              <Text style={styles.noteText}>
                Bring original documents along with self-attested photocopies while submitting your application.
              </Text>
            </View>
          </View>
        );

      // ── FAQs ──────────────────────────────────────────────────────────────
      case 'faqs':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionLabelRow}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionLabel}>वारंवार विचारले जाणारे प्रश्न / FAQs</Text>
            </View>
            {scheme.faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} index={idx} />
            ))}
          </View>
        );

      // ── GR ────────────────────────────────────────────────────────────────
      case 'gr':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionLabelRow}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionLabel}>शासन निर्णय / Government Resolutions</Text>
            </View>
            {scheme.gr.length > 0 ? (
              scheme.gr.map((grItem, idx) => (
                <GRItem
                  key={idx}
                  title={grItem.title}
                  date={grItem.date}
                  grNumber={grItem.grNumber}
                  url={grItem.url}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="newspaper-outline" size={40} color={Colors.gray[300]} />
                <Text style={styles.emptyText}>GR documents will be available soon.</Text>
              </View>
            )}
            <View style={styles.noteCard}>
              <Ionicons name="information-circle-outline" size={18} color="#1E5CA5" />
              <Text style={styles.noteText}>
                For the latest GR, visit Maharashtra Government's official portal: gr.maharashtra.gov.in
              </Text>
            </View>
          </View>
        );

      // ── Contact ───────────────────────────────────────────────────────────
      case 'contact':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sectionLabelRow}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionLabel}>संपर्क माहिती / Contact Information</Text>
            </View>

            <View style={styles.contactCard}>
              <View style={styles.contactRow}>
                <View style={styles.contactIconWrap}>
                  <Ionicons name="business-outline" size={20} color="#1E5CA5" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Office / कार्यालय</Text>
                  <Text style={styles.contactValue}>{scheme.contact.office}</Text>
                </View>
              </View>

              <View style={styles.contactDivider} />

              <View style={styles.contactRow}>
                <View style={styles.contactIconWrap}>
                  <Ionicons name="location-outline" size={20} color="#1E5CA5" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Address / पत्ता</Text>
                  <Text style={styles.contactValue}>{scheme.contact.address}</Text>
                </View>
              </View>

              <View style={styles.contactDivider} />

              <TouchableOpacity
                style={styles.contactRow}
                onPress={() => Linking.openURL(`tel:${scheme.contact.phone.split('|')[0].trim()}`)}
                activeOpacity={0.85}
              >
                <View style={styles.contactIconWrap}>
                  <Ionicons name="call-outline" size={20} color="#1E5CA5" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Phone / दूरध्वनी</Text>
                  <Text style={[styles.contactValue, styles.contactLink]}>{scheme.contact.phone}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.gray[400]} />
              </TouchableOpacity>

              <View style={styles.contactDivider} />

              <TouchableOpacity
                style={styles.contactRow}
                onPress={() => Linking.openURL(`mailto:${scheme.contact.email}`)}
                activeOpacity={0.85}
              >
                <View style={styles.contactIconWrap}>
                  <Ionicons name="mail-outline" size={20} color="#1E5CA5" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Email / ई-मेल</Text>
                  <Text style={[styles.contactValue, styles.contactLink]}>{scheme.contact.email}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.gray[400]} />
              </TouchableOpacity>

              <View style={styles.contactDivider} />

              <View style={styles.contactRow}>
                <View style={styles.contactIconWrap}>
                  <Ionicons name="time-outline" size={20} color="#1E5CA5" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Office Timings / वेळ</Text>
                  <Text style={styles.contactValue}>{scheme.contact.timings}</Text>
                </View>
              </View>

              {scheme.contact.website && (
                <>
                  <View style={styles.contactDivider} />
                  <TouchableOpacity
                    style={styles.contactRow}
                    onPress={() => Linking.openURL(scheme.contact.website!)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.contactIconWrap}>
                      <Ionicons name="globe-outline" size={20} color="#1E5CA5" />
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactLabel}>Website</Text>
                      <Text style={[styles.contactValue, styles.contactLink]}>{scheme.contact.website}</Text>
                    </View>
                    <Ionicons name="open-outline" size={16} color={Colors.gray[400]} />
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Helpline quick access */}
            <TouchableOpacity style={styles.helplineCard} onPress={handleHelpline} activeOpacity={0.88}>
              <LinearGradient
                colors={['#C62828', '#B71C1C']}
                style={styles.helplineGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.helplineLeft}>
                  <Ionicons name="call" size={22} color={Colors.white} />
                  <View>
                    <Text style={styles.helplineTitle}>महिला हेल्पलाईन</Text>
                    <Text style={styles.helplineSubtitle}>Women Helpline — 24×7 Free</Text>
                  </View>
                </View>
                <Text style={styles.helplineNumber}>181</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#F5F7FA' }]}>
      {/* ── Hero Header ─────────────────────────────────────────────────── */}
      <LinearGradient
        colors={HERO_GRADIENT}
        style={[styles.hero, { paddingTop: insets.top + 8 }]}
      >
        {/* Nav Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.navTitle} numberOfLines={1}>WCD जळगाव</Text>
          <TouchableOpacity style={styles.navBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Scheme Identity */}
        <View style={styles.heroBody}>
          <View style={styles.heroIconWrap}>
            <Ionicons name={(scheme.categoryIcon || 'document-outline') as any} size={32} color={Colors.white} />
          </View>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroMr}>{scheme.titleMarathi}</Text>
            <Text style={styles.heroEn}>{scheme.title}</Text>
            <View style={styles.heroBadgeRow}>
              <View style={styles.heroCategoryChip}>
                <Text style={styles.heroCategoryText}>{scheme.category}</Text>
              </View>
              {badge && (
                <View style={[styles.heroBadgeChip, { backgroundColor: badge.bg }]}>
                  <Text style={[styles.heroBadgeChipText, { color: badge.text }]}>{scheme.badge}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Amount strip */}
        {scheme.amount && (
          <View style={styles.amountStrip}>
            <Ionicons name="cash-outline" size={16} color="#FFD54F" />
            <Text style={styles.amountStripText}>लाभ: {scheme.amount}</Text>
          </View>
        )}
      </LinearGradient>

      {/* ── Action Bar ────────────────────────────────────────────────────── */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionBarBtn} onPress={handleApply} activeOpacity={0.88}>
          <Ionicons name="create-outline" size={16} color={Colors.white} />
          <Text style={styles.actionBarBtnText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBarBtn, styles.actionBarBtnOutline]}
          onPress={() => setActiveTab('gr')}
          activeOpacity={0.88}
        >
          <Ionicons name="newspaper-outline" size={16} color="#1E5CA5" />
          <Text style={[styles.actionBarBtnText, { color: '#1E5CA5' }]}>View GR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBarBtn, styles.actionBarBtnOutline]}
          onPress={() => setActiveTab('contact')}
          activeOpacity={0.88}
        >
          <Ionicons name="call-outline" size={16} color="#1E5CA5" />
          <Text style={[styles.actionBarBtnText, { color: '#1E5CA5' }]}>Contact</Text>
        </TouchableOpacity>
      </View>

      {/* ── Tabs + Content ─────────────────────────────────────────────────── */}
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        {/* Sticky Tab Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBar}
          contentContainerStyle={styles.tabBarContent}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={14}
                  color={isActive ? '#1E5CA5' : Colors.gray[400]}
                />
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
                {isActive && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tab Content */}
        {renderTabContent()}

        <View style={{ height: insets.bottom + 32 }} />
      </ScrollView>
    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },

  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 20,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  heroBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  heroIconWrap: {
    width: 62,
    height: 62,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextWrap: { flex: 1 },
  heroMr: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 3,
    lineHeight: 22,
  },
  heroEn: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.78)',
    lineHeight: 16,
    marginBottom: 8,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  heroCategoryChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  heroCategoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
  },
  heroBadgeChip: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  heroBadgeChipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  amountStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  amountStripText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFD54F',
  },

  // ── Action Bar ────────────────────────────────────────────────────────────
  actionBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionBarBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#1E5CA5',
  },
  actionBarBtnOutline: {
    backgroundColor: '#EBF2FB',
  },
  actionBarBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
  },

  // ── Tab Bar ───────────────────────────────────────────────────────────────
  tabBar: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tabBarContent: {
    paddingHorizontal: Spacing.md,
    gap: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    position: 'relative',
  },
  tabActive: {},
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray[500],
  },
  tabTextActive: {
    color: '#1E5CA5',
    fontWeight: '700',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    right: 12,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#1E5CA5',
  },

  // ── Tab Content ───────────────────────────────────────────────────────────
  tabContent: {
    padding: Spacing.lg,
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionDot: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#1E5CA5',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.primary,
  },

  // Overview
  overviewCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: Spacing.md,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  overviewText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#EBF2FB',
    borderRadius: 14,
    padding: Spacing.md,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#1E5CA5',
  },
  benefitLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E5CA5',
    marginBottom: 2,
  },
  benefitAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E5CA5',
  },
  quickInfoGrid: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  quickInfoItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickInfoLabel: {
    fontSize: 11,
    color: Colors.text.tertiary,
    fontWeight: '600',
  },
  quickInfoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text.primary,
  },

  // Eligibility
  eligibilityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eligibilityIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1E5CA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  eligibilityText: {
    flex: 1,
    fontSize: 13.5,
    color: Colors.text.secondary,
    lineHeight: 20,
  },

  // Steps
  stepRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1E5CA5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#BBDEFB',
    marginVertical: 4,
    marginBottom: 4,
  },
  stepContent: {
    flex: 1,
    paddingBottom: 16,
    paddingTop: 4,
  },
  stepText: {
    fontSize: 13.5,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  applyBtn: {
    marginTop: 16,
    borderRadius: 14,
    overflow: 'hidden',
  },
  applyBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  applyBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
  },

  // Documents
  docItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  docIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EBF2FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  docText: {
    flex: 1,
    fontSize: 13.5,
    color: Colors.text.secondary,
    lineHeight: 20,
    paddingTop: 6,
  },

  // FAQs
  faqItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
  },
  faqNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EBF2FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  faqNumText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E5CA5',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 20,
  },
  faqAnswer: {
    backgroundColor: '#F5F7FA',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: 14,
    paddingTop: 12,
  },
  faqAnswerText: {
    fontSize: 13.5,
    color: Colors.text.secondary,
    lineHeight: 21,
  },

  // GR
  grItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  grIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EBF2FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grBody: { flex: 1 },
  grTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 18,
    marginBottom: 4,
  },
  grMeta: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  grDate: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginBottom: 10,
  },
  grActions: {
    flexDirection: 'row',
    gap: 8,
  },
  grBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  grBtnView: {
    backgroundColor: '#EBF2FB',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  grBtnDownload: {
    backgroundColor: '#1E5CA5',
  },
  grBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Contact
  contactCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
  },
  contactIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EBF2FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: { flex: 1 },
  contactLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.text.primary,
    lineHeight: 20,
  },
  contactLink: {
    color: '#1E5CA5',
    textDecorationLine: 'underline',
  },
  contactDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 14,
  },
  helplineCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  helplineGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  helplineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  helplineTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.white,
  },
  helplineSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.78)',
    marginTop: 1,
  },
  helplineNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 2,
  },

  // Note Card
  noteCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
  },
  noteText: {
    flex: 1,
    fontSize: 12.5,
    color: Colors.text.secondary,
    lineHeight: 19,
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginTop: 10,
  },
});
