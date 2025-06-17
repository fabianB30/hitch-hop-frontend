import { View, Text, Pressable, StyleSheet, Image, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'

const { width, height} = Dimensions.get('window')

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
        width: 30,
        height: 30,
        zIndex: 11,
    },
    hitchhopText: {
        color: "black",
        fontSize: 20,
        fontFamily: "Montserrat",
        fontWeight: "800",
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