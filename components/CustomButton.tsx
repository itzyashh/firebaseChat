import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type CustomButtonProps = {
    onPress: () => void
    isLoading?: boolean,
    title: string,
    show?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({onPress, isLoading=false, title,show=true}) => {

    // show is nothing but a chceker if email is empty or not

    const opacity = useSharedValue(0)
    const translateY = useSharedValue(-20)

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

    const rStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{translateY: translateY.value}]
        }
    } )
    
    if(show) {
        opacity.value = withTiming(1, {duration: 500})
        translateY.value = withTiming(0, {duration: 500})
    } else {
        opacity.value = withTiming(0, {duration: 500})
        translateY.value = withTiming(-20, {duration: 500})
    }
    

  return (
    <AnimatedPressable
     style={[styles.btn, rStyle]} onPress={onPress}>
          {isLoading ? <ActivityIndicator color="white" />
           : <Text style={styles.btnText}>{title}</Text>}
    </AnimatedPressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#433D8B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
      },
      btnText: {
        color: 'white',
        fontWeight: 'bold'
        },
})