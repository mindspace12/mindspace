import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing, theme } from '../../constants/theme';

const AppointmentsScreen = () => {
  // Implement appointments list with cancel/reschedule options
  return (
    <View style={styles.container}>
      <Text>Appointments Screen - To be implemented</Text>
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

export default AppointmentsScreen;
