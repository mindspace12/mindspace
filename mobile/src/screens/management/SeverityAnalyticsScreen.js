import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';

const SeverityAnalyticsScreen = () => (
  <View style={styles.container}>
    <Text>Severity Analytics - To be implemented</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
});

export default SeverityAnalyticsScreen;
