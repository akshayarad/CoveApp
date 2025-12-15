import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Alert, FlatList, TouchableOpacity, View, ScrollView, useColorScheme } from 'react-native'
import { useLogs } from "../../hooks/useLogs"
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Link } from 'expo-router'


import { MOOD_OPTIONS } from '../../constants/Moods'

// themed components
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedTextInput from "../../components/ThemedTextInput"
import ThemedButton from '../../components/ThemedButton'
import ThemedDivider from '../../components/ThemedDivider' 
import Spacer from '../../components/Spacer'
import ThemedModal from '../../components/ThemedModal'


const MoodChart = () => {
  const [date, setDate] = useState("")
  const [moods, setMoods] = useState("")
  const [score, setScore] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [showMoodModal, setShowMoodModal] = useState(false)

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.dark

  const { createLog } = useLogs()
  const router = useRouter()

  const handleMoodSelect = (mood) => { 
    setMoods(mood)
    setShowMoodModal(false)
  }

  const handleSubmit = async () => {
    try {
      // Validate required fields first
      if (!date || !moods || !score) {
        Alert.alert("You're missing Fields", "Please fill in all required fields (Date, Mood, and Score)!")
        return  // stop here don't continue
      }

      // validate date format
      if (!date.includes('/') || date.split('/').length !== 3) {
        Alert.alert("Invalid Date", "Please enter date in MM/DD/YYYY format")
        return  // stop here
      }

      // convert date to ISO format
      let dateISO
      const [month, day, year] = date.split('/') // slash to sep

      // check if parts are numbers
      if (isNaN(month) || isNaN(day) || isNaN(year)) {
        Alert.alert("Invalid date", "please enter a valid date with numbers only")
        return
      }

      // check date ranges
      if (month < 1 || month > 12) {
        Alert.alert("Invalid Month", "Month must be between 1 and 12")
        return
      }

      if (day < 1 || day > 31) {
        Alert.alert("Invalid Day", "Day must be between 1 and 31")
        return
      }

      if (year < 1900 || year > new Date().getFullYear()) {
        Alert.alert("Invalid Year", "Please enter a valid year")
        return
      }

      dateISO = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`).toISOString()

      // Validate date is valid
      if (isNaN(new Date(dateISO).getTime())) {
        Alert.alert("Invalid Date", "The date you entered doesn't exist. Please check and try again.")
        return
      }

      // Validate score
      const scoreInt = parseInt(score, 10)

      if (isNaN(scoreInt)) {
        Alert.alert("invalid score", "Score must be a number")
        return
      }

      if (scoreInt < 1 || scoreInt > 10) {
        Alert.alert("invalid score", "Score must be between 1 and 10")
        return
      }

      // Validate mood
      if (!MOOD_OPTIONS.includes(moods.toLowerCase())) {
        Alert.alert("invalid mood", "Please select a valid mood from the list")
        return
      }

      // All validation passed - now submit
      setLoading(true)

      await createLog({
        date: dateISO,
        moods: moods.toLowerCase(),
        score: scoreInt,
        description
      })

      // Reset fields
      setDate("")
      setMoods("")
      setScore("")
      setDescription("")

      Alert.alert("yippeee! 🎉", "Your mood log has been created successfully!")
      router.replace('/logs')

    } catch (error) {
      console.error("oopsies, there was an error creating your log:", error)
      Alert.alert("nooo", error.message || "failed to create log! Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <ThemedText title={true} style={styles.bigHeading}>
            M O O D
          </ThemedText>
          <ThemedText title={true} style={styles.midHeading}>
            L O G
          </ThemedText>
          <ThemedDivider />

          <ThemedText title={true} style={styles.subheading}>
            Add a New Log!
          </ThemedText>
          <Spacer />

          <ThemedText style={styles.label}>Date</ThemedText>
          <ThemedTextInput
            style={{ width: '90%', marginBottom: 20, alignSelf: 'center' }}
            placeholder="Date (MM/DD/YYYY)"
            value={date}
            onChangeText={setDate}
          />

          <ThemedText style={styles.label}>Mood</ThemedText>
          <TouchableOpacity
            onPress={() => setShowMoodModal(true)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.moodSelector,
              {
                borderColor: theme.uiBackground,
              }
            ]}>
              <ThemedText style={[
                moods ? styles.selectedMood : styles.placeholder,
                { color: theme.uiBackground }  // Add this to match text inputs
              ]}>
                {moods ? moods.charAt(0).toUpperCase() + moods.slice(1) : "Tap to select a mood..."}
              </ThemedText>
            </View>
          </TouchableOpacity>

          <ThemedText style={styles.label}>Score (1-10)</ThemedText>
          <ThemedTextInput
            style={{ width: '90%', marginBottom: 20, alignSelf: 'center' }}
            placeholder="Score (1-10)"
            value={score}
            onChangeText={setScore}
            keyboardType="numeric"
            maxLength={2}
            returnKeyType="done"
            blurOnSubmit={true}   //  dismisses keyboard on enter
          />

          <ThemedText style={styles.label}>Description (Optional)</ThemedText>
          <ThemedTextInput
            style={{ width: '90%', marginBottom: 20, minHeight: 100, alignSelf: 'center' }}
            placeholder="Your mood is more than just good or bad... Log your thoughts and emotions here to reflect on later :)"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            maxLength={200}
            returnKeyType="done"
            blurOnSubmit={true}   //  dismisses keyboard on enter
          />
          <ThemedText style={styles.charCount}>
            {description.length}/200
          </ThemedText>

          <ThemedButton onPress={handleSubmit} disabled={loading}>
            <ThemedText style={{ color: '#274472' }}>
              {loading ? "Saving..." : "Create Log"}
            </ThemedText>
          </ThemedButton>

          <Spacer/>


          <Link href="/logs" asChild>
  <TouchableOpacity style={styles.link}>
    <ThemedText style={styles.linkText}> Click here to go to your logs! </ThemedText>
  </TouchableOpacity>
</Link>

          {/* mood selection modal */}
          <ThemedModal
            visible={showMoodModal}
            onRequestClose={() => setShowMoodModal(false)}
          >
            <ThemedText style={[
              styles.modalTitle,
              { color: colorScheme === 'dark' ? '#274472' : '#FAF3E0' }  // Override color
            ]}>
              Select a Mood
            </ThemedText>

            <FlatList
              data={MOOD_OPTIONS}
              keyExtractor={(item) => item}
              style={styles.flatList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.moodOption,
                    { borderBottomColor: colorScheme === 'dark' ? '#274472' : '#E1EEF8' }  //  is the divider
                  ]}
                  onPress={() => handleMoodSelect(item)}
                  activeOpacity={0.7}
                >
                  <ThemedText style={[
                    styles.moodOptionText,
                    { color: colorScheme === 'dark' ? '#274472' : '#FAF3E0' }  // override colorrrrr
                  ]}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </ThemedText>
                </TouchableOpacity>
              )}
            />

            <ThemedButton
              onPress={() => setShowMoodModal(false)}
              style={{ backgroundColor: theme.uiBackground }}  // themed button background
            >
              <ThemedText style={{ color: theme.uiText }}>
                Cancel
              </ThemedText>
            </ThemedButton>
          </ThemedModal>


        </ScrollView>
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default MoodChart

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 200,
  },
  bigHeading: {
    fontWeight: "bold",
    fontSize: 56,
    textAlign: "center",
    marginBottom: 1,
  },
  midHeading: {
    fontWeight: "bold",
    fontSize: 45,
    textAlign: "center",
    marginBottom: 1,
    marginTop: -15
  },
  subheading: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    padding: 16,
    borderRadius: 8,
  },
  moodSelector: {
    width: '90%',
    marginBottom: 20,
    padding: 20,
    borderRadius: 30,
    borderWidth: 1,
    alignSelf: 'center',
  },
  selectedMood: {
    fontSize: 14,
  },
  placeholder: {
    fontSize: 14,
    opacity: 0.6,
  },
  multiline: {
    padding: 16,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    opacity: 0.6,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  spacer: {
    height: 16,
  },
  bottomPadding: {
    height: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    // Color comes from ThemedText automatically (sandy for dark, dark blue for light)
  },
  flatList: {
    maxHeight: 400,
  },
  moodOption: {
    padding: 15,
    borderBottomWidth: 1,
  },
  moodOptionText: {
    fontSize: 16,
    // color comes from ThemedText automatically
  },
  link: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  linkText: {
    fontSize: 20, 
    fontWeight: '600',  
  },
})