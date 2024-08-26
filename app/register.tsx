import { View, Text, StyleSheet, TextInput, Pressable, Platform } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/api'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore, { setDoc } from '@react-native-firebase/firestore'

const Page = () => {

    const [username, setUsername] = React.useState('itzyashh')
    const [password, setPassword] = React.useState('123456@fb')
    const [email, setEmail] = React.useState('yashjadhav1502@gmail.com')

    const { mutate } = useMutation<FirebaseAuthTypes.UserCredential>({
        mutationFn: async () => registerUser(email, password),
        onMutate: () => console.log('onMutate'),
        onSuccess: user => createUser(user),
    })

    const createUser = async (user: FirebaseAuthTypes.UserCredential) => {
        try {
            const docRef = firestore().doc(`users/${user.user.uid}`)
            await setDoc(docRef, {
                username,
                email
            }).then(() => {
                console.log('Document written with ID: ', docRef.id);
            }
            ).catch((error) => {
                console.error('Error adding document: ', error);
            });

        } catch (error) {
            console.log(error)
        }
    }



  return (
    <View style={styles.container}>

        <Text style={[styles.header, Platform.OS === 'web' && {alignSelf:'center'}]}>Register</Text>
      <View style={styles.textInputContainer}>
      <TextInput
        placeholderTextColor={'white'}
        placeholder="Username"
        style={styles.input}
        onChangeText={setUsername}
        value={username} />
     
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
            <Text style={styles.btnText}>Register</Text>
        </Pressable>

        <Text style={styles.text2}>Already have an account? <Link style={styles.special} href="/">Login</Link></Text>

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

// 433D8B