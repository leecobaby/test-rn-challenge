import { Platform, StyleSheet } from 'react-native';

export const platformStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.select({
      ios: '#f0f0f0',
      android: '#ffffff',
      web: '#fafafa',
      default: '#ffffff',
    }),
    padding: Platform.select({
      ios: 20,
      android: 16,
      web: 24,
      default: 16,
    }),
  },
  text: {
    fontSize: Platform.select({
      ios: 16,
      android: 14,
      web: 18,
      default: 16,
    }),
    fontFamily: Platform.select({
      ios: 'Helvetica',
      android: 'Roboto',
      web: 'system-ui, -apple-system, sans-serif',
      default: 'System',
    }),
  },
  button: {
    borderRadius: Platform.select({
      ios: 8,
      android: 4,
      web: 6,
      default: 6,
    }),
    shadowColor: Platform.select({
      ios: '#000',
      android: 'transparent', // Android 使用 elevation
      web: '#rgba(0,0,0,0.1)',
      default: 'transparent',
    }),
    shadowOffset: Platform.select({
      ios: { width: 0, height: 2 },
      default: { width: 0, height: 0 },
    }),
    shadowOpacity: Platform.select({
      ios: 0.1,
      default: 0,
    }),
    shadowRadius: Platform.select({
      ios: 4,
      default: 0,
    }),
    elevation: Platform.select({
      android: 3,
      default: 0,
    }),
  },
});

export const platformConfig = {
  apiTimeout: Platform.select({
    web: 10000,
    ios: 5000,
    android: 5000,
    default: 8000,
  }),

  animationDuration: Platform.select({
    ios: 300,
    android: 250,
    web: 200,
    default: 250,
  }),

  features: {
    hapticFeedback: Platform.select({
      ios: true,
      android: true,
      web: false,
      default: false,
    }),
    biometricAuth: Platform.select({
      ios: true,
      android: true,
      web: false,
      default: false,
    }),
    pushNotifications: Platform.select({
      ios: true,
      android: true,
      web: false,
      default: false,
    }),
  },
};

export const platformConstants = {
  statusBarHeight: Platform.select({
    ios: 44,
    android: 24,
    web: 0,
    default: 0,
  }),
  tabBarHeight: Platform.select({
    ios: 49,
    android: 56,
    web: 60,
    default: 56,
  }),
};
