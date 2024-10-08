import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const TabLayout = () => {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: '#C8ACD6',
        tabBarInactiveTintColor: '#17153B',
        tabBarStyle: {
            backgroundColor: '#433D8B',
        },
    }}
    initialRouteName='groups'>
        <Tabs.Screen name="chat" 
            options={{
                tabBarLabel: 'Chats',
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => (
                    <FontAwesome name="users" size={size} color={color} />
                )
            }}
            />
            <Tabs.Screen name="profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({focused, color, size}) => (
                        <FontAwesome name="user" size={size} color={color} />
                    )
                }}
             />
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})