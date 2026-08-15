/**
 * Schemes List Screen
 * Farmer AI — Global i18n + ThemeContext + localized schemes
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

import { Colors, Spacing, Typography } from '../../theme';

import { SearchBar } from '../../components/layout/SearchBar';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { SkeletonSchemeCard } from '../../components/common/SkeletonLoader';
import { EmptyState } from '../../components/common/EmptyState';

import {
  useSchemes,
  useSchemeCategories,
} from '../../hooks/useSchemes';

import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';

import { Header } from '../../components/layout/Header';

import {
  getLocalizedScheme,
  getLocalizedCategoryName,
} from '../../utils/schemeLocalization';

import { SchemesScreenProps } from '../../navigation/types';
import { Scheme } from '../../types/api.types';

const PRIMARY_GREEN = '#187A3D';

export const SchemesListScreen: React.FC<
  SchemesScreenProps<'SchemesList'>
> = ({ navigation, route }) => {
  const { t, selectedLanguage } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();

  const [selectedCategory, setSelectedCategory] = useState(
    route.params?.category || 'All'
  );

  const [searchQuery, setSearchQuery] = useState('');

  const categoriesQuery = useSchemeCategories();

  const schemesQuery = useSchemes({
    category:
      selectedCategory !== 'All'
        ? selectedCategory
        : undefined,
    limit: 50,
  });

  /* ============================================================
     CATEGORIES
  ============================================================ */

  const categories = categoriesQuery.data || [];

  const totalSchemes =
    schemesQuery.data?.pages?.[0]?.data?.total || 0;

  const allCategories = [
    {
      id: 'all',
      name: 'All',
      count: totalSchemes,
    },
    ...categories,
  ];

  /* ============================================================
     RAW SCHEMES
  ============================================================ */

  const rawSchemes =
    schemesQuery.data?.pages?.flatMap(
      (page) => page.data.items
    ) || [];

  /* ============================================================
     LOCALIZATION + SEARCH
  ============================================================ */

  const schemes = rawSchemes
    .map((scheme) =>
      getLocalizedScheme(
        scheme,
        selectedLanguage.code
      )
    )
    .filter((scheme) => {
      if (!searchQuery.trim()) {
        return true;
      }

      const q = searchQuery
        .toLowerCase()
        .trim();

      const name = (
        (scheme as any).name ||
        scheme.title ||
        ''
      ).toLowerCase();

      const englishName = (
        (scheme as any).englishName ||
        ''
      ).toLowerCase();

      const department = (
        (scheme as any).department ||
        scheme.category ||
        ''
      ).toLowerCase();

      const description = (
        scheme.description || ''
      ).toLowerCase();

      const amount = (
        scheme.amount || ''
      ).toLowerCase();

      const benefits = Array.isArray(
        scheme.benefits
      )
        ? scheme.benefits
            .join(' ')
            .toLowerCase()
        : String(
            scheme.benefits || ''
          ).toLowerCase();

      const eligibility = Array.isArray(
        scheme.eligibility
      )
        ? scheme.eligibility
            .join(' ')
            .toLowerCase()
        : String(
            (scheme as any).eligibility_criteria ||
              scheme.eligibility ||
              ''
          ).toLowerCase();

      const overview = Array.isArray(
        (scheme as any).overview
      )
        ? (scheme as any).overview
            .join(' ')
            .toLowerCase()
        : String(
            (scheme as any).overview || ''
          ).toLowerCase();

      return (
        name.includes(q) ||
        englishName.includes(q) ||
        department.includes(q) ||
        description.includes(q) ||
        amount.includes(q) ||
        benefits.includes(q) ||
        eligibility.includes(q) ||
        overview.includes(q)
      );
    });

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const handleSchemePress = (
    scheme: Scheme
  ) => {
    navigation.navigate(
      'SchemeDetails',
      {
        schemeId: scheme.id,
      }
    );
  };

  /* ============================================================
     LOAD MORE
  ============================================================ */

  const handleLoadMore = () => {
    if (
      schemesQuery.hasNextPage &&
      !schemesQuery.isFetchingNextPage
    ) {
      schemesQuery.fetchNextPage();
    }
  };

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            themeColors.background,
        },
      ]}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <Header
        title={
          t('schemesPageTitle') ||
          'शासकीय योजना'
        }
        subtitle={
          t('schemesPageSubtitle') ||
          '२० निवडक कृषी योजना'
        }
        showLanguageSelector
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

      {/* ======================================================
          SEARCH + CATEGORY SECTION
      ====================================================== */}

      <View style={styles.headerBlock}>
        {/* SEARCH */}

        <View style={styles.searchWrap}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={
              t('searchPlaceholder') ||
              'योजना किंवा विभाग शोधा...'
            }
            iconColor={PRIMARY_GREEN}
            containerStyle={{
              ...styles.searchContainerStyle,
              backgroundColor:
                themeColors.card,
              borderColor:
                themeColors.border,
            }}
          />
        </View>

        {/* CATEGORY TABS */}

        <FlatList
          data={allCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.categoryList
          }
          keyExtractor={(item) =>
            item.id || item.name
          }
          renderItem={({ item }) => {
            const isActive =
              selectedCategory === item.name;

            const translatedCategoryName =
              getLocalizedCategoryName(
                item.name,
                selectedLanguage.code
              );

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

                    borderColor: isActive
                      ? PRIMARY_GREEN
                      : themeColors.border,
                  },
                ]}
                onPress={() =>
                  setSelectedCategory(
                    item.name
                  )
                }
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: isActive
                        ? Colors.white
                        : themeColors.textPrimary,
                    },
                  ]}
                >
                  {translatedCategoryName}
                </Text>

                {item.count ? (
                  <View
                    style={[
                      styles.countBadge,
                      {
                        backgroundColor:
                          isActive
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
                        {
                          color: isActive
                            ? Colors.white
                            : PRIMARY_GREEN,
                        },
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

        {/* COUNT */}

        <Text
          style={[
            styles.countText,
            {
              color: isDarkMode
                ? '#6EE7B7'
                : PRIMARY_GREEN,
            },
          ]}
        >
          {t('schemesCount', {
            count: schemes.length,
          })}
        </Text>
      </View>

      {/* ======================================================
          LOADING
      ====================================================== */}

      {schemesQuery.isLoading ? (
        <View style={styles.loadingContainer}>
          <Text
            style={[
              styles.loadingText,
              {
                color:
                  themeColors.textSecondary,
                marginBottom: 12,
                textAlign: 'center',
              },
            ]}
          >
            {t('loadingSchemes') ||
              'Loading schemes...'}
          </Text>

          {[1, 2, 3].map((item) => (
            <View
              key={item}
              style={styles.skeletonWrap}
            >
              <SkeletonSchemeCard />
            </View>
          ))}
        </View>
      ) : schemesQuery.isError ? (
        /* ====================================================
           ERROR
        ==================================================== */

        <EmptyState
          icon="alert-circle-outline"
          title={
            t('unableToLoadSchemes') ||
            'Unable to load schemes.'
          }
          message={
            t('networkErrorMessage') ||
            'कृपया इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.'
          }
          actionLabel={
            t('retry') || 'Retry'
          }
          onAction={() =>
            schemesQuery.refetch()
          }
        />
      ) : (
        /* ====================================================
           SCHEME LIST
        ==================================================== */

        <FlatList
          data={schemes}
          keyExtractor={(item) =>
            item.id
          }
          contentContainerStyle={
            styles.schemesList
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={
                schemesQuery.isRefetching
              }
              onRefresh={() =>
                schemesQuery.refetch()
              }
              tintColor={PRIMARY_GREEN}
              colors={[PRIMARY_GREEN]}
            />
          }
          onEndReached={
            handleLoadMore
          }
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <SchemeCard
              scheme={item}
              onPress={handleSchemePress}
              compact
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="documents-outline"
              title={
                t('noSchemesAvailable') ||
                'No schemes available.'
              }
              message={
                t('noSchemesSub') ||
                'दिलेल्या निकषानुसार कोणत्याही योजना सापडल्या नाहीत.'
              }
            />
          }
          ListFooterComponent={
            schemesQuery.isFetchingNextPage ? (
              <View
                style={
                  styles.loadingMore
                }
              >
                <Text
                  style={[
                    styles.loadingText,
                    {
                      color:
                        themeColors.textSecondary,
                    },
                  ]}
                >
                  {t('loadingSchemes') ||
                    'Loading more...'}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: Spacing['5xl'],
                }}
              />
            )
          }
        />
      )}
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

  headerBlock: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },

  /* SEARCH */

  searchWrap: {
    marginBottom: Spacing.sm,
  },

  searchContainerStyle: {
    borderRadius: 24,
    borderWidth: 1,
    height: 48,
  },

  /* CATEGORIES */

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

  /* SCHEME LIST */

  schemesList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },

  /* LOADING */

  loadingContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },

  loadingText: {
    ...Typography.bodySmall,
  },

  skeletonWrap: {
    marginBottom: Spacing.sm,
  },

  loadingMore: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
});