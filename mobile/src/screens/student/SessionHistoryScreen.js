import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';

const SessionHistoryScreen = () => {
  // Implement session history with severity indicators
  return (
    <View style={styles.container}>
      <Text>Session History Screen - To be implemented</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
});

export default SessionHistoryScreen;
