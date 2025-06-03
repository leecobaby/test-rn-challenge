import 'react-native-reanimated';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Provider, useAtom } from 'jotai';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { isIOS } from '@/utils/platform';
import { colorSchemeAtom } from '@/store/atomState';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

function RootLayoutContent() {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (systemColorScheme) {
      setColorScheme(systemColorScheme);
    }
  }, [systemColorScheme, setColorScheme]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GluestackUIProvider mode={colorScheme === 'dark' ? 'dark' : 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="profile-modal"
            options={{
              presentation: 'modal',
              headerShown: !isIOS(),
              headerBackVisible: true,
              headerStyle: {
                backgroundColor: '#f3f4f6',
              },
              headerTintColor: '#374151',
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider>
      <RootLayoutContent />
    </Provider>
  );
}
