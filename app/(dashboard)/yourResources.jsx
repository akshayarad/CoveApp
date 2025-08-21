import { StyleSheet } from 'react-native'
import { Link, router } from 'expo-router'
import { useRouter } from 'expo-router'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from '../../components/ThemedButton'


const YourResources = () => {
  const router = useRouter()
  return (
    <ThemedView style={styles.container}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Resources!
      </ThemedText>

     
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