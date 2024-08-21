import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const TabLayout = () => {
  return (
    <Tabs initialRouteName='groups'>
        <Tabs.Screen name="groups" 
            options={{
                title: 'Groups',
                tabBarIcon: ({focused, color, size}) => (
                    <FontAwesome name="users" size={size} color={color} />
                )
            }}
            />
            <Tabs.Screen name="profile"
                options={{
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