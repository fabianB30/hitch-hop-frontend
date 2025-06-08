import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'

const HitchHopHeader = () => {
    const router = useRouter();

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
        position: "absolute",
        top: 60,
        left: 24,
        width: 30,
        height: 30,
        zIndex: 11,
    },
    hitchhopText: {
        position: "absolute",
        top: 44,
        right: 24,
        color: "black",
        fontSize: 20,
        fontFamily: "Montserrat",
        fontWeight: "800",
        textAlign: "right",
        zIndex: 3,
    },
    mainView: {
        width: '100%',
        height: 122,
    },
});

export default HitchHopHeader