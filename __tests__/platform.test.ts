import { Platform } from 'react-native';
import {
  isWeb,
  isIOS,
  isAndroid,
  isMobile,
  getPlatform,
  platformSelect,
  isDesktopWeb,
  isMobileWeb,
  getScreenInfo,
} from '@/utils/platform';

// Mock Platform for testing
jest.mock('react-native', () => ({
  Platform: {
    OS: 'web',
    Version: '1.0.0',
    select: jest.fn(),
  },
}));

describe('Platform Detection Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset all mocks
  });

  describe('Basic Platform Detection', () => {
    test('should correctly detect web platform', () => {
      (Platform as any).OS = 'web';
      expect(isWeb()).toBe(true);
      expect(isIOS()).toBe(false);
      expect(isAndroid()).toBe(false);
      expect(isMobile()).toBe(false);
    });

    test('should correctly detect iOS platform', () => {
      (Platform as any).OS = 'ios';
      expect(isWeb()).toBe(false);
      expect(isIOS()).toBe(true);
      expect(isAndroid()).toBe(false);
      expect(isMobile()).toBe(true);
    });

    test('should correctly detect Android platform', () => {
      (Platform as any).OS = 'android';
      expect(isWeb()).toBe(false);
      expect(isIOS()).toBe(false);
      expect(isAndroid()).toBe(true);
      expect(isMobile()).toBe(true);
    });
  });

  describe('getPlatform function', () => {
    test('should return current platform', () => {
      (Platform as any).OS = 'ios';
      expect(getPlatform()).toBe('ios');

      (Platform as any).OS = 'android';
      expect(getPlatform()).toBe('android');

      (Platform as any).OS = 'web';
      expect(getPlatform()).toBe('web');
    });
  });

  describe('platformSelect function', () => {
    test('should select web option when on web', () => {
      (Platform as any).OS = 'web';
      const result = platformSelect({
        web: 'web-value',
        ios: 'ios-value',
        android: 'android-value',
        default: 'default-value',
      });
      expect(result).toBe('web-value');
    });

    test('should select iOS option when on iOS', () => {
      (Platform as any).OS = 'ios';
      const result = platformSelect({
        web: 'web-value',
        ios: 'ios-value',
        android: 'android-value',
        default: 'default-value',
      });
      expect(result).toBe('ios-value');
    });

    test('should select mobile option when on mobile platforms', () => {
      (Platform as any).OS = 'ios';
      const result = platformSelect({
        web: 'web-value',
        mobile: 'mobile-value',
        default: 'default-value',
      });
      expect(result).toBe('mobile-value');
    });

    test('should fallback to default option', () => {
      (Platform as any).OS = 'unknown';
      const result = platformSelect({
        web: 'web-value',
        ios: 'ios-value',
        default: 'default-value',
      });
      expect(result).toBe('default-value');
    });
  });

  describe('Web-specific detection', () => {
    beforeEach(() => {
      (Platform as any).OS = 'web';
    });

    test('should detect desktop web', () => {
      // Mock navigator for desktop
      Object.defineProperty(global, 'navigator', {
        value: {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        configurable: true,
      });

      expect(isDesktopWeb()).toBe(true);
      expect(isMobileWeb()).toBe(false);
    });

    test('should detect mobile web', () => {
      // Mock navigator for mobile
      Object.defineProperty(global, 'navigator', {
        value: {
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
        },
        configurable: true,
      });

      expect(isDesktopWeb()).toBe(false);
      expect(isMobileWeb()).toBe(true);
    });

    test('should get screen info on web', () => {
      // Mock window object
      Object.defineProperty(global, 'window', {
        value: {
          innerWidth: 1920,
          innerHeight: 1080,
        },
        configurable: true,
      });

      const screenInfo = getScreenInfo();
      expect(screenInfo).toEqual({
        width: 1920,
        height: 1080,
        isMobile: false,
      });
    });

    test('should return null for screen info on non-web platforms', () => {
      (Platform as any).OS = 'ios';
      const screenInfo = getScreenInfo();
      expect(screenInfo).toBeNull();
    });
  });
});
