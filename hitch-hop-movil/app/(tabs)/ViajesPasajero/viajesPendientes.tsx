import {ImageBackground, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { useRouter } from 'expo-router';
import { RideCard } from "@/components/RideCard";
import { Clock } from "lucide-react-native";
import CancelPopup from '@/components/cancelPopUp';
import React, { useEffect, useState } from 'react';

export default function viajesPendientes() {

  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [rideToCancel, setRideToCancel] = useState<number | null>(null);

  const handleCancelPress = (rideId: number) => {
    setRideToCancel(rideId);
    setShowPopup(true);
  };

  const handleConfirmCancel = () => {
    // Aquí va la lógica para cancelar el viaje
    setShowPopup(false);
    setRideToCancel(null);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setRideToCancel(null);
  };

  // La interfaz tiene las mismas propiedades que RideCardProps(RideCard.tsx)
  interface Ride {
    id: number;
    avatar: any;
    name: string;
    car: string;
    price: string;
    date: string;
    time: string;
    start: string;
    end: string;
  }

  const rides: Ride[] =[
  {
    id: 1,
    avatar: require('@/assets/images/avatar1.png'),
    name: "Adrián Zamora",
    car: "Toyota Camry",
    price: "₡1500",
    date: "12 de Abr, 2025.",
    time: "11:55 AM",
    start: "Alianza Francesa, San José Av. 7.",
    end: "Tecnológico de Costa Rica, Cartago.",
  },

  {
    id: 2,
    avatar: require('@/assets/images/avatar1.png'),
    name: "Juan Pérez",
    car: "Kia Río",
    price: "₡1500",
    date: "20 de Abr, 2025.",
    time: "11:55 AM",
    start: "Alianza Francesa, San José Av. 7.",
    end: "Tecnológico de Costa Rica, Cartago.",
  },

  {
    id:3,
    avatar: require('@/assets/images/avatar1.png'),
    name: "Julián Soto",
    car: "Hyundai Accent",
    price: "₡1500",
    date: "11 de Abr, 2025.",
    time: "11:55 AM",
    start: "Alianza Francesa, San José Av. 7.",
    end: "Tecnológico de Costa Rica, Cartago.",
  }
];
  useEffect(() => {
    if (rides.length == 0) {
      router.replace("/(tabs)/ViajesPasajero/sinViajes");
    }
  }, [rides, router]);

  if (rides.length === 0) {
    return null;
  }

   return (
    <ImageBackground
      source={require('@/assets/images/fondoDefault.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Pressable
        onPress={() => router.push('/(tabs)')}
        style={styles.backArrow}
      >
        <Image
          source={require('@/assets/images/backArrow.png')}
          style={{ width: 30, height: 30 }}
        />
      </Pressable>
      
      <Text style={styles.hitchhopText}>HitchHop</Text>

      <View style={styles.overlay} />

      <Text style={styles.title}>Viajes Programados</Text>

      <Box style={styles.buttonsContainer}>
        <Pressable 
            onPress={() => router.push('/(tabs)/ViajesPasajero/verDetallesViajesAceptados')}
            style={styles.aprobadosButton}
        >
          <Text style={styles.buttonText}>Aprobados</Text>
        </Pressable>
        <Pressable style={styles.pendientesButton}>
          <Text style={styles.buttonText}>Pendientes</Text>
        </Pressable>
      </Box>
      <CancelPopup
        visible={showPopup}
        onConfirm={handleConfirmCancel}
        onCancel={handleClosePopup}
      />
      <ScrollView
        style={styles.cardsScroll}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
      >
        {rides.map((ride) => (
          <React.Fragment key={ride.id}>
            <Box
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                    width: '100%',
                }}
            >
                <Clock size={18} color="black" style={{ marginRight: 8 }} />
                <Text style={styles.esperandoAprobacion}>Esperando Aprobación</Text>
            </Box>
            <RideCard
                {...ride}
                startLabel="Parada solicitada"
                onCancel={() => handleCancelPress(ride.id)}
                onDetails={() => {/* lo que hace el boton detalles */}}
            />
            </React.Fragment>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backArrow: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 30,
    height: 30,
    zIndex: 11,
  },
  hitchhopText: {
    position: 'absolute',
    top: 40,
    right: 24,
    color: 'black',
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: '800',
    textAlign: 'right',
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1,
  },
  title: {
    position: 'absolute',
    top: 140,     
    left: 24,      
    color: '#171717',
    fontSize: 25,
    fontFamily: 'Exo',
    fontWeight: '600',
    textAlign: 'left',
    zIndex: 2,
  },
  buttonsContainer: {
    position: 'absolute',
    top: 180, 
    left: 24,
    right: 24,
    flexDirection: 'row',
    gap: 16,
    zIndex: 2,
  },
  aprobadosButton: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#ADA7FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    height: 48,
  },
  pendientesButton: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: '#7875F8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    height: 48,
  },
  buttonText: {
    color: '#FEFEFF',
    fontSize: 18,
    fontFamily: 'Exo',
    fontWeight: '500',
  },
  cardsScroll: {
    position: 'absolute',
    top: 240, 
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  cardsContainer: {
    paddingBottom: 32,
    paddingTop: 8,
  },
  esperandoAprobacion: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Exo',
    fontWeight: '500',
    flexWrap: 'wrap',
    zIndex: 2,
    },
});

