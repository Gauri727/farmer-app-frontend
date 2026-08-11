/**
 * FloatingActionButton Component
 * Pulsing microphone FAB for voice assistant
 */

import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme';

interface FABProps {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: number;
  animated?: boolean;
}

export const FloatingActionButton: React.FC<FABProps> = ({
  onPress,
  icon = 'mic',
  size = 64,
  animated = true,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animated) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [animated]);

  return (
    <Animated.View
      style={[
        styles.outerRing,
        {
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button3D,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.85}
        accessibilityLabel="Voice Assistant"
        accessibilityRole="button"
      >
        <View style={styles.specularHighlight} />
        <Ionicons name={icon} size={size * 0.45} color={Colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    right: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(46, 125, 50, 0.25)',
  },
  button3D: {
    backgroundColor: Colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 6,
    borderBottomColor: '#144D1E',
    shadowColor: '#0A2E12',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  specularHighlight: {
    position: 'absolute',
    top: 4,
    left: 10,
    width: '60%',
    height: '35%',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    transform: [{ rotate: '-15deg' }],
  },
});

