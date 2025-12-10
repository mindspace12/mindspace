import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appointmentReducer from './slices/appointmentSlice';
import journalReducer from './slices/journalSlice';
import moodReducer from './slices/moodSlice';
import sessionReducer from './slices/sessionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    journals: journalReducer,
    moods: moodReducer,
    sessions: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['appointments/setSelectedDate'],
        ignoredPaths: ['appointments.selectedDate'],
      },
    }),
});

export default store;
