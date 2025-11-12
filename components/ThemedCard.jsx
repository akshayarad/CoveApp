import { StyleSheet, useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'

const ThemedCard = ({ style, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark

  return (
    <View 
      style={[{ backgroundColor: theme.details}, styles.card, style]}
      {...props}
    />
  )
}

export default ThemedCard

const styles = StyleSheet.create({
  card: {
    borderRadius: 30,
    padding: 30,
  }
})