/**
 * Scheme Details Screen — Krishi Mitra Theme & Design Language
 * Displays 8 Official Sections in Exact Order:
 * 1. Overview
 * 2. Benefits
 * 3. Eligibility
 * 4. How to Apply
 * 5. Documents
 * 6. FAQs
 * 7. GR - View / Download
 * 8. Contact
 * + Bottom Official Source Button
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { useScheme } from '../../hooks/useSchemes';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '../../components/layout/Header';
import { getLocalizedScheme } from '../../utils/schemeLocalization';
import { schemeService, MOCK_SCHEMES } from '../../services/schemeService';

type Props = NativeStackScreenProps<any, 'SchemeDetails'>;

const PRIMARY_GREEN = '#187A3D';
const DARK_GREEN = '#0F5229';
const LIGHT_GREEN_BG = '#EAF6EE';
const BORDER_GREEN = '#D0E6D6';

export const SchemeDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [rawSchemeData, setRawSchemeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getSchemeIdFromRoute = (): string => {
    let extracted = '';
    if (route?.params?.schemeId) extracted = route.params.schemeId;
    else if (route?.params?.id) extracted = route.params.id;

    if (typeof window !== 'undefined' && window.location) {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const fromSearch = searchParams.get('schemeId') || searchParams.get('id');
        if (fromSearch) extracted = fromSearch;

        if (!extracted) {
          const href = window.location.href || '';
          const match = href.match(/(?:schemeId|id)=([^&/#?]+)/i);
          if (match && match[1]) {
            extracted = decodeURIComponent(match[1]);
          }
        }
      } catch {
        // Ignore
      }
    }
    return extracted;
  };

  const schemeId = getSchemeIdFromRoute();

  const fetchSchemeDetails = useCallback(async () => {
    if (!schemeId) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const res = await schemeService.getSchemeById(schemeId);
      if (res && res.data) {
        setRawSchemeData(res.data);
      } else {
        throw new Error('Scheme data empty');
      }
    } catch (err: any) {
      console.log('Fetching scheme via service failed, trying local MOCK_SCHEMES fallback for ID:', schemeId);
      const clean = schemeId.toLowerCase().trim();
      const fallback = MOCK_SCHEMES.find(
        (s) => s.id === schemeId || s.id.toLowerCase() === clean || clean.includes(s.id.toLowerCase())
      );
      if (fallback) {
        setRawSchemeData(fallback);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, [schemeId]);

  useEffect(() => {
    fetchSchemeDetails();
  }, [fetchSchemeDetails]);

  const scheme = rawSchemeData
    ? getLocalizedScheme(rawSchemeData, selectedLanguage.code)
    : null;

  // Background and Card colors
  const cardBg = themeColors.card;
  const textColor = themeColors.textPrimary;
  const subTextColor = themeColors.textSecondary;
  const borderColor = themeColors.border;
  const greenBg = isDarkMode ? '#064E3B' : LIGHT_GREEN_BG;
  const greenText = isDarkMode ? '#6EE7B7' : PRIMARY_GREEN;

  const handleOpenUrl = async (url?: string) => {
    if (!url) return;
    try {
      await Linking.openURL(url);
    } catch {
      // Ignore open URL errors gracefully
    }
  };

  // ── Loading State ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
        <Header
          title={t('schemeDetailsTitle') || 'Scheme Details'}
          showLanguageSelector
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={PRIMARY_GREEN} />
          <Text style={[styles.loadingText, { color: subTextColor }]}>
            {t('loading') || 'Loading scheme details...'}
          </Text>
        </View>
      </View>
    );
  }

  // ── Error / Empty State ──────────────────────────────────────────────────────
  if (error || !scheme) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
        <Header
          title={t('schemeDetailsTitle') || 'Scheme Details'}
          showLanguageSelector
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={56} color="#EF4444" />
          <Text style={[styles.errorTitle, { color: textColor }]}>
            {t('errorLoadScheme')}
          </Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => fetchSchemeDetails()}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh-outline" size={18} color="#FFFFFF" />
            <Text style={styles.retryBtnText}>{t('retry') || 'Retry'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Extract Core 4 Standardized Scheme Fields ──────────────────────────────────
  // 1. Overview
  const rawOverview = scheme.overview || scheme.description || scheme.about || '';
  const overviewParagraphs: string[] = Array.isArray(rawOverview)
    ? rawOverview
    : (typeof rawOverview === 'string' && rawOverview.trim() ? [rawOverview] : []);

  // 2. Benefits
  const rawBenefits = scheme.benefit || scheme.benefits;
  let benefitsList: any[] = [];
  if (Array.isArray(rawBenefits)) {
    benefitsList = rawBenefits;
  } else if (typeof rawBenefits === 'string' && rawBenefits.trim()) {
    benefitsList = rawBenefits.split(';').map(s => s.trim()).filter(Boolean);
  }

  // 3. Eligibility
  const rawEligibility = scheme.eligibility;
  let eligibilityList: string[] = [];
  if (Array.isArray(rawEligibility)) {
    eligibilityList = rawEligibility.map((e: any) => typeof e === 'string' ? e : (e.text || e.title || String(e)));
  } else if (scheme.eligibility_criteria) {
    eligibilityList = String(scheme.eligibility_criteria).split(';').map((s: string) => s.trim()).filter(Boolean);
  }

  // 4. Required Documents
  const rawDocs = scheme.requiredDocuments || scheme.documents || scheme.documents_required;
  let documentsList: any[] = Array.isArray(rawDocs) ? rawDocs : [];

  // 5. How to Apply
  const howToApplyObj = scheme.howToApply || {};
  const howToApplyDesc = typeof howToApplyObj === 'string' ? howToApplyObj : (howToApplyObj.description || '');
  const howToApplySteps: string[] = Array.isArray(howToApplyObj.steps) ? howToApplyObj.steps : [];
  const officialApplyUrl = howToApplyObj.officialUrl || scheme.application_url || scheme.official_website;

  // FAQs
  const faqsList: { question: string; answer: string }[] = Array.isArray(scheme.faqs) ? scheme.faqs : [];

  // GR
  const grObj = scheme.gr || {};
  const grViewUrl = grObj.viewUrl || grObj.url || grObj.downloadUrl;
  const grDownloadUrl = grObj.downloadUrl || grObj.viewUrl || grObj.url;
  const hasGRUrl = Boolean(grViewUrl || grDownloadUrl);
  const grTitle = grObj.title || t('grSectionTitle') || 'Government Resolution (GR)';

  // Contact
  const contactObj = scheme.contact || {};
  const contactPhone = contactObj.phone || contactObj.helpline;
  const contactEmail = contactObj.email;
  const contactAddress = contactObj.address || contactObj.office;

  // Source URL
  const sourceObj = scheme.source || {};
  const sourceName = sourceObj.name || 'Maharashtra Government – MahaDBT';
  const sourceUrl = sourceObj.url || officialApplyUrl || 'https://mahadbt2.maharashtra.gov.in/farmer';

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingTop: insets.top }]}>
      <Header
        title={t('schemeDetailsTitle') || 'Scheme Details'}
        showLanguageSelector
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Top Hero Banner ── */}
        <View style={[styles.heroCard, { backgroundColor: greenBg, borderColor: borderColor }]}>
          <View style={styles.heroHeaderRow}>
            <View style={[styles.heroIconCircle, { backgroundColor: cardBg }]}>
              <Ionicons name="leaf" size={24} color={greenText} />
            </View>
            <View style={[styles.typeBadge, { backgroundColor: PRIMARY_GREEN }]}>
              <Text style={styles.typeBadgeText}>
                {scheme.type === 'Central' ? (t('centralType') || 'CENTRAL') : (t('stateType') || 'STATE')}
              </Text>
            </View>
          </View>
          <Text style={[styles.heroTitle, { color: textColor }]}>
            {scheme.title}
          </Text>
          {scheme.department ? (
            <Text style={[styles.heroDept, { color: subTextColor }]}>
              {scheme.department}
            </Text>
          ) : null}
        </View>

        {/* ── 1. Overview (includes Overview & Benefits/Grant details) ── */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionHeaderIcon, { backgroundColor: greenBg }]}>
              <Ionicons name="information-circle" size={20} color={greenText} />
            </View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('overviewTab')}
            </Text>
          </View>
          {overviewParagraphs.length > 0 ? (
            overviewParagraphs.map((para, idx) => (
              <Text key={idx} style={[styles.bodyText, { color: textColor, marginBottom: idx === overviewParagraphs.length - 1 ? 0 : 8, lineHeight: 22 }]}>
                {para}
              </Text>
            ))
          ) : (
            <Text style={[styles.bodyText, { color: textColor }]}>
              {t('schemeObjective')}
            </Text>
          )}

          {/* Benefits / Subsidies Sub-Block inside Overview */}
          {benefitsList.length > 0 ? (
            <View style={{ marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: borderColor }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: PRIMARY_GREEN, marginBottom: 8 }}>
                {t('benefitsSubsidyHeader')}
              </Text>
              <View style={styles.listWrap}>
                {benefitsList.map((item, index) => {
                  const itemStr = typeof item === 'string' ? item : (item.text || item.title || JSON.stringify(item));
                  const isHeaderLine = itemStr.endsWith(':') || itemStr.startsWith('###') || itemStr.startsWith('**');
                  const isTableLine = itemStr.startsWith('|');

                  if (isTableLine) {
                    const parts = itemStr.split('|').map((s: string) => s.trim()).filter(Boolean);
                    if (parts.length >= 2 && !parts[0].includes('---')) {
                      const isTableHeader = index === 0;
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            backgroundColor: isTableHeader ? PRIMARY_GREEN : greenBg,
                            borderRadius: 6,
                            marginBottom: 4,
                          }}
                        >
                          <Text style={{ fontWeight: isTableHeader ? '700' : '600', color: isTableHeader ? '#FFFFFF' : textColor, flex: 1 }}>
                            {parts[0]}
                          </Text>
                          <Text style={{ fontWeight: isTableHeader ? '700' : '700', color: isTableHeader ? '#FFFFFF' : PRIMARY_GREEN }}>
                            {parts[1]}
                          </Text>
                        </View>
                      );
                    }
                    return null;
                  }

                  if (isHeaderLine) {
                    return (
                      <Text key={index} style={{ fontSize: 14, fontWeight: '700', color: PRIMARY_GREEN, marginTop: index > 0 ? 8 : 0, marginBottom: 4 }}>
                        {itemStr.replace(/^###\s*/, '').replace(/\*\*/g, '')}
                      </Text>
                    );
                  }

                  return (
                    <View key={index} style={[styles.benefitRow, { backgroundColor: greenBg }]}>
                      <Ionicons name="checkmark-circle" size={18} color={greenText} style={styles.listIcon} />
                      <Text style={[styles.bulletText, { color: textColor }]}>{itemStr}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}
        </View>

        {/* ── 2. Eligibility ── */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionHeaderIcon, { backgroundColor: greenBg }]}>
              <Ionicons name="people" size={20} color={greenText} />
            </View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('eligibilityTabName')}
            </Text>
          </View>
          {eligibilityList.length > 0 ? (
            <View style={styles.listWrap}>
              {eligibilityList.map((item, index) => (
                <View key={index} style={styles.eligibilityRow}>
                  <Ionicons name="checkmark-circle-outline" size={20} color={PRIMARY_GREEN} />
                  <Text style={[styles.bulletText, { color: textColor }]}>{item}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.bodyText, { color: subTextColor, italic: true } as any]}>
              {t('noEligibilityCriteria')}
            </Text>
          )}
        </View>

        {/* ── 3. How to Apply ── */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionHeaderIcon, { backgroundColor: greenBg }]}>
              <Ionicons name="clipboard" size={20} color={greenText} />
            </View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('howToApplyTab')}
            </Text>
          </View>
          {howToApplyDesc ? (
            <Text style={[styles.bodyText, { color: textColor, marginBottom: 12 }]}>
              {howToApplyDesc}
            </Text>
          ) : null}
          <View style={styles.timelineList}>
            {(howToApplySteps.length > 0 ? howToApplySteps : [
              t('defaultStep1'),
              t('defaultStep2'),
              t('defaultStep3'),
              t('defaultStep4'),
            ]).map((step, idx) => (
              <View key={idx} style={styles.timelineItem}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>0{idx + 1}</Text>
                </View>
                <Text style={[styles.stepDesc, { color: textColor }]}>{step}</Text>
              </View>
            ))}
          </View>
          {officialApplyUrl ? (
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => handleOpenUrl(officialApplyUrl)}
              activeOpacity={0.85}
            >
              <Text style={styles.applyBtnText}>
                {t('applyOnOfficialPortal') || 'Apply on Official Website →'}
              </Text>
              <Ionicons name="open-outline" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* ── 4. Documents ── */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionHeaderIcon, { backgroundColor: greenBg }]}>
              <Ionicons name="document-text" size={20} color={greenText} />
            </View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('documentsTab')}
            </Text>
          </View>
          {documentsList.length > 0 ? (
            <View style={styles.listWrap}>
              {documentsList.map((docGroup, idx) => {
                if (typeof docGroup === 'object' && docGroup !== null && docGroup.title && Array.isArray(docGroup.items)) {
                  return (
                    <View key={idx} style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: PRIMARY_GREEN, marginBottom: 6 }}>
                        📌 {docGroup.title}
                      </Text>
                      {docGroup.items.map((item: string, subIdx: number) => (
                        <View key={subIdx} style={[styles.docCheckRow, { backgroundColor: greenBg, marginLeft: 8, marginBottom: 4 }]}>
                          <Ionicons name="document-text-outline" size={16} color={greenText} />
                          <Text style={[styles.docCheckText, { color: textColor, flex: 1 }]}>{item}</Text>
                        </View>
                      ))}
                    </View>
                  );
                }

                const docTitle = typeof docGroup === 'string' ? docGroup : (docGroup.title || docGroup.name || String(docGroup));
                const docDesc = typeof docGroup === 'object' ? docGroup.desc || docGroup.description : undefined;

                return (
                  <View key={idx} style={[styles.docCheckRow, { backgroundColor: greenBg }]}>
                    <Ionicons name="document-text-outline" size={18} color={greenText} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.docCheckText, { color: textColor }]}>{docTitle}</Text>
                      {docDesc ? (
                        <Text style={[styles.docDescText, { color: subTextColor }]}>{docDesc}</Text>
                      ) : null}
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text style={[styles.bodyText, { color: subTextColor, italic: true } as any]}>
              {t('noDocumentsAvailable')}
            </Text>
          )}
        </View>

        {/* ── 5. FAQs ── */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionHeaderIcon, { backgroundColor: greenBg }]}>
              <Ionicons name="help-circle" size={20} color={greenText} />
            </View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('faqsTab')}
            </Text>
          </View>
          <View style={styles.accordionContainer}>
            {faqsList.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <View key={index} style={[styles.faqItem, { borderColor }]}>
                  <TouchableOpacity
                    style={[styles.faqQuestionRow, { backgroundColor: greenBg }]}
                    onPress={() => setOpenFaqIndex(isOpen ? null : index)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.faqQuestionText, { color: textColor }]}>
                      {faq.question}
                    </Text>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={greenText}
                    />
                  </TouchableOpacity>
                  {isOpen && (
                    <View style={styles.faqAnswerBox}>
                      <Text style={[styles.faqAnswerText, { color: subTextColor }]}>
                        {faq.answer}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* ── 6. GR (View/Download) ── */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionHeaderIcon, { backgroundColor: greenBg }]}>
              <Ionicons name="newspaper" size={20} color={greenText} />
            </View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('grSectionTitle')}
            </Text>
          </View>
          {hasGRUrl ? (
            <View>
              <Text style={[styles.grTitleText, { color: textColor, marginBottom: 12 }]}>
                {grTitle}
              </Text>
              <View style={styles.grBtnRow}>
                {grViewUrl ? (
                  <TouchableOpacity
                    style={styles.grBtnView}
                    onPress={() => handleOpenUrl(grViewUrl)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.grBtnViewText}>{t('viewGR')}</Text>
                  </TouchableOpacity>
                ) : null}
                {grDownloadUrl ? (
                  <TouchableOpacity
                    style={[styles.grBtnDownload, { backgroundColor: greenBg, borderColor: BORDER_GREEN }]}
                    onPress={() => handleOpenUrl(grDownloadUrl)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="download-outline" size={16} color={PRIMARY_GREEN} />
                    <Text style={[styles.grBtnDownloadText, { color: PRIMARY_GREEN }]}>{t('downloadGR')}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ) : (
            <Text style={[styles.bodyText, { color: subTextColor }]}>
              {t('noGRAvailable')}
            </Text>
          )}
        </View>

        {/* ── 7. Contact ── */}
        <View style={[styles.sectionCard, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.sectionHeaderIcon, { backgroundColor: greenBg }]}>
              <Ionicons name="call" size={20} color={greenText} />
            </View>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              {t('contactTab')}
            </Text>
          </View>
          {(contactPhone || contactEmail || contactAddress) ? (
            <View style={styles.contactList}>
              {contactPhone ? (
                <TouchableOpacity
                  style={styles.contactRow}
                  onPress={() => handleOpenUrl(`tel:${contactPhone}`)}
                >
                  <Ionicons name="call-outline" size={18} color={PRIMARY_GREEN} />
                  <View>
                    <Text style={[styles.contactLabel, { color: subTextColor }]}>{t('helplineLabel') || 'Phone / Helpline'}</Text>
                    <Text style={[styles.contactValLink, { color: PRIMARY_GREEN }]}>{contactPhone}</Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              {contactEmail ? (
                <TouchableOpacity
                  style={styles.contactRow}
                  onPress={() => handleOpenUrl(`mailto:${contactEmail}`)}
                >
                  <Ionicons name="mail-outline" size={18} color={PRIMARY_GREEN} />
                  <View>
                    <Text style={[styles.contactLabel, { color: subTextColor }]}>{t('emailLabel') || 'Email'}</Text>
                    <Text style={[styles.contactValLink, { color: PRIMARY_GREEN }]}>{contactEmail}</Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              {contactAddress ? (
                <View style={styles.contactRow}>
                  <Ionicons name="location-outline" size={18} color={PRIMARY_GREEN} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.contactLabel, { color: subTextColor }]}>{t('officeLabel') || 'Office Address'}</Text>
                    <Text style={[styles.bodyText, { color: textColor }]}>{contactAddress}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          ) : (
            <Text style={[styles.bodyText, { color: textColor }]}>
              {t('contactFallback')}
            </Text>
          )}
        </View>

        {/* ── Bottom Official Source Section ── */}
        <View style={[styles.sourceCard, { backgroundColor: greenBg, borderColor: BORDER_GREEN }]}>
          <Text style={[styles.sourceLabel, { color: subTextColor }]}>{t('sourceLabel')}</Text>
          <Text style={[styles.sourceName, { color: textColor }]}>{sourceName}</Text>
          <TouchableOpacity
            style={styles.officialSourceBtn}
            onPress={() => handleOpenUrl(sourceUrl)}
            activeOpacity={0.85}
          >
            <Text style={styles.officialSourceBtnText}>{t('viewOfficialSource')}</Text>
            <Ionicons name="open-outline" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  retryBtn: {
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Hero Card */
  heroCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 4,
  },
  heroDept: {
    fontSize: 12,
    fontWeight: '600',
  },

  /* Section Cards */
  sectionCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionHeaderIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  bodyText: {
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: '400',
  },

  /* List & Bullet Items */
  listWrap: {
    gap: 10,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  eligibilityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  listIcon: {
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '500',
  },

  /* How to Apply Steps */
  timelineList: {
    gap: 12,
    marginBottom: 14,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: PRIMARY_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepDesc: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '500',
    marginTop: 4,
  },
  applyBtn: {
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Documents */
  docCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
  },
  docCheckText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  docDescText: {
    fontSize: 11.5,
    marginTop: 2,
  },

  /* FAQs */
  accordionContainer: {
    gap: 10,
  },
  faqItem: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  faqQuestionText: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
    paddingRight: 8,
  },
  faqAnswerBox: {
    padding: 14,
  },
  faqAnswerText: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
  },

  /* GR */
  grTitleText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  grBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  grBtnView: {
    flex: 1,
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  grBtnViewText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  grBtnDownload: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  grBtnDownloadText: {
    fontSize: 13,
    fontWeight: '700',
  },

  /* Contact */
  contactList: {
    gap: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactVal: {
    fontSize: 13.5,
    fontWeight: '600',
    marginTop: 1,
  },
  contactValLink: {
    fontSize: 13.5,
    fontWeight: '700',
    marginTop: 1,
    textDecorationLine: 'underline',
  },

  /* Source */
  sourceCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  sourceLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  sourceName: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  officialSourceBtn: {
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  officialSourceBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
