import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Colors } from "../../constants/Colors"
import { Ionicons } from '@expo/vector-icons'
import UserOnly from '../../components/auth/UserOnly'

const DashboardLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark
  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,  // hides labels
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >

<Tabs.Screen
          name="chat"
          options={{
            title: 'Chat', tabBarIcon: ({ focused }) => (
              <Ionicons
                size={30}
                name="chatbox-ellipses-outline"
                color={focused ? theme.iconColorFocused :
                  theme.iconColor}
              />)
          }}

        />
        

        


        <Tabs.Screen name="moodLog"
          options={{
            title: 'Mood Log', tabBarIcon: ({ focused }) => (
              <Ionicons
                size={30}
                name="create-outline"
                color={focused ? theme.iconColorFocused :
                  theme.iconColor}
              />)
          }}
        />


        
        <Tabs.Screen
          name="logs/[id]"
          options={{ href: null }}
        />

        <Tabs.Screen
          name="logs"
          options={{
            title: 'Logs', tabBarIcon: ({ focused }) => (
              <Ionicons
                size={30}
                name="folder-open-outline"
                color={focused ? theme.iconColorFocused :
                  theme.iconColor}
              />)
          }}
        />

<Tabs.Screen name="moodInsights"
          options={{
            title: 'Resources', tabBarIcon: ({ focused }) => (
              <Ionicons
                size={30}
                name="bar-chart-outline"
                color={focused ? theme.iconColorFocused :
                  theme.iconColor}
              />
            )
          }}
        />

<Tabs.Screen name="profile"
          options={{
            title: 'Profile', tabBarIcon: ({ focused }) => (
              <Ionicons
                size={30}
                name="person"
                color={focused ? theme.iconColorFocused :
                  theme.iconColor}
              />
            )
          }}
        />


      </Tabs>
    </UserOnly>
  )
}

export default DashboardLayout