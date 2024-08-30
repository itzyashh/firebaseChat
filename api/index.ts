import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const registerUser = async (  email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
        const user = await auth().createUserWithEmailAndPassword(email, password);
        console.log('user', user)
        return user
    } catch (error) {
        console.log('error', error)
        throw error;
    }
}

export const loginUser = async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
    try {
        const user = await auth().signInWithEmailAndPassword(email, password);
        console.log('user', user)
        return user
    } catch (error) {
        console.log('error', error)
        throw error;
    }
}

export const recoverPassword = async (email: string): Promise<void> => {
    try {
        await auth().sendPasswordResetEmail(email);
    } catch (error) {
        console.log('error', error)
        throw error;
    }
}

export const getChats = async (): Promise<FirebaseFirestoreTypes.QueryDocumentSnapshot[]> => {
    try {
        const chats = await firestore().collection('chats').get();
        return chats.docs
    } catch (error) {
        console.log('error', error)
        throw error;
    }
}