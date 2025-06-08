import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HitchHopHeader from '@/components/shared/HitchHopHeader'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { CalendarDays } from 'lucide-react-native'
import { Clock } from 'lucide-react-native'
import { Search } from 'lucide-react-native'
import { ImageBackground } from 'expo-image'
import { Button, ButtonText } from '@/components/ui/button'

const {width, height} = Dimensions.get("window")

const busquedaMain = () => {
  return (
    <SafeAreaView>
        <ImageBackground
        source={require("@/assets/images/pattern-background-main.png")}>
            <HitchHopHeader />

            {/* Main view */}
            <VStack style={styles.container}>
                <Text style={styles.text}>Búsqueda de Rutas</Text>

                <HStack style={styles.data}>
                    <VStack style={{flex: 2.4}}>
                        <Text style={[styles.dataText, styles.text]}>Fecha</Text>
                        <Input style={[styles.dataInput, {maxWidth: width * 0.48}]}>
                            <InputField />
                            <InputSlot>
                                <CalendarDays size={14} color='black' strokeWidth={3} />
                            </InputSlot>
                        </Input>
                    </VStack>
                    <VStack style={{flex: 1.9}}>
                        <Text style={[styles.dataText, styles.text]}>Hora</Text>
                        <Input style={[styles.dataInput, {maxWidth: width * 38.5}]}>
                            <InputField />
                            <InputSlot>
                                <Clock size={14} color='black' strokeWidth={3} />
                            </InputSlot>
                        </Input>
                    </VStack>
                </HStack>

                <VStack>
                    <Text style={[styles.dataText, styles.text]}>Destino</Text>
                    <Input style={styles.dataInputLong}>
                        <InputField />
                        <InputSlot>
                            <Search size={14} color='black' strokeWidth={3} />
                        </InputSlot>
                    </Input>
                </VStack>

                <Image 
                source={require("@/assets/images/conductorFlor.png")}
                style={styles.charaImage}/>
                
                <Text style={[styles.charaText, styles.text]}>¿A dónde quieres ir?</Text>
                <Text style={[styles.charaSubtext, styles.text]}>¡Encuentre su próximo viaje con nosotros!</Text>

                <Button style={styles.button}>
                    <ButtonText style={[styles.text, {color: 'white'}]}>Buscar Rutas</ButtonText>
                </Button>
            </VStack>
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
data: {
    marginTop: 10,
    justifyContent: 'space-between',
    marginBottom: 8.5
},
dataText: {
    fontWeight: 'bold',
    marginBottom: 0.5,
},
dataInput: {
    borderRadius: 8,
    padding: 12,
},
dataInputLong: {
    maxWidth: 358,
    marginBottom: 20,
    padding: 12,
    borderRadius: 8
},
charaImage: {
    marginHorizontal: 'auto',
    width: width * 0.44, 
    height: width * 0.44,
    marginBottom: 18
},
charaText: {
    marginHorizontal: 'auto',
    fontSize: 24,
    fontWeight: 'bold'
},
charaSubtext: {
    marginHorizontal: 'auto',
    fontSize: 18,
    textAlign: 'center'
},
button: {
    height: 39,
    borderRadius: 8,
    backgroundColor: '#7875F8',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    fontWeight: 'medium',
    marginLeft: 17,
    marginRight: 17,
    bottom: 0
}
})

export default busquedaMain