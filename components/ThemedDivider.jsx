import { StyleSheet, useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedDivider = ({ style, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark

  return (
    <View 
      style={[{ backgroundColor: theme.text }, styles.divider, style]}
      {...props}
    />
  )
}

export default ThemedDivider

const styles = StyleSheet.create({
  divider: {
    width: '85%',
    height: 2,
    alignSelf: 'center',
    marginVertical: 10,
    opacity: 0.3,  // boldness
  }
})