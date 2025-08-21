import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useLogs } from "../../hooks/useLogs"
import { useRouter } from 'expo-router'
import { useState } from 'react'

// themed components
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedTextInput from "../../components/ThemedTextInput"
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const MoodChart = () => {
  const [date, setDate] = useState()
  const [moods, setMoods] = useState()
  const [score, setScore] = useState()
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)


  const { createLog } = useLogs()
  const router = useRouter()

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <ThemedView style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
        Add a New Log
      </ThemedText>
      <Spacer />

      <ThemedTextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Spacer />

      <ThemedTextInput
        style={styles.input}
        placeholder="Moods"
        value={moods}
        onChangeText={setMoods}
      />
      <Spacer />

      <ThemedTextInput
        style={styles.input}
        placeholder="Score"
        value={score}
        onChangeText={setScore}
      />

      <Spacer />

      <ThemedTextInput
        style={styles.multiline}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <Spacer />

      <ThemedButton onPress={handleSubmit} disabled={loading}>
        <Text style={{ color: '#274472' }}>
          {loading ? "Saving..." : "Create Log"}
        </Text>
      </ThemedButton>

    </ThemedView>
  </TouchableWithoutFeedback>
)
}

export default MoodChart

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
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 100,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
})