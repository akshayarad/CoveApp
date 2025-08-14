import { StyleSheet } from 'react-native'

// themed stuff
import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedCove from '../../components/ThemedCove'
import ThemedView from "../../components/ThemedView"

const Chat = () => {
  return (
    <ThemedView style={styles.container}>
    <ThemedCove style={styles.img}/>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Its time to vent... 
      </ThemedText>

    </ThemedView>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginBottom: 20,
    position: 'relative',
    top: -160, 
},
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})