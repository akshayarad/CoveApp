import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useLogs } from "../../hooks/useLogs"
import { useRouter } from 'expo-router'
import { useState } from 'react'

// themed components
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedTextInput from "../../components/ThemedTextInput"
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import { MOOD_OPTIONS } from '../../constants/Moods'

const MoodChart = () => {
  const [date, setDate] = useState("")
  const [moods, setMoods] = useState("")
  const [score, setScore] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)


  const { createLog } = useLogs()
  const router = useRouter()

  async function handleSubmit() {
    try {
      setLoading(true)

      // Date: accept empty as now, or parse user input
      let parsedDate
      if (!date || date.trim().length === 0) {
        parsedDate = new Date()
      } else {
        const tentative = new Date(date)
        if (Number.isNaN(tentative.getTime())) {
          Alert.alert('Invalid date', 'Please enter a valid date, e.g., 2025-01-31 or 2025-01-31T14:30')
          setLoading(false)
          return
        }
        parsedDate = tentative
      }
      const dateISO = parsedDate.toISOString()

      // Mood: must be one of enum values (case-insensitive)
      const normalizedMood = (moods || '').toString().trim().toLowerCase()
      const allowed = MOOD_OPTIONS.map(m => m.toLowerCase())
      if (!allowed.includes(normalizedMood)) {
        Alert.alert(
          'Invalid mood',
          `Mood must be one of: ${MOOD_OPTIONS.join(', ')}`
        )
        setLoading(false)
        return
      }
      const moodValue = MOOD_OPTIONS[allowed.indexOf(normalizedMood)]

      // Score: integer
      const parsedScore = parseInt((score || '').toString().trim(), 10)
      if (Number.isNaN(parsedScore)) {
        Alert.alert('Invalid score', 'Score must be an integer')
        setLoading(false)
        return
      }

      await createLog({
        date: dateISO,
        moods: moodValue,
        score: parsedScore,
        description: description || ''
      })

      // Reset and navigate
      setDate("")
      setMoods("")
      setScore("")
      setDescription("")
      router.push('/logs')
    } catch (error) {
      Alert.alert('Failed to create log', error?.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <ThemedView style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
        Add a New Log
      </ThemedText>
      <Spacer />

      <ThemedTextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD or ISO)"
        value={date}
        onChangeText={setDate}
      />
      <Spacer />

      <ThemedTextInput
        style={styles.input}
        placeholder={`Mood (${MOOD_OPTIONS.join(', ')})`}
        value={moods}
        onChangeText={setMoods}
      />
      <Spacer />

      <ThemedTextInput
        style={styles.input}
        placeholder="Score"
        value={score}
        onChangeText={setScore}
        keyboardType="numeric"
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