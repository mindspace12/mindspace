import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';

const JournalListScreen = () => {
  // Implement journal list with offline support
  return (
    <View style={styles.container}>
      <Text>Journal List Screen - To be implemented</Text>
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

export default JournalListScreen;
