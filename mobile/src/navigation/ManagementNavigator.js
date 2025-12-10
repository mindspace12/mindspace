import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ManagementDashboard from '../screens/management/ManagementDashboard';
import DepartmentAnalyticsScreen from '../screens/management/DepartmentAnalyticsScreen';
import YearAnalyticsScreen from '../screens/management/YearAnalyticsScreen';
import SeverityAnalyticsScreen from '../screens/management/SeverityAnalyticsScreen';
import ManagementProfileScreen from '../screens/management/ManagementProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Dashboard" 
      component={ManagementDashboard}
      options={{ title: 'Analytics Dashboard' }}
    />
    <Stack.Screen 
      name="DepartmentAnalytics" 
      component={DepartmentAnalyticsScreen}
      options={{ title: 'Department Analytics' }}
    />
    <Stack.Screen 
      name="YearAnalytics" 
      component={YearAnalyticsScreen}
      options={{ title: 'Year Analytics' }}
    />
    <Stack.Screen 
      name="SeverityAnalytics" 
      component={SeverityAnalyticsScreen}
      options={{ title: 'Severity Analytics' }}
    />
  </Stack.Navigator>
);

const ManagementNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'chart-box' : 'chart-box-outline';
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ManagementProfileScreen} />
    </Tab.Navigator>
  );
};

export default ManagementNavigator;
