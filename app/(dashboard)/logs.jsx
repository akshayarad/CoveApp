import { StyleSheet, FlatList, Pressable, useColorScheme } from 'react-native'

import { useLogs } from '../../hooks/useLogs'
import { Colors } from '../../constants/Colors'

import React from 'react'
import { Link, useRouter, Stack } from 'expo-router'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedCard from '../../components/ThemedCard'

// dynamic routes example: /logs/1234




const Logs = () => {
  const { logs } = useLogs()
  const router = useRouter()
  const colorScheme = useColorScheme()

  return (

    <ThemedView style={styles.container}>

     
      <Spacer />
      <Spacer />

      <ThemedText title={true} style={styles.bigHeading}>
        Y O U R
      </ThemedText>
      <ThemedText title={true} style={styles.midHeading}>
        L O G S
      </ThemedText>
      <ThemedDivider />


      <ThemedText style={styles.title}>
        Scroll through to take a look at past logs
      </ThemedText>
      <ThemedText style={styles.title}>
        Click on ones you want to see in more detail
      </ThemedText>



      <FlatList
        data={logs}
        keyExtractor={(item) => item.$id}
        style={styles.flatList}
        contentContainerStyle={styles.list}
        
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/logs/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={[
                styles.date,
                { color: colorScheme === 'dark' ? '#274472' : '#FAF3E0' }
              ]}>
                {(() => {
                  // Parse just the date part (YYYY-MM-DD)
                  const dateStr = item.date.split('T')[0]
                  const [year, month, day] = dateStr.split('-')
                  const date = new Date(Date.UTC(year, month - 1, day))

                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'UTC'
                  })
                })()}
              </ThemedText>
              <ThemedText style={{ color: colorScheme === 'dark' ? '#274472' : '#FAF3E0' }}>
                Your mood: {item.moods}
              </ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />

  

      <Link href="/moodInsights" style={styles.link}>
        <ThemedText>✨ View your Mood Insights ✨</ThemedText>
      </Link>
    </ThemedView>



  )
}

export default Logs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20, 
    },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
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
  link: {
    fontSize: 18,
    marginVertical: 15,
  },
  list: {
    marginTop: 20,
    paddingBottom: 200,

  },
  card: {
    width: "95%",
    marginHorizontal: "5%",
    marginVertical: 12,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 50,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 30
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
})