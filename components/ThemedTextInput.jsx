import {TextInput, useColorScheme} from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'


const ThemedTextInput = ({style, ...props}) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.dark
  return (
    <TextInput 
        style={[
            {
                borderWidth: 1, 
                borderColor: theme.uiBackground, 
                color: theme.uiBackground,
                padding:20,
                borderRadius: 30
            },
            style
        ]}
        {...props}
    />
  )
}

export default ThemedTextInput

