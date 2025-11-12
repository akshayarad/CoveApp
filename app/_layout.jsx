import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from "../constants/Colors"
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../contexts/UserContext'
import { LogsProvider } from '../contexts/LogsContext'

import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from "react"
import {
  useFonts,
  MPLUSRounded1c_400Regular,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold
} from '@expo-google-fonts/m-plus-rounded-1c'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark

  const [fontsLoaded] = useFonts({
    MPLUSRounded1c_400Regular,
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <UserProvider>
      <LogsProvider>
        <StatusBar value="auto" />
        <Stack screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
          headerTitleStyle: {
            fontFamily: 'MPLUSRounded1c_700Bold',  // Add font to headers
          },
        }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="logs" options={{ title: '' }} />

        </Stack>
      </LogsProvider>
    </UserProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})