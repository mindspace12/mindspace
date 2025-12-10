import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';

const AvailabilityScreen = () => (
  <View style={styles.container}>
    <Text>Availability Management - To be implemented</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
});

export default AvailabilityScreen;
