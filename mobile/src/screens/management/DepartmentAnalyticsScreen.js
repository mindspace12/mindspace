import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchSessions } from '../../redux/slices/sessionSlice';
import { spacing } from '../../constants/theme';

const DepartmentAnalyticsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.sessions?.sessions || []);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showYearModal, setShowYearModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);

  const years = ['I', 'II', 'III', 'IV'];
  const departments = ['Cloud Computing', 'AIML', 'CSE', 'ECE', 'MECH', 'CIVIL', 'MBA'];

  useEffect(() => {
    const loadSessions = async () => {
      try {
        await dispatch(fetchSessions());
      } catch (error) {
        console.log('Error loading sessions:', error);
      }
    };
    loadSessions();
  }, [dispatch]);

  // Group sessions by department with filters
  const departmentData = React.useMemo(() => {
    const data = {};
    const deptOrder = ['Cloud Computing', 'AIML', 'CSE', 'ECE', 'MECH', 'CIVIL', 'MBA'];

    // Filter sessions based on selected filters
    const filteredSessions = (Array.isArray(sessions) ? sessions : []).filter((session) => {
      const matchesYear = selectedYear === 'All' || session?.student?.year === selectedYear;
      const matchesDept = selectedDepartment === 'All' || session?.student?.department === selectedDepartment;
      return matchesYear && matchesDept;
    });

    filteredSessions.forEach((session) => {
      const dept = session?.student?.department || 'Unknown';
      if (!data[dept]) {
        data[dept] = 0;
      }
      data[dept]++;
    });

    return deptOrder
      .filter(dept => data[dept])
      .map(dept => ({
        name: dept,
        count: data[dept] || 0,
      }));
  }, [sessions, selectedYear, selectedDepartment]);

  const totalSessions = departmentData.reduce((sum, d) => sum + d.count, 0);
  const highestDept = departmentData.length > 0
    ? departmentData.reduce((max, d) => d.count > max.count ? d : max, departmentData[0])
    : null;
  const lowestDept = departmentData.length > 0
    ? departmentData.reduce((min, d) => d.count < min.count ? d : min, departmentData[0])
    : null;

  const maxCount = Math.max(...departmentData.map(d => d.count), 1);
  const chartHeight = 300;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={28} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Department Analytics</Text>
          <View style={styles.menuButton} />
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterPill}
            onPress={() => setShowYearModal(true)}
          >
            <Text style={styles.filterText}>Year: {selectedYear}</Text>
            <Icon name="chevron-down" size={16} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterPill}
            onPress={() => setShowDepartmentModal(true)}
          >
            <Text style={styles.filterText}>Department: {selectedDepartment === 'All' ? 'All' : selectedDepartment}</Text>
            <Icon name="chevron-down" size={16} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Counselling Sessions by Department</Text>

          <View style={styles.chart}>
            {/* Y-axis labels */}
            <View style={styles.yAxis}>
              <Text style={styles.yAxisLabel}>200</Text>
              <Text style={styles.yAxisLabel}>150</Text>
              <Text style={styles.yAxisLabel}>100</Text>
              <Text style={styles.yAxisLabel}>50</Text>
              <Text style={styles.yAxisLabel}>0</Text>
            </View>

            {/* Bars */}
            <View style={styles.barsContainer}>
              {departmentData.map((dept, index) => (
                <View key={index} style={styles.barWrapper}>
                  <View style={styles.barColumn}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: (dept.count / maxCount) * (chartHeight - 40),
                        }
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{dept.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          {/* Total Sessions */}
          <View style={styles.statCardHalf}>
            <Icon name="chart-bar" size={24} color="#B8A8D8" />
            <Text style={styles.statLabel}>Total Sessions</Text>
            <Text style={styles.statValue}>{totalSessions.toLocaleString()}</Text>
          </View>

          {/* Highest Utilized */}
          <View style={styles.statCardHalf}>
            <Icon name="trending-up" size={24} color="#B8A8D8" />
            <Text style={styles.statLabel}>Highest Utilized Dept</Text>
            <Text style={styles.statValue}>
              {highestDept ? `${highestDept.name} (${highestDept.count})` : 'N/A'}
            </Text>
          </View>

          {/* Lowest Utilized */}
          <View style={styles.statCardFull}>
            <Icon name="trending-down" size={24} color="#B8A8D8" />
            <Text style={styles.statLabel}>Lowest Utilized Dept</Text>
            <Text style={styles.statValue}>
              {lowestDept ? `${lowestDept.name} (${lowestDept.count})` : 'N/A'}
            </Text>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Year Filter Modal */}
      <Modal
        visible={showYearModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowYearModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Options</Text>
              <TouchableOpacity onPress={() => setShowYearModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Select Year</Text>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedYear === 'All' && styles.optionButtonSelected
                ]}
                onPress={() => {
                  setSelectedYear('All');
                  setShowYearModal(false);
                }}
              >
                <Text style={[
                  styles.optionText,
                  selectedYear === 'All' && styles.optionTextSelected
                ]}>All</Text>
              </TouchableOpacity>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[
                    styles.optionButton,
                    selectedYear === year && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    setSelectedYear(year);
                    setShowYearModal(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    selectedYear === year && styles.optionTextSelected
                  ]}>{year}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSelectedYear('All');
                setShowYearModal(false);
              }}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Department Filter Modal */}
      <Modal
        visible={showDepartmentModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDepartmentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Options</Text>
              <TouchableOpacity onPress={() => setShowDepartmentModal(false)}>
                <Icon name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Select Department</Text>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedDepartment === 'All' && styles.optionButtonSelected
                ]}
                onPress={() => {
                  setSelectedDepartment('All');
                  setShowDepartmentModal(false);
                }}
              >
                <Text style={[
                  styles.optionText,
                  selectedDepartment === 'All' && styles.optionTextSelected
                ]}>All</Text>
              </TouchableOpacity>
              {departments.map((dept) => (
                <TouchableOpacity
                  key={dept}
                  style={[
                    styles.optionButton,
                    selectedDepartment === dept && styles.optionButtonSelected
                  ]}
                  onPress={() => {
                    setSelectedDepartment(dept);
                    setShowDepartmentModal(false);
                  }}
                >
                  <Text style={[
                    styles.optionText,
                    selectedDepartment === dept && styles.optionTextSelected
                  ]}>{dept}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setSelectedDepartment('All');
                setShowDepartmentModal(false);
              }}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  menuButton: {
    padding: spacing.xs,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4EC',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: '#F5A962',
  },
  filterText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  chartSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: spacing.lg,
    letterSpacing: 0.15,
  },
  chart: {
    flexDirection: 'row',
    height: 320,
    marginBottom: spacing.xl,
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    paddingRight: spacing.sm,
    paddingTop: 10,
    paddingBottom: 30,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 30,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  barColumn: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 260,
  },
  bar: {
    width: '100%',
    backgroundColor: '#F5A962',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#000000',
    marginTop: spacing.sm,
    fontWeight: '400',
  },
  statsGrid: {
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCardHalf: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    minHeight: 120,
  },
  statCardFull: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    minHeight: 100,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    fontWeight: '400',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '85%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#FF6B6B',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A4A',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  clearButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});

export default DepartmentAnalyticsScreen;
