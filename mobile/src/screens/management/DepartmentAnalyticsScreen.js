import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchSessions } from '../../redux/slices/sessionSlice';
import { spacing } from '../../constants/theme';

const DepartmentAnalyticsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.sessions?.sessions || []);
  const [selectedYear, setSelectedYear] = useState('II');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

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

  // Group sessions by department
  const departmentData = React.useMemo(() => {
    const data = {};
    const deptOrder = ['CSE', 'ECE', 'MECH', 'CIVIL', 'MBA'];

    (Array.isArray(sessions) ? sessions : []).forEach((session) => {
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
  }, [sessions]);

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
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="menu" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Year: {selectedYear}</Text>
            <Icon name="chevron-down" size={16} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}>
            <Text style={styles.filterText}>Department: {selectedDepartment}</Text>
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
});

export default DepartmentAnalyticsScreen;
