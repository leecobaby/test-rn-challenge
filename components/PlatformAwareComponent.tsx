import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { isWeb, isMobile, isIOS, isAndroid, platformSelect, getScreenInfo } from '@/utils/platform';
import { platformStyles, platformConfig } from '@/utils/platformConstants';

export function PlatformAwareComponent() {
  const [screenInfo, setScreenInfo] = useState<any>(null);

  useEffect(() => {
    if (isWeb()) {
      const info = getScreenInfo();
      setScreenInfo(info);

      // 监听窗口大小变化（仅 Web）
      const handleResize = () => {
        setScreenInfo(getScreenInfo());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handlePress = async () => {
    // 根据平台执行不同的反馈
    if (platformConfig.features.hapticFeedback && (isIOS() || isAndroid())) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // 根据平台显示不同的提示
    if (isWeb()) {
      // Web 环境使用原生 alert
      window.alert('这是 Web 环境的提示');
    } else {
      // 移动端使用 React Native Alert
      Alert.alert('移动端', '这是移动端的提示');
    }
  };

  const renderPlatformSpecificContent = () => {
    if (isWeb()) {
      return (
        <View style={styles.webContainer}>
          <Text style={styles.text}>🌐 当前运行在 Web 环境</Text>
          {screenInfo && (
            <Text style={styles.info}>
              屏幕尺寸: {screenInfo.width} x {screenInfo.height}
              {screenInfo.isMobile ? ' (移动设备)' : ' (桌面设备)'}
            </Text>
          )}
          <Text style={styles.info}>支持键盘快捷键、右键菜单等 Web 功能</Text>
        </View>
      );
    }

    if (isIOS()) {
      return (
        <View style={styles.mobileContainer}>
          <Text style={styles.text}>📱 当前运行在 iOS 设备</Text>
          <Text style={styles.info}>支持触觉反馈、Face ID/Touch ID</Text>
        </View>
      );
    }

    if (isAndroid()) {
      return (
        <View style={styles.mobileContainer}>
          <Text style={styles.text}>🤖 当前运行在 Android 设备</Text>
          <Text style={styles.info}>支持触觉反馈、指纹识别</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>❓ 未知平台</Text>
      </View>
    );
  };

  // 使用 platformSelect 选择不同的按钮文本
  const buttonText = platformSelect({
    web: '点击我 (Web)',
    ios: '轻触我 (iOS)',
    android: '点击我 (Android)',
    default: '点击我',
  });

  return (
    <View style={[platformStyles.container, styles.container]}>
      <Text style={[platformStyles.text, styles.title]}>平台检测示例</Text>

      {renderPlatformSpecificContent()}

      <TouchableOpacity style={[platformStyles.button, styles.button]} onPress={handlePress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>平台信息:</Text>
        <Text style={styles.infoText}>Web: {isWeb() ? '是' : '否'}</Text>
        <Text style={styles.infoText}>移动端: {isMobile() ? '是' : '否'}</Text>
        <Text style={styles.infoText}>iOS: {isIOS() ? '是' : '否'}</Text>
        <Text style={styles.infoText}>Android: {isAndroid() ? '是' : '否'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  webContainer: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  mobileContainer: {
    backgroundColor: '#f3e5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
