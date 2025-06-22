import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { VStack } from '@/components/ui/vstack'
import * as Font from 'expo-font';

type DestinationItemProp = {
    title: string,
    subtitle: string,
    onPress: () => void
}

const DestinationItem = (props: DestinationItemProp) => {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        Font.loadAsync({
        'Exo-Light': require('@/assets/fonts/Exo-Light.otf'),
        'Exo-Semibold': require('@/assets/fonts/Exo-SemiBold.otf'),
        }).then(() => setFontsLoaded(true));
    }, [])

    
    if (!fontsLoaded) return null;
  return (
    <Pressable onPress={props.onPress}>
        <VStack style={styles.container}>
            <Text style={[styles.text, styles.title]}
                ellipsizeMode='tail'
                numberOfLines={1}
            >{props.title}</Text>
            <Text style={[styles.text, styles.subtitle]}
                ellipsizeMode='tail'
                numberOfLines={1}
            >{props.subtitle}</Text>
            <View style={styles.divider}/>
        </VStack>
    </Pressable>
  )
}

const styles = StyleSheet.create({
container: {
    width: '100%',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center'
},
text: {
    fontFamily: 'Exo',
},
title: {
    fontSize: 16,
    fontFamily: 'Exo-Semibold',
    fontWeight: '600',
    color: '#000000'
},
subtitle: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: 'Exo-Light',
    fontWeight: '300',
    color: '#171717'
},
divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#DDDCDB',
    marginTop: 18,
    marginBottom: 18
}
})

export default DestinationItem