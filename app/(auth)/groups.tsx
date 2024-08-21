import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';

const Page = () => {
  return (
    <View>
        <Button title="Logout" onPress={() => auth().signOut()} />
      <Text>Groups</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})