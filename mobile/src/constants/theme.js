import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    buttonclr: '#F5A962',
    primary: '#F5A962',
    secondary: '#FFF4EC',
    error: '#FF6B6B',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#CCCCCC',
    placeholder: '#666666',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    // Custom colors
    success: '#6BCF7F',
    warning: '#FF9A5A',
    info: '#F5A962',
    // Severity colors
    severityRed: '#FF6B6B',
    severityYellow: '#F5A962',
    severityGreen: '#6BCF7F',
  },
  roundness: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
    color: '#757575',
  },
};
