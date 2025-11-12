import { Modal, View, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const ThemedModal = ({ visible, onRequestClose, children, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark

  // Specific modal colors
  const modalColors = {
    background: colorScheme === 'dark' ? '#E1EEF8' : '#274472', // light blue for dark mode, dark blue for light mode
    divider: colorScheme === 'dark' ? '#274472' : '#E1EEF8', // opposite colors for dividers
    text: colorScheme === 'dark' ? '#274472' : '#FAF3E0', // dark blue for dark mode, dark blue for light mode
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
      {...props}
    >
      <View style={styles.modalOverlay}>
        <View style={[
          styles.modalContent,
          { backgroundColor: modalColors.background }
        ]}>
          {/* pass modal colors to children via context or clone */}
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { modalColors })
            }
            return child
          })}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    maxHeight: '70%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default ThemedModal