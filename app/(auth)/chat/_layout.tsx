import { View, Text, PlatformColor } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const NestedLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="groups"options={{
            headerLargeTitle: true,
            headerTitle: 'Chats',
            headerTintColor: '#C8ACD6',
            headerTransparent: true,
            headerBlurEffect: 'regular',
     }} />
        <Stack.Screen name="[id]" options={{
            headerBackTitle: '‎',
            headerTitle: 'Chat',
            headerTintColor: '#C8ACD6',
            headerTransparent: true,
            headerBlurEffect: 'regular',
        }} />
    </Stack>
  )
}

export default NestedLayout