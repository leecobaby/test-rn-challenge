import { Platform } from 'react-native';

// 基础平台检测 - 使用函数而不是常量，以支持测试
export const isWeb = () => Platform.OS === 'web';
export const isIOS = () => Platform.OS === 'ios';
export const isAndroid = () => Platform.OS === 'android';
export const isMobile = () => Platform.OS === 'ios' || Platform.OS === 'android';

// 向后兼容的常量版本（仅在非测试环境使用）
export const IS_WEB = Platform.OS === 'web';
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
export const IS_MOBILE = Platform.OS === 'ios' || Platform.OS === 'android';

// 平台相关的工具函数
export const getPlatform = () => Platform.OS;

export const getPlatformVersion = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return Platform.Version;
  }
  return null;
};

// 根据平台返回不同的值
export function platformSelect<T>(options: { web?: T; ios?: T; android?: T; mobile?: T; default?: T }): T | undefined {
  if (options.web && isWeb()) return options.web;
  if (options.ios && isIOS()) return options.ios;
  if (options.android && isAndroid()) return options.android;
  if (options.mobile && isMobile()) return options.mobile;
  return options.default;
}

// 检测是否为桌面Web环境
export const isDesktopWeb = () => {
  if (!isWeb()) return false;

  // 在Web环境中检测用户代理
  if (typeof navigator !== 'undefined') {
    const userAgent = navigator.userAgent.toLowerCase();
    return !/(android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini)/i.test(userAgent);
  }

  return true; // 默认认为是桌面环境
};

// 检测是否为移动Web环境
export const isMobileWeb = () => {
  return isWeb() && !isDesktopWeb();
};

// 获取屏幕信息（Web环境下）
export const getScreenInfo = () => {
  if (isWeb() && typeof window !== 'undefined') {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 768, // 简单的移动端判断
    };
  }
  return null;
};
