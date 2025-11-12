// use square brackets to show its dynamic

// themed components
import ThemedText from "../../../components/ThemedText"
import ThemedButton from "../../../components/ThemedButton"
import ThemedView from "../../../components/ThemedView"
import Spacer from "../../../components/Spacer"
import ThemedCard from "../../../components/ThemedCard"
import ThemedLoader from "../../../components/ThemedLoader"

import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { useLocalSearchParams, Link, useRouter } from "expo-router"
import { Colors } from '../../../constants/Colors'

import { React, useEffect, useState } from 'react'
import { useLogs } from '../../../hooks/useLogs'
import { setStatusBarBackgroundColor } from "expo-status-bar"

const LogDetails = () => {
  const router = useRouter()
  const [log, setLog] = useState(null)
  const colorScheme = useColorScheme()

  const { id } = useLocalSearchParams()
  const { fetchLogsById, deleteLog } = useLogs()

  const handleDelete = async () => {
    await deleteLog(id)
    setLog(null)
    router.replace('/logs')

  }

  // fetch log
  useEffect(() => {
    async function loadLog() {
      const logData = await fetchLogsById(id)
      console.log('Log data:', logData)
      setLog(logData)
    }
    loadLog()
  }, [id])

  if (!log) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    )
  }
  const cardTextColor = colorScheme === 'dark' ? '#274472' : '#FAF3E0'

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={[styles.title, { color: cardTextColor }]}>
          {(() => {
            const dateStr = log.date.split('T')[0]
            const [year, month, day] = dateStr.split('-')
            const date = new Date(Date.UTC(year, month - 1, day))
            return date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'UTC'
            })
          })()}
        </ThemedText>

        <ThemedText style={[styles.score, { color: cardTextColor }]}>
          Your mood this day was: {log.moods}
        </ThemedText>

        <ThemedText style={[styles.score, { color: cardTextColor }]}>
          Mood Score: {log.score}
        </ThemedText>

        <Spacer height={20} />

        <ThemedText style={[styles.sectionTitle, { color: cardTextColor }]}>
          Notes:
        </ThemedText>

        <Spacer height={10} />

        <ThemedText style={[styles.description, { color: cardTextColor }]}>
          {log.description}
        </ThemedText>
      </ThemedCard>


      <ThemedButton
        style={styles.delete} onPress={handleDelete}
      >
        <ThemedText style={{ color: cardTextColor, textAlign: 'center' }}>
          Delete Log
        </ThemedText >
      </ThemedButton>

      <ThemedButton
        style={styles.backButton}
        onPress={() => router.push('/logs')}
      >
        <ThemedText style={{ color: cardTextColor }}>
          ← Back to Logs
        </ThemedText>
      </ThemedButton>

    </ThemedView>
  )
}
export default LogDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20
  },
  backButton: {
    margin: 20,
    marginTop: 10,
  }, 
  delete: {
    marginTop: 40, 
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: 'center'
  }

})