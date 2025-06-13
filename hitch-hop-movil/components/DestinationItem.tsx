import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { VStack } from '@/components/ui/vstack'

type DestinationItemProp = {
    title: string,
    subtitle: string,
    onPress: () => void
}

const DestinationItem = (props: DestinationItemProp) => {
  return (
    <Pressable onPress={props.onPress}>
        <VStack style={styles.container}>
            <Text style={[styles.title, styles.text]}>{props.title}</Text>
            <Text style={[styles.subtitle, styles.text]}>{props.subtitle}</Text>
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
    fontWeight: 'semibold',
    color: '#000000'
},
subtitle: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 'light',
    color: '#171717'
},
divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#171717',
    marginTop: 18,
    marginBottom: 18
}
})

export default DestinationItem