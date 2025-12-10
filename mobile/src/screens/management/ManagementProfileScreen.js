import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { spacing, theme } from '../../constants/theme';

const ManagementProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Management Profile - To be implemented</Text>
      <Button mode="contained" onPress={() => dispatch(logout())} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
  button: {
    marginTop: spacing.xl,
  },
});

export default ManagementProfileScreen;
