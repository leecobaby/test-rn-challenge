import React from 'react';
import { Modal, Dimensions } from 'react-native';
import { useAtom } from 'jotai';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Avatar, AvatarImage, AvatarFallbackText } from '@/components/ui/avatar';

import { isProfileModalVisibleAtom } from '@/store/atomState';

const { height: screenHeight } = Dimensions.get('window');

export function ProfileModal() {
  const [isVisible, setIsVisible] = useAtom(isProfileModalVisibleAtom);

  // 动画值
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);

  // 模态框内容动画样式
  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  // 背景动画样式
  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value * 0.5,
    };
  });

  // 打开模态框动画
  React.useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(screenHeight, { duration: 200 });
    }
  }, [isVisible, opacity, translateY]);

  // 关闭模态框
  const handleClose = () => {
    setIsVisible(false);
  };

  // 防止点击模态框内容时关闭
  const handleContentPress = () => {
    // 空函数，防止事件冒泡
  };

  return (
    <Modal visible={isVisible} transparent animationType="none" statusBarTranslucent>
      <Box className="flex-1">
        {/* 背景遮罩 */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'black',
            },
            backdropAnimatedStyle,
          ]}
          onTouchEnd={handleClose}
        />

        {/* 模态框内容 */}
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            },
            modalAnimatedStyle,
          ]}
          onTouchEnd={handleContentPress}>
          <Card className="w-full max-w-sm bg-background shadow-lg">
            <VStack space="lg" className="p-6">
              {/* 关闭按钮 */}
              <HStack className="justify-end">
                <Button variant="outline" size="sm" onPress={handleClose} className="w-8 h-8">
                  <ButtonText>✕</ButtonText>
                </Button>
              </HStack>

              {/* 用户头像和基本信息 */}
              <VStack space="md" className="items-center">
                <Avatar size="xl">
                  <AvatarImage source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=demo' }} />
                  <AvatarFallbackText>Demo User</AvatarFallbackText>
                </Avatar>

                <VStack space="xs" className="items-center">
                  <Heading size="lg" className="text-typography-900">
                    Demo User
                  </Heading>
                  <Text size="sm" className="text-typography-500">
                    demo@example.com
                  </Text>
                </VStack>
              </VStack>

              {/* 统计信息 */}
              <Card className="p-4 bg-background-50">
                <VStack space="md">
                  <Heading size="md" className="text-center text-typography-700">
                    签名统计
                  </Heading>

                  <HStack className="justify-around">
                    <VStack space="xs" className="items-center">
                      <Text size="xl" className="font-bold text-primary-600">
                        42
                      </Text>
                      <Text size="xs" className="text-typography-500">
                        总签名次数
                      </Text>
                    </VStack>

                    <Box className="w-px bg-border-300" />

                    <VStack space="xs" className="items-center">
                      <Text size="xl" className="font-bold text-success-600">
                        98%
                      </Text>
                      <Text size="xs" className="text-typography-500">
                        验证成功率
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Card>

              {/* 功能列表 */}
              <VStack space="sm">
                <Text size="sm" className="text-typography-700 font-medium">
                  快速操作
                </Text>

                <VStack space="xs">
                  <Button variant="outline" className="justify-start p-3">
                    <HStack space="md" className="items-center">
                      <Box className="w-8 h-8 bg-primary-100 rounded-full items-center justify-center">
                        <Text className="text-primary-600">🔑</Text>
                      </Box>
                      <Text className="text-typography-700">管理密钥</Text>
                    </HStack>
                  </Button>

                  <Button variant="outline" className="justify-start p-3">
                    <HStack space="md" className="items-center">
                      <Box className="w-8 h-8 bg-secondary-100 rounded-full items-center justify-center">
                        <Text className="text-secondary-600">📊</Text>
                      </Box>
                      <Text className="text-typography-700">签名历史</Text>
                    </HStack>
                  </Button>

                  <Button variant="outline" className="justify-start p-3">
                    <HStack space="md" className="items-center">
                      <Box className="w-8 h-8 bg-success-100 rounded-full items-center justify-center">
                        <Text className="text-success-600">⚙️</Text>
                      </Box>
                      <Text className="text-typography-700">设置</Text>
                    </HStack>
                  </Button>
                </VStack>
              </VStack>

              {/* 版本信息 */}
              <Box className="pt-4 border-t border-border-200">
                <Text size="xs" className="text-center text-typography-400">
                  Sign & Verify Demo v1.0.0
                </Text>
                <Text size="xs" className="text-center text-typography-400">
                  基于 Ed25519 & SHA-256
                </Text>
              </Box>
            </VStack>
          </Card>
        </Animated.View>
      </Box>
    </Modal>
  );
}
