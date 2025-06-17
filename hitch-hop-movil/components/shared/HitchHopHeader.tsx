import { View, Text, Pressable, StyleSheet, Image, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font';

const { width, height} = Dimensions.get('window')

const HitchHopHeader = () => {
    const router = useRouter();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        Font.loadAsync({
        'Exo-Medium': require('@/assets/fonts/exo.medium.otf'),
        'Montserrat-ExtraBold': require('@/assets/fonts/Montserrat-ExtraBold.ttf'),
        }).then(() => setFontsLoaded(true));
        }, [])

    if (!fontsLoaded) return null;
    
    return (
        <View style={styles.mainView}>
            <Pressable onPress={() => router.back()} style={styles.backArrow}>
                <Image
                source={require("@/assets/images/backArrow.png")}
                style={{ width: 30, height: 30 }}
            />
            </Pressable>

            
            <Pressable /*TODO: Add route to home screen once that exists*/>
                <Text style={styles.hitchhopText}>HitchHop</Text>
            </Pressable>
        </View>
        
    )
}

const styles = StyleSheet.create ({
    backArrow: {
        width: 30,
        height: 30,
        zIndex: 11,
    },
    hitchhopText: {
        color: '#000',
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        textAlign: "right",
        zIndex: 3,
        marginBottom: 20
    },
    mainView: {
        width: '100%',
        height: height * 0.11,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});

export default HitchHopHeader