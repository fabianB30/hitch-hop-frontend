import { StyleSheet } from 'react-native'
import React from 'react'
import { Text } from './ui/text'
import { HStack } from './ui/hstack'
import { VStack } from './ui/vstack'
import { Dot } from 'lucide-react-native'

type RideDetailProp = {
    stopType: string,
    detail: string | undefined,
    isAtEnd: boolean,
}

const RideStopDetail = (props: RideDetailProp) => {
    let styles

    if (props.isAtEnd) {
        styles = styleEnds
    } else {
        styles = styleMid
    }

  return (
    <HStack>
        <VStack style={{ width: 24, alignItems: 'center', marginVertical: 'auto' }}>
            <Dot size={24} color='black'/>
        </VStack>

        <VStack style={{ flex: 1}}>
            <Text style={styles.stopName} numberOfLines={1} ellipsizeMode="tail">{props.stopType}</Text>
            <Text style={styles.stopDetail} numberOfLines={1} ellipsizeMode="tail">{props.detail}</Text>
        </VStack>
    </HStack>
  )
}

const styleEnds = StyleSheet.create({
    stopName: {
        fontSize: 16,
        //Originalmente estaba en semibold, pero no en teléfono se ve distinto al Figma :/
        //fontWeight: 'semibold'
        fontWeight: 'bold',
        color: '#171717',
        fontFamily: 'Exo',
        flex: 1
    },
    stopDetail: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'normal',
        color: '#262627',
        fontFamily: 'Exo',
        flex: 1
    },
})

const styleMid = StyleSheet.create({
    stopName: {
        fontSize: 12,
        fontWeight: 'semibold',
        color: '#171717',
        fontFamily: 'Exo',
        flex: 1
    },
    stopDetail: {
        marginTop: -4,
        fontSize: 10,
        fontWeight: 'semibold',
        color: '#171717',
        fontFamily: 'Exo',
        flex: 1
    },
})

export default RideStopDetail