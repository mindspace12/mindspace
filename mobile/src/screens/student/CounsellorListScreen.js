import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';

const CounsellorListScreen = ({ navigation }) => {
  // Implement counsellor list with availability status
  return (
    <View style={styles.container}>
      <Text>Counsellor List Screen - To be implemented</Text>
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

export default CounsellorListScreen;
