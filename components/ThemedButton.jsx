import { Pressable, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

function ThemedButton({ style, ...props }) {
    // like onPressed prop for example

  return (
    <Pressable 
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]} 
      {...props}
    />
  )
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 30,
    alignSelf: 'center',
    width: 220,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  pressed: {
    opacity: 0.5
  },
})

export default ThemedButton