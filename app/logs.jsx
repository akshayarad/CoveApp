import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Logs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Logs</Text>

      <Link href="/" style= {styles.link}> Back Home</Link>
    </View>
  )
}

export default Logs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    }
})