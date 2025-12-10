import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { spacing, theme } from '../../constants/theme';

const QRScannerScreen = () => {
  // Implement QR scanner for session check-in/out
  return (
    <View style={styles.container}>
      <Text>QR Scanner - To be implemented with expo-barcode-scanner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default QRScannerScreen;
