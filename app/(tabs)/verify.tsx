import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAtom } from 'jotai';

import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';

import {
  verifyMessageAtom,
  verifyPublicKeyAtom,
  verifySignatureAtom,
  verifyResultAtom,
  isVerifyingAtom,
} from '@/store/atomState';

import { verifySignature } from '@/utils/crypto';

export default function VerifyScreen() {
  const [message, setMessage] = useAtom(verifyMessageAtom);
  const [publicKey, setPublicKey] = useAtom(verifyPublicKeyAtom);
  const [signature, setSignature] = useAtom(verifySignatureAtom);
  const [verifyResult, setVerifyResult] = useAtom(verifyResultAtom);
  const [isVerifying, setIsVerifying] = useAtom(isVerifyingAtom);

  // 验证签名处理函数
  const handleVerify = async () => {
    if (!message.trim()) {
      Alert.alert('错误', '请输入要验证的消息');
      return;
    }

    if (!publicKey.trim()) {
      Alert.alert('错误', '请输入公钥');
      return;
    }

    if (!signature.trim()) {
      Alert.alert('错误', '请输入签名');
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifySignature(message, signature, publicKey);
      setVerifyResult(result);
    } catch (error) {
      console.error('验证过程中发生错误:', error);
      Alert.alert('错误', '验证过程中发生错误，请检查输入格式');
      setVerifyResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  // 清空所有输入
  const handleClear = () => {
    setMessage('');
    setPublicKey('');
    setSignature('');
    setVerifyResult(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <Box className="p-4">
          <VStack space="lg">
            {/* 页面标题 */}
            <Box className="mb-2">
              <Heading size="xl" className="text-typography-900">
                签名验证
              </Heading>
              <Text size="sm" className="text-typography-500 mt-1">
                输入消息、公钥和签名来验证签名的有效性
              </Text>
            </Box>

            {/* 消息输入卡片 */}
            <Card className="p-4">
              <VStack space="md">
                <Heading size="md">消息内容</Heading>
                <Textarea size="lg">
                  <TextareaInput
                    placeholder="请输入要验证的消息..."
                    value={message}
                    onChangeText={setMessage}
                    className="min-h-24"
                  />
                </Textarea>
              </VStack>
            </Card>

            {/* 验证信息输入卡片 */}
            <Card className="p-4">
              <VStack space="md">
                <Heading size="md">验证信息</Heading>

                <VStack space="sm">
                  <Text size="sm" className="text-typography-700 font-medium">
                    公钥 (Base64)
                  </Text>
                  <Input size="lg">
                    <InputField placeholder="请输入公钥..." value={publicKey} onChangeText={setPublicKey} />
                  </Input>
                </VStack>

                <VStack space="sm">
                  <Text size="sm" className="text-typography-700 font-medium">
                    签名 (Base64)
                  </Text>
                  <Textarea size="lg">
                    <TextareaInput
                      placeholder="请输入签名..."
                      value={signature}
                      onChangeText={setSignature}
                      className="min-h-20"
                    />
                  </Textarea>
                </VStack>
              </VStack>
            </Card>

            {/* 验证结果显示 */}
            {verifyResult !== null && (
              <Card
                className={`p-4 ${verifyResult ? 'border-success-300 bg-success-50' : 'border-error-300 bg-error-50'}`}>
                <VStack space="sm">
                  <Heading size="md" className={verifyResult ? 'text-success-700' : 'text-error-700'}>
                    验证结果
                  </Heading>
                  <Text size="lg" className={`font-semibold ${verifyResult ? 'text-success-700' : 'text-error-700'}`}>
                    {verifyResult ? '✅ 签名有效' : '❌ 签名无效'}
                  </Text>
                </VStack>
              </Card>
            )}

            {/* 操作按钮 */}
            <HStack space="md" className="pt-2">
              <Button variant="solid" action="primary" className="flex-1" onPress={handleVerify} disabled={isVerifying}>
                <ButtonText>{isVerifying ? '验证中...' : '验证签名'}</ButtonText>
              </Button>

              <Button
                variant="outline"
                action="secondary"
                className="flex-1"
                onPress={handleClear}
                disabled={isVerifying}>
                <ButtonText>清空</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
