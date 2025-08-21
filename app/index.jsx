import { StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

import { useFonts, M_PLUS_Rounded_1c_400Regular, M_PLUS_Rounded_1c_700Bold } from '@expo-google-fonts/m-plus-rounded-1c'



//themed components
import ThemedView from '../components/ThemedView'
import ThemedCove from '../components/ThemedCove'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'


const Home = () => {
  return (
    <ThemedView style={styles.container}>
        <ThemedCove style={styles.img}/>

      <ThemedText style={styles.title} title={true}>
        Your Safe Space
        </ThemedText>

        <Spacer height= {10} />
      <ThemedText> Vent about anything and everything  </ThemedText>
      <Spacer height={120} />

   <Link href = "/profile" style={styles.link}> 
    <ThemedText style={styles.title}>Click here to get started :) </ThemedText>
    </Link>

  
   
  
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    img: {
        marginBottom: 8,  
 },
    link: {
        marginVertical: 10,
    }
})