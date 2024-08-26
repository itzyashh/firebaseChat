import { View, StyleSheet, Image, Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import { userFBRef } from '@/utils/firestoreHelper'
import { setDoc } from '@react-native-firebase/firestore'


const avatarContainerSize = 170
const avatarSize = 165

const Page = () => {
  const [image, setImage] = useState<string | null>(null);
  const placeholder = require('../../assets/images/profile-placeholder.jpg');
  const user = firebase.auth().currentUser;


  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
    setImage(result.assets[0].uri);
    updateProfilePic(result.assets[0].uri);
    }
  };

  const updateProfilePic = async (image: string) => {

    if (!image || !user) {
      console.log('🚫no image or user')
      return;
    }

    try {
    const storageRef = storage().ref(`profilePics/${user.uid}`)
    await storageRef.putFile(image).catch((error) => console.log('🚫error at stoprageref--->', error));
    const url = await storageRef.getDownloadURL();
    console.log('🚀url --->', url)
    const userFirebaseRef = userFBRef(user.uid)
    setDoc(userFirebaseRef, {
      profilePic: url
    }, { merge: true }).catch((error) => console.log('🚫error at setdoc--->', error));
    await user.updateProfile({
      photoURL: url
    });
    setImage(null);
  } catch (error) {
    console.log('🚫error --->', error)

  }

  }


  console.log('user--->', user)



  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Pressable onPress={openImagePicker}>
        <Image source={image ? { uri: image } : user?.photoURL ? { uri: user.photoURL } : placeholder}
      style={styles.avatar} />
      </Pressable>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
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
  avatarContainer: {
    width: avatarContainerSize,
    height: avatarContainerSize,
    borderRadius: avatarContainerSize/2,
    borderColor: '#C8ACD6',
    borderWidth: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize/2,
    alignSelf: 'center'
  },
  detailsContainer: {
    marginTop: 20
  },
  name: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  email: {
    color: '#C8ACD6',
    fontSize: 16,
    textAlign: 'center'
  }

})