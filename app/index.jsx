import { StyleSheet, Text } from 'react-native'
import LightCove from '../assets/img/LightCove.png'
import { Link } from 'expo-router'
import React from 'react'


//themed components
import ThemedView from '../components/ThemedView'
import ThemedCove from '../components/ThemedCove'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'


const Home = () => {
  return (
    <ThemedView style={styles.container}>
        <ThemedCove style={styles.img}/>
        <Spacer height={10} />

      <ThemedText style={styles.title} title={true}>
        Your Safe Space
        </ThemedText>

        <Spacer height= {10} />
      <ThemedText> Venting App </ThemedText>
      <Spacer />

    <Link href = "/resources" style={styles.link}> 
    <ThemedText>Resources</ThemedText>
    </Link>
    <Link href = "/resources" style={styles.link}> 
    <ThemedText>Logs</ThemedText>
    </Link>
    </ThemedView>
  )
}

export default Home

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
    img: {
        marginBottom: 20,
        position: 'relative',
        top: -160, // adjust this until it looks right
 },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    }
})