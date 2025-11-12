import { StyleSheet, Text } from 'react-native'
import { useUser } from '../../hooks/useUser'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from '../../components/ThemedButton'
import ThemedCove from '../../components/ThemedCove'

const Profile = () => {
  const {logout, user} = useUser()
  
  return (
    <ThemedView style={styles.container}>
      <ThemedCove style={styles.img}/>
      
      <Spacer height={20} />

      <ThemedText title={true} style={styles.heading}>
        Hi {user.name}!
      </ThemedText>
      
      <Spacer height={20} />

      <ThemedText style={styles.subheading}>
        Your Email: {user.email}
      </ThemedText>

      <Spacer height={150} />

      <ThemedButton onPress={logout}>
        <ThemedText style={{color: '#274472'}}> 
          Log out
        </ThemedText>
      </ThemedButton>

    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,  
  },
  img: {
    marginBottom: 20,
    marginTop: 55,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  subheading: {
    fontWeight: "bold",
    fontSize: 20,  // made smaller (was 30)
    textAlign: "center",
  },
})