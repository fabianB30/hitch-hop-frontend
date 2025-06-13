import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HitchHopHeader from '@/components/shared/HitchHopHeader'
import DestinationItem from '@/components/DestinationItem'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Search, Subtitles } from 'lucide-react-native'
import { ImageBackground } from 'expo-image'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { useForm } from '@/components/shared/SearchContext'
import { useRouter } from 'expo-router'

type DestinationType = {
    title: string,
    subtitle: string
}

// Should get this from API
const destinations = [
    {title: "Tecnológico de Costa Rica", subtitle: "Avenida 9, Barrio Amón, San José"},
    {title: "Instituto Nacional de Seguros", subtitle: "Avenida 7, Calle 9, San José"},
    {title: "Hospital Calderón Guardia", subtitle: "Avenida 7, Aranjuez, San José"},
    {title: "Parque España", subtitle: "Avenida 7, Calles 9, C. 11, San José"},
    {title: "Parque Morazán", subtitle: "Avenida 3,Calles 9 y, C. 5, San José"},
    {title: "Parque Nacional", subtitle: "Avenida 3, Calles 15 y, C. 19, San José"},
]

const selectDestination = () => {
    const router = useRouter()

    const { setDestination } = useForm()
    const [search, setSearch] = useState('')

    const handleDestintationSelect = (dest: DestinationType) => {
        const varas = dest.subtitle.split(", ")
        setDestination(dest.title + ", " + varas[varas.length - 1])
        router.back()
    }

  return (
    <SafeAreaView>
         <ImageBackground
        source={require("@/assets/images/pattern-background-main.png")}>
            <HitchHopHeader />

            <View style={styles.container}>
                <Text style={styles.text}>Punto de Partida</Text>

                <Input style={styles.dataInputLong}>
                    <InputField />
                    <InputSlot>
                        <Search size={14} color='black' strokeWidth={3} />
                    </InputSlot>
                </Input>

                <VStack>
                    {destinations.map((dest, index) => <DestinationItem key={index} title={dest.title} subtitle={dest.subtitle} onPress={() => handleDestintationSelect(dest)}/>)}
                </VStack>
            </View>
        </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    backgroundColor: 'white',
},
text: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#262627',
    fontFamily: 'Exo',
},
dataInputLong: {
    maxWidth: 358,
    marginBottom: 20,
    paddingRight: 12,
    borderRadius: 8
},
})

export default selectDestination