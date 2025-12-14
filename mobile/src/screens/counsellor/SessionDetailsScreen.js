import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, Chip, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { spacing, theme } from '../../constants/theme';

const SessionDetailsScreen = ({ route, navigation }) => {
  const { sessionId } = route.params || {};
  const [notes, setNotes] = useState('');
  const [severity, setSeverity] = useState('low');
  const [saving, setSaving] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const severityOptions = [
    { key: 'high', label: 'High', color: '#F44336', icon: 'alert-circle' },
    { key: 'moderate', label: 'Moderate', color: '#FF9800', icon: 'alert' },
    { key: 'low', label: 'Low', color: '#4CAF50', icon: 'check-circle' },
  ];

  const handleSave = async () => {
    if (!notes.trim()) {
      Alert.alert('Error', 'Please add session notes');
      return;
    }

    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Success', 'Session saved successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.infoRow}>
                <Icon name="shield-account" size={20} color={theme.colors.primary} />
                <Text style={styles.infoText}>Session with anonymous student</Text>
              </View>
              <View style={styles.infoRow}>
                <Icon name="clock-outline" size={20} color={theme.colors.placeholder} />
                <Text style={styles.infoText}>{new Date().toLocaleString()}</Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.label}>Severity Assessment</Text>
              <View style={styles.severityContainer}>
                {severityOptions.map((option) => (
                  <Chip
                    key={option.key}
                    selected={severity === option.key}
                    onPress={() => setSeverity(option.key)}
                    icon={option.icon}
                    style={[
                      styles.severityChip,
                      severity === option.key && {
                        backgroundColor: option.color + '30',
                        borderColor: option.color,
                        borderWidth: 2,
                      },
                    ]}
                    textStyle={{
                      color: severity === option.key ? option.color : theme.colors.text,
                      fontWeight: severity === option.key ? 'bold' : 'normal',
                    }}
                  >
                    {option.label}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.label}>Session Notes</Text>
              <Text style={styles.privacyNote}>
                🔒 Notes are confidential and anonymized
              </Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                mode="outlined"
                multiline
                numberOfLines={8}
                placeholder="Document session observations, interventions, and recommendations..."
                style={styles.notesInput}
              />
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={handleSave}
            loading={saving}
            disabled={saving}
            style={styles.saveButton}
            icon="content-save"
          >
            Save Session
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoText: {
    marginLeft: spacing.sm,
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityChip: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  privacyNote: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginBottom: spacing.md,
  },
  notesInput: {
    backgroundColor: theme.colors.surface,
  },
  saveButton: {
    marginTop: spacing.md,
  },
  cancelButton: {
    marginTop: spacing.sm,
  },
});

export default SessionDetailsScreen;
