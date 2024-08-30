import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Link } from 'expo-router'

type ChatItemProps = {
    details: {
        chatName: string,
        id: string,
        createdAt: Date
    }
    }

const ChatItem: React.FC<ChatItemProps> = ({details}) => { 

    console.log('🚀 ~ file: ChatItem.tsx ~ line 5 ~ ChatItem ~ details', details)
    console.log('id', details.id)
  return (
    <Link asChild href={`/chat/${details.id}`}>
    <Pressable style={styles.container}>
        <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.img} />
        <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{details.chatName}</Text>
        <Text style={styles.chatMessage}>recent message Message</Text>
        </View>
    </Pressable>
    </Link>
  )
}

export default ChatItem

const styles = StyleSheet.create({
    container: {
        flex: 1,

        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#433D8B',
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    chatInfo: {
        marginLeft: 10
    },
    chatName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    chatMessage: {
        color: '#fff',
        fontSize: 15
    }
   
})