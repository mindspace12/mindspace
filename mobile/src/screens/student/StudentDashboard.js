import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Avatar, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchMyAppointments } from '../../redux/slices/appointmentSlice';
import { fetchMoods } from '../../redux/slices/moodSlice';
import { spacing, theme } from '../../constants/theme';

const StudentDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { appointments = [] } = useSelector((state) => state.appointments || {});
  const [refreshing, setRefreshing] = React.useState(false);

  const upcomingAppointment = (appointments || []).find(
    (apt) => apt.status === 'scheduled' && new Date(apt.appointmentDate) > new Date()
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(fetchMyAppointments()),
      dispatch(fetchMoods()),
    ]);
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Icon name="brain" size={28} color="#FFFFFF" />
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="bell-outline" size={28} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Hello, {user?.name || 'Alex'}!</Text>
        </View>

        {/* Mood Section */}
        <View style={styles.moodSection}>
          <Text style={styles.moodQuestion}>
            How are you feeling today, {user?.name || 'Alex'}?
          </Text>
          <Text style={styles.moodSubtitle}>
            Logging your mood regularly can help track your well-being.
          </Text>
          <TouchableOpacity
            style={styles.logMoodButton}
            onPress={() => navigation.navigate('Mood')}
          >
            <Icon name="emoticon-happy-outline" size={20} color="#FFFFFF" />
            <Text style={styles.logMoodButtonText}>Log My Mood</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointment Card */}
        {upcomingAppointment ? (
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Icon name="calendar-blank" size={24} color="#F5A962" />
              <Text style={styles.appointmentTitle}>Upcoming Appointment</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Avatar.Image
                size={48}
                source={{ uri: upcomingAppointment.counsellor?.avatar || 'https://via.placeholder.com/48' }}
                style={styles.avatar}
              />
              <View style={styles.appointmentInfo}>
                <Text style={styles.counsellorName}>
                  {upcomingAppointment.counsellor?.name || 'Dr. Anya Sharma'}
                </Text>
                <Text style={styles.appointmentDate}>
                  {new Date(upcomingAppointment.appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })} at {upcomingAppointment.time || '2:00 PM'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.viewDetailsButton}
              onPress={() => navigation.navigate('Appointments')}
            >
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Icon name="arrow-right" size={18} color="#F5A962" />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CounsellorList')}
          >
            <Icon name="account-group" size={28} color="#F09E54" />
            <Text style={styles.actionButtonText}>Book Session</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Journal', { screen: 'JournalEditor' })}
          >
            <Icon name="notebook" size={28} color="#F09E54" />
            <Text style={styles.actionButtonText}>Journaling</Text>
          </TouchableOpacity>
        </View>

        {/* Affirmation Section */}
        <View style={styles.affirmationSection}>
          <Text style={styles.affirmationTitle}>Affirmation...</Text>
          <Text style={styles.affirmationText}>Affirmation Goes Here!!!</Text>
        </View>

        {/* Counsellors Available Now */}
        <View style={styles.counsellorsSection}>
          <Text style={styles.counsellorsTitle}>Counsellors Available Now</Text>
          <View style={styles.counsellorItem}>
            <Icon name="school" size={20} color="#666666" />
            <Text style={styles.counsellorName2}>Dr. Emily White</Text>
          </View>
          <View style={styles.counsellorItem}>
            <Icon name="school" size={20} color="#666666" />
            <Text style={styles.counsellorName2}>Mr. John Davis</Text>
          </View>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('CounsellorList')}
          >
            <Text style={styles.viewAllText}>View All Counsellors</Text>
            <Icon name="arrow-right" size={16} color="#F09E54" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="qrcode"
        style={styles.fab}
        onPress={() => navigation.navigate('QRCode')}
        color="#FFFFFF"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5A962',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 0.2,
  },
  moodSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  moodQuestion: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  moodSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  logMoodButton: {
    backgroundColor: '#F5A962',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#F5A962',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logMoodButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  appointmentCard: {
    backgroundColor: '#FFF4EC',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 12,
    letterSpacing: 0.2,
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#E0E0E0',
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  counsellorName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
    letterSpacing: 0.15,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#8B8B8B',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    fontSize: 15,
    color: '#F5A962',
    fontWeight: '600',
    marginRight: 6,
    letterSpacing: 0.2,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 28,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666666',
    marginTop: 12,
    letterSpacing: 0.2,
  },
  affirmationSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  affirmationTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  affirmationText: {
    fontSize: 15,
    color: '#AAAAAA',
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  counsellorsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 80,
  },
  counsellorsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    letterSpacing: 0.1,
  },
  counsellorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  counsellorName2: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#F5A962',
    fontWeight: '600',
    marginRight: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#F5A962',
  },
});

export default StudentDashboard;
