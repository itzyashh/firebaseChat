import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Button title="Logout" onPress={() => auth().signOut()} />
      <Text>Groups</Text>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17153B',
  }
})