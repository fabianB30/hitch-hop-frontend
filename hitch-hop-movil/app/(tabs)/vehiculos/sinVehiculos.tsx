import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Button } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

export default function SinVehiculos() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#A18AFF' }}>
        {/* Fondo superior con patrón */}
        <View style={styles.topBackground}>
          <Image
            source={require('@/assets/images/backround_gestion.png')}
            style={styles.bgPattern}
            resizeMode="cover"
          />
          <Image
                source={require('@/assets/images/HHLogoDisplay.png')}
                style={{ width: 120, height: 36, position: 'absolute', top: 16, right: 16 }}
                resizeMode="contain"
              />
        </View>

      {/* Contenedor principal blanco con esquinas redondeadas */}
      <View style={styles.formContainer}>
        {/* Flecha y título */}
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require('@/assets/images/flechaback.png')}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={[styles.formTitle, { marginLeft: 70 }]}>Vehículos</Text>
        </View>

        {/* Gato imagen */}
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <Image
            source={require('@/assets/images/gatoautos.png')}
            style={{ width: 350, height: 350, marginBottom: 12, marginLeft: -50 }}
            resizeMode="contain"
          />
        </View>

        {/* Texto vacío */}
        <Text style={{ fontFamily: 'Exo-Bold', fontSize: 18, color: '#181718', textAlign: 'center', marginBottom: 16 }}>
          No hay vehículos registrados
        </Text>

        {/* Botón Agregar Vehículo */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/vehiculos/agregarVehiculo")}
        >
          <Text style={styles.addButtonText}>Agregar Vehículo</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 64,
            backgroundColor: '#7B61FF',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
            <TouchableOpacity>
              <Image source={"asset"} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={"asset"} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={"asset"} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={"asset"} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
          </View>
        </View>
              
  );
}

const styles = StyleSheet.create({
  topBackground: {
    height: 120,
    backgroundColor: '#A18AFF',
    position: 'relative',
    justifyContent: 'flex-start',
  },
  bgPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 1,
  },
  logoText: {
    color: '#fff',
    fontFamily: 'Exo-Bold',
    fontSize: 22,
    position: 'absolute',
    top: 16,
    right: 16,
    letterSpacing: 0.5,
    zIndex: 2,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 0,
    zIndex: 10,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  formTitle: {
    fontFamily: 'Exo-Bold',
    fontSize: 28,
    color: '#181718',
    marginLeft: 12,
  },
  addButton: {
    backgroundColor: '#7B61FF',
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 60,
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Exo-Bold',
    fontSize: 18,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#A18AFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  bottomIcon: {
    flex: 1,
    alignItems: 'center',
  },
  iconImg: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
});