/**
 * Bookmarks Screen — Saved schemes list with localization and theme support
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Spacing } from '../../theme';
import { Header } from '../../components/layout/Header';
import { SchemeCard } from '../../components/cards/SchemeCard';
import { EmptyState } from '../../components/common/EmptyState';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { getLocalizedScheme } from '../../utils/schemeLocalization';
import { ProfileScreenProps } from '../../navigation/types';

export const BookmarksScreen: React.FC<ProfileScreenProps<'Bookmarks'>> = ({ navigation }) => {
  const { t, selectedLanguage } = useLanguageContext();
  const { colors: themeColors } = useThemeContext();
  const bookmarksQuery = useBookmarks();
  const rawBookmarks = (bookmarksQuery.data as any)?.data || [];

  const bookmarks = rawBookmarks.map((b: any) => ({
    ...b,
    scheme: b.scheme ? getLocalizedScheme(b.scheme, selectedLanguage.code) : undefined,
  }));

  if (bookmarksQuery.isLoading) return <SkeletonList count={4} />;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('bookmarks') || 'सांबाळिल्ल्यो योजना (Bookmarks)'}
        showLanguageSelector
      />

      <FlatList
        data={bookmarks}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }: { item: any }) =>
          item.scheme ? (
            <SchemeCard
              scheme={item.scheme}
              onPress={(s) => navigation.navigate('HomeTab', { screen: 'SchemeDetails', params: { schemeId: s.id } } as any)}
              compact
            />
          ) : null
        }
        ListEmptyComponent={
          <EmptyState
            icon="bookmark-outline"
            title={t('noBookmarksTitle') || 'कोणतीही जतन केलेली योजना नाही'}
            message={t('noBookmarksSub') || 'तुमच्या आवडीच्या योजना नंतर सहज पाहण्यासाठी जतन करा.'}
            actionLabel={t('browseSchemes') || 'योजना पहा'}
            onAction={() => navigation.navigate('SchemesTab' as any)}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: 100 },
});
