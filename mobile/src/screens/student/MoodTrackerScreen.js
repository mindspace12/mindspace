import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';

const MoodTrackerScreen = () => {
  // Implement mood logging with emoji picker and trends
  return (
    <View style={styles.container}>
      <Text>Mood Tracker Screen - To be implemented</Text>
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

export default MoodTrackerScreen;
