import { StyleSheet, Pressable } from 'react-native'
import { useState, useEffect }from 'react'
import { Text } from './ui/text'
import { HStack } from './ui/hstack'
import { VStack } from './ui/vstack'
import { Dot } from 'lucide-react-native'
import { SquarePen } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import * as Font from 'expo-font';

type RideDetailProp = {
    stopType: string,
    detail: string,
}

const RideStopDetail = (props: RideDetailProp) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const router = useRouter()

    function goBack() {
        router.back()
    }

    useEffect(() => {
        Font.loadAsync({
        'Exo-Regular': require('@/assets/fonts/Exo-Regular.otf'),
        'Exo-Semibold': require('@/assets/fonts/Exo-SemiBold.otf'),
        }).then(() => setFontsLoaded(true));
    }, [])

    if (!fontsLoaded) return null;

  return (
    <HStack>
        <VStack style={{ width: 24, alignItems: 'center', marginVertical:'auto' }}>
            <Dot size={24} color='black'/>
        </VStack>

        <VStack style={{ flex: 1}}>
            <Text style={styles.stopName} numberOfLines={1} ellipsizeMode="tail">{props.stopType}</Text>
            <Text style={styles.stopDetail} numberOfLines={1} ellipsizeMode="tail">{props.detail}</Text>
        </VStack>

        <Pressable onPress={goBack} style={{marginVertical: 'auto', marginRight: 30}}>
            <SquarePen size={24} color='black'/>
        </Pressable>
    </HStack>
  )
}

const styles = StyleSheet.create({
    stopName: {
        fontSize: 16,
        fontWeight: 600,
        color: '#171717',
        fontFamily: 'Exo-Semibold',
        flex: 1
    },
    stopDetail: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 400,
        color: '#262627',
        fontFamily: 'Exo-Regular',
        flex: 1
    },
})

export default RideStopDetail