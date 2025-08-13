import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from "../constants/Colors"
import { StatusBar } from 'expo-status-bar'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors [colorScheme] ?? Colors.dark

 return (
    <>
    <StatusBar value="auto" />
     <Stack screenOptions= {{
        headerStyle: {backgroundColor: theme.navBackground},
        headerTintColor: theme.title,
     }}>
        <Stack.Screen name="index" options={{title: 'Home'}} />
        <Stack.Screen name="logs" options={{title: 'Your Logs'}} />
        <Stack.Screen name="resources" options={{title: 'Resources'}} />
     </Stack>
     </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})


