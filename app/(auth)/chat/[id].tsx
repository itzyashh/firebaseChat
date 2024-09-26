import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { firebase } from '@react-native-firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from '@react-native-firebase/firestore';
import  firestore  from '@react-native-firebase/firestore'; // Import the 'firestore' instance
import { useHeaderHeight } from '@react-navigation/elements';
import ChatBubble from '@/components/ChatBubble';

const Page = () => {
  const headerHeight = useHeaderHeight()

  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState<{ id: string }[]>([])

    const user = firebase.auth().currentUser;
    const {id} = useLocalSearchParams()
  console.log('messages', messages)
    const createMessage = async () => {

        const obj = {
            message,
            sender: user?.uid,
            createdAt: serverTimestamp()
        }
        addDoc(collection(firestore(), `chats/${id}/messages`), obj) // Pass the 'firestore' instance instead of the 'firestore' module
        setMessage('')
    }

    useEffect(() => {
      const messageCollection = firestore().collection(`chats/${id}/messages`)
      const messageQuery = query(messageCollection, orderBy('createdAt', 'asc'))

      const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setMessages(messages)
      })
  
      return () => unsubscribe()
    }
    , [id])

  return (
    <KeyboardAvoidingView
    behavior= {Platform.OS === 'ios' ? 'padding' : 'height'}
     style={styles.container}>
      <FlatList
      style={{flex: 1,paddingTop: headerHeight}}
      data={messages}
      renderItem={({item}) => <ChatBubble item={item} />}
      />
      <View style={styles.chatBarContainer}>
      <TextInput 
        multiline
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        />
        <TouchableOpacity
        onPress={createMessage}
         style={styles.sendButton}>
        <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

// const sendMessage = async () => {

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17153B',
    },
    chatBarContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginBottom: 10
    },
    input: {
        backgroundColor: '#C8ACD6',
        width: '80%',
        padding: 15,
        borderRadius: 10
    },
    sendButton: {
        backgroundColor: '#C8ACD6',
        padding: 15,
        borderRadius: 10,
        marginLeft: 5
    }
})