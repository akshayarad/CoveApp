import React, { useMemo } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { useRouter } from 'expo-router'
import { useLogs } from '../../hooks/useLogs'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'

const screenWidth = Dimensions.get('window').width

const MoodInsights = () => {
  const { logs } = useLogs()
  const router = useRouter()

  // Sort logs by date (most recent last)
  const sortedLogs = useMemo(() => {
    return [...logs].sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [logs])

  // Compute weekly + monthly averages
  const avgWeek = useMemo(() => {
    const weekLogs = sortedLogs.slice(-7)
    if (weekLogs.length === 0) return 0
    return weekLogs.reduce((sum, l) => sum + (l.score || 0), 0) / weekLogs.length
  }, [sortedLogs])

  const avgMonth = useMemo(() => {
    const monthLogs = sortedLogs.slice(-30)
    if (monthLogs.length === 0) return 0
    return monthLogs.reduce((sum, l) => sum + (l.score || 0), 0) / monthLogs.length
  }, [sortedLogs])

  // Generate feedback text
  const feedback = useMemo(() => {
    if (sortedLogs.length === 0)
      return "No mood logs yet 🌱 Let's start tracking how you feel!"
    if (avgWeek < 3)
      return "You’ve had some tough days 💜 Maybe chat with Cove for a little support?"
    if (avgWeek < 5)
      return "Some ups and downs — totally okay 🌷 Remember to take care of yourself!"
    return "You’ve been feeling brighter lately 🌞 Keep checking in with yourself!"
  }, [avgWeek, sortedLogs])

  // Chart data
  const chartData = {
    labels: sortedLogs.slice(-7).map((l) =>
      new Date(l.date).toLocaleDateString([], { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        data: sortedLogs.slice(-7).map((l) => l.score),
        color: () => '#7BAFD4', // line color
        strokeWidth: 2,
      },
    ],
  }

  return (
    <ThemedView style={styles.container}>
      <Spacer />

      <ThemedText title={true} style={styles.bigHeading}>
        M O O D
      </ThemedText>
      <ThemedText title={true} style={styles.midHeading}>
        INSIGHTS          
      </ThemedText>

      <Spacer height={10} />

      {sortedLogs.length > 0 ? (
        <>
          <LineChart
            data={chartData}
            width={screenWidth * 0.9}
            height={220}
            fromZero
            yAxisInterval={1}
            chartConfig={{
              backgroundGradientFrom: '#E1EEF8',
              backgroundGradientTo: '#FAF3E0',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(39, 68, 114, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(39, 68, 114, ${opacity})`,
              propsForDots: {
                r: '4',
              },
            }}
            bezier
            style={styles.chart}
          />

          <Spacer height={20} />
          <ThemedText style={styles.feedback}>{feedback}</ThemedText>
          <Spacer height={30} />

          {avgWeek < 4 && (
            <ThemedButton
              onPress={() => router.push('/chat')}
              style={styles.button}
            >
              💬 Talk to Cove
            </ThemedButton>
          )}
        </>
      ) : (
        <ThemedText style={styles.noData}>
          No data to show yet — create a mood log first 🌱
        </ThemedText>
      )}
    </ThemedView>
  )
}

export default MoodInsights

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 50,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 20,
    marginVertical: 10,
  },
  feedback: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    width: '85%',
  },
  button: {
    width: '70%',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
  },
  noData: {
    textAlign: 'center',
    marginTop: 40,
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
})
