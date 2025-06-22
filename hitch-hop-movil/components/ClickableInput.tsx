import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

interface ClickableInputProps {
  header: string;
  value: string;
  placeholder?: string;
  destinationType: 'origin' | 'destination' | 'stops';
  onPress?: () => void;
  // Add context props to preserve form state
  currentOrigin?: string;
  currentDestination?: string;
  currentStops?: string;
  // Add all other form values
  currentVehiculo?: string;
  currentAsientosDisponibles?: string;
  currentMetodoPago?: string;
  currentCostoPasajero?: string;
  currentFecha?: string;
  currentHora?: string;
}

export default function ClickableInput({
  header,
  value,
  placeholder = "Sin seleccionar",
  destinationType,
  onPress,
  currentOrigin,
  currentDestination,
  currentStops,
  currentVehiculo,
  currentAsientosDisponibles,
  currentMetodoPago,
  currentCostoPasajero,
  currentFecha,
  currentHora
}: Readonly<ClickableInputProps>) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }    // Navigate based on destination type
    switch (destinationType) {
      case 'origin':
      case 'destination':
        router.replace({
          pathname: '/(tabs)/PublicarRutasConductor/searchDestination' as any,
          params: { 
            type: destinationType,
            currentValue: value ?? '',
            // Pass all current form context to preserve state
            contextOrigin: currentOrigin ?? '',
            contextDestination: currentDestination ?? '',
            contextStops: currentStops ?? '',
            contextVehiculo: currentVehiculo ?? '',
            contextAsientosDisponibles: currentAsientosDisponibles ?? '',
            contextMetodoPago: currentMetodoPago ?? '',
            contextCostoPasajero: currentCostoPasajero ?? '',
            contextFecha: currentFecha ?? '',
            contextHora: currentHora ?? ''
          }
        });
        break;
      case 'stops':
        router.replace({
          pathname: '/(tabs)/PublicarRutasConductor/manageStops' as any,
          params: { 
            currentStops: value ?? '',
            // Pass all current form context to preserve state
            contextOrigin: currentOrigin ?? '',
            contextDestination: currentDestination ?? '',
            contextVehiculo: currentVehiculo ?? '',
            contextAsientosDisponibles: currentAsientosDisponibles ?? '',
            contextMetodoPago: currentMetodoPago ?? '',
            contextCostoPasajero: currentCostoPasajero ?? '',
            contextFecha: currentFecha ?? '',
            contextHora: currentHora ?? ''          }
        });
        break;
    }
  };

  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>{header}</Text>
          <Text style={[
            styles.subHeader,
            isPlaceholder && styles.placeholder
          ]}>
            {displayValue}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <ChevronRight 
            size={24} 
            color="#414040" 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    lineHeight: 20,
  },
  subHeader: {
    color: '#171717',
    lineHeight: 22,
  },  placeholder: {
    fontSize: 13,
    color: '#999',
  },
  iconContainer: {
    padding: 0,
  },
});
