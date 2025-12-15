import React, { useMemo } from 'react' // this is to avoid recalc. data on every render
import { Dimensions, StyleSheet, View } from 'react-native'
// dimensions to get screen width for chart size 
import { LineChart } from 'react-native-chart-kit'
// the actual chart importtt
import { useRouter } from 'expo-router'
import { useLogs } from '../../hooks/useLogs'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import ThemedDivider from '../../components/ThemedDivider' 
import Spacer from '../../components/Spacer'

const screenWidth = Dimensions.get('window').width

const MoodInsights = () => {
  const { logs } = useLogs()
  // custom hook to grab all the mood logs from appwrite
  const router = useRouter()

  // first we have to sort the logs by date (most recent last)
  const sortedLogs = useMemo(() => {
    return [...logs].sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [logs])
  // we use useMemo here so that we only recalculate when the logs change
  // also we have to do ...logs so that we dont mutate the og array so we sort a c o p y

  // have to calc the weekly + monthly avgs
  // grabs the last 7 entries and calcs the avg mood score for that week
  const avgWeek = useMemo(() => {
    const weekLogs = sortedLogs.slice(-7) // gets the last 7 logs (starting from end)
    if (weekLogs.length === 0) return 0
    // if theres no logs just return 0 so avg doesnt break...
    return weekLogs.reduce((sum, l) => sum + (l.score || 0), 0) / weekLogs.length
  }, [sortedLogs])
  // .reduce reducence an array down to a single value 
  // sum is the accumulator and l is the current log froom the array then divide by num of logs


  const avgMonth = useMemo(() => {
    const monthLogs = sortedLogs.slice(-30)
    if (monthLogs.length === 0) return 0
    return monthLogs.reduce((sum, l) => sum + (l.score || 0), 0) / monthLogs.length
  }, [sortedLogs])

  // for the feedback text depending on their mood scores 
  const feedback = useMemo(() => {
    if (sortedLogs.length === 0)
      return "No mood logs yet 🌱 come onnn, start tracking how you feel!"
    if (avgWeek < 3)
      return ":( You’ve had some tough days 💜 Maybe chat with Cove for a little support?"
    if (avgWeek < 5 && avgWeek > 3)
      return "Some ups and downs, thats toootally okay 🌷 Remember to take care of yourself pookiee!"
    return "You’ve been feeling brighter lately 🌞 Keep checking in with yourself!"
  }, [avgWeek, sortedLogs])

  // the actaul data
  const chartData = {
    labels: sortedLogs.slice(-7).map((l) => // takes the last 7 logs and transforms each one into a label
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
        I N S I G H T S          
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
         <ThemedText style={styles.buttonText}>
           💬 Talk to Cove
         </ThemedText>
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#274472',
    textAlign: 'center',
  },
})
