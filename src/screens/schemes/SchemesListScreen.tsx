/**
 * Schemes List Screen — Clean Green Farmer AI Theme with Global i18n & ThemeContext
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography } from '../../theme';
import { SearchBar } from '../../components/layout/SearchBar';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { SkeletonSchemeCard } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';
import { useSchemes, useSchemeCategories } from '../../hooks/useSchemes';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Header } from '../../components/layout/Header';
import { getLocalizedScheme, getLocalizedCategoryName } from '../../utils/schemeLocalization';
import { SchemesScreenProps } from '../../navigation/types';
import { Scheme } from '../../types/api.types';

const PRIMARY_GREEN = '#187A3D';

export const SchemesListScreen: React.FC<
  SchemesScreenProps<'SchemesList'>
> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

  const [selectedCategory, setSelectedCategory] = useState(route.params?.category || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoriesQuery = useSchemeCategories();

  const schemesQuery = useSchemes({
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    limit: 50,
  });

  const categories = categoriesQuery.data || [];
  const totalSchemes = schemesQuery.data?.pages?.[0]?.data?.total || 0;
  const allCategories = [{ id: 'all', name: 'All', count: totalSchemes }, ...categories];
  const rawSchemes = schemesQuery.data?.pages?.flatMap((page) => page.data.items) || [];

  // Instant local filtering & localization
  const schemes = rawSchemes
    .map((s) => getLocalizedScheme(s, selectedLanguage.code))
    .filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const marathiName = ((s as any).name || s.title || '').toLowerCase();
      const englishName = ((s as any).englishName || '').toLowerCase();
      const department = ((s as any).department || s.category || '').toLowerCase();
      const description = (s.description || '').toLowerCase();
      const amount = (s.amount || '').toLowerCase();
      const benefits = Array.isArray(s.benefits) ? s.benefits.join(' ').toLowerCase() : String(s.benefits || '').toLowerCase();
      const eligibility = Array.isArray(s.eligibility) ? s.eligibility.join(' ').toLowerCase() : String(s.eligibility_criteria || s.eligibility || '').toLowerCase();
      const overview = Array.isArray(s.overview) ? s.overview.join(' ').toLowerCase() : String(s.overview || '').toLowerCase();

      return (
        marathiName.includes(q) ||
        englishName.includes(q) ||
        department.includes(q) ||
        description.includes(q) ||
        amount.includes(q) ||
        benefits.includes(q) ||
        eligibility.includes(q) ||
        overview.includes(q)
      );
    });

  const handleSchemePress = (scheme: Scheme) => {
    navigation.navigate('SchemeDetails', {
      schemeId: scheme.id,
    });
  };

  const handleLoadMore = () => {
    if (schemesQuery.hasNextPage && !schemesQuery.isFetchingNextPage) {
      schemesQuery.fetchNextPage();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* 1. Header (Fixed top) */}
      <Header
        title={t('schemesPageTitle') || 'शासकीय योजना'}
        subtitle={t('schemesPageSubtitle') || '२० निवडक कृषी योजना'}
        showLanguageSelector
        onNotificationPress={() => navigation.navigate('HomeTab', { screen: 'Notifications' } as any)}
        onProfilePress={() => navigation.navigate('ProfileTab', { screen: 'Profile' } as any)}
      />

      {/* 2. Permanent Search Bar & Category Controls */}
      <View style={styles.headerBlock}>
        <View style={styles.searchWrap}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t('searchPlaceholder') || 'योजना किंवा विभाग शोधा (Search by name or department)...'}
            iconColor={PRIMARY_GREEN}
            containerStyle={{
              ...styles.searchContainerStyle,
              backgroundColor: themeColors.card,
              borderColor: themeColors.border,
            }}
          />
        </View>

        <FlatList
          data={allCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          keyExtractor={(item) => item.id || item.name}
          renderItem={({ item }) => {
            const isActive = selectedCategory === item.name;
            const translatedCatName = getLocalizedCategoryName(item.name, selectedLanguage.code);

            return (
              <TouchableOpacity
                style={[
                  styles.categoryTab,
                  {
                    backgroundColor: isActive
                      ? PRIMARY_GREEN
                      : isDarkMode
                      ? themeColors.card
                      : '#EAF6EE',
                    borderColor: isActive ? PRIMARY_GREEN : themeColors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(item.name)}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: isActive ? Colors.white : themeColors.textPrimary },
                  ]}
                >
                  {translatedCatName}
                </Text>
                {item.count ? (
                  <View
                    style={[
                      styles.countBadge,
                      {
                        backgroundColor: isActive
                          ? 'rgba(255,255,255,0.25)'
                          : isDarkMode
                          ? '#064E3B'
                          : '#DCFCE7',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryCount,
                        { color: isActive ? Colors.white : PRIMARY_GREEN },
                      ]}
                    >
                      {item.count}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          }}
        />

        <Text
          style={[
            styles.countText,
            { color: isDarkMode ? '#6EE7B7' : PRIMARY_GREEN },
          ]}
        >
          {t('schemesCount', { count: schemes.length })}
        </Text>
      </View>

      {/* 3. Main Scheme List Area */}
      {schemesQuery.isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: themeColors.textSecondary, marginBottom: 12, textAlign: 'center' }]}>
            {t('loadingSchemes') || 'Loading schemes...'}
          </Text>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.skeletonWrap}>
              <SkeletonSchemeCard />
            </View>
          ))}
        </View>
      ) : schemesQuery.isError ? (
        <EmptyState
          icon="alert-circle-outline"
          title={t('unableToLoadSchemes') || 'Unable to load schemes. Please try again.'}
          message={t('networkErrorMessage') || 'कृपया इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.'}
          actionLabel={t('retry') || 'Retry'}
          onAction={() => schemesQuery.refetch()}
        />
      ) : (
        <FlatList
          data={schemes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.schemesList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={schemesQuery.isRefetching}
              onRefresh={() => schemesQuery.refetch()}
              tintColor={PRIMARY_GREEN}
              colors={[PRIMARY_GREEN]}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => <SchemeCard scheme={item} onPress={handleSchemePress} compact />}
          ListEmptyComponent={
            <EmptyState
              icon="documents-outline"
              title={t('noSchemesAvailable') || 'No schemes available.'}
              message={t('noSchemesSub') || 'दिलेल्या निकषानुसार कोणत्याही योजना सापडल्या नाहीत.'}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBlock: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  searchWrap: {
    marginBottom: Spacing.sm,
  },
  searchContainerStyle: {
    borderRadius: 24,
    borderWidth: 1,
    height: 48,
  },
  categoryList: {
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 6,
  },
  categoryText: {
    ...Typography.caption,
    fontWeight: '600',
    fontSize: 13,
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: '700',
  },
  countText: {
    ...Typography.caption,
    fontWeight: '700',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  schemesList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  loadingContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  loadingText: {
    ...Typography.bodySm,
  },
  skeletonWrap: {
    marginBottom: Spacing.sm,
  },
});