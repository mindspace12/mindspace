import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';

// Counsellor Screens - Implement based on requirements
const CounsellorDashboard = () => (
  <View style={styles.container}>
    <Text>Counsellor Dashboard - To be implemented</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
});

export default CounsellorDashboard;
