import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Button, Text, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { completeOnboarding } from '../../redux/slices/authSlice';
import { spacing, theme } from '../../constants/theme';
import { YEARS, DEPARTMENTS } from '../../constants';

const OnboardingScreen = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!year) {
      newErrors.year = 'Please select your year';
    }
    
    if (!department) {
      newErrors.department = 'Please select your department';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = async () => {
    if (!validate()) return;

    try {
      await dispatch(completeOnboarding({ year, department })).unwrap();
      Alert.alert(
        'Welcome!',
        'Your anonymous username has been generated. You can now start using MindSpace.',
        [{ text: 'OK' }]
      );
    } catch (err) {
      Alert.alert('Error', err || 'Failed to complete onboarding');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MindSpace!</Text>
        <Text style={styles.subtitle}>
          To ensure your privacy, we need a few details to generate your anonymous profile.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            🔒 Your identity will remain completely anonymous. We'll generate a unique username
            for you (e.g., S-X8D92) that counsellors will use.
          </Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Your Year</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={year}
              onValueChange={(value) => setYear(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Year..." value="" />
              {YEARS.map((y) => (
                <Picker.Item key={y} label={y} value={y} />
              ))}
            </Picker>
          </View>
          <HelperText type="error" visible={!!errors.year}>
            {errors.year}
          </HelperText>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Select Your Department</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={department}
              onValueChange={(value) => setDepartment(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Department..." value="" />
              {DEPARTMENTS.map((d) => (
                <Picker.Item key={d} label={d} value={d} />
              ))}
            </Picker>
          </View>
          <HelperText type="error" visible={!!errors.department}>
            {errors.department}
          </HelperText>
        </View>

        <Button
          mode="contained"
          onPress={handleComplete}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
        >
          Complete Setup
        </Button>

        <View style={styles.privacyBox}>
          <Text style={styles.privacyText}>
            ✓ Your personal information is never shared{'\n'}
            ✓ All sessions are confidential{'\n'}
            ✓ Only aggregated analytics are visible to management
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  pickerContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: theme.colors.text,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    backgroundColor: theme.colors.surface,
  },
  picker: {
    height: 50,
  },
  button: {
    marginTop: spacing.lg,
    paddingVertical: spacing.xs,
  },
  privacyBox: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: '#F1F8E9',
    borderRadius: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#558B2F',
    lineHeight: 22,
  },
});

export default OnboardingScreen;
