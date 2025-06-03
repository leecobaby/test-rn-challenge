import React from 'react';
import { useAtom } from 'jotai';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  verifyMessageAtom,
  verifyPublicKeyAtom,
  verifySignatureAtom,
  verifyResultAtom,
  isVerifyingAtom,
} from '@/store/atomState';
import { verifySignature } from '@/utils/crypto';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';

export default function VerifyScreen() {
  const [message, setMessage] = useAtom(verifyMessageAtom);
  const [publicKey, setPublicKey] = useAtom(verifyPublicKeyAtom);
  const [signature, setSignature] = useAtom(verifySignatureAtom);
  const [verifyResult, setVerifyResult] = useAtom(verifyResultAtom);
  const [isVerifying, setIsVerifying] = useAtom(isVerifyingAtom);

  // Signature verification handler
  const handleVerify = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message to verify');
      return;
    }

    if (!publicKey.trim()) {
      Alert.alert('Error', 'Please enter a public key');
      return;
    }

    if (!signature.trim()) {
      Alert.alert('Error', 'Please enter a signature');
      return;
    }

    setIsVerifying(true);
    try {
      const result = await verifySignature(message, signature, publicKey);
      setVerifyResult(result);
    } catch (error) {
      console.error('Error during verification:', error);
      Alert.alert('Error', 'An error occurred during verification, please check the input format');
      setVerifyResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  // Clear all inputs
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
            {/* Page Title */}
            <Box className="mb-2">
              <Heading size="xl" className="text-typography-900">
                Signature Verification
              </Heading>
              <Text size="sm" className="text-typography-500 mt-1">
                Enter message, public key and signature to verify the signature validity
              </Text>
            </Box>

            {/* Message Input Card */}
            <Card className="p-4">
              <VStack space="md">
                <Heading size="md">Message Content</Heading>
                <Textarea size="lg">
                  <TextareaInput
                    placeholder="Enter message to verify..."
                    value={message}
                    onChangeText={setMessage}
                    className="min-h-24"
                  />
                </Textarea>
              </VStack>
            </Card>

            {/* Verification Info Input Card */}
            <Card className="p-4">
              <VStack space="md">
                <Heading size="md">Verification Info</Heading>

                <VStack space="sm">
                  <Text size="sm" className="text-typography-700 font-medium">
                    Public Key (Base64)
                  </Text>
                  <Input size="lg">
                    <InputField placeholder="Enter public key..." value={publicKey} onChangeText={setPublicKey} />
                  </Input>
                </VStack>

                <VStack space="sm">
                  <Text size="sm" className="text-typography-700 font-medium">
                    Signature (Base64)
                  </Text>
                  <Textarea size="lg">
                    <TextareaInput
                      placeholder="Enter signature..."
                      value={signature}
                      onChangeText={setSignature}
                      className="min-h-20"
                    />
                  </Textarea>
                </VStack>
              </VStack>
            </Card>

            {/* Verification Result Display */}
            {verifyResult !== null && (
              <Card
                className={`p-4 ${verifyResult ? 'border-success-300 bg-success-50' : 'border-error-300 bg-error-50'}`}>
                <VStack space="sm">
                  <Heading size="md" className={verifyResult ? 'text-success-700' : 'text-error-700'}>
                    Verification Result
                  </Heading>
                  <Text size="lg" className={`font-semibold ${verifyResult ? 'text-success-700' : 'text-error-700'}`}>
                    {verifyResult ? '✅ Signature Valid' : '❌ Signature Invalid'}
                  </Text>
                </VStack>
              </Card>
            )}

            {/* Action Buttons */}
            <HStack space="md" className="pt-2">
              <Button variant="solid" action="primary" className="flex-1" onPress={handleVerify} disabled={isVerifying}>
                <ButtonText>{isVerifying ? 'Verifying...' : 'Verify Signature'}</ButtonText>
              </Button>

              <Button
                variant="outline"
                action="secondary"
                className="flex-1"
                onPress={handleClear}
                disabled={isVerifying}>
                <ButtonText>Clear</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
