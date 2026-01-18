import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { spacing, theme } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dailyAffirmations, setDailyAffirmations] = useState(true);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout())
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert('Edit Profile', 'Edit profile functionality will be implemented soon')}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user?.name || 'Jane Doe'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Student ID</Text>
            <Text style={styles.infoValue}>{user?.studentId || 'S1234567'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Year</Text>
            <Text style={styles.infoValue}>{user?.year || '2'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Department</Text>
            <Text style={styles.infoValue}>{user?.department || 'Computer Science'}</Text>
          </View>
        </View>

        {/* App Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>

          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Receive daily affirmations</Text>
            <Switch
              value={dailyAffirmations}
              onValueChange={setDailyAffirmations}
              trackColor={{ false: '#D1D1D1', true: '#F5A962' }}
              thumbColor={'#FFFFFF'}
            />
          </View>

          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Enable dark mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#D1D1D1', true: '#F5A962' }}
              thumbColor={'#FFFFFF'}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.3,
    flex: 1,
    textAlign: 'center',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5A962',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  infoItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.2,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: 0.2,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: '#DC3545',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default ProfileScreen;
