import { StyleSheet} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'

const Logs = () => {
  return (
    <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>Your Logs</ThemedText>

    <Link href="/" style= {styles.link}>
    <ThemedText> Back Home </ThemedText>
    </Link>
  </ThemedView>
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