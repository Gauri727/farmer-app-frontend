/**
 * WCD Jalgaon — All Schemes List Screen
 * Mirrors wcdjalgaon.com flow: header → category tabs → scheme cards → scheme details
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, Spacing, BorderRadius } from '../../theme';
import {
  WCD_SCHEMES,
  WCD_CATEGORIES,
  WCDScheme,
  getWCDSchemesByCategory,
} from '../../services/wcdSchemeService';

type Props = NativeStackScreenProps<any, 'WCDSchemesList'>;

const HEADER_GRADIENT: [string, string] = ['#1E5CA5', '#0D3B7A'];
const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Popular: { bg: '#FFF3E0', text: '#E65100' },
  New:     { bg: '#E8F5E9', text: '#1B5E20' },
  Central: { bg: '#E3F2FD', text: '#1565C0' },
  State:   { bg: '#F3E5F5', text: '#6A1B9A' },
};

const SchemeCard: React.FC<{ scheme: WCDScheme; onPress: () => void }> = ({ scheme, onPress }) => {
  const badge = scheme.badge ? BADGE_COLORS[scheme.badge] : null;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.cardLeft}>
        <View style={[styles.cardIcon, { backgroundColor: Colors.primary[50] }]}>
          <Ionicons name={(scheme.categoryIcon || 'document-outline') as any} size={24} color={Colors.primary[600]} />
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle} numberOfLines={2}>{scheme.title}</Text>
          {badge && (
            <View style={[styles.badge, { backgroundColor: badge.bg }]}>
              <Text style={[styles.badgeText, { color: badge.text }]}>{scheme.badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardMarathi} numberOfLines={1}>{scheme.titleMarathi}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{scheme.description}</Text>

        <View style={styles.cardFooter}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>{scheme.category}</Text>
          </View>
          {scheme.amount && (
            <View style={styles.amountChip}>
              <Ionicons name="cash-outline" size={12} color={Colors.primary[700]} />
              <Text style={styles.amountChipText}>{scheme.amount}</Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={16} color={Colors.gray[400]} style={{ marginLeft: 'auto' }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const WCDSchemesListScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = useMemo(
    () => getWCDSchemesByCategory(selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const handleSchemePress = (scheme: WCDScheme) => {
    navigation.navigate('WCDSchemeDetails', { schemeId: scheme.id });
  };

  const renderHeader = () => (
    <>
      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <LinearGradient colors={HEADER_GRADIENT} style={[styles.hero, { paddingTop: insets.top + Spacing.lg }]}>
        <View style={styles.heroInner}>
          <View>
            <Text style={styles.heroTitle}>WCD जळगाव</Text>
            <Text style={styles.heroSubtitle}>महिला व बालविकास नागरिक पोर्टल</Text>
          </View>
          <View style={styles.heroBadge}>
            <Ionicons name="shield-checkmark" size={16} color="#fff" />
            <Text style={styles.heroBadgeText}>शासकीय</Text>
          </View>
        </View>

        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNum}>{WCD_SCHEMES.length}</Text>
            <Text style={styles.heroStatLabel}>योजना</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNum}>7</Text>
            <Text style={styles.heroStatLabel}>विभाग</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatNum}>२५ लाख+</Text>
            <Text style={styles.heroStatLabel}>लाभार्थी</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ── Search Bar ──────────────────────────────────────────────── */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={Colors.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="योजना शोधा... (Search schemes)"
            placeholderTextColor={Colors.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.gray[400]} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Section Title ───────────────────────────────────────────── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>सर्व योजना</Text>
        <Text style={styles.sectionCount}>{filteredSchemes.length} योजना</Text>
      </View>

      {/* ── Category Tabs ───────────────────────────────────────────── */}
      <FlatList
        data={WCD_CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isActive = selectedCategory === item.name;
          return (
            <TouchableOpacity
              style={[styles.categoryTab, isActive && styles.categoryTabActive]}
              onPress={() => setSelectedCategory(item.name)}
              activeOpacity={0.82}
            >
              <Text style={[styles.categoryTabText, isActive && styles.categoryTabTextActive]}>
                {item.name}
              </Text>
              {item.count > 0 && (
                <View style={[styles.categoryBadge, isActive && styles.categoryBadgeActive]}>
                  <Text style={[styles.categoryBadgeText, isActive && styles.categoryBadgeTextActive]}>
                    {item.count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSchemes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SchemeCard scheme={item} onPress={() => handleSchemePress(item)} />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={Colors.gray[300]} />
            <Text style={styles.emptyTitle}>कोणतीही योजना आढळली नाही</Text>
            <Text style={styles.emptySubtitle}>No schemes found for your search</Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 32 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  heroInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.82)',
    marginTop: 3,
    fontStyle: 'italic',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  heroStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  heroStat: {
    alignItems: 'center',
    flex: 1,
  },
  heroStatNum: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  heroStatLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  // ── Search ────────────────────────────────────────────────────────────────
  searchSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: -20,
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.primary,
  },

  // ── Section header ────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  sectionCount: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontWeight: '600',
  },

  // ── Category tabs ─────────────────────────────────────────────────────────
  categoryList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  categoryTabActive: {
    backgroundColor: '#1E5CA5',
    borderColor: '#1E5CA5',
  },
  categoryTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  categoryBadge: {
    backgroundColor: Colors.gray[100],
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: 'center',
  },
  categoryBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.secondary,
  },
  categoryBadgeTextActive: {
    color: Colors.white,
  },

  // ── Scheme Card ───────────────────────────────────────────────────────────
  list: {
    paddingBottom: 32,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginHorizontal: Spacing.lg,
    marginBottom: 12,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLeft: {
    marginRight: Spacing.md,
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 2,
  },
  cardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text.primary,
    lineHeight: 20,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardMarathi: {
    fontSize: 11,
    color: '#1E5CA5',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.text.secondary,
    lineHeight: 17,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  categoryChip: {
    backgroundColor: Colors.primary[50],
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary[700],
  },
  amountChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  amountChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary[700],
  },

  // ── Empty State ───────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.secondary,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.text.tertiary,
    marginTop: 4,
  },
});
