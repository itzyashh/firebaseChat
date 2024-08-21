import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

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
