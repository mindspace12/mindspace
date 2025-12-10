import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

import { loadStoredAuth } from '../redux/slices/authSlice';
import AuthNavigator from './AuthNavigator';
import StudentNavigator from './StudentNavigator';
import CounsellorNavigator from './CounsellorNavigator';
import ManagementNavigator from './ManagementNavigator';
import { ROLES } from '../constants';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isOnboarded, user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      await dispatch(loadStoredAuth());
      setIsLoading(false);
    };
    loadAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  // Route based on user role
  switch (user?.role) {
    case ROLES.STUDENT:
      return <StudentNavigator />;
    case ROLES.COUNSELLOR:
      return <CounsellorNavigator />;
    case ROLES.MANAGEMENT:
      return <ManagementNavigator />;
    default:
      return <AuthNavigator />;
  }
};

export default AppNavigator;
