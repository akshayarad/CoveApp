import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from "../constants/Colors"
import { StatusBar } from 'expo-status-bar'
import { UserProvider } from '../contexts/UserContext'

// font stuff
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from "react"
import {TextInput } from "react-native"
import { useFonts,
  MPLUSRounded1c_400Regular,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold
} from '@expo-google-fonts/m-plus-rounded-1c';
//font stuff
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors [colorScheme] ?? Colors.dark
    // font stuff
    const [fontsLoaded] = useFonts({
      MPLUSRounded1c_400Regular,
      MPLUSRounded1c_500Medium,
      MPLUSRounded1c_700Bold,
    });
    
    useEffect(() => {
      if (!fontsLoaded) return;
    
      if (Text.defaultProps == null) Text.defaultProps = {};
      if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    
      Text.defaultProps.style = [{ fontFamily: 'MPLUSRounded1c_400Regular' }, Text.defaultProps.style];
      TextInput.defaultProps.style = [{ fontFamily: 'MPLUSRounded1c_400Regular' }, TextInput.defaultProps.style];
      SplashScreen.hideAsync();
    }, [fontsLoaded]);
  
    if (!fontsLoaded) return null;


 return (
    <UserProvider>
    <StatusBar value="auto" />
     <Stack screenOptions= {{
        headerStyle: {backgroundColor: theme.navBackground},
        headerTintColor: theme.title,
     }}>
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(dashboard)" options={{headerShown: false}} />
        <Stack.Screen name="index" options={{title: 'Home'}} />
        <Stack.Screen name="logs" options={{title: 'Your Logs'}} />
     </Stack>
     </UserProvider>
  
  )
}

export default RootLayout

const styles = StyleSheet.create({})
