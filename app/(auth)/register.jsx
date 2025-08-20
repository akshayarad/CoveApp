import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Colors } from "../../constants/Colors"


// themed components

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'
import { useUser } from '../../hooks/useUser'

const Register = () => {
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
    // set email updates that value to be the email so u call set email func
  const[password, setPassword] = useState('')

  const {register} = useUser ()


  
  const handleSubmit = async () => {
    try {
      await register(name, email, password)
    } catch (error) {
    }
  }


  return (
    //touchablewofeedback means u can click anywhere on screen to exit keyboard
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style={styles.container}>
      <Spacer/>
      <ThemedText title={true} style={styles.title}>
        REGISTER
        </ThemedText>

        <ThemedTextInput 
        style ={{width: '80%', marginBottom:20}}
        placeholder= "Full Name" 
        onChangeText={setName}
        value={name}
      />

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
       

        <ThemedButton onPress={handleSubmit}>
        <Text style={{color: '#274472' }}>
            Register!
          </Text>   
        </ThemedButton>

        <Spacer height={100} />
        <Link href= '/login'>
        <ThemedText style={{textAlign:'center'}}>
          Have an account? Log in here :)
        </ThemedText>
        </Link>
    </ThemedView>
    </TouchableWithoutFeedback>

  )
}

export default Register

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
})
