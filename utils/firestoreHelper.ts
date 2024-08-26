import firestore from '@react-native-firebase/firestore'

export const userFBRef = (uid: string) => firestore().doc(`users/${uid}`)
