import { Text, useColorScheme, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedText = ({ style, title = false, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark

  const textColor = title ? theme.title : theme.text

  return (
    <Text 
      style={[
        styles.text,
        { color: textColor },
        title && styles.title,
        style
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'MPLUSRounded1c_400Regular',
  },
})

export default ThemedText