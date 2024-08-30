import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { firebase } from '@react-native-firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from '@react-native-firebase/firestore';
import  firestore  from '@react-native-firebase/firestore'; // Import the 'firestore' instance

const Page = () => {

  const [message, setMessage] = React.useState('')

    const user = firebase.auth().currentUser;
    const {id} = useLocalSearchParams()

    const createMessage = async () => {

        const obj = {
            message,
            sender: user?.uid,
            createdAt: serverTimestamp()
        }
        addDoc(collection(firestore(), `chats/${id}/messages`), obj) // Pass the 'firestore' instance instead of the 'firestore' module
        // setMessage('')
    }

  return (
    <KeyboardAvoidingView
    behavior= {Platform.OS === 'ios' ? 'padding' : 'height'}
     style={styles.container}>
      <View style={styles.container} />
      <View style={styles.chatBarContainer}>
      <TextInput 
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