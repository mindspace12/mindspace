import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { spacing, theme } from '../../constants/theme';

const QRCodeScreen = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Session QR Code</Text>
      <Text style={styles.subtitle}>
        Show this QR code to your counsellor at the start and end of each session
      </Text>

      <View style={styles.qrContainer}>
        {user?.qrSecret && (
          <QRCode
            value={JSON.stringify({
              studentId: user._id,
              username: user.anonymousUsername,
              secret: user.qrSecret,
            })}
            size={250}
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.username}>{user?.anonymousUsername}</Text>
        <Text style={styles.infoText}>
          This QR code is unique to you and ensures your attendance is tracked securely.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.placeholder,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  qrContainer: {
    backgroundColor: theme.colors.surface,
    padding: spacing.xl,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  infoContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default QRCodeScreen;
