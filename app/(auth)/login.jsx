import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Colors } from "../../constants/Colors"
import { useUser } from '../../hooks/useUser'



// themed components

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'

const Login = () => {
  const[email, setEmail] = useState('')
  // set email updates that value to be the email so u call set email func
  const[password, setPassword] = useState('')
  const { login } = useUser()

    const handleSubmit = async () => {
      try {
        await login(email, password)
      } catch (error) {   
      }
    }

  return (
    //touchablewofeedback means u can click anywhere on screen to exit keyboard
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style={styles.container}>
      <Spacer/>
      <ThemedText title={true} style={styles.title}>
        LOG IN
        </ThemedText>

        <ThemedTextInput 
        style ={{width: '80%', marginBottom:20}}
        placeholder= "Email" 
        keyboardType="email-address" // puts the @ symbol on the keyboard omg so cool
        onChangeText={setEmail}
        value={email}
      />

        <ThemedTextInput 
        style ={{width: '80%', marginBottom:20}}
        placeholder= "Password" 
        onChangeText={setPassword}
        value={password}
        secureTextEntry // makes the characters dots ahhh cute
      />

        
        <Spacer/>


        <ThemedButton onPress={handleSubmit}>
        <Text style={{color: '#274472' }}>
            Log in!
          </Text>
        </ThemedButton>


        <Spacer height={100} />
        <Link href= '/register'>
        <ThemedText style={{textAlign:'center'}}>
          Dont have an account? Register here :)
        </ThemedText>
        </Link>
    </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
