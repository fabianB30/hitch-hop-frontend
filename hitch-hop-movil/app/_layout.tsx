import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Exo': require('../assets/fonts/static/Exo-Regular.ttf'),
    'Exo-Bold': require('../assets/fonts/static/Exo-Bold.ttf'),
    'Exo-Italic': require('../assets/fonts/static/Exo-Italic.ttf'),
    'Exo-BoldItalic': require('../assets/fonts/static/Exo-BoldItalic.ttf'),
    'Exo-ExtraBold': require('../assets/fonts/static/Exo-ExtraBold.ttf'),
    'Exo-ExtraBoldItalic': require('../assets/fonts/static/Exo-ExtraBoldItalic.ttf'),
    'Exo-Light': require('../assets/fonts/static/Exo-Light.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GluestackUIProvider mode="light"><ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider></GluestackUIProvider>
  );
}
