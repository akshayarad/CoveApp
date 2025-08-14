import { StyleSheet, Pressable, Text} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Colors } from "../../constants/Colors"


// themed components

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'

const Login = () => {
    const handleSubmit = () => {
      console.log('login form submitted')
    }
  return (
    <ThemedView style={styles.container}>
      <Spacer/>
      <ThemedText title={true} style={styles.title}>
        LOG IN
        </ThemedText>

        <ThemedButton onPress={handleSubmit}>
        <Text style={{color: '#274472' }}>
            Log in!
          </Text>
        </ThemedButton>


        <Spacer height={100} />
        <Link href= '/register'>
        <ThemedText style={{textAlign:'center'}}>
          Dont have an account? Register 
        </ThemedText>
        </Link>
    </ThemedView>

  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    width: 260,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  pressed: {
    opacity: 0.8
  }
})
