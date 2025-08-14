import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"


const YourResources = () => {
  return (
    <ThemedView style={styles.container}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Resources!
      </ThemedText>

      <Link href = "/logs" style={styles.link}> 
    <ThemedText>Your Logs!</ThemedText>
    </Link>

    </ThemedView>
  )
}

export default YourResources

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
}
})