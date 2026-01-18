import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Portal, Modal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { logout } from '../../redux/slices/authSlice';
import { spacing } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

const CounsellorProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [dailyAffirmations, setDailyAffirmations] = useState(true);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    experience: user?.experience || '',
    designation: user?.designation || '',
    location: user?.location || '',
  });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (!editForm.name.trim()) {
        Alert.alert('Error', 'Name is required');
        return;
      }

      Alert.alert('Success', 'Profile updated successfully');
      setEditModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

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
          <Text style={styles.headerTitle}>Counsellor Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditModalVisible(true)}>
            <Icon name="pencil" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarCircle}>
                  <Icon name="account" size={60} color="#999999" />
                </View>
              )}
              <View style={styles.cameraIconContainer}>
                <Icon name="camera" size={20} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.name || 'Dr. Elara Vance'}</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Years of Experience (optional)</Text>
            <Text style={styles.infoValue}>{user?.experience || '8 years'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Designation</Text>
            <Text style={styles.infoValue}>{user?.designation || 'Senior College Counsellor'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{user?.location || 'Main Campus, University City'}</Text>
          </View>
        </View>

        {/* App Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>App Preferences</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceLabel}>Daily Affirmations</Text>
              <Text style={styles.preferenceDescription}>
                Receive daily motivational quotes
              </Text>
            </View>
            <Switch
              value={dailyAffirmations}
              onValueChange={setDailyAffirmations}
              trackColor={{ false: '#D1D1D1', true: '#F5A962' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceLabel}>Dark Mode</Text>
              <Text style={styles.preferenceDescription}>
                Enable dark theme for the app
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#D1D1D1', true: '#F5A962' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Portal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView style={styles.modalScroll}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <TextInput
              label="Name"
              value={editForm.name}
              onChangeText={(text) => setEditForm({ ...editForm, name: text })}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Designation"
              value={editForm.designation}
              onChangeText={(text) => setEditForm({ ...editForm, designation: text })}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., Senior Counsellor"
            />

            <TextInput
              label="Experience (Optional)"
              value={editForm.experience}
              onChangeText={(text) => setEditForm({ ...editForm, experience: text })}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., 8 years"
            />

            <TextInput
              label="Location"
              value={editForm.location}
              onChangeText={(text) => setEditForm({ ...editForm, location: text })}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., Main Campus, University City"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
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
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.3,
    flex: 1,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5A962',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.3,
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  infoItem: {
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: 0.2,
  },
  preferencesSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  preferenceInfo: {
    flex: 1,
    marginRight: 16,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  preferenceDescription: {
    fontSize: 13,
    color: '#666666',
    letterSpacing: 0.1,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#FF4444',
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
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    maxHeight: '80%',
  },
  modalScroll: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.3,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    letterSpacing: 0.2,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F5A962',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default CounsellorProfileScreen;
