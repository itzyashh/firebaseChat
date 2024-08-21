import React, { useEffect, useState } from 'react'
import { Slot, Stack, useRouter, useSegments } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Spinner from 'react-native-loading-spinner-overlay'
import auth from '@react-native-firebase/auth';


const RootLayout = () => {

    const clientQuery = new QueryClient()

  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();

  const router = useRouter()
  const segments = useSegments()

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) {
    return <Spinner visible={initializing} overlayColor='rgba(0,0,0,0.5)' />
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)'
    if (user && !inAuthGroup) {
      router.replace('(auth)/groups')
    } else if (!user && inAuthGroup) {
      router.replace('/')
    }
  }
  , [initializing, user]);
    


  return (
    <QueryClientProvider client={clientQuery}>
    <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register"  options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
    </QueryClientProvider>
  )
}

export default RootLayout