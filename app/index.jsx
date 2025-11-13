import { StyleSheet, View } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import { useRouter } from 'expo-router'


// Themed components
import ThemedView from '../components/ThemedView'
import ThemedCove from '../components/ThemedCove'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'


const Home = () => {
  const router = useRouter()

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedCove />

        <ThemedText style={styles.title} title={true}>
          Welcome to Your Safe Space 💖
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Your feelings are ALWAYS valid 🌷
        </ThemedText>
      </View>

      <Spacer height={40} />

      <ThemedText style={styles.desc}>
        If you’d like to log your mood for today, head over to the mood log page!
        Or take a peek at your past logs to reflect on your growth 💫
      </ThemedText>

      <Spacer height={80} />

      <ThemedButton
        onPress={() => router.push('/chat')}
        style={styles.button}
      >
         <ThemedText>
         💬 Click here to get started!
         </ThemedText>
      </ThemedButton>


    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  cove: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 6,
  },
  desc: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  link: {
    textDecorationLine: 'none',
  },
  button: {
    backgroundColor: 'rgba(255, 182, 193, 0.6)', 
    margin: 10,
    width: '80%', 

  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
})
