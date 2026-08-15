/**
 * SearchBar Component
 * Animated search input with clear button and theme customization support
 */

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '../../theme';

import { useThemeContext } from '../../contexts/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  onFocus?: () => void;
  autoFocus?: boolean;
  iconColor?: string;
  containerStyle?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search schemes, topics...',
  onSubmit,
  onFocus,
  autoFocus = false,
  iconColor,
  containerStyle,
}) => {
  const { isDarkMode, colors: themeColors } = useThemeContext();
  const effectiveIconColor = iconColor || (isDarkMode ? '#9CA3AF' : '#6B7280');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
        },
        containerStyle,
      ]}
    >
      <Ionicons name="search-outline" size={20} color={effectiveIconColor} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: themeColors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textSecondary}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onFocus={onFocus}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton} activeOpacity={0.7}>
          <Ionicons name="close-circle" size={18} color={effectiveIconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    padding: 0,
    fontSize: 15,
  },
  clearButton: {
    padding: Spacing.xs,
  },
});
