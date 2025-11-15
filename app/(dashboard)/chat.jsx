import { StyleSheet, FlatList, KeyboardAvoidingView, Platform, useColorScheme, ActivityIndicator } from 'react-native'
// keyboardavoidingview push eveyrhting up when the keyboard comes 
import { useState, useRef } from 'react'
import axios from 'axios'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'


import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import ThemedCard from '../../components/ThemedCard'
import Spacer from '../../components/Spacer'
import { Colors } from '../../constants/Colors'

// first a welcome message
// id is unique identifier for flatlist
const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Hiii! i\'m Cove 😁 and i\'m here to support you no matter what you\'re going through. \nWhether you need a friend, life advice, or just someone to rant to, im here to listen <3 lets start by telling me how you are feeling today? '
    }
  ])
  const [inputText, setInputText] = useState('') // user typing
  const [loading, setLoading] = useState(false) //while waiting for response spins

  const colorScheme = useColorScheme()
  const flatListRef = useRef(null)

  const sendMessage = async () => {
    if (!inputText.trim()) return; // if the input is empty just return nothig
  
    const userMessage = {
      id: Date.now().toString(), // timestamp is id
      role: 'user',
      content: inputText.trim(), 
    };
  
    setMessages(prev => [...prev, userMessage]); // adds to new array
    setInputText('')  // clears input field immediatly
    setLoading(true);
  
    try { // prompt!!!
      const systemPrompt =
        'You are a compassionate mental health support assistant for an app called Cove. Keep all the messages lowercase except nouns to keep it friendly! Act as my personal, friendly, knowledgeable therapist. Your task is to have a conversation with your client about an issue they are facing in their life. You need to provide tailored support based on their demographics (age, gender, pre-diagnoses). You must try to redirect their thinking patterns if they seem harmful under the basis of Cognitive Restructuring. Be polite, understanding, and steer your client in the right direction using specific analysis of potential automatic thoughts, cognitive distortions, and underlying beliefs. First, assess the client and begin to understand them on a deeper level. Start with a brief update and check on mood before getting to the details (just a small check in before starting, no issues brought up yet). If you have had previous conversations with this client, ask if they want to bridge from the previous session, or start fresh. Then let the client share what has been on their mind. Break down the clients issues, ask questions for elaboration, confirmation, and/or clarity if needed, and provide support and helpful feedback, while summarizing their thoughts to make sure you both are on the right page, or if they need to explain themselves a bit more before you both can work towards a solution. Do not make it feel like an interview or too overwhelming, just simple conversation.  If you want your client to think about something differently, introduce that to them gently, like by saying “I want you to try thinking about this differently for a moment…” and then share your input. Also, try not to jump finding a solution immediately, just hear them out first before talking about trying to solve anything. If they feel alone in their situation, make sure to recognize that so many people are going through the same thing, maybe even bring in some examples of people who have been known for going through something similar, to give them an example or motivation. Once you have talked through everything they wanted to discuss, and you have given adequate advice and feedback, give the client specific aspects of their thought process that they can work on, so that any build up of negative emotions can be avoided for the future. If the client had specific things to work on from the last time they talked to you, bring those up as well to make sure they are on the right track to having a super healthy mentality. Use accessible terminology and do not assume your client knows what you are talking about, explain anything that may be confusing to grasp if they are not well versed in psychology. Explain to them what they might be experiencing without overwhelming them with difficult terminology, and you do not need to actually say “cognitive behavioral therapy”, just use its principles. Always end your messages with a 🌊';
  
        // for convo history
      const conversationHistory = messages
        .slice(1) // dont do the welcome message
        .map(msg => ({
          role: msg.role, // for contexttt
          content: msg.content,
        }));
  
      // send to backend instead of directly 
      const response = await axios.post("http://10.110.84.121:3000/chat", {
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
          { role: "user", content: userMessage.content },
        ],
      });
      
  
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.reply, // backend sends this
      };
  
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling backend:', error.response?.data || error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user'
    const cardTextColor = colorScheme === 'dark' ? '#274472' : '#FAF3E0'

    // for the messages 
    return (
      <ThemedCard
        style={[
          styles.messageCard,
          isUser ? styles.userMessage : styles.aiMessage
          // chnages based on if its user or not
        ]}
      >
        <ThemedText style={[
          styles.messageText,
          { color: cardTextColor }
        ]}>
          {item.content}
        </ThemedText>
      </ThemedCard>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ThemedView style={styles.container}>
      <Spacer/>
      <ThemedText title={true} style={styles.bigHeading}>
        C H A T
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        hey there! lets talk :)
      </ThemedText>
      <ThemedDivider />


      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />

      {loading && (
        <ActivityIndicator
          size="small"
          color={colorScheme === 'dark' ? '#FAF3E0' : '#274472'}
          style={styles.loader}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <ThemedView style={styles.inputContainer}>
          <ThemedTextInput
            style={styles.input}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <ThemedButton
            onPress={sendMessage}
            disabled={loading || !inputText.trim()}
            style={styles.sendButton}
          >
            <ThemedText style={{ color: '#274472' }}>
              Send
            </ThemedText>
          </ThemedButton>
        </ThemedView>
      </KeyboardAvoidingView>
    </ThemedView>
    </TouchableWithoutFeedback>

  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bigHeading: {
    fontWeight: "bold",
    fontSize: 56,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 10,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  messageCard: {
    marginVertical: 8,
    padding: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderLeftWidth: 0,
    borderRightWidth: 4,
    borderRightColor: Colors.primary,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    flex: 1,
    maxHeight: 100,
  },
  sendButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  loader: {
    marginVertical: 10,
  },
})