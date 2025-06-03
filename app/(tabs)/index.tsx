import React from 'react';
import { useAtom } from 'jotai';
import { ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';

import { hashAndSign } from '@/utils/crypto';
import { Card } from '@/components/ui/card';
import { isWeb } from '@/utils/platform';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { ProfileScreen } from '@/components/profile/ProfileScreen';
import { messageAtom, signResultAtom, isSigningAtom, isProfileDrawerOpenAtom } from '@/store/atomState';

export default function SignScreen() {
  const router = useRouter();
  const [message, setMessage] = useAtom(messageAtom);
  const [signResult, setSignResult] = useAtom(signResultAtom);
  const [isSigning, setIsSigning] = useAtom(isSigningAtom);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useAtom(isProfileDrawerOpenAtom);

  const handleHashAndSign = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message to sign');
      return;
    }

    setIsSigning(true);
    try {
      const result = await hashAndSign(message);
      setSignResult(result);
    } catch (error) {
      console.error('Error during signing:', error);
      Alert.alert('Error', 'An error occurred during signing, please try again');
    } finally {
      setIsSigning(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    Clipboard.setStringAsync(text);
    Alert.alert('Success', `${label} copied to clipboard`);
  };

  const handleClear = () => {
    setMessage('');
    setSignResult(null);
  };

  const handleOpenProfile = () => {
    if (isWeb()) {
      setIsProfileDrawerOpen(true);
    } else {
      router.push('/profile-modal');
    }
  };

  const handleAction = (action: string, data?: any) => {
    console.log(`Action: ${action}`, data);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <Box className="p-4">
          <VStack space="lg">
            {/* Page title and Profile button */}
            <HStack className="justify-between items-center mb-2">
              <Box className="flex-1">
                <Heading size="xl" className="text-typography-900">
                  Digital Signature
                </Heading>
                <Text size="sm" className="text-typography-500 mt-1">
                  Enter message for SHA-256 hash and Ed25519 signature
                </Text>
              </Box>
              <Button variant="outline" size="sm" onPress={handleOpenProfile} className="ml-4">
                <ButtonText>Profile</ButtonText>
              </Button>
            </HStack>

            {/* Message input card */}
            <Card className="p-4">
              <VStack space="md">
                <Heading size="md">Message Content</Heading>
                <Textarea size="lg">
                  <TextareaInput
                    placeholder="Enter message to sign..."
                    value={message}
                    onChangeText={setMessage}
                    className="min-h-32"
                  />
                </Textarea>
              </VStack>
            </Card>

            {/* Signature result display */}
            {signResult && (
              <Card className="p-4 border-success-300 bg-success-50">
                <VStack space="md">
                  <Heading size="md" className="text-success-700">
                    Signature Result
                  </Heading>

                  {/* SHA-256 Hash */}
                  <VStack space="sm">
                    <HStack className="justify-between items-center">
                      <Text size="sm" className="text-typography-700 font-medium">
                        SHA-256 Hash (Hex)
                      </Text>
                      <Button
                        variant="outline"
                        size="xs"
                        onPress={() => copyToClipboard(signResult.hash, 'SHA-256 Hash')}>
                        <ButtonText size="xs">Copy</ButtonText>
                      </Button>
                    </HStack>
                    <Box className="bg-background-100 p-3 rounded-md">
                      <Text size="xs" className="text-typography-700 font-mono whitespace-nowrap overflow-x-auto">
                        {signResult.hash}
                      </Text>
                    </Box>
                  </VStack>

                  {/* Ed25519 Signature */}
                  <VStack space="sm">
                    <HStack className="justify-between items-center">
                      <Text size="sm" className="text-typography-700 font-medium">
                        Ed25519 Signature (Base64)
                      </Text>
                      <Button
                        variant="outline"
                        size="xs"
                        onPress={() => copyToClipboard(signResult.signature, 'Ed25519 Signature')}>
                        <ButtonText size="xs">Copy</ButtonText>
                      </Button>
                    </HStack>
                    <Box className="bg-background-100 p-3 rounded-md">
                      <Text size="xs" className="text-typography-700 font-mono  whitespace-nowrap overflow-x-auto">
                        {signResult.signature}
                      </Text>
                    </Box>
                  </VStack>

                  {/* Public Key */}
                  <VStack space="sm">
                    <HStack className="justify-between items-center">
                      <Text size="sm" className="text-typography-700 font-medium">
                        Public Key (Base64)
                      </Text>
                      <Button
                        variant="outline"
                        size="xs"
                        onPress={() => copyToClipboard(signResult.publicKey, 'Public Key')}>
                        <ButtonText size="xs">Copy</ButtonText>
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

            {/* Action buttons */}
            <HStack space="md" className="pt-2">
              <Button
                variant="solid"
                action="primary"
                className="flex-1"
                onPress={handleHashAndSign}
                disabled={isSigning}>
                <ButtonText>{isSigning ? 'Signing...' : 'Hash + Sign'}</ButtonText>
              </Button>

              <Button
                variant="outline"
                action="secondary"
                className="flex-1"
                onPress={handleClear}
                disabled={isSigning}>
                <ButtonText>Clear</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>

      {/* Profile modal */}
      {isWeb() && (
        <ProfileScreen
          open={isProfileDrawerOpen}
          onOpenChange={setIsProfileDrawerOpen}
          onJoinPress={() => handleAction('join')}
          onMenuPress={() => handleAction('menu')}
          onMorePress={() => handleAction('more')}
          onProductPress={product => handleAction('product', product)}
          onComingSoonItemPress={item => handleAction('comingSoon', item)}
          onSeeAllPress={() => handleAction('seeAll')}
          onTabPress={tabId => handleAction('tab', tabId)}
        />
      )}
    </SafeAreaView>
  );
}
