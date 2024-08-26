import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { useMutation } from '@tanstack/react-query'
import { recoverPassword } from '@/api'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useDerivedValue } from 'react-native-reanimated'

const Page = () => {
    const [email, setEmail] = useState('')

    const {mutate, isPending} = useMutation<void>({
        mutationFn: async () => recoverPassword(email),
        onMutate: () => console.log('onMutate'),
        onSuccess: (user) => console.log('onSuccess', user)
    })

    const isEmpty = useDerivedValue(() => email === '')
    console.log('isEmpty', isEmpty)

  return (
    <View style={styles.container}>
        <Text style={[styles.header, Platform.OS === 'web' && {alignSelf:'center'}]}>Forget Password?</Text>
        <TextInput
                autoCapitalize='none'
                placeholderTextColor={'white'}
                placeholder="Email"
                style={styles.input}
                onChangeText={setEmail}
 />
        <Text style={styles.text2}>Enter your email address and we will send you a link to reset your password </Text>
        <View style={styles.btnContainer}>
      <CustomButton title="Submit" onPress={() => mutate()} isLoading={isPending} show={email !== ''} />
        </View>
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
    input: {
        backgroundColor: '#6f6aa3',
        width: '90%',
        padding: 15,
        borderRadius: 10,
        color: 'white',
    },
    text2: {
        color: 'white',
        marginTop: 15,
        textAlign: 'left',
        paddingRight: 10
    },
    btnContainer: {
        marginTop: 20,
        marginLeft: -20
    }

})