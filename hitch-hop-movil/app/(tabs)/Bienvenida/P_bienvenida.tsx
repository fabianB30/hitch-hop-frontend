import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useFonts, Exo_400Regular, Exo_500Medium, Exo_600SemiBold, Exo_700Bold } from '@expo-google-fonts/exo';
import { useRouter } from "expo-router";

export default function PBienvenidaScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Exo_400Regular,
        Exo_500Medium,
        Exo_600SemiBold,
        Exo_700Bold,
    });


    return (
        <View className="flex-1 items-center">

            <ImageBackground
            source={require('@/assets/images/FondoBienvenida.png')}
            className="absolute w-full h-full top-[-127px] z-0"
            resizeMode="contain"
            />

            <ImageBackground
            source={require('@/assets/images/fondo-HitchHop.png')}
            className="absolute w-full h-full top-[195px] z-0"
            resizeMode="contain"
            />

            <ImageBackground
            source={require('@/assets/images/Vector1.png')}
            className="absolute w-[360px] h-[1000px] top-[-120px] z-0"
            resizeMode="contain"
            />
            <ImageBackground
            source={require('@/assets/images/carritoMeli.png')}
            className="absolute w-[300px] h-[288px] z-50 left-[65px] top-[55px]"
            resizeMode="contain"
            />
            <ImageBackground
            source={require('@/assets/images/esquinaInternaRedondeada.png')}
            className="absolute w-[63px] h-[65px] z-40 left-[103px] top-[200px]"
            resizeMode="contain"
            />

            <ImageBackground
            source={require('@/assets/images/CuadroAmarillo.png')}
            className="absolute w-[107px] h-[107px] z-50 top-[230px] left-[30px]"
            resizeMode="contain"
            />

            <View className='absolute items-center justify-center z-60 top-[340px]'>
                <Text className='text-[24px] text-black text-center ' style={{ fontFamily: 'Exo_700Bold' }}>
                    ¡Bienvenido!
                </Text>
                <Text className='text-[20px] text-black text-center mt-4' style={{ fontFamily: 'Exo_500Medium' }}>
                    Para comenzar puede ver los viajes disponibles.
                </Text>
                <Text className='text-[20px] text-black text-center ' style={{ fontFamily: 'Exo_500Medium' }}>
                    Recuerde que siempre puede hacer esto más tarde.
                </Text>

                <TouchableOpacity
                    className={`flex-1 bg-[#7875F8] py-3 rounded-lg items-center w-[122px] h-[47px] mt-10`}
                    onPress={() => router.push("/ViajesPasajero")}
                >
                    <Text className="text-[16px] text-white" style={{ fontFamily: 'Exo_500Medium' }}>
                    Buscar un viaje
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 py-3 rounded-lg items-center w-[140px] h-[40px] mt-3"
                    onPress={() => router.push("/HomePasajero")}
                >
                    <Text className="text-[16px] text-[#7875F8]" style={{ fontFamily: 'Exo_500Medium' }}>
                    Ver más tarde
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
        
    );
}