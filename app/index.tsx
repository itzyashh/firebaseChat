import { View, Text, StyleSheet, TextInput, Pressable, Platform, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '@/api'
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
const Page = () => {

    const [email, setEmail] = useState('yash@rndev.com')
    const [password, setPassword] = useState('123456@fb')

    const {mutate, isPending} = useMutation<FirebaseAuthTypes.UserCredential>({
        mutationFn: async () => loginUser( email, password),
        onMutate: () => console.log('onMutate'),
        onSuccess: (user) => console.log('onSuccess', user)
    })
 
  return (
    <View style={styles.container}>
        {/* <Spinner visible={isPending} overlayColor='rgba(0,0,0,0.5)'  /> */}
        <Text style={[styles.header, Platform.OS === 'web' && {alignSelf:'center'}]}>Login</Text>
        <View style={styles.textInputContainer}>
            <TextInput
                placeholderTextColor={'white'}
                placeholder="Email"
                style={styles.input}
                onChangeText={setEmail}
                value={email} />
            <TextInput
                secureTextEntry
                placeholderTextColor={'white'}
                placeholder="Password"
                style={styles.input}
                onChangeText={setPassword}
                value={password} />
        </View>
        <Pressable style={styles.btn} onPress={() => mutate()}>
          {isPending ? <ActivityIndicator color="white" />
           : <Text style={styles.btnText}>Login</Text>}
        </Pressable>
        <Text style={styles.text2}>Don't have an account? <Link style={styles.special} href="/register">Register</Link></Text>
       <Link style={[styles.text2,{marginTop:0}]} href={'/forget-password'} >Forgot password?</Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#17153B'
  },
  header: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10
},
textInputContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20
},
input: {
    backgroundColor: '#6f6aa3',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    color: 'white',
},
text2: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20
},
special: {
    color: '#C8ACD6'
},
btn: {
  backgroundColor: '#433D8B',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 20,
  width: '90%',
  alignSelf: 'center'
},
btnText: {
  color: 'white',
  fontWeight: 'bold'
}
})
