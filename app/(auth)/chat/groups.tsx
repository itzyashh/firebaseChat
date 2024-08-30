import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addDoc, getDoc, onSnapshot, setDoc } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getChats } from '@/api';
import ChatItem from '@/components/ChatItem';

const Page = () => {

  const [chatsNew , setChatsNew] = React.useState([])
  // const queryClient = useQueryClient()
  // const { data: chats, status } = useQuery({
  //   queryKey: ['chats'],
  //   refetchOnWindowFocus: true,

  //   queryFn : async () => getChats(),
  // })
  
  // console.log('🚀chats', chats)
  // const {mutate} = useMutation({
  //   mutationFn: async () => onCreateChat(),
  //   onSettled: () => {
  //       console.log('🚀invalidate')
  //       queryClient.invalidateQueries({ queryKey: ['chats'] });
  // }, 
  // })

  // console.log('🚀status', status)

  useEffect(() => {
    const chatCollection = firestore().collection('chats')

    const unsubscribe = onSnapshot(chatCollection, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setChatsNew(chats)
    })

    return () => unsubscribe()
  } , [])



  const onCreateChat = async () => {
   const docRef = await addDoc(firestore().collection('chats'), {
      chatName: 'first chat',
      createdAt: new Date()
    })
    return docRef
  }



  return (
    <View style={styles.container}>
    <FlatList
    // till 100

        data={chatsNew}
        contentInsetAdjustmentBehavior='automatic'
        renderItem={({item}) => <ChatItem details={item} />}
        keyExtractor={(item) => item?.id}
    />
    <Pressable style={styles.btn} onPress={() => onCreateChat()}>
      <MaterialCommunityIcons  style={styles.btnIcon} name='plus' />
    </Pressable>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17153B',
  },
  btn: {
    width: 65,
    height: 65,
    backgroundColor: '#433D8B',
    borderRadius: 50,
    borderCurve: 'circular',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30
  },
  btnIcon: {
    color: '#C8ACD6',
    fontSize: 40
  }
})