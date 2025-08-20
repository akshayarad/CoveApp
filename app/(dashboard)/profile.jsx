import { StyleSheet, Text } from 'react-native'
import { useUser } from '../../hooks/useUser'


import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from '../../components/ThemedButton'

const Profile = () => {
  const {logout, user} = useUser()
  return (
    <ThemedView style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
       Hi {user.name}!
      </ThemedText>
      <Spacer />

      <ThemedText>Your Email: {user.email}</ThemedText>

      <Spacer />

      <ThemedButton onPress={logout}>
        <Text style= {{color: '#274472'}}> 
          Log out
        </Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})