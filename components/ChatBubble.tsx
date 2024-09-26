import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAuth } from '@react-native-firebase/auth'

type ChatBubbleProps = {
    item: {
        id: string
        message: string
        sender: string
        createdAt: string
    }
}

const ChatBubble: React.FC<ChatBubbleProps> = ({item}) => {

    const user = getAuth().currentUser

  return (
    <View 
    style={[styles.bubble, item.sender === user?.uid && styles.yourBubble]}
    >
      <Text
         style={styles.text}
      >{item.message}</Text>
    </View>
  )
}

export default ChatBubble

const styles = StyleSheet.create({
    bubble: {
        backgroundColor: '#433D8B',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        maxWidth: '80%',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0
    },
    yourBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#2E236C',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 10
    },
    text: {
        color: '#fff'
    }
})