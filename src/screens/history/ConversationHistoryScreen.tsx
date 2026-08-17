/**
 * Conversation History Screen — Past voice & chat conversations with theme & i18n
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Spacing, BorderRadius, Typography, Shadows } from '../../theme';
import { Header } from '../../components/layout/Header';
import { EmptyState } from '../../components/common/EmptyState';
import { SkeletonList } from '../../components/common/SkeletonLoader';
import { useConversations } from '../../hooks/useHistory';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { ProfileScreenProps } from '../../navigation/types';
import { Conversation } from '../../types/api.types';

export const ConversationHistoryScreen: React.FC<ProfileScreenProps<'ConversationHistory'>> = ({ navigation }) => {
  const { t } = useLanguageContext();
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const conversationsQuery = useConversations();
  const conversations = (conversationsQuery.data as any)?.data || [];

  if (conversationsQuery.isLoading) return <SkeletonList count={5} />;

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: themeColors.card, borderColor: themeColors.border },
        Shadows.sm,
      ]}
      activeOpacity={0.7}
    >
      <View style={[styles.cardIcon, { backgroundColor: isDarkMode ? '#064E3B' : '#E8F5E9' }]}>
        <Ionicons name="chatbubbles-outline" size={20} color={isDarkMode ? '#6EE7B7' : '#15803D'} />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]} numberOfLines={1}>
          {item.title || t('conversation') || 'संभाषण'}
        </Text>
        <Text style={[styles.cardPreview, { color: themeColors.textSecondary }]} numberOfLines={1}>
          {item.preview || `${item.message_count} ${t('messages') || 'संदेश'}`}
        </Text>
        <Text style={[styles.cardDate, { color: themeColors.textSecondary }]}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header
        showBack
        onBackPress={() => navigation.goBack()}
        title={t('conversationHistory') || 'फाटली उलोवणी (Chat History)'}
        showLanguageSelector
      />

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyState
            icon="chatbubbles-outline"
            title={t('noConversationsTitle') || 'कोणतेही संभाषण नाही'}
            message={t('noConversationsSub') || 'तुमचे आवाज आणि चॅट संभाषण येथे दिसून येतील.'}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: { flex: 1 },
  cardTitle: { ...Typography.label, marginBottom: 2 },
  cardPreview: { ...Typography.bodySm, marginBottom: 2 },
  cardDate: { ...Typography.caption },
});
