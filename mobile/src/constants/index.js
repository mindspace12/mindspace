export const ROLES = {
  STUDENT: 'student',
  COUNSELLOR: 'counsellor',
  MANAGEMENT: 'management',
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  RESCHEDULE_REQUESTED: 'reschedule_requested',
  NO_SHOW: 'no_show',
};

export const SEVERITY = {
  RED: 'red',
  YELLOW: 'yellow',
  GREEN: 'green',
};

export const SEVERITY_LABELS = {
  [SEVERITY.RED]: 'Very Serious',
  [SEVERITY.YELLOW]: 'Serious but Manageable',
  [SEVERITY.GREEN]: 'Not Very Serious',
};

export const MOOD_LEVELS = {
  VERY_SAD: 1,
  SAD: 2,
  NEUTRAL: 3,
  HAPPY: 4,
  VERY_HAPPY: 5,
};

export const MOOD_EMOJIS = {
  1: '😢',
  2: '😟',
  3: '😐',
  4: '🙂',
  5: '😊',
};

export const YEARS = ['1', '2', '3', '4', 'Graduate', 'PhD'];

export const DEPARTMENTS = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Psychology',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Other',
];

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
