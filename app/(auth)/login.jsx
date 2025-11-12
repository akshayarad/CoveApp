import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { Colors } from "../../constants/Colors"
import { useUser } from '../../hooks/useUser'



// themed components

import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'


const Login = () => {
  const router = useRouter()
  const[email, setEmail] = useState('')
  // set email updates that value to be the email so u call set email func
  const[password, setPassword] = useState('')
  const [error, setError] = useState (null)
  const { login } = useUser()

    const handleSubmit = async () => {
      setError(null)
      try {
        await login(email, password)
        router.replace('/profile')
      } catch (error) {  
        setError(error.message) 
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
        <ThemedText style={{color: '#274472' }}>
            Log in!
          </ThemedText>
        </ThemedButton>

        <Spacer/>
        {error && <Text style={styles.error}>{error}</Text>}


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
    fontSize: 40,
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
  },
  error: {
    color: Colors.warning,
    padding: 10,
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
})
