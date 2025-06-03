import React from 'react';
import { useAtom } from 'jotai';
import { ScrollView, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';

import { hashAndSign } from '@/utils/crypto';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { ProfileModal } from '@/components/ProfileModal';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { messageAtom, signResultAtom, isSigningAtom, isProfileModalVisibleAtom } from '@/store/atomState';

export default function SignScreen() {
  const [message, setMessage] = useAtom(messageAtom);
  const [signResult, setSignResult] = useAtom(signResultAtom);
  const [isSigning, setIsSigning] = useAtom(isSigningAtom);
  const [, setIsProfileVisible] = useAtom(isProfileModalVisibleAtom);

  const handleHashAndSign = async () => {
    if (!message.trim()) {
      Alert.alert('错误', '请输入要签名的消息');
      return;
    }

    setIsSigning(true);
    try {
      const result = await hashAndSign(message);
      setSignResult(result);
    } catch (error) {
      console.error('签名过程中发生错误:', error);
      Alert.alert('错误', '签名过程中发生错误，请重试');
    } finally {
      setIsSigning(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert('成功', `${label}已复制到剪贴板`);
  };

  const handleClear = () => {
    setMessage('');
    setSignResult(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <Box className="p-4">
          <VStack space="lg">
            {/* 页面标题和Profile按钮 */}
            <HStack className="justify-between items-center mb-2">
              <Box className="flex-1">
                <Heading size="xl" className="text-typography-900">
                  数字签名
                </Heading>
                <Text size="sm" className="text-typography-500 mt-1">
                  输入消息进行SHA-256哈希和Ed25519签名
                </Text>
              </Box>
              <Button variant="outline" size="sm" onPress={() => setIsProfileVisible(true)} className="ml-4">
                <ButtonText>Profile</ButtonText>
              </Button>
            </HStack>

            {/* 消息输入卡片 */}
            <Card className="p-4">
              <VStack space="md">
                <Heading size="md">消息内容</Heading>
                <Textarea size="lg">
                  <TextareaInput
                    placeholder="请输入要签名的消息..."
                    value={message}
                    onChangeText={setMessage}
                    className="min-h-32"
                  />
                </Textarea>
              </VStack>
            </Card>

            {/* 签名结果显示 */}
            {signResult && (
              <Card className="p-4 border-success-300 bg-success-50">
                <VStack space="md">
                  <Heading size="md" className="text-success-700">
                    签名结果
                  </Heading>

                  {/* SHA-256 哈希 */}
                  <VStack space="sm">
                    <HStack className="justify-between items-center">
                      <Text size="sm" className="text-typography-700 font-medium">
                        SHA-256 哈希 (Hex)
                      </Text>
                      <Button
                        variant="outline"
                        size="xs"
                        onPress={() => copyToClipboard(signResult.hash, 'SHA-256哈希')}>
                        <ButtonText size="xs">复制</ButtonText>
                      </Button>
                    </HStack>
                    <Box className="bg-background-100 p-3 rounded-md">
                      <Text size="xs" className="text-typography-700 font-mono whitespace-nowrap overflow-x-auto">
                        {signResult.hash}
                      </Text>
                    </Box>
                  </VStack>

                  {/* Ed25519 签名 */}
                  <VStack space="sm">
                    <HStack className="justify-between items-center">
                      <Text size="sm" className="text-typography-700 font-medium">
                        Ed25519 签名 (Base64)
                      </Text>
                      <Button
                        variant="outline"
                        size="xs"
                        onPress={() => copyToClipboard(signResult.signature, 'Ed25519签名')}>
                        <ButtonText size="xs">复制</ButtonText>
                      </Button>
                    </HStack>
                    <Box className="bg-background-100 p-3 rounded-md">
                      <Text size="xs" className="text-typography-700 font-mono  whitespace-nowrap overflow-x-auto">
                        {signResult.signature}
                      </Text>
                    </Box>
                  </VStack>

                  {/* 公钥 */}
                  <VStack space="sm">
                    <HStack className="justify-between items-center">
                      <Text size="sm" className="text-typography-700 font-medium">
                        公钥 (Base64)
                      </Text>
                      <Button variant="outline" size="xs" onPress={() => copyToClipboard(signResult.publicKey, '公钥')}>
                        <ButtonText size="xs">复制</ButtonText>
                      </Button>
                    </HStack>
                    <Box className="bg-background-100 p-3 rounded-md">
                      <Text size="xs" className="text-typography-700 font-mono  whitespace-nowrap overflow-x-auto">
                        {signResult.publicKey}
                      </Text>
                    </Box>
                  </VStack>
                </VStack>
              </Card>
            )}

            {/* 操作按钮 */}
            <HStack space="md" className="pt-2">
              <Button
                variant="solid"
                action="primary"
                className="flex-1"
                onPress={handleHashAndSign}
                disabled={isSigning}>
                <ButtonText>{isSigning ? '签名中...' : 'Hash + Sign'}</ButtonText>
              </Button>

              <Button
                variant="outline"
                action="secondary"
                className="flex-1"
                onPress={handleClear}
                disabled={isSigning}>
                <ButtonText>清空</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>

      {/* Profile 模态框 */}
      <ProfileModal />
    </SafeAreaView>
  );
}
